# Distributed Survey System - Frontend

This is the React frontend application for the Distributed Survey System, built with React, Vite, and PrimeReact.

## Technologies Used

- **React 19** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **PrimeReact** - Rich UI component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **PrimeFlex** - CSS utility library
- **PrimeIcons** - Icon library

## Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://localhost:8080`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Development

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components (Login, Register)
│   │   ├── layout/        # Layout components (Navbar, Footer)
│   │   ├── survey/        # Survey-related components
│   │   └── PrivateRoute.jsx
│   ├── contexts/          # React contexts (AuthContext)
│   ├── pages/             # Page components (Home, etc.)
│   ├── services/          # API service modules
│   │   ├── api.js         # Axios instance configuration
│   │   ├── authService.js # Authentication API calls
│   │   └── surveyService.js # Survey API calls
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main application component
│   ├── App.css            # Global styles
│   ├── main.jsx           # Application entry point
│   └── index.css          # Base styles
├── public/                # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

## Features

- **Authentication**: User login and registration with JWT
- **Survey Management**: Create, read, update, and delete surveys
- **Responsive Design**: Mobile-friendly interface using PrimeReact components
- **Protected Routes**: Authentication-based route protection
- **Modern UI**: Clean and professional interface with PrimeReact theme

## API Configuration

The API base URL is configured in `src/services/api.js`. By default, it points to:
```
http://localhost:8080/api
```

To change the API URL, modify the `API_BASE_URL` constant in `src/services/api.js`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication

The application uses JWT tokens for authentication. Tokens are stored in localStorage and automatically included in API requests via Axios interceptors.

## PrimeReact Components Used

- **DataTable** - For displaying survey lists
- **Card** - For content containers
- **Button** - For actions
- **InputText** - For text inputs
- **Password** - For password inputs
- **Menubar** - For navigation
- **Message** - For error/success messages
- **Toast** - For notifications
- **ConfirmDialog** - For confirmation dialogs

## License

This project is part of the Distributed Survey System.
