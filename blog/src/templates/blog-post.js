import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import { H1 } from "../components/Heading";

const BlogPost = ({ data }) => {
  const { title, body, heroImage } = data.contentfulBlogPost;

  return (
    <Layout>
      <GatsbyImage image={heroImage.gatsbyImageData} alt={title} />
      <H1>{title}</H1>
      <div dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}></div>
    </Layout>
  );
};

export default BlogPost;

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      body {
        childMarkdownRemark {
          html
        }
      }
      heroImage {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          width: 960
        )
      }
    }
  }
`;
