module.exports = test => {
  test(`
    let x = 12;
  `, {
    type: 'Program',
    body: [
      {
        type: 'VariableDeclarationStatement',
        declarations: [
          {
            type: 'VariableDeclaration',
            sub: 'DECLARE_LET',
            id: {
              type: 'Identifier',
              value: 'x'
            },
            init: {
              type: 'NumericLiteral',
              value: 12
            }
          }
        ]
      }
    ]
  })

  test(`
    let x;
  `, {
    type: 'Program',
    body: [
      {
        type: 'VariableDeclarationStatement',
        declarations: [
          {
            type: 'VariableDeclaration',
            sub: 'DECLARE_LET',
            id: {
              type: 'Identifier',
              value: 'x'
            },
            init: null
          }
        ]
      }
    ]
  })

  test(`
    let x, y;
  `, {
    type: 'Program',
    body: [
      {
        type: 'VariableDeclarationStatement',
        declarations: [
          {
            type: 'VariableDeclaration',
            sub: 'DECLARE_LET',
            id: {
              type: 'Identifier',
              value: 'x'
            },
            init: null
          },
          {
            type: 'VariableDeclaration',
            sub: 'DECLARE_LET',
            id: {
              type: 'Identifier',
              value: 'y'
            },
            init: null
          }
        ]
      }
    ]
  })

  test(`
    let x, y = 12;
  `, {
    type: 'Program',
    body: [
      {
        type: 'VariableDeclarationStatement',
        declarations: [
          {
            type: 'VariableDeclaration',
            sub: 'DECLARE_LET',
            id: {
              type: 'Identifier',
              value: 'x'
            },
            init: null
          },
          {
            type: 'VariableDeclaration',
            sub: 'DECLARE_LET',
            id: {
              type: 'Identifier',
              value: 'y'
            },
            init: {
              type: 'NumericLiteral',
              value: 12
            }
          }
        ]
      }
    ]
  })
}