const { Lexer } = require("./Lexer");

class Parser {
  constructor() {
    this.string = '';
    this.lexer = new Lexer();
  }
  
  parse(string) {
    this.string = string;
    this.lexer.init(string);

    this.right = this.lexer.getNextToken();

    return this.Program();
  }

  Program() {
    return {
      type: 'Program',
      body: this.StatementList()
    };
  }

  StatementList(noLookAhead = null) {
    const statementList = [this.Statement()];

    while (this.right != null && this.right.type !== noLookAhead) {
      statementList.push(this.Statement());
    }

    return statementList;
  }

  Statement() {
    switch (this.right.type) {
      case 'SEMICOLON': return this.EmptyStatement();
      case 'CURLOPEN': return this.BlockStatement();
      case 'DECLARE_LET': return this.VariableDeclarationStatement();
      case 'DECLARE_CONST': return this.VariableDeclarationStatement();
      case 'DECLARE_VAR': return this.VariableDeclarationStatement();
      default: return this.ExpressionStatement();
    }
  }

  VariableDeclarationStatement() {
    const decType = this.right.type;
    this.consume(decType);
    const declarations = this.VariableDeclarationList(decType);
    this.consume('SEMICOLON');

    return {
      type: 'VariableDeclarationStatement',
      declarations
    }
  }

  VariableDeclarationList(decType) {
    const decList = [this.VariableDeclaration(decType)];

   while (this.right.type === 'COMMA') {
     this.consume('COMMA');
     decList.push(this.VariableDeclaration(decType));
   } 

   return decList;
  }

  VariableDeclaration(decType) {
    const id = this.Identifier();

    let init;
    if (['SEMICOLON', 'COMMA'].includes(this.right.type)) {
      init = null;
    } else {
      init = this.VariableInitializer();
    }

    return {
      type: 'VariableDeclaration',
      sub: decType,
      id, init
    }
  }

  VariableInitializer() {
    this.consume('ASSIGN');
    return this.AssignmentExpression();
  }

  EmptyStatement() {
    this.consume('SEMICOLON');
    return {
      type: 'EmptyStatement'
    }
  }

  ExpressionStatement() {
    const expression = this.Expression();
    this.consume('SEMICOLON');
    return {
      type: 'ExpressionStatement',
      expression
    }
  }

  BlockStatement() {
    this.consume('CURLOPEN');
    const body = this.right.type !== 'CURLCLOSE' ?
      this.StatementList('CURLCLOSE') :
      [];
    this.consume('CURLCLOSE');

    return {
      type: 'BlockStatement',
      body
    }
  }

  Expression() {
    return this.AssignmentExpression();
  }

  AssignmentExpression() {
    let left = this.BinAddExpression();

    console.log(this.right.type);
    if ([
      'ASSIGN', 'ASSIGN_ADD', 
      'ASSIGN_REM', 'ASSIGN_MUL', 
      'ASSIGN_DIV',
    ].includes(this.right.type)) {
      console.log("shid2")
      const opType = this.right.type;
      this.consume(this.right.type);

      console.log("shid")
      left = this.validateCanAssign(left);

      return {
        type: 'AssignmentExpression',
        operator: opType,
        left,
        right: this.AssignmentExpression()
      }
    } else {
      return left;
    }
  }

  AssignmentTarget() {
    return this.Identifier();
  }

  validateCanAssign(node) {
    if (node.type === 'Identifier') {
      return node;
    }

    throw new SyntaxError(`Invalid assignment target!`);
  }

  BinMultExpression() {
    let left = this.PrimaryExpression();
    
    while (['MULT', 'DIV'].includes(this.right.type)) {
      const operator = this.consume(this.right.type).type;
      const right = this.PrimaryExpression();

      left = {
        type: 'BinaryExpression',
        operator, left, right
      };
    }

    return left;
  }

  BinAddExpression() {
    let left = this.BinMultExpression();

    while (['PLUS', 'MINUS'].includes(this.right.type)) {
      const operator = this.consume(this.right.type).type;
      const right = this.BinMultExpression();

      left = {
        type: 'BinaryExpression',
        operator, left, right
      };
    }

    return left;
  }

  PrimaryExpression() {
    if (this.isLiteral(this.right)) {
      return this.Literal();
    }
    switch (this.right.type) {
      case ('PAROPEN'):
        return this.ParanthesisedPrimary();
      default: 
        return this.AssignmentTarget();
    }
  }

  ParanthesisedPrimary() {
    this.consume('PAROPEN');
    const expression = this.Expression();
    this.consume('PARCLOSE');
    return expression;
  }

  Identifier() {
    const token = this.consume('IDENTIFIER');
    return {
      type: 'Identifier',
      value: token.value
    }
  }

  Literal() {
    if (this.right === null) throw new SyntaxError("Expected a literal!");

    switch (this.right.type) {
      case 'INTEGER': return this.IntLiteral();
      case 'BIN': return this.BinLiteral();
      case 'OCT': return this.OctLiteral();
      case 'HEX': return this.HexLiteral();
      case 'FLOAT': return this.FloatLiteral();
      case 'STRING': return this.StringLiteral();
      default:
        throw new SyntaxError(`Unexpected literal! Got: ${this.right.type}`)
    }
  }

  isLiteral(token) {
    return [
      'INTEGER', 'BIN',
      'OCT', 'HEX', 'FLOAT',
      'STRING'
    ].includes(token.type);
  }

  StringLiteral() {
    console.log("STRING LITERAL")
    const token = this.consume('STRING');
    return {
      type: 'StringLiteral',
      value: token.value.slice(1,-1)
    }
  }

  IntLiteral() {
    console.log("INTEGER LITERAL");
    const token = this.consume('INTEGER');
    console.log(`Raw value: ${token.value}, Type: ${token.type}`)
    return {
      type: 'NumericLiteral',
      value: Number.parseInt(token.value)
    }
  }

  BinLiteral() {
    console.log("BIN LITERAL");
    const token = this.consume('BIN');
    console.log(`Raw value: ${token.value}, Type: ${token.type}`);
    return {
      type: 'NumericLiteral',
      value: Number.parseInt(token.value.slice(2), 2)
    };
  }

  OctLiteral() {
    console.log("OCT LITERAL");
    const token = this.consume('OCT');
    const check = token.value.slice(0,2) === "0o" || token.value.slice(0,2) === "0O";
    const value = check ?
      Number(token.value) :
      Number.parseInt(token.value, 8);
    console.log(`Raw value: ${token.value}, Type: ${token.type}`);
    return {
      type: 'NumericLiteral',
      value: value
    };
  }

  HexLiteral() {
    console.log("HEX LITERAL");
    const token = this.consume('HEX');
    console.log(`Raw value: ${token.value}, Type: ${token.type}`);
    return {
      type: 'NumericLiteral',
      value: Number.parseInt(token.value, 16)
    };
  }

  FloatLiteral() {
    const token = this.consume('FLOAT');
    console.log(`FLOAT LITERAL ${token.type} ${token.value}`)
    return {
      type: 'NumericLiteral',
      value: Number.parseFloat(token.value)
    }
  }

  consume(tokenType) {
    const token = this.right;

    if (token == null) {
      throw new SyntaxError(`Unexpected EOI, expected: ${tokenType}`)
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(`Unexpected token type: got ${token.type}, expected ${tokenType}`);
    }

    this.right = this.lexer.getNextToken();
    return token;
  }
}

module.exports = {
  Parser
}