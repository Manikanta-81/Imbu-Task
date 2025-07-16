
# Candidate Management App – Setup Guide

This project is built using **React**, **TypeScript**, and **Tailwind CSS**. Below are the steps to set it up locally.

## 🔧 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/Manikanta-81/Imbu-Task.git
cd Imbu-Task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The application will run at:  
[http://localhost:3000](http://localhost:3000)

---

## ⚙️ Tech Stack & Configuration

### React with TypeScript

This project was created using:

```bash
npx create-react-app imbu-task --template typescript
```

### Tailwind CSS Setup

Tailwind CSS was installed using the following packages:

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### Tailwind Configuration

#### ✅ tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### ✅ src/index.css

Tailwind’s base styles were added to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ✅ You're Ready to Go!

You can now explore or modify the project as needed. For a live demo, visit:  
[https://candidate-management-6ddx.onrender.com](https://candidate-management-6ddx.onrender.com)
