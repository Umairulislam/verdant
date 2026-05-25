# 🌿 Verdant — Indoor Plant Store

Verdant is a modern, full-featured e-commerce app for indoor plant lovers — built entirely on the frontend with React and TypeScript. It simulates a real shopping experience from browsing and filtering plants, to adding them to a cart, checking out with a payment form, and viewing order history — all with data persisted across sessions via Redux Persist.

The app features credential-based authentication, protected routes, an animated credit card component, real-time form validation, and a clean profile page where users can track their order history. No backend required — everything runs in the browser.

## 🎥 Demo

![Verdant Demo](./public/demo.gif)

## 💡 Features

- **Authentication** — Sign up and sign in with credential validation. Registered users are stored in localStorage and verified on login
- **Protected & Guest Routes** — Cart, Checkout, and Orders require authentication. Authenticated users cannot access Sign In or Sign Up
- **Plant Browsing** — Browse all plants with filters by category, light level, and difficulty
- **Product Detail** — Full plant profile with care guide, pot size, and live quantity controls
- **Cart** — Add, increment, decrement, and delete items with a live cart count and free delivery threshold
- **Checkout** — Shipping form + animated credit card with auto card-type detection, real-time validation, and masked card number on save
- **Order Confirmation** — Full order summary with shipping details, masked payment info, and order ID
- **Profile Page** — View order history, search orders by order number, and manage account
- **Data Persistence** — Cart, orders, and auth state persist across page refreshes via Redux Persist

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)  
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)  
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)  
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)  
![Redux Persist](https://img.shields.io/badge/Redux_Persist-764ABC?style=for-the-badge&logo=redux&logoColor=white)  
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)  
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)  
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)  
![Sonner](https://img.shields.io/badge/Sonner-000000?style=for-the-badge)  
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Umairulislam/verdant.git
cd verdant
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

**4. Open in browser**

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

## 📌 Note

> This project has no backend. Authentication credentials and orders are stored in `localStorage` via Redux Persist. In a production app, these would be handled by a REST API with a database, and orders would be scoped per authenticated user.
