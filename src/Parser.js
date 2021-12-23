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
      default: return this.ExpressionStatement();
    }
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

  // Expression
  //  : BinExpression
  //  ;

  // BinExpression
  //  : Literal
  //  | PlusExpression
  //  | MinusExpression
  //  | MultExpression
  //  | DivExpression
  //  ;

  Expression() {
    return this.BinAddExpression();
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
    return this.Literal();
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