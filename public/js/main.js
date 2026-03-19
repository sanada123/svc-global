// SVC Global - Main JavaScript File

// ============================================
// Cart Management (localStorage based)
// ============================================
const CART_KEY = 'svc_cart';

function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : {};
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  showNotification('Added to cart!');
  announceToScreenReader('Product added to cart');
}

function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
}

function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  if (quantity <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = quantity;
  }
  saveCart(cart);
}

function getCartCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  const badge = document.getElementById('cart-count');
  if (badge) {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }
}

// ============================================
// Mobile Menu Toggle with Focus Trap
// ============================================
function initMobileMenu() {
  const hamburger = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('menu-close');

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.add('active');
      trapFocusInMenu(menu);
    });

    closeBtn.addEventListener('click', () => {
      menu.classList.remove('active');
      hamburger.focus();
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }
}

// Focus trap for mobile menu accessibility
function trapFocusInMenu(menu) {
  const focusableElements = menu.querySelectorAll(
    'a, button, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  });
}

// ============================================
// Header Scroll Effect with Debounce
// ============================================
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const debouncedScroll = debounce(() => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 100);

  window.addEventListener('scroll', debouncedScroll);
}

// ============================================
// Add to Cart Button Handler
// ============================================
function initAddToCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      addToCart(productId);
    });
  });
}

// ============================================
// Notification System with CSS Classes
// ============================================
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.setAttribute('aria-live', 'polite');
  notification.setAttribute('role', 'status');
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// Image Zoom on Hover/Click and Touch
// ============================================
function initImageZoom() {
  const mainImage = document.getElementById('main-image');
  if (mainImage) {
    mainImage.style.cursor = 'zoom-in';

    // Click/Tap handler
    mainImage.addEventListener('click', function() {
      toggleImageZoom(this);
    });

    // Touch handler for mobile
    mainImage.addEventListener('touchend', function(e) {
      if (e.touches.length === 0) {
        toggleImageZoom(this);
      }
    });

    // Double-tap zoom on touch devices
    let lastTap = 0;
    mainImage.addEventListener('touchend', function(e) {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;

      if (tapLength < 300 && tapLength > 0) {
        toggleImageZoom(this);
      }
      lastTap = currentTime;
    });
  }
}

function toggleImageZoom(element) {
  if (element.style.transform === 'scale(1.5)') {
    element.style.transform = 'scale(1)';
    element.style.cursor = 'zoom-in';
  } else {
    element.style.transform = 'scale(1.5)';
    element.style.cursor = 'zoom-out';
  }
}

// ============================================
// Language Switcher
// ============================================
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Already handled by onclick in template
      // This is just for additional functionality if needed
    });
  });
}

// ============================================
// Product Grid Animations
// ============================================
function initProductGridAnimations() {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = (index * 0.1) + 's';
  });
}

// ============================================
// Filter & Sort Functionality (Shop Page)
// ============================================
function initShopFilters() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      // Client-side filtering would go here
      // For now, we let server handle it
    });
  }
}

// ============================================
// Form Validation
// ============================================
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  for (let input of inputs) {
    if (!input.value.trim()) {
      showNotification('Please fill in all required fields');
      return false;
    }

    if (input.type === 'email' && !isValidEmail(input.value)) {
      showNotification('Please enter a valid email');
      return false;
    }
  }
  return true;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ============================================
// Lazy Loading Images
// ============================================
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  }
}

// ============================================
// Initialize Everything on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Set touch-action for better scrolling performance
  document.body.style.touchAction = 'manipulation';

  // Initialize all features
  initMobileMenu();
  initHeaderScroll();
  initAddToCartButtons();
  initSmoothScroll();
  initImageZoom();
  initLanguageSwitcher();
  initProductGridAnimations();
  initShopFilters();
  initLazyLoading();

  // Update cart UI on page load
  updateCartUI();

  // Mobile menu responsive handling
  const setupMobileMenuToggle = () => {
    const hamburger = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');

    if (window.innerWidth > 768) {
      if (menu) menu.classList.remove('active');
    }
  };

  window.addEventListener('resize', setupMobileMenuToggle);
});

// ============================================
// Utility Functions
// ============================================

// Get current language
function getCurrentLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('lang') || 'ar';
}

// Format currency
function formatPrice(price, lang = 'ar') {
  if (lang === 'ar') {
    return 'د.إ' + price.toLocaleString('ar-AE');
  }
  return 'AED ' + price.toLocaleString('en-AE');
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Print function (for receipts/invoices)
function printDocument() {
  window.print();
}

// Share functionality
function shareProduct(productName, productUrl) {
  if (navigator.share) {
    navigator.share({
      title: 'SVC Global',
      text: 'Check out: ' + productName,
      url: productUrl
    }).catch(err => {
      // Silently fail - user cancelled share
    });
  } else {
    showNotification('Sharing not supported on your device');
  }
}

// ============================================
// Accessibility Enhancements
// ============================================

// Add keyboard navigation for menu
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const menu = document.getElementById('mobile-menu');
    if (menu && menu.classList.contains('active')) {
      menu.classList.remove('active');
    }
  }
});

// Announce to screen readers
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
}

// ============================================
// Cart Page Functionality
// ============================================
async function renderCartPage() {
  const cartContainer = document.getElementById('cart-items');
  if (!cartContainer) return; // Not on cart page

  const cart = getCart();
  const productIds = Object.keys(cart);

  if (productIds.length === 0) return; // Empty cart handled in template

  try {
    const response = await fetch('/api/products');
    const products = await response.json();

    let html = '';
    let subtotal = 0;
    const lang = getCurrentLanguage();

    for (const productId of productIds) {
      const product = products.find(p => p.id === productId);
      if (!product) continue;

      const quantity = cart[productId];
      const itemTotal = product.price * quantity;
      subtotal += itemTotal;

      html += `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name.en}" class="cart-item-image">
          <div class="cart-item-details">
            <h3>${lang === 'ar' ? product.name.ar : product.name.en}</h3>
            <div class="category">${product.category}</div>
            <div class="price">${formatPrice(product.price, lang)}</div>
            <div class="quantity-controls">
              <button onclick="decrementQuantity('${productId}')">−</button>
              <input type="number" value="${quantity}" min="1" id="qty-${productId}" onchange="updateQuantity('${productId}', this.value)">
              <button onclick="incrementQuantity('${productId}')">+</button>
            </div>
            <button class="remove-btn" onclick="removeItem('${productId}')">
              ${lang === 'ar' ? 'إزالة' : 'Remove'}
            </button>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1rem; font-weight: 600;">
              ${formatPrice(itemTotal, lang)}
            </div>
          </div>
        </div>
      `;
    }

    cartContainer.innerHTML = html;
    document.getElementById('subtotal').textContent = formatPrice(subtotal, lang);
    document.getElementById('total').textContent = formatPrice(subtotal, lang);
    document.getElementById('checkout-btn').disabled = false;
  } catch (error) {
    console.error('Error rendering cart:', error);
  }
}

function incrementQuantity(productId) {
  const qty = parseInt(document.getElementById('qty-' + productId).value) + 1;
  updateQuantity(productId, qty);
}

function decrementQuantity(productId) {
  const qty = parseInt(document.getElementById('qty-' + productId).value) - 1;
  if (qty > 0) {
    updateQuantity(productId, qty);
  }
}

function updateQuantity(productId, quantity) {
  quantity = parseInt(quantity);
  if (quantity > 0) {
    updateCartQuantity(productId, quantity);
    renderCartPage();
  }
}

function removeItem(productId) {
  removeFromCart(productId);
  renderCartPage();
}

// ============================================
// Export Functions for Global Use
// ============================================
window.SVC = {
  addToCart,
  removeFromCart,
  getCart,
  showNotification,
  getCurrentLanguage,
  formatPrice,
  shareProduct,
  printDocument,
  renderCartPage,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  removeItem
};