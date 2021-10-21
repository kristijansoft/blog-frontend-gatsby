import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// import ReactMarkdown from "react-markdown"

const SubscribeTemplate = ({ data }) => (
  <Layout>
    <p>{data.strapiSubscribe.content}</p>
  </Layout>
)

export default SubscribeTemplate;

export const query = graphql`
  query SubscribeTemplate($id: String!) {
    strapiSubscribe(id: { eq: $id }) {
      markdown
    }
  }
`