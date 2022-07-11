const config = {
  images: {
    domains: ["res.cloudinary.com", "kanaru.jp"],
  },
  async rewrites() {
    return [
      {
        source: "/about",
        destination: "/",
      },
      {
        source: "/works",
        destination: "/",
      },
      {
        source: "/blog",
        destination: "/",
      },
      {
        source: "/contact",
        destination: "/",
      },
    ];
  },
};

module.exports = config;
