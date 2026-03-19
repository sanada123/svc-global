# SVC Global Fz-LLC - Luxury E-Commerce Website

A production-ready, bilingual (Arabic/English) luxury e-commerce platform featuring premium bathroom furniture, writing instruments, prayer beads, and watches.

## Quick Start

### Installation
```bash
npm install
```

### Running the Server
```bash
node server.js
```

### Accessing the Website
- **Home (Arabic)**: http://localhost:3000
- **Home (English)**: http://localhost:3000?lang=en
- **Shop**: http://localhost:3000/shop
- **Product**: http://localhost:3000/product/[product-id]
- **About**: http://localhost:3000/about
- **Contact**: http://localhost:3000/contact
- **Blog**: http://localhost:3000/blog
- **Privacy**: http://localhost:3000/privacy
- **Terms**: http://localhost:3000/terms

## Project Structure

```
svc-global/
├── public/
│   ├── css/
│   │   └── style.css          # Main stylesheet (1280 lines)
│   ├── js/
│   │   └── main.js            # Client-side JavaScript (405 lines)
│   └── images/                # Product images
├── views/
│   ├── partials/
│   │   ├── header.ejs         # Sticky header with nav
│   │   └── footer.ejs         # 4-column footer
│   ├── index.ejs              # Home page
│   ├── shop.ejs               # Shop/catalog page
│   ├── product.ejs            # Product detail page
│   ├── about.ejs              # About us page
│   ├── contact.ejs            # Contact page
│   ├── blog.ejs               # Blog page
│   ├── privacy.ejs            # Privacy policy
│   ├── terms.ejs              # Terms of service
│   └── 404.ejs                # 404 error page
├── data/
│   ├── products.json          # Product catalog
│   └── categories.json        # Product categories
├── server.js                  # Express server
├── package.json               # Dependencies
└── [Documentation files]
```

## Features

### Bilingual Support
- Full Arabic and English support
- RTL/LTR language handling
- Language switcher in header
- Automatic currency formatting

### Design
- Luxury color scheme (black, gold, white, cream)
- Premium typography (Playfair Display + Tajawal)
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional, elegant layout

### Functionality
- Product catalog with filtering
- Shopping cart (localStorage-based)
- Product search and sorting
- Product details with image zoom
- Contact form with validation
- Newsletter subscription
- WhatsApp integration
- Mobile-friendly navigation

### Technical
- Express.js backend
- EJS templating
- CSS3 with variables
- ES6 JavaScript
- Semantic HTML
- WCAG 2.1 AA accessibility

## Documentation

### Reference Files
1. **BUILD_SUMMARY.txt** - Overview of what was created
2. **ROUTES_AND_TEMPLATES.md** - Complete route mapping and template documentation
3. **CSS_CLASSES_REFERENCE.md** - CSS class reference guide
4. **PROJECT_COMPLETION_REPORT.md** - Comprehensive project report
5. **README.md** - This file

### Key Documentation
- See `ROUTES_AND_TEMPLATES.md` for complete route and template details
- See `CSS_CLASSES_REFERENCE.md` for all available CSS classes
- See `PROJECT_COMPLETION_REPORT.md` for detailed project information

## Color Scheme

| Color | Code | Usage |
|-------|------|-------|
| Primary Navy | #1a1a2e | Text, headings |
| Gold Accent | #c9a84c | Buttons, highlights |
| White | #ffffff | Main background |
| Cream | #f5f0eb | Section backgrounds |

## Typography

- **Headings**: Playfair Display (serif, elegant)
- **Body**: Tajawal (sans-serif, modern)
- Both fonts from Google Fonts for optimal Arabic support

## Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 480px to 767px
- **Small Mobile**: Below 480px

## Product Data

Products are stored in `data/products.json` with fields:
- `id` - Unique identifier
- `name` - Bilingual name (ar, en)
- `category` - Product category
- `subcategory` - Product subcategory
- `price` - Price in AED
- `image` - Product image URL
- `description` - Bilingual description (ar, en)
- `inStock` - Stock status
- `featured` - Featured product flag
- `bestSeller` - Best seller flag
- `newArrival` - New arrival flag

## Categories

Products are organized in the following categories:
1. **Luxury Furniture** - Bathroom furniture, bathtubs, washbasins
2. **Writing Instruments** - Premium pens
3. **Prayer Beads** - Luxury tasbih/misbaha
4. **Watches** - Luxury timepieces

## API Routes

### Products
- `GET /api/products` - Get all products (JSON)
- `GET /api/product/:id` - Get single product (JSON)

## Language Switching

Switch language by:
1. Clicking the language button (AR/EN) in the header
2. Adding `?lang=ar` or `?lang=en` to any URL

Language preference is preserved through URL parameters.

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Optimized CSS (20 KB)
- Minimal JavaScript (10 KB)
- Lazy loading ready
- Image optimization ready
- Mobile-first approach

## Accessibility

- Semantic HTML structure
- WCAG 2.1 Level AA compliant
- Keyboard navigation
- Color contrast compliance
- Screen reader support
- Focus states
- Form labels

## Contact Information

- **Phone**: +971-55-712-9912
- **Email**: info@svcglobal.ae
- **Location**: Dubai, United Arab Emirates
- **WhatsApp**: [WhatsApp Link in website]

## Future Enhancements

Potential additions:
- Backend cart/checkout
- User accounts
- Product reviews
- Advanced search
- Blog management
- Email notifications
- Analytics

## Support

For questions or issues:
1. Check the documentation files included in the project
2. Review the contact form on the website
3. Contact via phone or email provided in footer

## License

All files in this project are proprietary to SVC Global Fz-LLC.

---

**Created**: March 19, 2026
**Status**: Production Ready
**Version**: 1.0

Ready to deploy! 🚀
