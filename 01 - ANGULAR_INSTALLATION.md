## Angular Installation

### Step 1: Download Node.js
- Install the latest LTS version of Node.js from the official website.

### Step 2: Install Angular CLI (Command Line Interface)

```bash
npm install -g @angular/cli

ng --version
```

### Step 3: Create a New Angular Project

```bash
ng new my-angular-app
cd my-angular-app
ng serve
```

Open in your browser: `http://localhost:4200/`

### Step 4: Create a Component and Print "Hello World"

Generate a new component:

```bash
ng generate component hello
```
or
```bash
ng g c hello
```

Update the component template (`src/app/hello/hello.component.html`):

```html
<h2>Hello World</h2>
```

Render the component by adding its selector to the root template (`src/app/app.component.html`):

```html
<app-hello></app-hello>
```

Save files and the app will live-reload to show "Hello World".

Component files created (example contents):

`src/app/hello/hello.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {}
```

`src/app/hello/hello.component.html`

```html
<h2>Hello World</h2>
<p>Welcome to your first Angular component.</p>
```

`src/app/hello/hello.component.css`

```css
h2 {
  margin: 0 0 0.5rem;
}
p {
  color: #555;
}
```


