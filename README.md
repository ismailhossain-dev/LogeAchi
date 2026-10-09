# 🛍️ LogeAchi - Modern E-Commerce & Full-Stack Platform

<div align="center">
  <p><strong>A high-end, full-stack e-commerce and role-based dashboard platform built with Next.js, Tailwind CSS, and MongoDB.</strong></p>
  <p>
    <a href="https://logeachi-five.vercel.app" target="_blank"><strong>🚀 Explore Live Demo</strong></a>
  </p>
</div>

---

## 📖 About The Project

**LogeAchi** is a feature-rich, full-stack modern web application tailored for digital e-commerce and dynamic store management. Built using the latest **Next.js (App Router)** framework, it delivers a lightning-fast user experience with an immersive interface, glassmorphism design aesthetics, secure role-based authentication, and a robust dual-dashboard control center (User & Admin).

---

## 🌐 Live URL
- **Live Demo:** [https://logeachi-five.vercel.app](https://logeachi-five.vercel.app)

---

## 🎯 Project Purpose

The primary objective of LogeAchi is to provide a seamless bridge between online shopping and powerful backend administrative control. It offers users a smooth shopping experience—from browsing products and managing carts to order tracking—while granting administrators deep analytical oversight, order fulfillment, and user management capabilities in real-time.

---

## ✨ Key Features & Navigation Structure

### 👤 User Dashboard Features
- **Overview:** Personal account analytics and quick stats summary.
- **My Profile:** Account details and preference management.
- **My Orders:** Track ongoing and past purchase fulfillment statuses.
- **My Wishlist:** Save and organize favorite products.
- **My Cart:** Real-time shopping cart management and updates.

### 🛡️ Admin Dashboard Features
- **Overview:** Comprehensive real-time store metrics and insights powered by `Recharts`.
- **Manage Orders:** Oversee, update, and process customer purchases.
- **Manage Users:** Control registered user accounts, roles, and statuses.
- **Manage Wishlist:** Audit user-saved products globally.
- **Manage Cart:** Monitor active shopping cart databases across users.
- **Profile:** Specialized administrative control hub.

### ⚡ Additional Highlights
- **Role-Based Authentication:** Secure credential and session handling via `NextAuth`.
- **Responsive UI:** Fully optimized layout for mobile, tablet, and desktop views using `Tailwind CSS`.
- **Smooth Animations:** Fluid motion effects powered by `Framer Motion` and `GSAP`.

---

## 📦 NPM Packages Used

### 🎨 Frontend Dependencies
- **`next`** - React Framework (App Router)
- **`react` & `react-dom`** - Core UI libraries
- **`tailwindcss` & `@tailwindcss/postcss`** - Utility-first styling engine
- **`lucide-react` & `react-icons`** - Modern UI iconography
- **`framer-motion` & `gsap`** - Smooth fluid animations and motion effects
- **`swiper`** - Responsive carousels and sliders
- **`recharts`** - Interactive data visualization charts
- **`react-toastify`** - Notification alerts

### ⚙️ Backend & Utility Dependencies
- **`mongodb`** - NoSQL Database driver
- **`axios`** - HTTP requests & API communication
- **`next-auth`** - Secure authentication and session management
- **`bcrypt`** - Password hashing and security
- **`react-hook-form`** - Performant form handling
- **`@tanstack/react-query`** - Powerful asynchronous state management
- **`tailwind-merge` & `clsx`** - Utility style merging

---

## 🚀 Getting Started & Installation

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/loge-achi.git](https://github.com/your-username/loge-achi.git)
cd loge-achi

```

### 2. Install dependencies

```bash
npm install

```

### 3. Setup Environment Variables

Create a `.env` file in the root directory of your project and configure it with your credentials:

```env
DBNAME="YOUR DATABASE NAME HERE"
MONGODB_URI="YOUR DATABASE URL HERE"
GOOGLE_CLIENT_SECRET="YOUR GOOGLE CLIENT HERE"
GOOGLE_CLIENT_ID="YOUR GOOGLE CLIENT HERE"
NEXT_PUBLIC_IMGBB_API_KEY="YOUR IMAGEBB URL HERE"
NEXT_PUBLIC_APP_UR="http://localhost:3000"
NEXTAUTH_SECRET="YOUR NEXTAUTH SECRET HERE"
GOOGLE_CLIENT_SECRET="YOUR GOOGLE CLIENT SECRET HERE"
GOOGLE_CLIENT_ID="YOUR GOOGLE CLIENT ID HERE"


```

### 4. Run the Development Server

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 👨‍💻 Author & Developer

* **Ismail Hossain**

```

```
