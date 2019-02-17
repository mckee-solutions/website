const matter = require("gray-matter");
const marked = require("marked");
const fs = require('fs');

const ANGULAR_CONFIG = "angular.json";

const angular = JSON.parse(fs.readFileSync(ANGULAR_CONFIG));
const OUTPUT_ROOT = angular.projects[angular.defaultProject].sourceRoot;
const OUTPUT_DIR = `${OUTPUT_ROOT}/pages`;

if (!fs.existsSync(OUTPUT_DIR)){
  fs.mkdirSync(OUTPUT_DIR, {recursive:true});
}

const mdFileContents = fs.readFileSync("pages/about.md");
const matterParsed = matter(mdFileContents);

// use matterParsed to build indexes

if (matterParsed.content) {
  fs.writeFileSync(`${OUTPUT_DIR}/about.html`, marked(matterParsed.content));
}

