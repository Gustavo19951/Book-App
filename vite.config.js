import {defineConfig} from 'vite'
import {VitePWA} from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
                // registerType: 'autoUpdate',
            manifest: {
                    name: 'Book App',
                    short_name: 'BookApp',
                    description: 'Book App Reviews',
                    icons: [
                        {
                            src: "/img/app.png",
                            sizes: "512X512",
                            type: "image/png",
                            purpose: "any maskable"
                        },
                    ],
                }
        })
    ],
})
