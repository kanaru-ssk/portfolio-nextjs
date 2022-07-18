export const topQuery = `
  query topQuery {
    generalSettings {
      title
      description
    }
    posts(first: 20) {
      nodes {
        id
        title
        date
        slug
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
        categories {
          nodes {
            id
            name
          }
        }
      }
    }
    pageBy(pageId: 2) {
      id
      content
      profile {
        bio
        job
        name
        nameRoman
        profileImg {
          id
          sourceUrl
        }
      }
    }
    categories {
      nodes {
        id
        count
        name
      }
    }
  }
`;

export const getPostPathsQuery = (category: "blog" | "works") => {
  return `
    query getWorksPaths {
      posts(first: 9999, where: { categoryName: "${category}" }) {
        nodes {
          id
          slug
        }
      }
    }
  `;
};

export const getPostQuery = (id: string | string[] | undefined) => {
  return `
  query getPost {
    postBy(slug: "${id}") {
      id
      title
      slug
      date
      content
      seo {
        description
        title
        ogpImg {
          sourceUrl
        }
      }
    }
  }
`;
};
