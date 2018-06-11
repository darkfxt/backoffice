export function get() {
  const config = Object.assign({}, require('./env'));
  return config.config;
}
