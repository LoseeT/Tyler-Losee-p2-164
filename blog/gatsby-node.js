const path = require("path");
const lunr = require("lunr");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  console.log("🔍 Fetching blog post data...");
  
  const result = await graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            id
            title
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw new Error(result.errors);
  }

  const storeData = result.data.allContentfulBlogPost.edges.map(({ node }) => ({
    id: node.id,
    title: node.title.trim().toLowerCase(), 
    slug: node.slug,
  }));

  console.log("✅ Indexed Titles:", storeData.map(post => post.title));

  // Create blog post pages
  storeData.forEach(({ slug }) => {
    createPage({
      path: `${slug}`,
      component: path.resolve(__dirname, "src/templates/blog-post.js"),
      context: { slug },
    });
  });

  console.log("Blog post pages created successfully!");
  console.log("Generating search index...");
  
  const searchIndex = lunr(function () {
    this.ref("id");
    this.field("title", { boost: 15 });
    this.field("slug", { boost: 8 });
    lunr.tokenizer.separator = /[\s]+/;
    this.pipeline.remove(lunr.stopWordFilter); 
    storeData.forEach(doc => {
      this.add(doc);

      const words = doc.title.split(" ");
      words.forEach(word => {
        for (let i = 1; i <= word.length; i++) {
          this.add({
            id: doc.id,
            title: word.substring(0, i),
            slug: doc.slug
          });
        }
      });
    });
  });

  console.log("Search Index Created Successfully!");

  createPage({
    path: "/search",
    component: path.resolve(__dirname, "src/templates/search.js"),
    context: {
      index: JSON.stringify(searchIndex),
      store: storeData,
    },
  });

  console.log("Search page created successfully!");
};

exports.onPostBuild = () => {
  console.log("Gatsby build complete!");
};
