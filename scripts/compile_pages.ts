import * as matter from 'gray-matter';
import * as marked from 'marked';
import * as path from 'path';
import * as fs from 'fs';
import * as del from 'del';
import * as _ from 'lodash';

class ComponentListing {
  constructor(readonly kebabName: string,
              readonly componentModulePath: string,
              readonly componentFilePath: string,
              readonly componentName: string) {
  }
}

const renderer = new marked.Renderer();
const normalLinkRenderer = renderer.link.bind(renderer);
renderer.link = (href, title, text) => {
  if (!href || /^(?:[a-z]+:)?\/\//i.test(href)) {
    return normalLinkRenderer(href, title, text);
  } else {
    return normalLinkRenderer(href, title, text).replace(/href="/i, 'routerLink="');
  }
};

// ##########################################################################
// ##########################################################################
// ##########################################################################
const ANGULAR_CONFIG = 'angular.json';
const angular = JSON.parse(fs.readFileSync(ANGULAR_CONFIG).toString('utf8'));
const OUTPUT_ROOT = angular.projects[angular.defaultProject].sourceRoot;
const COMPONENTS_DIR = `${OUTPUT_ROOT}/app/components/pages`;

const componentsList: ComponentListing[] = [];

// ##########################################################################
// ##########################################################################
// ##########################################################################
function clean() {
  if (fs.existsSync(COMPONENTS_DIR)) {
    del.sync(COMPONENTS_DIR);
  }
  // @ts-ignore
  fs.mkdirSync(COMPONENTS_DIR, {recursive: true});
}

// ##########################################################################
// ##########################################################################
// ##########################################################################
function recursiveParseMarkdown(filePath) {
  const stats = fs.statSync(filePath);
  if (stats.isDirectory()) {
    const filesList = fs.readdirSync(filePath);
    // @ts-ignore
    fs.mkdirSync(OUTPUT_ROOT + path.sep + filePath, {recursive: true});
    for (const f of filesList) {
      recursiveParseMarkdown(filePath + path.sep + f);
    }
  } else if (stats.isFile() && /\.md$/.test(filePath)) {
    const mdFileContents = fs.readFileSync(filePath);
    const parsedPath = path.parse(filePath);
    const matterParsed = matter(mdFileContents);
    const pageHtml = marked(matterParsed.content, {renderer: renderer});
    let pathPagesRemoved = _.kebabCase(`${parsedPath.dir}${path.sep}${parsedPath.name}`);
    pathPagesRemoved = _.replace(pathPagesRemoved, /^pages-/i, '');
    const componentClassName = 'Page' + _.upperFirst(_.camelCase(pathPagesRemoved)) + 'Component';

    const componentListing = new ComponentListing(
      pathPagesRemoved,
      `./components/pages/${pathPagesRemoved}.component`,
      `${COMPONENTS_DIR}${path.sep}${pathPagesRemoved}.component.ts`,
      componentClassName
    );
    componentsList.push(componentListing);
    // write component file
    const componentTemplate = _.template(fs.readFileSync('./scripts/component_template.tst').toString('utf8'));
    const componentOutput = componentTemplate({
      gnr8d_html_escaped: _.replace(pageHtml, /`/g, '\`'),
      gnr8d_component_classname: componentClassName
    });
    fs.writeFileSync(componentListing.componentFilePath, componentOutput);
  }
}

function writeAngularModuleFiles() {
  // write imports in routes file
  const routerTemplate = _.template(fs.readFileSync('./scripts/app-routing.module_template.tst').toString('utf8'));
  const routerOutput = routerTemplate({
    gnr8d_component_imports: _.join(_.map(componentsList, c => `import { ${c.componentName} } from '${c.componentModulePath}';`), '\n'),
    gnr8d_additional_routes: _.join(_.map(componentsList, c => `{ path: '${c.kebabName}', component: ${c.componentName} },`), '\n  ')
  });
  fs.writeFileSync(`${OUTPUT_ROOT}/app/app-routing.module.ts`, routerOutput);

  const moduleTemplate = _.template(fs.readFileSync('./scripts/app.module_template.tst').toString('utf8'));
  const moduleOutput = moduleTemplate({
    gnr8d_component_imports: _.join(_.map(componentsList, c => `import { ${c.componentName} } from '${c.componentModulePath}';`), '\n'),
    gnr8d_component_declarations: _.join(_.map(componentsList, c => `${c.componentName},`), '\n    ')
  });
  fs.writeFileSync(`${OUTPUT_ROOT}/app/app.module.ts`, moduleOutput);

}

// ##########################################################################
// ##########################################################################
// ##########################################################################
clean();
recursiveParseMarkdown('pages');
writeAngularModuleFiles();
