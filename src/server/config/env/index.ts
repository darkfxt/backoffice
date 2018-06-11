const env = process.env.NODE_ENV || 'local';
export const config = require(`./${env}`).config;
