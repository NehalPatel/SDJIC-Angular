# Steps to Create a Counter Component in Angular

1. **Generate the Counter Component**
   - Run:
     `ng generate component components/counter/counter`

2. **Implement the Counter Logic**
   - Open `src/app/components/counter/counter.ts`.
   - Add a `count` property and `increment`/`decrement` methods.

3. **Create the Counter Template**
   - Edit `src/app/components/counter/counter.html`:
     ```html
     <div class="counter-container">
       <h2>Counter Example</h2>
       <div class="counter-value">{{ count }}</div>
       <button (click)="decrement()">-</button>
       <button (click)="increment()">+</button>
     </div>
     ```

4. **Add Styles (Optional)**
   - Edit `src/app/components/counter/counter.css` for styling.

5. **Import the Counter Component**
   - In your root or parent component (e.g., `app.ts`), import the Counter component:
     ```typescript
     import { Counter } from './components/counter/counter';
     ```
   - Add `Counter` to the `imports` array of the `@Component` decorator.

6. **Use the Counter Component in a Template**
   - In your template (e.g., `app.html`), add:
     ```html
     <app-counter></app-counter>
     ```

7. **Run the Application**
   - Start the Angular app and verify the counter works as expected.
