module.exports = {
  devIndicators: {
    autoPrerender: false,
  },

  exportPathMap() {
    return {
      '/': {page: '/'},
    };
  },
};