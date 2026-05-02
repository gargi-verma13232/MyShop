# 🛒 ShopMe — E-Commerce Web Application

A modern, fully functional e-commerce platform built with React, inspired by Amazon. ShopMe allows users to browse products, manage their cart and wishlist, and complete purchases with multiple payment options.

---

## 🚀 Live Demo
[Click here to view live](#) <!-- Add your Vercel link after deployment -->

---

## 📸 Screenshots
<!-- Add screenshots after deployment -->

---

## 🎯 Features

- 🏠 **Home Page** — Product grid with banner, search and category filter
- 📄 **Product Detail** — Full product info, ratings, add to cart and wishlist
- 🛒 **Cart** — Quantity controls, subtotal calculation, order summary
- ❤️ **Wishlist** — Save favourite products, move to cart
- 📦 **Checkout** — Delivery form with Card, QR Code and Cash on Delivery payment
- 👤 **Profile** — Edit profile, view cart and wishlist stats
- 🌙 **Dark / Light Mode** — Full theme toggle with localStorage persistence
- 🔍 **Search** — Search products by name in real time
- 📂 **Category Filter** — Filter by Electronics, Jewellery, Men's and Women's Clothing

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend Framework |
| Redux Toolkit | Cart & Wishlist State Management |
| React Router DOM | Client Side Routing |
| Tailwind CSS | UI Styling & Responsive Design |
| Context API | Dark/Light Theme Management |
| Fake Store API | Real Product Data |
| LocalStorage | Theme Persistence |

---

## 📁 Folder Structure
ShopMe/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── Loader.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Checkout.jsx
│   │   └── Profile.jsx
│   ├── redux/
│   │   ├── store.js
│   │   ├── CartSlice.js
│   │   └── WishlistSlice.js
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── README.md

