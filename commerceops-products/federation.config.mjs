import { withNativeFederation, fromPackageJson } from '@angular-architects/native-federation/config';

export default withNativeFederation({
  name: 'commerceops-products',



  exposes: {
    // './Component': './commerceops-products/src/app/app.ts',
    //This keeps the Products application independently runnable while allowing the shell to consume only its feature component.
    './ProductsPage': './commerceops-products/src/app/pages/products-page.ts',
  },

  //shareScope: autoShareScope({level: 'minor'}),

  shared: fromPackageJson({ singleton: true, strictVersion: true, requiredVersion: 'auto', build: 'package' })
    .patch(['@angular/*'], {includeSecondaries: { keepAll: false } } ),

  //sharedMappings: mappingsFromWorkspace({ singleton: true }).filter(['@my-org/*']).get(),

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],

  // Please read our docs about configuring native federation:
  // https://native-federation.com/docs/v4/angular-adapter/configuration/

  features: {
    denseChunking: true,
    denseExternals: true,
    strictImports: false
  },
});
