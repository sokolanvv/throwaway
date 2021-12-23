module.exports = test => {
  test(`
    "6234";;;;
  `, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'StringLiteral',
          value: '6234'
        }
      },
      {
        type: 'EmptyStatement'
      },
      {
        type: 'EmptyStatement'
      },
      {
        type: 'EmptyStatement'
      }
    ]
  })
}