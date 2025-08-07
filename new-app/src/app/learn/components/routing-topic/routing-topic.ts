import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Route {
    path: string;
    component: string;
    description: string;
}

@Component({
    selector: 'app-routing-topic',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './routing-topic.html',
    styleUrl: './routing-topic.css'
})
export class RoutingTopicComponent {
    routes: Route[] = [
        { path: '/home', component: 'HomeComponent', description: 'Main landing page' },
        { path: '/about', component: 'AboutComponent', description: 'Company information' },
        { path: '/products', component: 'ProductsComponent', description: 'Product catalog' },
        { path: '/contact', component: 'ContactComponent', description: 'Contact form' }
    ];

    currentRoute = '/home';
    showRouteDemo = false;
    navigationHistory: string[] = [];

    toggleRouteDemo() {
        this.showRouteDemo = !this.showRouteDemo;
        if (this.showRouteDemo) {
            this.navigateTo('/home');
        }
    }

    navigateTo(path: string) {
        this.currentRoute = path;
        this.navigationHistory.push(path);

        // Keep only last 5 navigation entries
        if (this.navigationHistory.length > 5) {
            this.navigationHistory = this.navigationHistory.slice(-5);
        }
    }

    getCurrentRouteInfo() {
        return this.routes.find(route => route.path === this.currentRoute);
    }

    clearHistory() {
        this.navigationHistory = [];
    }
}
