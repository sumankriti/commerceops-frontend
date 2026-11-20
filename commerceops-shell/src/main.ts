import { initFederation } from '@angular-architects/native-federation';

initFederation('federation.manifest.json', {
  hostRemoteEntry: { url: "./remoteEntry.json" }
})
  // eslint-disable-next-line no-console
  .catch(err => console.error(err))
  .then(() => import('./bootstrap'))
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
