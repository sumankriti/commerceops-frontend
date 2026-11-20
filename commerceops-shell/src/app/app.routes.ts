import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/shell-layout').then((m) => m.ShellLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'products',
        loadComponent: () =>
          loadRemoteModule('commerceops-products', './ProductsPage')
            .then((m) => {
              if (!m.ProductsPage) {
                throw new Error('ProductsPage export is missing');
              }

              return m.ProductsPage;
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.error('Products MFE failed:', error);

              return import('./pages/remote-unavailable').then(
                (m) => m.RemoteUnavailable,
              );
            }),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
