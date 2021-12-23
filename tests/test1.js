const { Parser } = require('../src/Parser');

const parser = new Parser();

const prog = `
  /*
  * Cum balls
  */

  42;
  "cumballs";
`;

ast = parser.parse(prog);

console.log(JSON.stringify(ast, null, 2))