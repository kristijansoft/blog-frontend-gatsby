module.exports = {
  siteMetadata: {
    title: `Berkeley Science Review`,
    description: `Gatsby blog with Strapi as headless CMS`,
    // url: ,
    // image: ,
    author: `@gatsbyjs and @strapi`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        contentTypes: [
          `user`,
          `authors`,
          `article`,
          `category`,
          `magazine-issue`,
        ],
        singleTypes: [
          `about`,
          `subscribe`,
          `staff-listing`,
        ],
        queryLimit: 1000000,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
          endpoint: 'https://berkeleysciencereview.us6.list-manage.com/subscribe/post?u=6089ba0af6ca14defb3115ed3&amp;id=c29e546b96', // string; add your MC list endpoint here; see instructions below
          timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`
  ],
}
