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
  async redirects() {
    return [
      {
        source:
          "/blog/svgcss%e3%82%a2%e3%83%8b%e3%83%a1%e3%83%bc%e3%82%b7%e3%83%a7%e3%83%b3%e3%81%a7%e6%ad%a9%e3%81%8f%e4%ba%ba%e3%82%92%e4%bd%9c%e3%81%a3%e3%81%9f/",
        destination: "/blog/svg-animation/",
        permanent: true,
      },
      {
        source:
          "/blog/google-map%e3%81%8b%e3%82%89%e5%91%a8%e8%be%ba%e3%81%ae%e3%82%ab%e3%83%95%e3%82%a7%e3%82%92web%e3%81%a7%e5%8f%96%e5%be%97%e3%81%99%e3%82%8b/",
        destination: "/blog/google-map-get-cafe/",
        permanent: true,
      },
      {
        source:
          "/blog/wordpress-cocoon%e3%81%a7favicon%e3%82%92svg%e7%94%bb%e5%83%8f%e3%81%ab%e3%81%99%e3%82%8b/",
        destination: "/blog/svg-favicon-on-wordpress/",
        permanent: true,
      },
      {
        source:
          "/blog/nginx-wordpress%e3%81%ae%e8%a8%98%e4%ba%8b%e6%9b%b4%e6%96%b0%e3%81%a7%e3%82%a8%e3%83%a9%e3%83%bc%e3%81%97%e3%81%9f%e6%99%82%e3%81%ae%e3%83%a1%e3%83%a2/",
        destination: "/blog/wordpress-error-on-nginx/",
        permanent: true,
      },
      {
        source:
          "/blog/snap-scroll%e3%81%a8%e3%82%bf%e3%83%96%e5%88%87%e3%82%8a%e6%9b%bf%e3%81%88%e3%81%8c%e5%87%ba%e6%9d%a5%e3%82%8b%e3%82%ab%e3%83%ab%e3%83%bc%e3%82%bb%e3%83%ab%e3%82%92%e4%bd%9c%e6%88%90%e3%81%99%e3%82%8b/",
        destination: "/blog/snap-scroll-with-tab/",
        permanent: true,
      },
      {
        source:
          "/blog/vps%e3%82%b5%e3%83%bc%e3%83%90%e3%83%bc%e3%81%a7cocoon%e8%a8%ad%e5%ae%9a%e3%81%8c%e8%a1%a8%e7%a4%ba%e3%81%95%e3%82%8c%e3%81%aa%e3%81%84%e6%99%82%e3%81%ae%e5%af%be%e5%87%a6%e6%b3%95/",
        destination: "/blog/cocoon-error-on-vps/",
        permanent: true,
      },
      {
        source:
          "/blog/firebase%e5%88%9d%e6%9c%9f%e5%8c%96%e3%81%a7spa%e3%82%92%e9%81%b8%e3%81%b6%e3%81%a8%e4%bd%95%e3%81%8c%e3%81%a9%e3%81%86%e3%81%aa%e3%82%8b%ef%bc%9f/",
        destination: "/blog/what-firebase-spa/",
        permanent: true,
      },
      {
        source:
          "/blog/github-actions%e3%81%a7vps%e3%81%ab%e8%87%aa%e5%8b%95%e3%83%87%e3%83%97%e3%83%ad%e3%82%a4%e3%81%97%e3%81%9f%e6%99%82%e3%81%ae%e3%83%a1%e3%83%a2/",
        destination: "/blog/deploy-vps-with-github-actions/",
        permanent: true,
      },
    ];
  },
};

module.exports = config;
