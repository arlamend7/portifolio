import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page').then((module) => module.HomePage),
  },
  {
    path: 'work',
    loadComponent: () =>
      import('./pages/experience/experience-page').then((module) => module.ExperiencePage),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects-page').then((module) => module.ProjectsPage),
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./pages/project-detail/project-detail-page').then(
        (module) => module.ProjectDetailPage,
      ),
  },
  {
    path: 'capabilities/:id',
    loadComponent: () =>
      import('./pages/capability-detail/capability-detail-page').then(
        (module) => module.CapabilityDetailPage,
      ),
  },
  {
    path: 'sports',
    loadComponent: () => import('./pages/sports/sports-page').then((module) => module.SportsPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found-page').then((module) => module.NotFoundPage),
  },
];
