## Definitions

- **Custom Directive**: Your own small piece of logic that you attach to HTML elements to change their style or behavior.
- **Attribute Directive**: Changes how an element looks or behaves (no `*` in front). Example: highlight text on hover.

---

## Goal
Create a very simple attribute directive that changes text color when you hover over an element.

---

## Step 1: Generate the directive

```bash
ng g directive directives/color-hover
```

This creates `src/app/directives/color-hover.directive.ts`.

---

## Step 2: Write the simplest hover behavior

Open `src/app/directives/color-hover.directive.ts` and replace the content with:

```ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[appColorHover]' })
export class ColorHoverDirective {
  // Usage: <p [appColorHover]="'red'">Hello</p>
  @Input('appColorHover') hoverColor: string = 'blue';

  private originalColor: string = '';

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter') onEnter() {
    this.originalColor = this.el.nativeElement.style.color;
    this.el.nativeElement.style.color = this.hoverColor;
  }

  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.color = this.originalColor;
  }
}
```

What this does:
- When mouse enters, it sets the element’s text color to the value you pass.
- When mouse leaves, it restores the original color.

---

## Step 3: Use it in any template

Add the directive to your HTML:

```html
<h3 [appColorHover]="'crimson'">Hover me (turns crimson)</h3>
<p [appColorHover]="'green'">Hover me (turns green)</p>
<button appColorHover>Hover me (defaults to blue)</button>
```

That’s it. You made and used a custom directive.

---

## Bonus (optional): Click-to-toggle color

You can add a simple click behavior to toggle a color without worrying about hover:

```ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[appColorToggle]' })
export class ColorToggleDirective {
  @Input('appColorToggle') activeColor: string = 'purple';
  private isActive = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('click') toggle() {
    this.isActive = !this.isActive;
    this.el.nativeElement.style.color = this.isActive ? this.activeColor : '';
  }
}
```

Usage:

```html
<p [appColorToggle]="'orange'">Click me to toggle orange</p>
```

Keep the focus on understanding: a directive is just a small class that listens to events and updates the element.
