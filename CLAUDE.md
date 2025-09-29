# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Duke Food Points Calculator - A Next.js web application that helps Duke University students track their dining plan food points balance and calculate daily spending targets to optimize their meal plan usage throughout the semester.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture Overview

### Tech Stack
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** for accessible UI components
- **Lucide React** for icons

### Project Structure

The application follows Next.js App Router conventions:

- `/app` - Main application code
  - `page.tsx` - Main calculator component with all business logic
  - `layout.tsx` - Root layout with Google Analytics integration
  - `globals.css` - Global styles and Tailwind imports

- `/components/ui` - Reusable UI components
  - Shadcn/ui components (card, input, label, select, table)
  - `points_chart.tsx` - Custom chart component for visualizing food points balance over time

- `/lib/utils.ts` - Utility functions including `cn()` for class name merging

### Key Business Logic

The main calculator logic resides in `app/page.tsx`:

- **PLANS object**: Defines all meal plans with total points and daily averages
- **Calculation logic**:
  - Tracks points from semester start (January 6, 2025)
  - Calculates expected vs actual balance
  - Provides multiple spending targets (daily, two-week, until leaving date)
  - Handles edge cases for semester timing

### Meal Plans Data

Plans are hardcoded in `app/page.tsx`:
- Plans A-E: Upperclass residential plans
- Plans F, I: Off-campus/commuter plans (M-F only)
- Plan J: First-year plan (M-F)

### Important Dates

- Semester start: January 6, 2025
- Default semester end: April 28, 2025
- Chart tracking begins: August 25 (fall semester context)

## Component Dependencies

The app uses Shadcn/ui components which are copied into the codebase rather than installed as packages. These components rely on:
- `class-variance-authority` for component variants
- `@radix-ui` primitives for accessibility
- `tailwind-merge` and `clsx` for class name handling

## Configuration Files

- `components.json` - Shadcn/ui configuration
- `tailwind.config.ts` - Tailwind CSS configuration with custom theme extensions
- `tsconfig.json` - TypeScript configuration with path aliases (@/* for root imports)