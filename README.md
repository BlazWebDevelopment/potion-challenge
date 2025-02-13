# Potion Leaderboard

Potion Leaderboard is a comprehensive Next.js application designed to showcase and manage a leaderboard of traders. Built with a modern tech stack, it offers a seamless user experience with real-time data fetching, interactive UI components, and responsive design.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Components](#components)
- [Styling](#styling)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Interactive Leaderboard:** View and interact with a dynamic leaderboard of traders.
- **Real-Time Data Fetching:** Utilizes React Query for efficient data fetching and caching.
- **Responsive Design:** Ensures a seamless experience across all devices.
- **Theme Customization:** Supports dark and light modes with customizable Tailwind CSS configurations.
- **Modular Components:** Built with reusable and maintainable React components.
- **Error Handling:** Gracefully handles errors with user-friendly messages.

## Technologies Used

- **Next.js:** React framework for server-side rendering and generating static websites.
- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Typed superset of JavaScript for better code quality and developer experience.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Radix UI:** Primitives for building accessible UI components.
- **Framer Motion:** Animation library for React.
- **React Query (@tanstack/react-query):** Data-fetching library for React.
- **Lucide React:** Icon library for React.
- **ESLint:** Linting tool for maintaining code quality.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v16 or later)
- **pnpm** (Package manager)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/BlazWebDevelopment/potion-leaderboard.git
   cd potion-leaderboard
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

### Running the Development Server

Start the development server with the following command:

```bash
pnpm run dev
```

## API Routes

### Fetch All Traders

- **Endpoint:** `/api/traders`
- **Method:** `GET`
- **Description:** Retrieves a list of all traders.

#### Example Response

json
[
{
"rank": 1,
"name": "Orangie",
"address": "HmBmSYwYEgEZuBUYuDs9xofyqBAkw4ywugB1d7R7sTGh",
"avatar": "/avatar.webp",
"followers": 279000,
"handle": "@orangie",
"tokens": 104,
"winRate": 74,
"trades": { "won": 201, "loses": 100 },
"avgBuy": 10.21312343,
"avgEntry": 212000,
"avgHold": 32,
"realizedPnl": 101.21312343,
"share": 23276,
"totalInvestment": 25
},
// ... other traders
]

### Fetch Single Trader

- **Endpoint:** `/api/trader/[adress]`
- **Method:** `GET`
- **Description:** Retrieves details of a specific trader based on their address.

## Components

### Header

The `Header` component includes the main navigation and user avatar. It adapts to different screen sizes with a mobile-friendly `MobileHeader`.

### TradingDashboard

Displays the leaderboard of traders with functionalities like sorting, filtering, and pagination.

### Modal

Reusable modal component using Radix UI and Framer Motion for animations.

### Toaster

Provides toast notifications for user feedback.

### Other Components

- **ErrorMessage:** Displays user-friendly error messages.
- **TradingTable:** Renders the table of traders with pagination and sorting.
- **FilterPopup:** Allows users to apply various filters to the trader list.
- **MobileSidebar:** Sidebar component for mobile navigation.
- **Nav:** Main navigation menu.
- **ProfileStats:** Displays detailed statistics of a single trader.
- **UI Components:** Includes reusable UI elements like buttons, inputs, sliders, labels, etc.

## Styling

The application uses Tailwind CSS for styling, ensuring a responsive and modern design. Custom configurations are defined in `tailwind.config.ts`, and global styles are managed in `globals.css`.

## Deployment

The application is optimized for deployment on the [Vercel Platform](https://vercel.com). Follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**
2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add YourFeature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, please contact [your-email@example.com](mailto:your-email@example.com).

---
