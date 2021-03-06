import React from "react";
import Layout from "../components/layout"
import { graphql } from "gatsby"
// import { Link, graphql } from "gatsby"
// import { Carousel } from 'react-bootstrap'
import Slider from "react-slick"
import Preview from "../components/preview"

const IndexPage = ({ data }) => {
  // const sortedByDate = this.props.data.allStrapiArticle.edges.sort((a, b) => {
  const sortedByDate = data.allStrapiArticle.edges.sort((a, b) => {
    let aDate = parseInt(a.node.published_at.split("T")[0].split("-").join(""))
    let bDate = parseInt(b.node.published_at.split("T")[0].split("-").join(""))
    return (bDate - aDate)
  });

  const recentArticles = sortedByDate.slice(0, 3);

  const labscopeArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title === 'Labscope')
    // document.node.categories[0].title === 'Labscope'
  )).slice(0, 5);

  const noteworthyArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title === 'Noteworthy News')
    // document.node.categories[0].title === 'Noteworthy News'
  )).slice(0, 5);

  // CAROUSEL
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const imageMap = recentArticles.map((document) => {
    // let theFluid = document.node.childImageSharp.fluid
      return (
          <div className="image-slider-container" key={theFluid.originalName}>
              <Img className="image-slider-iteree" fluid={theFluid} alt={theFluid.originalName} />
          </div>
      )
  })

  const carouselArticles = recentArticles.filter(document => (
    document.node.image
  ));

  const carouselMap = carouselArticles.map((document) => {
    return (
      <div>
        {/* <img src={document.node.image.publicURL} className="featured-img-container mb-8 mt-0 w-full" alt="" /> */}
      </div>
    )
  })

  return (
    <Layout>
      <div>
        <div id="carousel">
          {/* <Carousel>
            {recentArticles.map(document => (
              <Carousel.Item>
                {document.node.image ? <img src={document.node.image.publicURL} className="object-cover w-20 h-20" alt="" /> : ""}
                <Carousel.Caption>
                  <h3>{document.node.title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel> */}
          <Slider {...settings}>
            {carouselMap}
          </Slider>
        </div>
        <div>
          <h2 className='text-2xl font-medium pb-2 mb-4 border-b border-black leading-none'>
            Latest
          </h2>
          <ul>
            {recentArticles.map(document => (
              <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                <Preview article={document.node} format="small" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className='text-2xl font-medium pb-2 mb-4 border-b border-black leading-none'>
            Labscope
          </h2>
          <ul>
            {labscopeArticles.map(document => (
              <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                <Preview article={document.node} format="small" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className='text-2xl font-medium pb-2 mb-4 border-b border-black leading-none'>
            Noteworthy
          </h2>
          <ul>
            {noteworthyArticles.map(document => (
              <li key={document.node.id} className="mt-4 pb-4 border-b" style={{ borderBottomColor: '#e2e2e2' }}>
                <Preview article={document.node} format="small" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
  
export default IndexPage;

// gql query
export const splashQuery = graphql`
  query SplashQuery {
    allStrapiArticle(
      sort: { order: DESC, fields: published_at }
    ) {
      edges {
        node {
          id
          title
          author {
            name
          }
          content
          categories {
            id
            title
          }
          published_at
          updated_at
        }
      }
    }
  }
`

// export const splashQuery = graphql`
//   query SplashQuery {
//     allStrapiArticle(
//       sort: { order: DESC, fields: published_at }
//     ) {
//       edges {
//         node {
//           id
//           image {
//             publicURL
//           }
//           title
//           author {
//             name
//           }
//           content
//           categories {
//             id
//             title
//           }
//           published_at
//           updated_at
//         }
//       }
//     }
//   }
// `