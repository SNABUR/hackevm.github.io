import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otras opciones de configuración aquí
  output: 'export', // Asegúrate de agregar esta línea para exportar como archivos estáticos.
  webpack: (config) => {
    // Habilitar soporte para WebAssembly y capas
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      layers: true, // Habilitar la opción de capas
    };

    return config;
  },
};

export default nextConfig;
