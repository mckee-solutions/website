const matter = require("gray-matter");
const fs = require('fs');

const mdFileContents = fs.readFileSync("pages/about.md");
const matterParsed = matter(mdFileContents);

console.log(matterParsed);
