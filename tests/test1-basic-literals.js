module.exports = test => {
  test(`"hello";`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'StringLiteral',
          value: 'hello'
        }
      }
    ]
  })

  test(`'hello';`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'StringLiteral',
          value: 'hello'
        }
      }
    ]
  })

  test(`32;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 32
        }
      }
    ]
  })

  test(`0.3;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 0.3
        }
      }
    ]
  })

  test(`.333;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 0.333
        }
      }
    ]
  })

  test(`0.1e-1;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 0.01
        }
      }
    ]
  })

  test(`0.2e+1;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 2
        }
      }
    ]
  })

  test(`0xaef12;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 716562
        }
      }
    ]
  })

  test(`03124;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 1620
        }
      }
    ]
  })

  test(`0o3124;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 1620
        }
      }
    ]
  })

  test(`0O3124;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 1620
        }
      }
    ]
  })

  test(`0b010101;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 21
        }
      }
    ]
  })

  test(`0888;`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 888
        }
      }
    ]
  })
}