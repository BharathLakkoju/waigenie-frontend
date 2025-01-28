# Waigenie Frontend

A modern web application for automated testing and element identification, built with React, TypeScript, and Next.js.

## Features

- **BDD Test Generation**: Generate Gherkin features and manual test cases from user stories
- **Element Identification**: Identify and analyze web elements from any URL
- **Interactive Browser View**: Real-time element selection and analysis
- **Framework Support**: Multiple testing framework compatibility
- **Authentication**: Secure user authentication system

## Tech Stack

- Next.js
- TypeScript
- React
- Zustand (State Management)
- Tailwind CSS
- Shadcn UI Components

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/BharathLakkoju/waigenie-frontend.git
cd waigenie-frontend
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. start the development dependencies (prisma-client):

```bash
npm run dev
```

4. start the development server:

```bash
npm start
```

## Project Structure

```
frontend/
├── app/               # Next.js app directory
├── components/        # React components
├── store/            # Zustand store definitions
├── auth/             # Authentication logic
└── public/           # Static assets
```

## Key Components

- **BrowserView**: Interactive element selector
- **ServicesPage**: Main services interface  
- **Sidebar**: Navigation component
- **UI Components**: Reusable UI elements

## State Management

The application uses Zustand for state management with the following stores:

- **GenerateBDDStore**: Manages BDD test generation state
- **IdentifyElStore**: Handles element identification state  
- **AuthStore**: Manages authentication state

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License

## Contact

**Bharath Lakkoju** - [GitHub Profile](https://github.com/BharathLakkoju)

**Project Link**: [https://github.com/BharathLakkoju/waigenie-frontend](https://github.com/BharathLakkoju/waigenie-frontend)

