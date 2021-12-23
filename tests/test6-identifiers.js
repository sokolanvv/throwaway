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

  test(`
    x = y = 123;
    x += y;
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
            type: 'AssignmentExpression',
            operator: 'ASSIGN',
            left: {
              type: 'Identifier',
              value: 'y'
            },
            right: {
              type: 'NumericLiteral',
              value: 123
            }
          }
        }
      },
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: 'ASSIGN_ADD',
          left: {
            type: 'Identifier',
            value: 'x'
          },
          right: {
            type: 'Identifier',
            value: 'y'
          }
        }
      }
    ]
  })

  test(`
    x -= 10;
    x *= 10;
    x \\= 10;
  `, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: { 
          type: 'AssignmentExpression',
          operator: 'ASSIGN_REM',
          left: {
            type: 'Identifier',
            value: 'x'
          },
          right: {
            type: 'NumericLiteral',
            value: 10
          }
        }
      },
      {
        type: 'ExpressionStatement',
        expression: { 
          type: 'AssignmentExpression',
          operator: 'ASSIGN_MUL',
          left: {
            type: 'Identifier',
            value: 'x'
          },
          right: {
            type: 'NumericLiteral',
            value: 10
          }
        }
      },
      {
        type: 'ExpressionStatement',
        expression: { 
          type: 'AssignmentExpression',
          operator: 'ASSIGN_DIV',
          left: {
            type: 'Identifier',
            value: 'x'
          },
          right: {
            type: 'NumericLiteral',
            value: 10
          }
        }
      }
    ]
  })
}