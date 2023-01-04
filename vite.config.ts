import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver,VantResolver } from 'unplugin-vue-components/resolvers'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      Components({
          resolvers: [
              VantResolver(),
              AntDesignVueResolver({}),
          ],
      }),
  ],
    server: {
        host: '0.0.0.0'
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },

})
