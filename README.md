# Pyrecrest - Premium Shortlet Apartments

A modern real estate website for booking serviced shortlet apartments in Nigeria.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Azure Functions (Node.js/TypeScript)
- **Database**: Azure Table Storage
- **Hosting**: Azure Static Web Apps

## Getting Started

### Prerequisites

- Node.js 18+
- Azure Functions Core Tools
- Azure account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Run development server:
```bash
npm run dev
```

4. Run Azure Functions (in separate terminal):
```bash
cd api
func start
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
pyrecrest/
├── api/                 # Azure Functions backend
├── src/                 # React frontend
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   └── hooks/          # Custom React hooks
├── public/             # Static assets
└── dist/               # Build output
```

## Deployment

Deployed via Azure Static Web Apps with automatic GitHub Actions CI/CD.

## License

© 2026 Pyrecrest. All rights reserved.
