# SVC Global - CSS Classes Reference

## Core Structure Classes

### Layout
- `.container` - Max-width wrapper (1200px), centered
- `.section` - Section padding (4rem vertical, responsive)
- `.section-header` - Centered section heading with decorative line

### Header & Navigation
- `header` - Sticky header with border
- `header.scrolled` - Scrolled state with shadow
- `.header-main` - Header flex container
- `.logo` - Brand logo text
- `.nav` - Main navigation menu
- `.nav a` - Navigation links with underline animation
- `.header-icons` - Icon container (cart, language, hamburger)
- `.icon-btn` - Icon button styling
- `.cart-badge` - Cart count badge
- `.lang-switcher` - Language switcher container
- `.lang-btn` - Language button
- `.lang-btn.active` - Active language button
- `.hamburger` - Mobile hamburger menu (3 lines)

### Mobile Menu
- `.mobile-menu` - Fixed mobile menu overlay
- `.mobile-menu.active` - Active mobile menu state
- `.mobile-menu-close` - Close button in mobile menu
- `.mobile-nav` - Mobile navigation list

## Button Classes

### Primary Buttons
- `.btn` - Base button styling
- `.btn-primary` - Gold background, dark text
- `.btn-secondary` - Dark background, gold text
- `.btn-outline` - Transparent with gold border
- `.btn-small` - Smaller padding and font
- `.btn-block` - Full width button

## Product Classes

### Product Grid
- `.products-grid` - CSS Grid for products
- `.product-card` - Individual product card
- `.product-image` - Product image container with padding-top trick
- `.product-image img` - Product image
- `.product-badge` - "Featured", "Best Seller", "New" label
- `.product-info` - Product text content area
- `.product-category` - Category label text
- `.product-name` - Product name/title
- `.product-price` - Price display
- `.product-actions` - Action buttons container

## Category Classes

### Category Cards
- `.categories-grid` - Grid for category cards
- `.category-card` - Category card with image
- `.category-card-content` - Gradient overlay on hover
- `.category-card h3` - Category title
- `.category-card-content a` - View collection link

## Shop Page Classes

### Shop Layout
- `.shop-container` - Two-column layout (sidebar + main)
- `.shop-toolbar` - Search, sort, results count bar
- `.sidebar` - Filter sidebar
- `.filter-group` - Filter section group
- `.filter-item` - Individual filter checkbox
- `.results-count` - Results counter text

## Product Detail Classes

### Product Detail Page
- `.product-detail` - Two-column layout (image + info)
- `.product-image-large` - Large product image container
- `.product-details-info` - Product information column
- `.product-meta` - Product metadata (category, stock)
- `.product-meta-item` - Individual metadata item
- `.product-description` - Full product description
- `.product-details-actions` - Add to cart, WhatsApp buttons
- `.related-products` - Related products section

## Form Classes

### Forms
- `.form-group` - Form field wrapper
- `.form-group label` - Form labels
- `.form-group input` - Text inputs (with focus states)
- `.form-group textarea` - Text areas
- `.form-group select` - Select dropdowns
- `.contact-form` - Contact form wrapper
- `.contact-info` - Contact information container
- `.contact-info-item` - Individual contact info block

### Newsletter Form
- `.newsletter-form` - Newsletter subscription form
- `.newsletter-form input` - Newsletter email input
- `.newsletter-form button` - Subscribe button

## Footer Classes

### Footer
- `footer` - Footer container with dark background
- `.footer-content` - Grid layout for footer columns
- `.footer-column` - Individual footer column
- `.footer-column h3` - Column heading
- `.footer-links` - List of footer links
- `.social-links` - Social media icons container
- `.social-links a` - Individual social icon (circle)
- `.footer-bottom` - Copyright/legal section

## Typography Classes

### Headings
- `h1, h2, h3, h4, h5, h6` - Heading styles (Playfair Display)

### Text
- `p` - Paragraph text
- `a` - Links with color and hover states

## Page Content Classes

### Common Page Elements
- `.page-header` - Page title section (gradient background)
- `.page-header h1` - Page title text
- `.hero` - Hero section (full viewport height)
- `.hero-content` - Hero content alignment
- `.hero h1` - Hero heading
- `.hero p` - Hero description
- `.error-container` - 404 error page container
- `.error-code` - 404 number display
- `.error-message` - 404 message text

### About Page
- `.about-content` - About page content wrapper
- `.about-section` - Individual section in about page

### Blog
- `.blog-grid` - Grid layout for blog articles
- `.blog-card` - Individual blog article card
- `.blog-image` - Blog article image
- `.blog-content` - Blog article text content
- `.blog-date` - Article publication date
- `.blog-card h3` - Article title
- `.blog-card p` - Article excerpt

## Utility Classes

### Spacing
- `.section` - Vertical padding (4rem responsive)

### Text Alignment
- `text-align: center` - Centered text
- `text-align: right` - Right aligned (RTL default)
- `text-align: left` - Left aligned (LTR default)

### Display
- Elements with `display: flex`, `display: grid`, `display: block`, etc.
- Responsive display: `flex` on desktop, `block` on mobile

### Colors
- Text colors use `--color-primary`, `--color-gold`, `--color-text`
- Background colors use `--color-white`, `--color-cream`, `--color-primary`

## Animation Classes

- `.fadeInUp` - Fade in and slide up animation
- `.fadeIn` - Simple fade in animation
- `.slideInLeft` - Slide in from left animation
- `.slideInRight` - Slide in from right animation

## Direction Classes (RTL/LTR)

- `[dir="rtl"]` - RTL direction selector
- `[dir="ltr"]` - LTR direction selector

### RTL-Specific Overrides
- `.lang-switcher[dir="rtl"]` - Right border instead of left
- `.product-badge[dir="rtl"]` - Left position instead of right
- `.mobile-menu-close[dir="rtl"]` - Left position instead of right
- `.contact-container[dir="rtl"]` - Direction: rtl

## CSS Variables (Custom Properties)

```css
--color-primary: #1a1a2e      /* Dark navy */
--color-gold: #c9a84c         /* Gold accent */
--color-white: #ffffff        /* White */
--color-cream: #f5f0eb        /* Cream background */
--color-dark-gray: #2d2d3d    /* Dark gray */
--color-light-gray: #eeeeee   /* Light gray */
--color-text: #333333         /* Text color */

--font-heading: 'Playfair Display', serif
--font-body: 'Tajawal', sans-serif

--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
--shadow-light: 0 2px 8px rgba(0, 0, 0, 0.1)
--shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.15)
--shadow-heavy: 0 8px 32px rgba(0, 0, 0, 0.2)
```

## Responsive Breakpoints

### Media Queries
- `@media (max-width: 768px)` - Tablet and below
  - Hamburger menu appears
  - Navigation hides
  - Sidebar hides
  - Product grid 2 columns

- `@media (max-width: 480px)` - Mobile
  - Smaller font sizes
  - Product grid 2 columns with smaller gaps
  - Reduced padding/margins
  - Single column layouts

## State Classes

### Hover States
- `.nav a:hover::after` - Navigation underline appears
- `.product-card:hover` - Card lifts with shadow
- `.blog-card:hover` - Card lifts with shadow
- `.social-links a:hover` - Social icon fills with gold

### Focus States
- `.form-group input:focus` - Gold border and shadow
- `.form-group textarea:focus` - Gold border and shadow
- `.form-group select:focus` - Gold border and shadow

### Active States
- `.lang-btn.active` - Gold text color
- `.mobile-menu.active` - Mobile menu visible

## Accessibility Classes

### Screen Reader Only
- Elements with position: absolute; left: -10000px; (for ARIA announcements)

### Semantic HTML
- `<header>`, `<footer>`, `<section>`, `<article>`, `<main>`, `<nav>`
- `<h1>` through `<h6>` headings in proper hierarchy
- `<label>` for form inputs
- `role="status"` for live regions

---

## Usage Examples

### Button Examples
```html
<!-- Primary button -->
<button class="btn btn-primary">Shop Now</button>

<!-- Secondary button -->
<a href="#" class="btn btn-secondary">Learn More</a>

<!-- Outline button -->
<a href="#" class="btn btn-outline">Explore</a>

<!-- Small button -->
<button class="btn btn-small btn-primary">Add to Cart</button>

<!-- Full width button -->
<button class="btn btn-primary btn-block">Submit</button>
```

### Product Card Example
```html
<div class="product-card">
  <div class="product-image">
    <img src="..." alt="...">
    <span class="product-badge">New</span>
  </div>
  <div class="product-info">
    <div class="product-category">Luxury Furniture</div>
    <h3 class="product-name">Product Name</h3>
    <div class="product-price">د.إ1,234</div>
    <div class="product-actions">
      <button class="btn btn-small btn-primary">Add to Cart</button>
      <a href="#" class="btn btn-small btn-secondary">Details</a>
    </div>
  </div>
</div>
```

### Form Example
```html
<form class="contact-form">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" required></textarea>
  </div>
  <button type="submit" class="btn btn-primary btn-block">Send</button>
</form>
```

---

Generated: March 19, 2026
Complete CSS Reference for SVC Global Project
