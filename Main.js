const { Parser } = require('./src/Parser');
const assert = require('assert');
const { exit } = require('process');

const tests = [
  require('./tests/test2.js'),
  require('./tests/test3.js'),
  require('./tests/test4.js'),
  require('./tests/test5.js'),
  require('./tests/test6.js')
];

const parser = new Parser();

function exec() {
  const program = `
    {
      42;
      "cumballs"; 'stink souls';
    }
  `;

  const ast = parser.parse(program);

  console.log(JSON.stringify(ast, null, 2));
}

// exec();
// exit(0);

function test(prog, expect) {
  const ast = parser.parse(prog);
  assert.deepEqual(ast, expect);
}

tests.forEach(t => t(test));

console.log("All tests passed!")