// vite.config.ts
import { defineConfig } from "file:///D:/dev/projects/clean-shelving/node_modules/vite/dist/node/index.js";
import react from "file:///D:/dev/projects/clean-shelving/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///D:/dev/projects/clean-shelving/node_modules/vite-plugin-pwa/dist/index.js";
var manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["favicon.svg"],
  manifest: {
    name: "Clean Shelving",
    short_name: "Clean Shelving",
    icons: [
      {
        src: "logo512.png",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  }
};
var vite_config_default = defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxkZXZcXFxccHJvamVjdHNcXFxcY2xlYW4tc2hlbHZpbmdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGRldlxcXFxwcm9qZWN0c1xcXFxjbGVhbi1zaGVsdmluZ1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZGV2L3Byb2plY3RzL2NsZWFuLXNoZWx2aW5nL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IFZpdGVQV0EsIFZpdGVQV0FPcHRpb25zIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuXG5jb25zdCBtYW5pZmVzdEZvclBsdWdpbjogUGFydGlhbDxWaXRlUFdBT3B0aW9ucz4gPSB7XG4gIHJlZ2lzdGVyVHlwZTogJ3Byb21wdCcsXG4gIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5zdmcnXSxcbiAgbWFuaWZlc3Q6IHtcbiAgICBuYW1lOiAnQ2xlYW4gU2hlbHZpbmcnLFxuICAgIHNob3J0X25hbWU6ICdDbGVhbiBTaGVsdmluZycsXG4gICAgaWNvbnM6IFtcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcImxvZ281MTIucG5nXCIsXG4gICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICB9XG4gICAgXVxuICB9XG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgVml0ZVBXQShtYW5pZmVzdEZvclBsdWdpbildLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1IsU0FBUyxvQkFBb0I7QUFDalQsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBK0I7QUFFeEMsSUFBTSxvQkFBNkM7QUFBQSxFQUNqRCxjQUFjO0FBQUEsRUFDZCxlQUFlLENBQUMsYUFBYTtBQUFBLEVBQzdCLFVBQVU7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsaUJBQWlCLENBQUM7QUFDL0MsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
