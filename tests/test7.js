module.exports = test => {
  test(`
    x = 123;
  `, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: { 
          type: 'AssignmentExpression',
          operator: 'ASSIGN',
          left: {
            type: 'Identifier',
            value: 'x'
          },
          right: {
            type: 'NumericLiteral',
            value: 123
          }
        }
      }
    ]
  })
}