const babelParser = require("@babel/parser");
const { default: babelTraverse } = require("@babel/traverse");
const babelTypes = require("@babel/types");

function _getAncestor(object) {
  if ("callee" in object) {
    return _getAncestor(object.callee.object);
  } else {
    return object.name;
  }
}

function calleeParser(source, { targetName, assignedVariable }) {
  const ast = babelParser.parse(source);
  let results = [];
  if (!assignedVariable) {
    babelTraverse(ast, {
      StringLiteral(path) {
        if (
          babelTypes.isCallExpression(path.parent) &&
          path.parent.callee.name === "require" &&
          path.node.value === targetName
        ) {
          assignedVariable = path.parentPath.parent.id.name;
        }
      }
    });
  }
  babelTraverse(ast, {
    CallExpression(path) {
      const {
        node: { callee }
      } = path;
      if (
        babelTypes.isMemberExpression(callee) &&
        _getAncestor(callee.object) === assignedVariable
      ) {
        const {
          property: { loc }
        } = callee;
        results.push(loc);
      }
    }
  });
  return results;
}

module.exports = calleeParser;
