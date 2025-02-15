# Potion Leaderboard

Potion Leaderboard is a comprehensive Next.js application designed to showcase and manage a leaderboard of traders. Built with a modern tech stack, it offers a seamless user experience with real-time data fetching, interactive UI components, and responsive design.

## Design

The mobile design diverges from traditional table layouts, opting instead for card-based representations. This approach enhances the UI/UX on smaller screens by allowing users to view all relevant trader information at a glance, eliminating the need for horizontal scrolling. The overall design is sleek and modern, aligning seamlessly with the Potion theme.

Furthermore, the table design incorporates rounded corners to maintain consistency with other UI elements throughout the application. Copy address buttons have been strategically placed across various sections, including the profile sidebar, trader table, and individual user profile pages, enabling users to easily copy addresses as needed. On copy adress button I added user feedback toast and icon changes to checkmark, so user knows when he successfully copied the adress.

For mobile devices, the sidebar is positioned on the left side to ensure it is easily accessible with one hand, optimizing the user experience for mobile interactions to be the best possible.

## How It Works

- **Groups Tab:** Displays a message stating "Coming soon, please be patient!" to inform users of upcoming features.
- **Sortable Table Headers:** Click on any table header to sort the leaderboard in ascending or descending order.
- **Trader Profiles:** Selecting a trader navigates to their detailed profile page.
- **Search and Filtering:** Users can efficiently search and filter traders based on various criteria as outlined in the instructions.
- **Navigation Tabs:** The active tab in the navigation menu features a bottom shine effect, enhancing the user experience.
- **Pagination:** Seamlessly switch between pages using the intuitive pagination controls.

- **Data Fetching:** Retrieves data from a custom API endpoint built with Next.js, ensuring reliable and efficient data management.
- **State Handling:** Manages loading and error states effectively, providing clear feedback to users during data retrieval processes.
- **Dummy Data:** Please note that the current data is placeholder content; realistic numbers are not the focus at this stage.

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
