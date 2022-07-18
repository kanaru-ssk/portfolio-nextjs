import { gql } from "@apollo/client";

import { blogPerPage, worksPerPage } from "./pagination";

export const topQuery = gql`
  query topQuery {
    generalSettings {
      title
      description
    }
    blog: posts(first: ${blogPerPage}, where: { categoryName: "blog" }) {
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
    works: posts(first: ${worksPerPage}, where: { categoryName: "works" }) {
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
  return gql`
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
  return gql`
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

export const getPostsCount = gql`
  query getPostsCount {
    categories {
      nodes {
        id
        count
        name
      }
    }
  }
`;

export const getAllPosts = (category: "blog" | "works") => {
  return gql`
    query getAllPosts {
      posts(first: 9999, where: { categoryName: "${category}" }) {
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
        }
      }
    }
  `;
};
