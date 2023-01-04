// vite.config.ts
import { defineConfig } from "file:///D:/%E6%A1%8C%E9%9D%A2/synco%20(2)/NOBEL-%E5%80%BC%E5%AE%88%E5%8C%A0%E4%BA%BA%E5%BF%83/NOBEL-photograph/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/%E6%A1%8C%E9%9D%A2/synco%20(2)/NOBEL-%E5%80%BC%E5%AE%88%E5%8C%A0%E4%BA%BA%E5%BF%83/NOBEL-photograph/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///D:/%E6%A1%8C%E9%9D%A2/synco%20(2)/NOBEL-%E5%80%BC%E5%AE%88%E5%8C%A0%E4%BA%BA%E5%BF%83/NOBEL-photograph/node_modules/unplugin-vue-components/dist/vite.mjs";
import { AntDesignVueResolver, VantResolver } from "file:///D:/%E6%A1%8C%E9%9D%A2/synco%20(2)/NOBEL-%E5%80%BC%E5%AE%88%E5%8C%A0%E4%BA%BA%E5%BF%83/NOBEL-photograph/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\\u684C\u9762\\synco (2)\\NOBEL-\u503C\u5B88\u5320\u4EBA\u5FC3\\NOBEL-photograph";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VantResolver(),
        AntDesignVueResolver({})
      ]
    })
  ],
  server: {
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTY4NENcdTk3NjJcXFxcc3luY28gKDIpXFxcXE5PQkVMLVx1NTAzQ1x1NUI4OFx1NTMyMFx1NEVCQVx1NUZDM1xcXFxOT0JFTC1waG90b2dyYXBoXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTY4NENcdTk3NjJcXFxcc3luY28gKDIpXFxcXE5PQkVMLVx1NTAzQ1x1NUI4OFx1NTMyMFx1NEVCQVx1NUZDM1xcXFxOT0JFTC1waG90b2dyYXBoXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTYlQTElOEMlRTklOUQlQTIvc3luY28lMjAoMikvTk9CRUwtJUU1JTgwJUJDJUU1JUFFJTg4JUU1JThDJUEwJUU0JUJBJUJBJUU1JUJGJTgzL05PQkVMLXBob3RvZ3JhcGgvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgQW50RGVzaWduVnVlUmVzb2x2ZXIsVmFudFJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgICAgICAgIFZhbnRSZXNvbHZlcigpLFxuICAgICAgICAgICAgICBBbnREZXNpZ25WdWVSZXNvbHZlcih7fSksXG4gICAgICAgICAgXSxcbiAgICAgIH0pLFxuICBdLFxuICAgIHNlcnZlcjoge1xuICAgICAgICBob3N0OiAnMC4wLjAuMCdcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgICB9LFxuICAgIH0sXG5cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBYLFNBQVMsb0JBQW9CO0FBQ3ZaLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHNCQUFxQixvQkFBb0I7QUFDbEQsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNQLFdBQVc7QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLHFCQUFxQixDQUFDLENBQUM7QUFBQSxNQUMzQjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNFLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDeEM7QUFBQSxFQUNKO0FBRUosQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
