const fs = require('fs');
const path = require('path');
const j = require('jscodeshift');

function updateImportDeclaration(j, root) {
  root
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === 'react-native')
    .forEach(path => {
      const webViewSpecifier = path.node.specifiers.find(
        specifier => specifier.imported.name === 'WebView',
      );
      if (webViewSpecifier) {
        webViewSpecifier.imported.name = 'WebView';
        path.node.source.value = 'react-native-webview';
      }
    });
}

function updateCode(code) {
  const ast = j(code);
  const root = ast.find(j.Program);
  updateImportDeclaration(j, root);
  return ast.toSource();
}

function processFile(file) {
  const filePath = path.resolve(file);
  const code = fs.readFileSync(filePath, 'utf-8');
  const upgradedCode = updateCode(code);
  fs.writeFileSync(filePath, upgradedCode, 'utf-8');
}

function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile() && file.endsWith('.js')) {
      processFile(filePath);
    } else if (stats.isDirectory()) {
      processDirectory(filePath);
    }
  });
}

const srcDirectory = path.resolve('case');
processDirectory(srcDirectory);
