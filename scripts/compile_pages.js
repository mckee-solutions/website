const matter = require("gray-matter");
const marked = require("marked");
const path = require('path');
const fs = require('fs');

// ##########################################################################
// ##########################################################################
// ##########################################################################
const ANGULAR_CONFIG = "angular.json";
const angular = JSON.parse(fs.readFileSync(ANGULAR_CONFIG));
const OUTPUT_ROOT = angular.projects[angular.defaultProject].sourceRoot;
const OUTPUT_DIR = `${OUTPUT_ROOT}/pages`;

// ##########################################################################
// ##########################################################################
// ##########################################################################
function clean() {
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmdirSync(OUTPUT_DIR);
  }
}

// ##########################################################################
// ##########################################################################
// ##########################################################################
function recursiveParseMarkdown(filePath) {
  const stats = fs.statSync(filePath);
  if (stats.isDirectory()) {
    const filesList = fs.readdirSync(filePath);
    fs.mkdirSync(OUTPUT_DIR + path.sep + filePath, {recursive: true});
    for (let f of filesList) {
      recursiveParseMarkdown(filePath + path.sep + f);
    }
  } else if (stats.isFile() && /\.md$/.test(filePath)) {
    const mdFileContents = fs.readFileSync(filePath);
    const parsedPath = path.parse(filePath);
    const matterParsed = matter(mdFileContents);
    const pageHtml = marked(matterParsed.content);

  }
}

// ##########################################################################
// ##########################################################################
// ##########################################################################
clean();
recursiveParseMarkdown("pages");
