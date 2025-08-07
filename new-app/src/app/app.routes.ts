import { Routes } from '@angular/router';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Courses } from './courses/courses';
import { Home } from './home/home';
import { Learn } from './learn/learn';
import { Resources } from './resources/resources';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //redirect to home page
  { path: 'home', component: Home }, //home page
  { path: 'courses', component: Courses }, //courses page
  { path: 'learn', component: Learn }, //learn page
  { path: 'resources', component: Resources }, //resources page
  { path: 'about', component: About }, //about page
  { path: 'contact', component: Contact }, //contact page
  { path: '**', redirectTo: '/home' } //redirect to home page if the page is not found
];
