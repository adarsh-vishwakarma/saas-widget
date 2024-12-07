import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  define: {
    "process.env": {
      NODE_ENV: "production",  // Ensure this is production for optimized builds
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: "./src/index.jsx",  // Main entry point for your library
      name: "Widget",            // Name of the global variable exposed
      fileName: (format) => `widget.${format}.js`,  // Output filename pattern
      formats: ["umd", "es"],  // Output both UMD and ES modules for flexibility
    },
    target: "esnext",   // Modern JavaScript output
    rollupOptions: {
      external: ["react", "react-dom"],  // Ensure react and react-dom are not bundled
      output: {
        globals: {
          react: "React",       // React will be exposed globally as 'React'
          "react-dom": "ReactDOM",  // ReactDOM will be exposed globally as 'ReactDOM'
        },
      },
    },
  },
});
