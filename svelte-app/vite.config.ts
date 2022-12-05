import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
// import autoprefixer from 'autoprefixer';

const production = process.env.NODE_ENV === 'production';
const api = 'http://localhost:7071/api';
const API = process.env.API || production ? '/api' : api;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      emitCss: production,

      // preprocess sass and scss files

      preprocess: sveltePreprocess({
        scss: {
          // includePaths: ['src/styles'],

          prependData: `
            @import "styles.scss";
          `,
        },
      }),

      compilerOptions: {
        outputFilename: 'bundle.js',
        cssOutputFilename: 'bundle.css',
        dev: !production,
      },
    }),
  ],
  // css: {
  //   postcss: {
  //     plugins: [autoprefixer()],
  //     // extract: 'bundle.css',
  //   },
  // },
});
