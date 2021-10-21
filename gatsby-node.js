// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.com/docs/node-apis/
//  */

// // You can delete this file if you're not using it

const path = require(`path`);
// const kebabCase = require(`lodash.kebabcase`);

// const makeRequest = (graphql, request) =>
//   new Promise((resolve, reject) => {
//     // Query for article nodes to use in creating pages.
//     resolve(
//       graphql(request).then(result => {
//         if (result.errors) {
//           reject(result.errors)
//         }

//         return result
//       })
//     )
//   })

// // Implement the Gatsby API “createPages”. This is called once the
// // data layer is bootstrapped to let plugins create pages from data.
// exports.createPages = ({ actions, graphql }) => {
// // exports.createPages = ({ actions, graphql, page }) => {
//   const { createPage } = actions;

//   // if (page.path === `/`) {
//   //   page.matchPath = `/*`;
//   //   createPage(page);
//   // }

//   // console.log("page - ", page);
//   // console.log("page - ", page.path);
//   // // if (page.path.match(/^\/app/)) {
//   // if (page.matchPath || page.path.match(/^\/search/)) {
//   //   // page.matchPath = "/app/*"
//   //   page.matchPath = "/search/*"

//   //   // // Update the page.
//   //   // createPage(page)
//   //   createPage({
//   //     path: "/search",
//   //     matchPath: "/search/*",
//   //     component: path.resolve(`src/pages/search.js`)
//   //   })
//   // }

//   // AUTHOR CONTENT TYPE
//   const getAuthors = makeRequest(
//     graphql,
//      `
//     {
//       allStrapiAuthors {
//         edges {
//           node {
//             id
//             name
//           }
//         }
//       }
//     }
//     `
//   ).then(result => {
//     // Create pages for each user.
//     result.data.allStrapiAuthors.edges.forEach(({ node }) => {
//       createPage({
//         path: `/author/${node.name.split(" ").map((category) => category.toLowerCase()).join("-")}`,
//         component: path.resolve(`src/templates/author.js`),
//         context: {
//           id: node.id,
//         },
//       })
//     })
//   })

//   // BLOG CONTENT TYPES
//   const getArticles = makeRequest(
//     graphql,
//     `
//     {
//       allStrapiArticle {
//         edges {
//           node {
//             id
//             title
//             published_at
//           }
//         }
//       }
//       allStrapiCategory {
//         edges {
//           node {
//             id
//             title
//           }
//         }
//       }
//     }
//     `
//   ).then(result => {
//     // // Create pages for each article.
//     // result.data.allStrapiArticle.edges.forEach(({ node }) => {
//     //   createPage({
//     //     path: `/blog/${node.id}`,
//     //     component: path.resolve(`src/templates/article.js`),
//     //     context: {
//     //       id: node.id,
//     //     },
//     //   })
//     // })

//     if (result.errors) throw result.errors;

//     const articles = result.data.allStrapiArticle.edges;
//     articles.forEach((article, index) => {
//       const previous = index === articles.length - 1 ? null : articles[index + 1].node;
//       const next = index === 0 ? null : articles[index - 1].node;

//       createPage({
//         path: `/article/${article.node.title.split(/[\s,%]+/).map((a) => a.toLowerCase()).join("-")}`,
//         component: path.resolve(`src/templates/article.js`),
//         context: {
//           id: article.node.id,
//           previous,
//           next,
//         }
//       })
//     })

//     // ARCHIVE PAGINATION
//     const postsPerPage = 10;
//     const numPages = Math.ceil(articles.length / postsPerPage);

//     Array.from({ length: numPages }).forEach((_, i) => {
//       createPage({
//         path: i === 0 ? `/archive/1` : `/archive/${i + 1}`,
//         component: path.resolve('src/pages/archive.js'),
//         context: {
//           limit: postsPerPage,
//           skip: i * postsPerPage,
//           numPages,
//           currentPage: i + 1,
//         }
//       })
//     })

//     // // CATEGORY PAGINATION
//     // const countCategories = result.data.allStrapiCategory.edges.reduce((prev, curr) => {
//     //   prev[curr] = (prev[curr] || 0) + 1
//     //   return prev
//     // }, {})
//     // const allCategories = Object.keys(countCategories)

//     // allCategories.forEach((cat, i) => {
//     //   const link = `/category/${kebabCase(cat)}`

//     //   Array.from({
//     //     length: Math.ceil(countCategories[cat] / postsPerPage),
//     //   }).forEach((_, i) => {
//     //     createPage({
//     //       path: i === 0 ? link : `${link}/page/${i + 1}`,
//     //       component: path.resolve(`src/templates/category.js`),
//     //       context: {
//     //         allCategories: allCategories,
//     //         category: cat,
//     //         limit: postsPerPage,
//     //         skip: i * postsPerPage,
//     //         currentPage: i + 1,
//     //         numPages: Math.ceil(countCategories[cat] / postsPerPage),
//     //       },
//     //     })
//     //   })
//     // })
//   })

//   const getCategories = makeRequest(
//     graphql,
//     `
//     {
//       allStrapiCategory {
//         edges {
//           node {
//             id
//             title
//           }
//         }
//       }
//     }
//     `
//   ).then(result => {
//     // Create pages for each Category.
//     result.data.allStrapiCategory.edges.forEach(({ node }) => {
//       createPage({
//         path: `/category/${node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`,
//         component: path.resolve(`src/templates/category.js`),
//         context: {
//           id: node.id,
//         },
//       })
//     })

//     // PAGINATION
//     // const postsPerPage = 10;
//     // const numPages = Math.ceil(result.allStrapiCategory.edges.node.articles.length / postsPerPage);

//     // result.data.allStrapiCategory.edges.forEach(({ node }) => {
//     //   const categoryArticles = result.data.allStrapiArticle.edges.filter(article => article.node.category.title.split(" ").join("-") == node.title.split(" ").join("-"))
//     //   const postsPerPage = 10;
//     //   const numPages = Math.ceil(categoryArticles.length / postsPerPage);

//     //   // Array.from({ length: numPages }).map((_, i) => {
//     //   Array.from({ length: numPages }).forEach((_, i) => {
//     //     createPage({
//     //       path: i === 0 ? `/category/${node.title.split(" ").join("-")}/1` : `/category/${node.title.split(" ").join("-")}/${i + 1}`,
//     //       component: path.resolve(`src/templates/category.js`),
//     //       context: {
//     //         limit: postsPerPage,
//     //         skip: i * postsPerPage,
//     //         numPages,
//     //         currentPage: i + 1,
//     //       }
//     //     })
//     //   })
//     // })

//     // const postsPerPage = 10;
//     // const numPages = Math.ceil(result.allStrapiCategory.edges.node.articles.length / postsPerPage);
//     // Array.from({ length: numPages }).forEach((_, i) => {
//     //   createPage({
//     //     path: i === 0 ? `/category/${node.title.split(" ").join("-")}/1` : `/category/${node.title.split(" ").join("-")}/${i + 1}`,
//     //     component: path.resolve(`src/templates/category.js`),
//     //     context: {
//     //       limit: postsPerPage,
//     //       skip: i * postsPerPage,
//     //       numPages,
//     //       currentPage: i + 1,
//     //     }
//     //   })
//     // })
//   })

//   // MAGAZINE CONTENT TYPES
//   const getIssues = makeRequest(
//     graphql,
//     `
//     {
//       allStrapiMagazineIssue {
//         edges {
//           node {
//             id
//             issue
//           }
//         }
//       }
//     }
//     `
//   ).then(result => {
//     // Create pages for each Issue.
//     result.data.allStrapiMagazineIssue.edges.forEach(({ node }) => {
//       createPage({
//         path: `/magazine/${node.issue.split(" ").map((category) => category.toLowerCase()).join("-")}}`,
//         component: path.resolve(`src/templates/issue.js`),
//         context: {
//           id: node.id,
//         },
//       })
//     })
//   })

//   // SINGLE TYPES
//   const getAbout = makeRequest(
//     graphql,
//     `
//     {
//       allStrapiAbout {
//         edges {
//           node {
//             id
//           }
//         }
//       }
//     }
//     `
//   ).then(result => {
//     // Create pages for each About.
//     result.data.allStrapiAbout.edges.forEach(({ node }) => {
//       createPage({
//         path: `/about/`,
//         component: path.resolve(`src/templates/about.js`),
//         context: {
//           id: node.id,
//         },
//       })
//     })
//   })

//   const getSubscribe = makeRequest(
//     graphql,
//     `
//     {
//       allStrapiSubscribe {
//         edges {
//           node {
//             id
//           }
//         }
//       }
//     }
//     `
//   ).then(result => {
//     // Create pages for each Subscribe.
//     result.data.allStrapiSubscribe.edges.forEach(({ node }) => {
//       createPage({
//         path: `/subscribe/`,
//         component: path.resolve(`src/templates/subscribe.js`),
//         context: {
//           id: node.id,
//         },
//       })
//     })
//   })

//   // Queries for articles and authors nodes to use in creating pages.
//   return Promise.all([
//     getAuthors,
//     getArticles, 
//     getCategories,
//     getIssues,
//     getAbout,
//     getSubscribe,
//   ])
// }

// W/  onCreateNode

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        articles: allStrapiArticle {
          edges {
            node {
              id
              title
            }
          }
        }
        categories: allStrapiCategory {
          edges {
            node {
              id
              title
              articles {
                id
                title
              }
            }
          }
        }
        authors: allStrapiAuthors {
          edges {
            node {
              id
              name
            }
          }
        }
        issues: allStrapiMagazineIssue {
          edges {
            node {
              id
              title
            }
          }
        }
        about: allStrapiAbout {
          edges {
            node {
              id
            }
          }
        }
        staff: allStrapiStaffListing {
          edges {
            node {
              id
            }
          }
        }
        subscribe: allStrapiSubscribe {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog articles pages.
  const articles = result.data.articles.edges;
  const categories = result.data.categories.edges;
  const authors = result.data.authors.edges;
  const issues = result.data.issues.edges;
  const about = result.data.about.edges;
  const staff = result.data.staff.edges;
  const subscribe = result.data.subscribe.edges;

  // ARTICLE CONTENT TYPE
  // const ArticleTemplate = require.resolve("./src/templates/article.js");
  articles.forEach((article, index) => {
    const previous = index === articles.length - 1 ? null : articles[index + 1].node;
    const next = index === 0 ? null : articles[index - 1].node;

    createPage({
      // path: `/article/${article.node.title.split(/[\s\.\,\\\/\#\!\$\%\^\&\*\;\:\{\}\=\-\_\`\~\(\)]+/).map((a) => a.toLowerCase()).join("-")}`,
      path: `/article/${article.node.title.split(/[\s!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`,
      component: path.resolve(`src/templates/article.js`),
      context: {
        id: article.node.id,
        previous,
        next,
      },
    });
  });

  // ARCHIVE PAGINATION
  // const articles = result.data.allStrapiArticle.edges;
  const postsPerPage = 10;
  const numPages = Math.ceil(articles.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/archive/1` : `/archive/${i + 1}`,
      component: path.resolve('src/pages/archive.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      }
    })
  })

  // CATEGORY CONTENT TYPE
  // const CategoryTemplate = require.resolve("./src/templates/category.js");
  categories.forEach((category, index) => {
    createPage({
      path: `/category/${category.node.title.split(" ").map((cat) => cat.toLowerCase()).join("-")}`,
      component: path.resolve(`src/templates/category.js`),
      context: {
        id: category.node.id,
      },
    });
  });

  // AUTHOR CONTENT TYPE
  authors.forEach(({ node }) => {
    createPage({
      path: `/author/${node.name.split(" ").map((a) => a.toLowerCase()).join("-")}`,
      component: path.resolve(`src/templates/author.js`),
      context: {
        id: node.id,
      },
    })
  })

  // MAGAZINE ISSUE CONTENT TYPE
  issues.forEach(({ node }) => {
    createPage({
      path: `/magazine/${node.title.split(" ").map((a) => a.toLowerCase()).join("-")}}`,
      component: path.resolve(`src/templates/issue.js`),
      context: {
        id: node.id,
      },
    })
  })

  // SINGLE TYPES
  // ABOUT
  about.forEach(({ node }) => {
    createPage({
      path: `/about/`,
      component: path.resolve(`src/templates/about.js`),
      context: {
        id: node.id,
      },
    })
  })

  // STAFF
  staff.forEach(({ node }) => {
    createPage({
      path: `/staff/`,
      component: path.resolve(`src/templates/staff.js`),
      context: {
        id: node.id,
      },
    })
  })

  // SUBSCRIBE
  subscribe.forEach(({ node }) => {
    createPage({
      path: `/subscribe/`,
      component: path.resolve(`src/templates/subscribe.js`),
      context: {
        id: node.id,
      },
    })
  })
};

module.exports.onCreateNode = async ({ node, actions, createNodeId }) => {
  const crypto = require(`crypto`);

  if (node.internal.type === "StrapiArticle") {
    const newNode = {
      id: createNodeId(`StrapiArticleContent-${node.id}`),
      parent: node.id,
      children: [],
      internal: {
        content: node.content || " ",
        type: "StrapiArticleContent",
        mediaType: "text/markdown",
        contentDigest: crypto
          .createHash("md5")
          .update(node.content || " ")
          .digest("hex"),
      },
    };
    actions.createNode(newNode);
    actions.createParentChildLink({
      parent: node,
      child: newNode,
    });
  }
};