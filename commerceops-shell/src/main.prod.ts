import { initFederation } from '@angular-architects/native-federation';

// ADD THIS: Load the production federation manifest
initFederation('federation.manifest.prod.json', {
  hostRemoteEntry: { url: './remoteEntry.json' },
})
  // KEEP EXISTING
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err))
  .then(() => import('./bootstrap'))
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));