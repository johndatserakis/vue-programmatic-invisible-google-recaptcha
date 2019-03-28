import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const config = {
    input: 'src/index.js',
    output: {
        name: 'VueProgrammaticInvisibleGoogleRecaptcha',
        exports: 'named',
        globals: {
            'vue': 'Vue'
        }
    },
    plugins: [
        commonjs(),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        vue({
            css: true,
            compileTemplate: true,
        }),
        buble(),
    ],
    external: ['vue']
};

// Only minify browser (iife) version
if (argv.format === 'iife') {
    config.plugins.push(terser());
}

export default config;
