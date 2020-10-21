const API: string = process.env.SVELTE_APP_API || 'api';
const DEV: boolean = process.env.DEV || true;

function logRouteLocation(location: Object) {
  console.log(DEV);
  if (process.env.ROLLUP_WATCH) {
    console.table(location);
  }
}

export { API, DEV, logRouteLocation };
