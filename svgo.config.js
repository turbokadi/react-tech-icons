export default {
  multipass: true,
  plugins: [
    // Base clean (safe)
    {
      name: 'preset-default',
      params: {
        overrides: {
          // on garde les transforms & paths
          convertPathData: true,
          convertTransform: true,

          // IMPORTANT : on garde les styles
          inlineStyles: false,
        },
      },
    },

    // ⚠️ EXPLICITES, hors preset-default
    {
      name: 'removeViewBox',
      active: false, // ❌ JAMAIS enlever le viewBox
    },

    // Qualité visuelle
    {
      name: 'convertShapeToPath',
      active: false,
    },

    {
      name: 'removeDimensions',
      active: true,
    },
  ],
}
