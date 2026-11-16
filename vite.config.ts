import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// relative base so the built site works from any folder or sub-path
export default defineConfig({ base: './', plugins: [react()] })
