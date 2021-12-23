module.exports = test => {
  test(`
    4 + 10;
    7432409 - 4321423;
    8983428 - 4324 + 42342;
    8983428 + 4324 - 42342;
    8983428 - 4324 - 42342;
  `, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'BinaryExpression',
          operator: 'PLUS',
          left: {
            type: 'NumericLiteral',
            value: 4
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
          type: 'BinaryExpression',
          operator: 'MINUS',
          left: {
            type: 'NumericLiteral',
            value: 7432409
          },
          right: {
            type: 'NumericLiteral',
            value: 4321423
          }
        }
      },
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'BinaryExpression',
          operator: 'PLUS',
          left: {
            type: 'BinaryExpression',
            operator: 'MINUS',
            left: {
              type: 'NumericLiteral',
              value: 8983428
            },
            right: {
              type: 'NumericLiteral',
              value: 4324
            }
          },
          right: {
            type: 'NumericLiteral',
            value: 42342
          }
        }
      },
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'BinaryExpression',
          operator: 'MINUS',
          left: {
            type: 'BinaryExpression',
            operator: 'PLUS',
            left: {
              type: 'NumericLiteral',
              value: 8983428
            },
            right: {
              type: 'NumericLiteral',
              value: 4324
            }
          },
          right: {
            type: 'NumericLiteral',
            value: 42342
          }
        }
      },
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'BinaryExpression',
          operator: 'MINUS',
          left: {
            type: 'BinaryExpression',
            operator: 'MINUS',
            left: {
              type: 'NumericLiteral',
              value: 8983428
            },
            right: {
              type: 'NumericLiteral',
              value: 4324
            }
          },
          right: {
            type: 'NumericLiteral',
            value: 42342
          }
        }
      }
    ]
  })

  // 2 * 2;
  // 2 + 2 * 2;
  // 2 * 2 + 2;
  // 2 * 2 + 2 * 2;

  test(`
    2 * 2;
  `, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'BinaryExpression',
          operator: 'MULT',
          left: {
            type: 'NumericLiteral',
            value: 2
          },
          right: {
            type: 'NumericLiteral',
            value: 2
          }
        }
      }
    ]
  })

  test(`
    2 + 2 * 2;
  `, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'BinaryExpression',
          operator: 'PLUS',
          left: {
            type: 'NumericLiteral',
            value: 2
          },
          right: {
            type: 'BinaryExpression',
            operator: 'MULT',
            left: {
              type: 'NumericLiteral',
              value: 2
            },
            right: {
              type: 'NumericLiteral',
              value: 2
            }
          }
        }
      }
    ]
  })

  test(`
    2 * 2 + 2;
  `, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'BinaryExpression',
          operator: 'PLUS',
          left: {
            type: 'BinaryExpression',
            operator: 'MULT',
            left: {
              type: 'NumericLiteral',
              value: 2
            },
            right: {
              type: 'NumericLiteral',
              value: 2
            }
          },
          right: {
            type: 'NumericLiteral',
            value: 2
          }
        }
      }
    ]
  })

  test(`
    2 * 2 * 2;
  `, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'BinaryExpression',
          operator: 'MULT',
          left: {
            type: 'BinaryExpression',
            operator: 'MULT',
            left: {
              type: 'NumericLiteral',
              value: 2
            },
            right: {
              type: 'NumericLiteral',
              value: 2
            }
          },
          right: {
            type: 'NumericLiteral',
            value: 2
          }
        }
      }
    ]
  })

  test(`
    2 * 2 + 2 * 2;
  `, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'BinaryExpression',
          operator: 'PLUS',
          left: {
            type: 'BinaryExpression',
            operator: 'MULT',
            left: {
              type: 'NumericLiteral',
              value: 2
            },
            right: {
              type: 'NumericLiteral',
              value: 2
            }
          },
          right: {
            type: 'BinaryExpression',
            operator: 'MULT',
            left: {
              type: 'NumericLiteral',
              value: 2
            },
            right: {
              type: 'NumericLiteral',
              value: 2
            }
          }
        }
      }
    ]
  })
}