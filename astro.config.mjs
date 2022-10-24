import { defineConfig } from 'astro/config';
// https://astro.build/config
import react from "@astrojs/react";
import node from '@astrojs/node';

export default defineConfig({
    integrations: [react()],
    output: "server",
    adapter: node({
        mode: 'standalone'
    }),
});