# Angular Project: Header, Body, and Footer Components

This guide walks you through the process of creating a new Angular project and adding three components — `Header`, `Body`, and `Footer` — into the `AppComponent`.

---

## 🧰 Prerequisites

Ensure you have the following installed:

- Node.js (>= 16.x)
- Angular CLI (>= 17.x)

Install Angular CLI if not already installed:

```bash
npm install -g @angular/cli
```

---

## 🚀 Step 1: Create a New Angular Project

```bash
ng new layout-app
```

- Choose **Yes** for Angular routing if needed.
- Select **CSS** or **SCSS** for styles (based on preference).

Move into the project directory:

```bash
cd layout-app
```

Run the default project:

```bash
ng serve
```

Open browser: http://localhost:4200

---

## 🧱 Step 2: Generate Components

Generate Header Component:

```bash
ng generate component components/header
```

Generate Body Component:

```bash
ng generate component components/body
```

Generate Footer Component:

```bash
ng generate component components/footer
```

Folder structure now looks like:

```
src/
└── app/
    └── components/
        ├── header/
        ├── body/
        └── footer/
```

---

## 🧩 Step 3: Integrate Components into AppComponent

Open `src/app/app.component.html` and replace its content with:

```html
<app-header></app-header>

<app-body></app-body>

<app-footer></app-footer>
```

---

## 🖊️ Step 4: Sample Code for Each Component

### 🔹 Header Component (`header.component.html`)

```html
<header style="background-color: #1976d2; color: white; padding: 1rem;">
  <h1>My Angular App</h1>
</header>
```

---

### 🔹 Body Component (`body.component.html`)

```html
<main style="padding: 2rem;">
  <p>Welcome to the body of the application.</p>
</main>
```

---

### 🔹 Footer Component (`footer.component.html`)

```html
<footer style="background-color: #333; color: white; padding: 1rem; text-align: center;">
  &copy; 2025 MyApp. All rights reserved.
</footer>
```

---

## ✅ Step 5: Run the Application

Start the development server:

```bash
ng serve
```

Visit in browser: http://localhost:4200

You should see the **Header**, **Body**, and **Footer** rendered as part of the main layout.

---

## 📁 Bonus: Folder Overview

```
layout-app/
├── src/
│   └── app/
│       ├── app.component.ts
│       ├── app.component.html
│       └── components/
│           ├── header/
│           ├── body/
│           └── footer/
```

---

## 🎉 That's it!

You've successfully created an Angular app with three components structured into a clean layout.

---
