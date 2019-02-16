const matter = require("gray-matter");
const marked = require("marked");
const fs = require('fs');

const mdFileContents = fs.readFileSync("pages/about.md");
const matterParsed = matter(mdFileContents);

if (matterParsed.content) {
  console.log(marked(matterParsed.content));
}

