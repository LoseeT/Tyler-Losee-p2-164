import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from 'styled-components'
import { Box, Card, Heading } from 'rebass'
import Layout from "../components/layout"
import Seo from "../components/seo"



const Grid = styled(Box)`
  display: grid;
  margin: 0;
  --w: 280px;
  --n: 2;
  gap: var(--size-gap);
  grid-template-columns: repeat(
    auto-fit,
    minmax(max(var(--w), 100%/ (var(--n) + 1) + 0.1%), 1fr)
  );
  margin-bottom: var(--size-gap);
  margin-top: var(--size-gap);
`

const IndexPage = ( {data} ) => (
  <Layout>
    <Grid>
    {
      data.allContentfulBlogPost.edges.map(edge => (
        <Card key={edge.node.id}>
          <Link to={edge.node.slug}>
            <GatsbyImage
              image={edge.node.heroImage.gatsbyImageData}
            />
          </Link>
          <Heading>
            {edge.node.title}
          </Heading>
          <div>
            {edge.node.body.childMarkdownRemark.excerpt}
          </div>
        </Card>
      ))
    }
    </Grid>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
{
  allContentfulBlogPost {
    edges {
      node {
        id
        title
        slug
        body {
          childMarkdownRemark {
            excerpt
          }
        }
        heroImage {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 600
          )
        }
      }
    }
  }
}
`