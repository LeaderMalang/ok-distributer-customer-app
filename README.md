# Ok Distributor - Customer App

A modern, responsive Progressive Web App (PWA) for customers of Ok Distributor to browse products, place bids, and manage their orders. This application is built with modern web technologies, focusing on a fast, reliable, and engaging user experience without requiring a complex build setup.

## ✨ Features

*   **Secure User Authentication**: Complete auth flow including user registration, login, and a secure password reset page.
*   **Progressive Web App (PWA)**: Fully installable on desktop and mobile devices for a native app-like experience. It works offline thanks to a robust service worker caching strategy.
*   **Dynamic Product Catalog**:
    *   **Live Search**: Instantly filter products as you type.
    *   **Infinite Scroll**: Products load smoothly as you scroll down the page, ensuring a seamless browsing experience without initial long load times.
*   **Advanced Bidding System**: Customers can bid their own prices for products, which are then carried through to the shopping cart and final order summary.
*   **Full-Featured Shopping Cart**: Add products, adjust quantities, review items, and see a real-time total based on bid prices before checkout.
*   **Comprehensive Account Management**:
    *   **Order History**: A dedicated page where users can view a detailed list of all their past orders, including items, prices, and delivery information.
    *   **User Profile**: Customers can view and update their registered business and contact information.
*   **Fully Responsive Design**: A clean, mobile-first UI that looks and works great on any screen size, from small phones to large desktops.

## 🛠️ Technical Information

This project is built as a single-page application, leveraging modern browser features to avoid a complex build toolchain.

*   **Framework**: **React v18** (using Hooks and functional components).
*   **Module Loading**: Uses native **ESM modules** loaded directly in the browser via an `importmap`. This means there's no need for a bundler like Webpack or Vite during development.
*   **Styling**: Plain **CSS** with Custom Properties (Variables) for theming and maintainability. The design is fully responsive using media queries.
*   **State Management**: Local component state is managed with `useState` and `useEffect` hooks. App-level state (like the user session, cart, and order history) is persisted across sessions using browser `localStorage` and `sessionStorage`.
*   **PWA Core**:
    *   **Service Worker (`sw.js`)**: Implements a "Network falling back to Cache" strategy. This ensures the app loads quickly on subsequent visits and is available offline.
    *   **Web App Manifest (`manifest.json`)**: Provides the necessary metadata for the PWA, including the app name, icons, and theme colors, making it installable.

## 🚀 Running Locally

Since this project doesn't require a build step, you can run it with any simple local web server.

### Prerequisites

You will need a local web server to serve the files to your browser. If you have Node.js and npm installed, the easiest way is to use the `serve` package.

### Instructions

1.  **Clone the repository or download all the files** into a local directory on your computer.

2.  **Install `serve` (if you don't have it already):**
    Open your terminal or command prompt and run the following command.
    ```bash
    npm install -g serve
    ```

3.  **Serve the project:**
    Navigate to the project's root directory (the directory containing `index.html`) in your terminal and run:
    ```bash
    serve .
    ```

4.  **Open the application:**
    The server will start and give you a local URL (usually `http://localhost:5173`). Open this URL in your web browser to use the application.
