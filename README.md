# Marketly — Premium Product Listing Demo

Marketly is a high-performance, SEO-optimized e-commerce frontend built with **Next.js 15**, **HeroUI (v3)**, and **Tailwind CSS**. It serves as a comprehensive demonstration of modern web development best practices, featuring a responsive catalog, dynamic filtering, and robust error handling.

## 🚀 Key Features

- **Dynamic Product Catalog**: Real-time data sourcing from the [Fake Store API](https://fakestoreapi.com).
- **Advanced Filtering**: 
  - Category-based filtering with URL state synchronization.
  - Client-side price range filtering.
  - Real-time debounced search.
- **Performance Optimized**:
  - **Static Site Generation (SSG)**: Product detail pages are pre-rendered at build time for near-instant loads.
  - **Code Splitting**: Heavy UI components (Cart Drawer, Modals) are loaded on-demand via `next/dynamic`.
  - **Skeleton Screens**: Custom loading states for improved perceived performance.
- **Comprehensive SEO**:
  - Dynamic metadata generation for every product and category.
  - **JSON-LD Structured Data**: Schema.org integration for rich search snippets.
  - Dynamic `sitemap.xml` and `robots.txt` generation.
- **Robust Architecture**:
  - **Feature-based Organization**: Logic and UI are colocated within feature folders.
  - **Logic Isolation**: Business logic is decoupled from UI components using custom React hooks.
  - **Error Resilience**: Multi-layered error boundaries and automated API retry mechanisms.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [HeroUI v3](https://heroui.com/) (formerly NextUI)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, Error Boundaries)
├── components/           # Shared UI components
│   ├── layouts/          # Layout wrappers
│   ├── seo/              # SEO-specific components (JSON-LD)
│   └── ui/               # Reusable UI elements (CartDrawer, AddToCartModal, etc.)
├── features/             # Feature-based modules
│   └── products/         # Product listing and detail features
│       ├── ProductListing/ # Main catalog logic and view
│       ├── components/    # Feature-specific UI
│       ├── hooks/         # Shared data-fetching hooks
│       └── services/      # API communication layer
├── lib/                  # Utilities, store configurations, and API clients
└── styles/               # Global CSS and Tailwind configurations
```

## 🏁 Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production

Build the application for production:
```bash
npm run build
```

## 🛡️ Error Handling

The application implements a resilient error handling strategy:
- **Network Level**: `apiGet` helper includes automatic 2x retry logic for transient errors (e.g., `ECONNRESET`).
- **Route Level**: Dedicated `error.tsx` boundaries for Shop and Product Detail routes.
- **SSG Safety**: `generateStaticParams` includes fallback logic to ensure builds succeed even if the external API is temporarily unstable.

## 📄 License

This project is open-source and intended for demonstration and educational purposes.
