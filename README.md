# Duke Food Points Calculator

A simple web application that helps Duke students track their food points balance and estimate their daily spending target.

## Features

* Calculates remaining food points based on selected meal plan, current balance, and leaving date.
* Provides a daily spending target to help manage food points effectively.
* Offers two spending target options: one for the next two weeks and another until the leaving date.
* Displays a chart visualizing the food points balance progression throughout the semester.
* User-friendly interface with clear and concise information.
* Responsive design for optimal viewing on various devices.

## Usage

1. Select your meal plan from the dropdown menu.
2. Enter your current food points balance.
3. Specify your leaving date (optional; defaults to April 28, 2025).
4. The calculator will automatically compute your remaining balance and suggest a daily spending target.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Navigate to the project directory: `cd your-repo`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

## Technologies Used

* **Next.js:** A React framework for building web applications, used for the overall application structure and server-side rendering.
* **React:** A JavaScript library for building user interfaces, forming the core of the application's front-end.
* **TypeScript:** A superset of JavaScript that adds static typing, improving code maintainability and reducing errors.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development, providing a consistent and responsive design.
* **Lucide React:** An icon library providing the application's visual icons.
* **@radix-ui/react-label:** A UI library for form elements such as labels and selections.
* **@radix-ui/react-select:** A UI library for customizable select elements.
* **clsx:** A utility for efficiently joining classNames in React.
* **tailwind-merge:** A utility for merging Tailwind classes.
* **Google Analytics:**  Used to track website usage.


## Configuration

The application's configuration is primarily handled through environment variables and the `tailwind.config.ts` file.  The `tailwind.config.ts` file manages the application's styling and color scheme, allowing for easy customization.


## Dependencies

The project's dependencies are listed in the `package.json` file.  They include essential packages for building and running the application.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.


## Testing

(No formal testing framework is included in this codebase)



*README.md was made with [Etchr](https://etchr.dev)*