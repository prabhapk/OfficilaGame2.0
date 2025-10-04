const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure proper asset resolution
config.resolver.assetExts.push(
  // Adds support for `.webp` files
  'webp',
  // Adds support for `.gif` files
  'gif',
  // Adds support for `.jpg` files
  'jpg',
  // Adds support for `.jpeg` files
  'jpeg',
  // Adds support for `.png` files
  'png'
);

// Ensure proper source map generation for debugging
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;
