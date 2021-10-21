// import React, { useState } from "react"
// import { graphql } from "gatsby"
// // import { Link, graphql } from "gatsby"
// // import Img from 'gatsby-image';
// import Layout from "../components/layout"
// import SEO from "../components/seo"
// // import ReactMarkdown from "react-markdown"
// import Pagination from '../components/pagination'
// import Preview from "../components/preview"

// const ArchivePage = ({ data, pageContext }) => {

//   const [articles, setArticles] = useState(data.allStrapiArticle.edges);

//   function handleFilter({ currentTarget = {} }) {
//     const { value } = currentTarget;

//     if (value === "magazine") {
//       setArticles(data.allStrapiArticle.edges.filter((document) => document.magazine !== null));
//     }

//     if (value === "blog") {
//       setArticles(data.allStrapiArticle.edges.filter((document) => document.magazine === null));
//     }

//     if (value === "none") {
//       setArticles(data.allStrapiArticle.edges);
//     }
//   }

//   // console.log(pageContext);

//   return (
//     <Layout>
//       <SEO title="Archive" />
//       <div>
//         <div className="border-b border-black mb-12 pb-4">
//           <h2 className="font-normal text-4xl leading-tight">Archive</h2>
//         </div>
//         <div>
//           <button value="blog" onClick={handleFilter}>
//             Blog
//           </button>
//           <button value="magazine" onClick={handleFilter}>
//             Magazine
//           </button>
//           <button value="none" onClick={handleFilter}>
//             None
//           </button>
//         </div>
//         <div className="container w-2/3">
//           <ul>
//             {articles.map(document => (
//               <li key={document.node.id} className="mb-6 pb-6 border-b" style={{ borderBottomColor: '#ECECF3' }}>
//                 <Preview article={document.node} format="medium" />
//               </li>
//               // <li key={document.node.id} className="flex mb-12 max-w-full border-t pt-8">
//               //     <div className="mr-4">
//               //       {
//               //         document.node.image
//               //           ?
//               //           // <Img fixed={document.node.image.childImageSharp.fixed} />
//               //           <Img fluid={document.node.image.childImageSharp.fluid} />
//               //           :
//               //           ""
//               //       }
//               //     </div>
//               //     <div className="antialiased leading-relaxed sans-serif">
//               //       <h2>
//               //         <Link to={`/blog/${document.node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}>
//               //           {document.node.title}
//               //         </Link>
//               //       </h2>
//               //       <h4>By{" "}{document.node.author.name}</h4>
//               //       {/* <ReactMarkdown
//               //         source={`${document.node.content.slice(0, 500)}...`}
//               //         transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
//               //       /> */}
//               //   </div>
//               // </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <Pagination currentPage={pageContext.currentPage} totalCount={data.allStrapiArticle.totalCount} />
//           {/* {Array.from({ length: pageContext.numPages }, (_, i) => (
//             // <Link key={`pagination-number${i + 1}`} to={`/${i === 0 ? "" : i + 1}`}>
//             <Link key={`pagination-number${i + 1}`} to={`/archive/${i + 1}`}>
//               {i + 1}
//             </Link>
//           ))} */}
//         </div>
//       </div>
//     </Layout>
//   )
// }

// export default ArchivePage;

// // gql query
// export const archiveQuery = graphql`
//   query ArchiveQuery($skip: Int! = 0, $limit: Int! = 10) {
//     allStrapiArticle(
//       sort: { fields: [published_at], order: DESC }
//       limit: $limit
//       skip: $skip
//     ) {
//       totalCount
//       edges {
//         node {
//           id
//           image {
//             publicURL
//           }
//           title
//           author {
//             id
//             name
//           }
//           content
//           categories {
//             id
//             title
//           }
//           created_at
//           published_at
//           updated_at
//         }
//       }
//     }
//   }
// `