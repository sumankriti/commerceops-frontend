
import { loadRemoteModule } from '@angular-architects/native-federation';
import { appRoutes } from './app.routes';
import { Component } from '@angular/core';

import { RemoteUnavailable } from './pages/remote-unavailable';


@Component({
  selector: 'co-mock-products-page',
  template: '',
})
class MockProductsPage {}

jest.mock('@angular-architects/native-federation', () => ({
  loadRemoteModule: jest.fn(),
}));

const mockedLoadRemoteModule = jest.mocked(loadRemoteModule);

describe('Products MFE routing', () => {
  const getProductsLoader = () => {
    const shellRoute = appRoutes.find(route => route.path === '');
    const productsRoute = shellRoute?.children?.find(
      route => route.path === 'products'
    );

    if (!productsRoute?.loadComponent) {
      throw new Error('Products route loader not found');
    }

    return productsRoute.loadComponent;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads ProductsPage when remote succeeds', async () => {
    mockedLoadRemoteModule.mockResolvedValue({
      ProductsPage: MockProductsPage,
    });

    const component = await getProductsLoader()();

    expect(mockedLoadRemoteModule).toHaveBeenCalledWith(
      'commerceops-products',
      './ProductsPage'
    );
    expect(component).toBe(MockProductsPage);
  });

  it('loads fallback when remote fails', async () => {
    const error = new Error('Remote unavailable');
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    try {
      mockedLoadRemoteModule.mockRejectedValue(error);

      const component = await getProductsLoader()();

      expect(component).toBe(RemoteUnavailable);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Products MFE failed:',
        error
      );
    } finally {
      consoleSpy.mockRestore();
    }
  });

  it('loads fallback when ProductsPage export is missing', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    try {
      mockedLoadRemoteModule.mockResolvedValue({});

      const component = await getProductsLoader()();

      expect(component).toBe(RemoteUnavailable);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Products MFE failed:',
        expect.objectContaining({
          message: 'ProductsPage export is missing',
        })
      );
    } finally {
      consoleSpy.mockRestore();
    }
  });

  // ADD THIS — Verify shell lazy loading
it('should lazy-load ShellLayout', async () => {
  const shellRoute = appRoutes.find(
    route => route.path === ''
  );

  expect(shellRoute?.loadComponent).toBeDefined();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const component = await shellRoute!.loadComponent!();

  const { ShellLayout } = await import(
    './core/layout/shell-layout'
  );

  expect(component).toBe(ShellLayout);
});

// ADD THIS — Verify dashboard lazy loading
it('should lazy-load Dashboard', async () => {
  const shellRoute = appRoutes.find(
    route => route.path === ''
  );

  const dashboardRoute = shellRoute?.children?.find(
    route => route.path === 'dashboard'
  );

  expect(dashboardRoute?.loadComponent).toBeDefined();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const component = await dashboardRoute!.loadComponent!();

  const { Dashboard } = await import('./pages/dashboard');

  expect(component).toBe(Dashboard);
});
});
