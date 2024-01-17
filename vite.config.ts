// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import path from "path" //This line imports the path module from Node.js. The path module provides utilities for working with file paths.
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite" //This imports the defineConfig function, which is used to define the Vite configuration

export default defineConfig({
  plugins: [react()], //This specifies that the React plugin should be used. This is required if you are using React in your Vite project
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), //This part configures module aliasing. It creates an alias for the @ symbol, so when you import modules with @ as a prefix, Vite knows to look for them in the ./src directory. The path.resolve(__dirname, "./src") is used to create an absolute path to the ./src directory.
    },
  },
})
