module.exports = test => {
  test(`
    {
      471932;
      "string";
    }
  `, {
    type: 'Program',
    body: [
      {
        type: 'BlockStatement',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NumericLiteral',
              value: 471932
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'StringLiteral',
              value: 'string'
            }
          }
        ]
      }
    ]
  })

  test(`
    {
      41241;
      "string";
    }

    "no";

    {
      'wow';
      .333;
    }
  `, {
    type: 'Program',
    body: [
      {
        type: 'BlockStatement',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NumericLiteral',
              value: 41241
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'StringLiteral',
              value: 'string'
            }
          }
        ]
      }, 
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'StringLiteral',
          value: 'no'
        }
      },
      {
        type: 'BlockStatement',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'StringLiteral',
              value: 'wow'
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NumericLiteral',
              value: 0.333
            }
          }
        ]
      }
    ]
  })

  test(`
    {}
  `, {
    type: 'Program',
    body: [
      {
        type: 'BlockStatement',
        body: []
      }
    ]
  })

  test(`
    {
      "buddy";
      {
        "or";
        "a";
      }
      "boy";
    }
  `, {
    type: 'Program',
    body: [
      {
        type: 'BlockStatement',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'StringLiteral',
              value: 'buddy'
            }
          },
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'StringLiteral',
                  value: 'or'
                }
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'StringLiteral',
                  value: 'a'
                }
              }
            ]
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'StringLiteral',
              value: 'boy'
            }
          }
        ]
      }
    ]
  })
}