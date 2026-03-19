const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load data
const products = require('./data/products.json');
const categories = require('./data/categories.json');

// Language middleware
app.use((req, res, next) => {
  const lang = req.query.lang || req.cookies?.lang || 'ar';
  res.locals.lang = lang;
  res.locals.dir = lang === 'ar' ? 'rtl' : 'ltr';
  res.locals.t = (obj) => obj[lang] || obj['en'] || '';
  res.locals.categories = categories;
  res.locals.formatPrice = (price) => {
    if (lang === 'ar') {
      return `د.إ${price.toLocaleString('ar-AE')}`;
    }
    return `AED ${price.toLocaleString('en-AE')}`;
  };
  next();
});

// Routes
app.get('/', (req, res) => {
  const featured = products.filter(p => p.featured);
  const bestSellers = products.filter(p => p.bestSeller);
  const newArrivals = products.filter(p => p.newArrival);
  res.render('index', {
    page: 'home',
    products, featured, bestSellers, newArrivals,
    title: res.locals.lang === 'ar' ? 'SVC Global Fz-LLC | أثاث ومجوهرات فاخرة' : 'SVC Global Fz-LLC | Luxury Furniture & Accessories'
  });
});

app.get('/shop', (req, res) => {
  const { category, subcategory, sort, search } = req.query;
  let filtered = [...products];

  if (category) filtered = filtered.filter(p => p.category === category);
  if (subcategory) filtered = filtered.filter(p => p.subcategory === subcategory);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.en.toLowerCase().includes(q) ||
      p.name.ar.includes(q) ||
      p.description.en.toLowerCase().includes(q) ||
      p.description.ar.includes(q)
    );
  }

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'name') filtered.sort((a, b) => a.name.en.localeCompare(b.name.en));

  res.render('shop', {
    page: 'shop',
    products: filtered,
    activeCategory: category || '',
    activeSubcategory: subcategory || '',
    searchQuery: search || '',
    title: res.locals.lang === 'ar' ? 'المتجر | SVC Global' : 'Shop | SVC Global'
  });
});

app.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).render('404', { page: '404', title: '404' });

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.render('product', {
    page: 'product',
    product,
    related,
    title: `${res.locals.t(product.name)} | SVC Global`
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    page: 'about',
    title: res.locals.lang === 'ar' ? 'من نحن | SVC Global' : 'About Us | SVC Global'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    page: 'contact',
    title: res.locals.lang === 'ar' ? 'اتصل بنا | SVC Global' : 'Contact Us | SVC Global'
  });
});

app.get('/blog', (req, res) => {
  res.render('blog', {
    page: 'blog',
    title: res.locals.lang === 'ar' ? 'المقالات | SVC Global' : 'Blog | SVC Global'
  });
});

app.get('/privacy', (req, res) => {
  res.render('privacy', {
    page: 'privacy',
    title: res.locals.lang === 'ar' ? 'سياسة الخصوصية | SVC Global' : 'Privacy Policy | SVC Global'
  });
});

app.get('/terms', (req, res) => {
  res.render('terms', {
    page: 'terms',
    title: res.locals.lang === 'ar' ? 'شروط الخدمة | SVC Global' : 'Terms of Service | SVC Global'
  });
});

// API for cart (JSON based, client-side cart)
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/product/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { page: '404', title: '404' });
});

app.listen(PORT, () => {
  console.log(`SVC Global running on port ${PORT}`);
});
