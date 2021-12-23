# JavaScript Parser written \w JS

# DOCS (decided to move to README)

```
Program
  : StatementList
  ;
```

```
StatementList
  : StatementList
  | Statement
  ;
```

```
Statement
  : EmptyStatement
  | ExpressionStatement
  | BlockStatement
  | VariableDeclarationStatement
  ;
```

```
EmptyStatement
  : SEMICOLON
  ;
```

```
ExpressionStatement
  : Expression
  ;
```

```
Expression
  : AssignmentExpression
  ;
```

```
AssignmentExpression
  : BinAddExpression
  | AssignmentExpression
  ;
```

```
BinAddExpression
  : BinMultExpression
  | BinAddExpression
  ;
```

```
BinMultExpression
  : PrimaryExpression
  ;
```

```
PrimaryExpression
  : Literal
  | ParanthisizedPrimary
  | AssignmentTarget
  ;
```

```
Literal
  : StringLiteral
  | NumericLiteral
  ;
```

```
StringLiteral
  : STRING
  ;
```

```
NumericLiteral
  : INTEGER
  | BIN
  | OCT
  | HEX
  | FLOAT
  ;
```

```
ParanthisizedPrimary
  : PAROPEN Expression PARCLOSE
  ;
```

```
AssignmentTarget
  : IDENTIFIER
  ;
```

```
BlockStatement
  : CURLOPEN StatementList CURLCLOSE
  ;
```

```
VariableDeclarationStatement
  : DECLARE_LET | DECLARE_CONST | DECLARE_VAR VariableDeclarationList
  ;
```

```
VariableDeclarationList
  : COMMA VariableDeclarationList
  | VariableDeclaration
  ;
```

```
VariableDeclaration
  : IDENTIFIER VariableInitializer
  ;
```
```
VariableInitializer
  : ASSIGN AssignmentExpression
  ;
```