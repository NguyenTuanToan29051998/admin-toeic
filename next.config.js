/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  publicRuntimeConfig: {
    BASE_API_URL: process.env.BASE_API_URL,
    TENANT_ID: process.env.TENANT_ID,
  },
  compress: false, // Let Nginx or Apache do it.
  poweredByHeader: false,
  future: {
    webpack5: true,
  },
  webpack: config => {
    return config;
  },
};
