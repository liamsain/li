import type { Token } from '../tokenizer/tokenTypes';
export class Parser {
  tokens: Token[];
  currentTokenIndex: number;
  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.currentTokenIndex = 0;
  }

  currentToken() {
    return this.tokens[this.currentTokenIndex]
  }
  prevToken() {
    return this.tokens[this.currentTokenIndex - 1];
  }

  primary() { }
  unary() { }
  factor() { }
  term() { }
  expr() { }
  parse() {
    const ast = this.expr();
    return ast;
  }
}