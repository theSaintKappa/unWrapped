import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        // basicSsl()
    ],
    // server: {
    //     https: true,
    // },
});
