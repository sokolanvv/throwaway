const specification = [
  [/^\s+/, null],
  [/^\/\/.*/, null],
  [/^\/\*[\s\S]*?\*\//, null],

  [/^\blet\b/, 'DECLARE_LET'],
  [/^\bconst\b/, 'DECLARE_CONST'],
  [/^\bvar\b/, 'DECLARE_VAR'],

  [/^;/, 'SEMICOLON'],
  [/^\,/, 'COMMA'],

  [/^{/, 'CURLOPEN'],
  [/^}/, 'CURLCLOSE'],
  [/^\(/, 'PAROPEN'],
  [/^\)/, 'PARCLOSE'],

  [/^\=/, 'ASSIGN'],

  [/^\+\=/, 'ASSIGN_ADD'],
  [/^\-\=/, 'ASSIGN_REM'],
  [/^\*\=/, 'ASSIGN_MUL'],
  [/^\\\=/, 'ASSIGN_DIV'],

  [/^\+/, 'PLUS'],
  [/^\-/, 'MINUS'],
  [/^\*/, 'MULT'],
  [/^\\/, 'DIV'],

  [/^0[bB][01]+/, 'BIN'],
  [/^0[0-7]+|0[oO][0-7]+/, 'OCT'],
  [/^0[xX][0-9a-fA-F]+/, 'HEX'],
  
  [/^\d*\.\d*([eE][+-]\d+)?/, 'FLOAT'],

  [/^\d+/, 'INTEGER'],

  [/^\w[0-9\w]*/, 'IDENTIFIER'],

  [/^\"[^\"]*\"|\'[^\']*\'/, 'STRING']
];

class Lexer {
  init(string, line) {
    this.string = string;
    this.cursor = 0;
    this.line = line;
  }

  hasMoreTokens() { return this.cursor < this.string.length; }

  match(regex, string) {
    const matched = regex.exec(string);
    if (matched == null) return null;

    this.cursor += matched[0].length;
    return matched[0];
  }

  getNextToken() {
    if (!this.hasMoreTokens()) return null;

    const str = this.string.slice(this.cursor);

    for (const [regex, tType] of specification) {
      const tValue = this.match(regex, str);

      if (tValue == null) continue;
      if (tType == null) return this.getNextToken();

      return {
        type: tType, 
        value: tValue
      }
    }

    throw new SyntaxError(`Unexpected token: ${str[0]}`);
  }
}

module.exports = {
  Lexer
}