import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command == "serve")
    return {
      plugins: [react(), basicSsl()],
    };
  else
    return {
      plugins: [react()],
    };
});
