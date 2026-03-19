const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const fs = require('fs');
const bcryptjs = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'svc-global-secret-key-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

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

// User middleware - pass user info to templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
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

// CART ROUTES
app.get('/cart', (req, res) => {
  res.render('cart', {
    page: 'cart',
    products,
    title: res.locals.lang === 'ar' ? 'سلة التسوق | SVC Global' : 'Shopping Cart | SVC Global'
  });
});

// AUTH ROUTES
app.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/my-account' + (res.locals.lang === 'ar' ? '?lang=ar' : '?lang=en'));
  }
  res.render('login', {
    page: 'login',
    title: res.locals.lang === 'ar' ? 'تسجيل الدخول | SVC Global' : 'Login | SVC Global'
  });
});

app.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect('/my-account' + (res.locals.lang === 'ar' ? '?lang=ar' : '?lang=en'));
  }
  res.render('register', {
    page: 'register',
    title: res.locals.lang === 'ar' ? 'إنشاء حساب | SVC Global' : 'Register | SVC Global'
  });
});

app.get('/my-account', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login' + (res.locals.lang === 'ar' ? '?lang=ar' : '?lang=en'));
  }
  res.render('my-account', {
    page: 'my-account',
    title: res.locals.lang === 'ar' ? 'حسابي | SVC Global' : 'My Account | SVC Global'
  });
});

// AUTH API ROUTES
app.post('/api/auth/register', (req, res) => {
  const { fullName, email, phone, password, confirmPassword } = req.body;
  const lang = req.query.lang || 'ar';

  // Validation
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: lang === 'ar' ? 'جميع الحقول مطلوبة' : 'All fields are required'
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: lang === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match'
    });
  }

  // Load users
  const usersPath = path.join(__dirname, 'data', 'users.json');
  let users = [];
  if (fs.existsSync(usersPath)) {
    users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }

  // Check if user exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({
      success: false,
      message: lang === 'ar' ? 'البريد الإلكتروني مسجل مسبقاً' : 'Email already registered'
    });
  }

  // Hash password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Add new user
  const newUser = {
    id: Date.now().toString(),
    fullName,
    email,
    phone: phone || '',
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  // Set session
  req.session.user = {
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email,
    phone: newUser.phone
  };

  res.json({
    success: true,
    message: lang === 'ar' ? 'تم التسجيل بنجاح' : 'Registration successful',
    redirect: lang === 'ar' ? '/my-account?lang=ar' : '/my-account?lang=en'
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const lang = req.query.lang || 'ar';

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: lang === 'ar' ? 'البريد والكلمة المرور مطلوبان' : 'Email and password are required'
    });
  }

  // Load users
  const usersPath = path.join(__dirname, 'data', 'users.json');
  let users = [];
  if (fs.existsSync(usersPath)) {
    users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }

  // Find user
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: lang === 'ar' ? 'البريد أو كلمة المرور غير صحيحة' : 'Invalid email or password'
    });
  }

  // Check password
  if (!bcryptjs.compareSync(password, user.password)) {
    return res.status(401).json({
      success: false,
      message: lang === 'ar' ? 'البريد أو كلمة المرور غير صحيحة' : 'Invalid email or password'
    });
  }

  // Set session
  req.session.user = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone
  };

  res.json({
    success: true,
    message: lang === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Login successful',
    redirect: lang === 'ar' ? '/my-account?lang=ar' : '/my-account?lang=en'
  });
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.json({
      success: true,
      message: 'Logout successful',
      redirect: '/?lang=' + (req.query.lang || 'ar')
    });
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
