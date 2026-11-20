// @harmoniclabs/pebble (0.4.2 to 0.6.0 at least) reads `process.env` when its modules load, for
// debugging switches; in a browser there is no `process`, and loading the compiler throws
// ("process is not defined"). The playground, the compile and run frames and the editors
// all load it in the page: an empty `process.env` is enough.
if (typeof window !== 'undefined') {
  if (typeof window.process === 'undefined') window.process = { env: {} };
  else if (typeof window.process.env === 'undefined') window.process.env = {};
}
