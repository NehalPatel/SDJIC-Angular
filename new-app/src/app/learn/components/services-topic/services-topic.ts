import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface User {
    id: number;
    name: string;
    email: string;
}

@Component({
    selector: 'app-services-topic',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './services-topic.html',
    styleUrl: './services-topic.css'
})
export class ServicesTopicComponent implements OnInit {
    users: User[] = [];
    isLoading = false;
    errorMessage = '';
    showServiceDemo = false;
    serviceLogs: string[] = [];
    currentUser: User | null = null;

    constructor() { }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.isLoading = true;
        this.addLog('Loading users from service...');

        // Simulate API call
        setTimeout(() => {
            this.users = [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
                { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
            ];
            this.isLoading = false;
            this.addLog('Users loaded successfully');
        }, 1500);
    }

    addUser() {
        const newUser: User = {
            id: this.users.length + 1,
            name: `User ${this.users.length + 1}`,
            email: `user${this.users.length + 1}@example.com`
        };
        this.users.push(newUser);
        this.addLog(`Added user: ${newUser.name}`);
    }

    removeUser(user: User) {
        this.users = this.users.filter(u => u.id !== user.id);
        this.addLog(`Removed user: ${user.name}`);
    }

    selectUser(user: User) {
        this.currentUser = user;
        this.addLog(`Selected user: ${user.name}`);
    }

    toggleServiceDemo() {
        this.showServiceDemo = !this.showServiceDemo;
        if (this.showServiceDemo) {
            this.addLog('Service demo started');
        }
    }

    addLog(message: string) {
        const timestamp = new Date().toLocaleTimeString();
        this.serviceLogs.unshift(`[${timestamp}] ${message}`);

        // Keep only last 10 logs
        if (this.serviceLogs.length > 10) {
            this.serviceLogs = this.serviceLogs.slice(0, 10);
        }
    }

    clearLogs() {
        this.serviceLogs = [];
        this.addLog('Logs cleared');
    }
}
