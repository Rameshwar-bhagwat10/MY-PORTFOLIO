// Remove output: 'export'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // remove: output: 'export'
  images: {
    unoptimized: true, // keep if needed
  },
};

module.exports = nextConfig;
