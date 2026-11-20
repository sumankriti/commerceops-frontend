import { Component } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { appRoutes } from './app.routes';

// ADD THIS — Local mock instead of importing remote source
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
    const shellRoute = appRoutes.find((route) => route.path === '');

    const productsRoute = shellRoute?.children?.find(
      (route) => route.path === 'products',
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
    // CHANGE HERE — Mock federation export
    mockedLoadRemoteModule.mockResolvedValue({
      ProductsPage: MockProductsPage,
    });

    const component = await getProductsLoader()();

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

      expect(consoleSpy).toHaveBeenCalledWith('Products MFE failed:', error);
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
        }),
      );
    } finally {
      consoleSpy.mockRestore();
    }
  });
});
