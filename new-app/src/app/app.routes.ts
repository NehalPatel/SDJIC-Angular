import { Routes } from '@angular/router';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Courses } from './courses/courses';
import { Home } from './home/home';
import { Learn } from './learn/learn';
import { Resources } from './resources/resources';
import { ComponentsTopicComponent } from './learn/components/components-topic/components-topic';
import { DirectivesTopicComponent } from './learn/components/directives-topic/directives-topic';
import { ServicesTopicComponent } from './learn/components/services-topic/services-topic';
import { RoutingTopicComponent } from './learn/components/routing-topic/routing-topic';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //redirect to home page
  { path: 'home', component: Home }, //home page
  { path: 'courses', component: Courses }, //courses page
  {
    path: 'learn',
    component: Learn,
    children: [
      { path: 'components', component: ComponentsTopicComponent },
      { path: 'directives', component: DirectivesTopicComponent },
      { path: 'services', component: ServicesTopicComponent },
      { path: 'routing', component: RoutingTopicComponent },
      // Add more topics here as needed
      { path: '', redirectTo: 'components', pathMatch: 'full' }
    ]
  },
  { path: 'resources', component: Resources }, //resources page
  { path: 'about', component: About }, //about page
  { path: 'contact', component: Contact }, //contact page
  { path: '**', redirectTo: '/home' } //redirect to home page if the page is not found
];
