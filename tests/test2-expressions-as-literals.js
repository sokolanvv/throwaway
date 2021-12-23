module.exports = test => {
  test(`
    12353;
    "string";
    'why?';
  `, {
    type: 'Program',
    body: [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "NumericLiteral",
          "value": 12353
        }
      },
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "StringLiteral",
          "value": 'string'
        }
      },
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "StringLiteral",
          "value": 'why?'
        }
      }
    ]
  })
}