// esbuild.config.js

// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const esbuild = require('esbuild');
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const fs = require('fs');

// const outfile = './build/js/main.js';
const outfile = path.join('.', 'build', 'js', 'main.js');

// Configuración de esbuild
esbuild
  .build({
    entryPoints: ['./main.ts'],
    bundle: true,
    outfile,
    platform: 'node',
    minify: true,
  })
  .then(() => {
    const environment = {};
  })
  // eslint-disable-next-line no-undef
  .catch(() => process.exit(1));
