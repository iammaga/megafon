const mix = require('laravel-mix');
const path = require('path');

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);

mix.webpackConfig({
    resolve: {
        extensions: ['.*', '.wasm', '.mjs', '.js', '.jsx', '.json', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
});
