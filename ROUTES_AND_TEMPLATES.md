# SVC Global - Routes and Templates Mapping

## Route Overview

### Public Routes (from server.js)

| Route | Template | Template File | Description |
|-------|----------|---------------|-------------|
| `GET /` | index | `views/index.ejs` | Home page with hero, categories, featured products |
| `GET /shop` | shop | `views/shop.ejs` | Shop page with filtering and product grid |
| `GET /product/:id` | product | `views/product.ejs` | Single product detail page |
| `GET /about` | about | `views/about.ejs` | About SVC Global company page |
| `GET /contact` | contact | `views/contact.ejs` | Contact form and contact information |
| `GET /blog` | blog | `views/blog.ejs` | Blog articles page |
| `GET /privacy` | privacy | `views/privacy.ejs` | Privacy policy document |
| `GET /terms` | terms | `views/terms.ejs` | Terms of service document |
| `* (404)` | 404 | `views/404.ejs` | 404 error page for not found routes |

### API Routes (JSON responses)

| Route | Response | Description |
|-------|----------|-------------|
| `GET /api/products` | JSON array | All products from products.json |
| `GET /api/product/:id` | JSON object | Single product details |

---

## Template File Structure

### Main Page Templates

#### 1. **index.ejs** (Home Page)
- Hero section with CTA
- Product categories carousel
- Featured/Special offers section
- Best sellers section
- New arrivals section
- Footer

**Key Variables:**
- `lang`, `dir`, `t()`, `formatPrice()`
- `featured`, `bestSellers`, `newArrivals` (filtered product arrays)
- `categories` (for category cards)
- `products` (all products)

---

#### 2. **shop.ejs** (Shop Page)
- Page header
- Search bar
- Sort dropdown
- Category sidebar filters
- Product grid (3 columns on desktop)
- Empty state message

**Key Variables:**
- `lang`, `dir`, `t()`, `formatPrice()`
- `products` (filtered list)
- `categories` (for filters)
- `activeCategory`, `activeSubcategory`, `searchQuery`

**Query Parameters:**
- `?category=luxury-furniture`
- `?subcategory=washbasins`
- `?search=basin`
- `?sort=price-asc|price-desc|name`
- `?lang=ar|en`

---

#### 3. **product.ejs** (Product Detail)
- Large product image with zoom
- Product info (name, price, category, stock)
- Product description
- Add to cart button
- WhatsApp inquiry button
- Related products section

**Key Variables:**
- `lang`, `dir`, `t()`, `formatPrice()`
- `product` (single product object)
- `related` (related products array)
- `categories` (for category lookup)

---

#### 4. **about.ejs** (About Page)
- Page header
- Company story section
- Values section
- Products offered section
- Commitment section
- Why choose us section
- CTA to shop

**Content:**
- High-quality bilingual content about SVC Global
- Company history and mission
- Product categories with descriptions

---

#### 5. **contact.ejs** (Contact Page)
- Page header
- Contact form (name, email, phone, subject, message)
- Contact information sidebar
- Phone, email, WhatsApp details
- FAQ section with 5 common questions

**Features:**
- Form validation
- Success message on submit
- Multiple contact methods

---

#### 6. **blog.ejs** (Blog Page)
- Page header
- Blog article cards (6 articles)
- Blog date, title, excerpt
- Read more links
- Responsive grid layout

**Features:**
- Sample luxury lifestyle articles
- Proper date formatting
- Article metadata

---

#### 7. **privacy.ejs** (Privacy Policy)
- Page header
- Privacy policy document
- 8 sections:
  1. Introduction
  2. Information We Collect
  3. How We Use Your Information
  4. Information Security
  5. Cookies
  6. Your Rights
  7. Contact Us
  8. Changes to This Policy

---

#### 8. **terms.ejs** (Terms of Service)
- Page header
- Terms document
- 11 sections:
  1. Acceptance of Terms
  2. Purchase Policy
  3. Payment Policy
  4. Shipping Policy
  5. Return Policy
  6. Warranty
  7. User Responsibilities
  8. Limitation of Liability
  9. Changes to Terms
  10. Governing Law
  11. Contact Us

---

#### 9. **404.ejs** (Error Page)
- 404 error code
- Error message
- Links back to home and shop

---

### Partial Templates

#### **partials/header.ejs**
- Logo/brand name
- Navigation menu (Home, Shop, About, Contact)
- Language switcher (AR/EN)
- Cart icon with badge
- Mobile hamburger menu
- Mobile navigation
- Social media links in mobile menu

**Features:**
- Sticky positioning
- Scroll shadow effect (added by JavaScript)
- Responsive hamburger menu
- Language switching functionality

---

#### **partials/footer.ejs**
- 4-column layout:
  1. About column (company info, links)
  2. Customer Service column (policies, help)
  3. Contact column (phone, email, WhatsApp, location)
  4. Newsletter column (subscription form, social links)
- Footer bottom (copyright, legal links)

**Features:**
- Responsive grid layout
- Newsletter subscription form
- Social media icons
- Quick links to legal pages

---

## Template Variables Reference

### Available in All Templates

```javascript
lang          // 'ar' or 'en'
dir           // 'rtl' or 'ltr'
t(object)     // Function to get translated text: t({ar: '...', en: '...'})
formatPrice(num) // Function to format price with currency
categories    // Array of category objects from categories.json
page          // Current page identifier (home, shop, product, etc.)
title         // Page title for <title> tag
```

### Home Page (index.ejs)

```javascript
products       // All products array
featured       // Filtered array of featured products
bestSellers    // Filtered array of best seller products
newArrivals    // Filtered array of new arrival products
```

### Shop Page (shop.ejs)

```javascript
products         // Filtered products based on category/search/sort
activeCategory   // Currently selected category ID
activeSubcategory // Currently selected subcategory ID
searchQuery      // Current search query string
```

### Product Page (product.ejs)

```javascript
product  // Single product object with all details
related  // Array of related products (same category)
```

---

## Language & Internationalization

### Bilingual Text Pattern

```ejs
<%= lang === 'ar' ? 'Arabic text' : 'English text' %>
```

### Dynamic Text from Data

```ejs
<%= t(product.name) %>        <!-- Gets product.name[lang] -->
<%= t(category.description) %> <!-- Gets category.description[lang] -->
```

### Price Formatting

```ejs
<%= formatPrice(product.price) %>
<!-- Outputs: د.إ1,234 (Arabic) or AED 1,234 (English) -->
```

---

## Language Switching

Users can switch language by:
1. Clicking language button in header (AR/EN)
2. Adding `?lang=ar` or `?lang=en` to any URL

All links in templates should include language parameter:
```ejs
href="/<%= lang === 'ar' ? '?lang=ar' : '?lang=en' %>"
href="/shop<%= lang === 'ar' ? '?lang=ar' : '?lang=en' %>"
```

---

## Responsive Breakpoints

### CSS Media Queries

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

### Template Responsive Behavior

All templates are mobile-first and use CSS grid/flexbox for responsive layout:
- Product grids adapt from 3 columns (desktop) to 2 (tablet) to 1 (mobile)
- Sidebar filters hide on mobile (tablet view shows sidebar, mobile stacks)
- Header navigation hides on mobile (hamburger menu shown)
- Font sizes reduce on smaller screens

---

## Data Files Used

### products.json
- Contains all product information
- Fields: id, name (ar/en), category, subcategory, price, currency, image, description (ar/en), inStock, featured, bestSeller, newArrival

### categories.json
- Contains category information
- Fields: id, name (ar/en), description (ar/en), image, subcategories array

---

## Key Features per Page

| Page | Features |
|------|----------|
| Home | Hero, categories, featured products, best sellers, new arrivals |
| Shop | Search, filter by category, sort by price/name, responsive grid |
| Product | Large image, details, add to cart, WhatsApp inquiry, related products |
| About | Company story, values, product descriptions, benefits |
| Contact | Form, contact info, FAQ, WhatsApp integration |
| Blog | Article cards, dates, excerpts, read more links |
| Privacy | Complete policy document with 8 sections |
| Terms | Complete terms with 11 sections |
| 404 | Error message, navigation back |

---

Generated: March 19, 2026
Status: Production Ready
