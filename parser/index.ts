import type { Token, TokenType } from '../tokenizer/tokenTypes';
import { TokenTypes } from '../tokenizer/tokenTypes';
import { BinOp, Expression, UnOp, Integer, Grouping, Float } from './parserTypes';

export class Parser {
  tokens: Token[];
  currentTokenIndex: number;
  tokensLength: number;
  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.currentTokenIndex = 0;
    this.tokensLength = tokens.length;
  }

  get currentToken(): Token {
    return this.tokens[this.currentTokenIndex]
  }
  get prevToken() {
    return this.tokens[this.currentTokenIndex - 1];
  }
  get nextToken() {
    return this.tokens[this.currentTokenIndex + 1];
  }

  currentTokenIsOneOf(arr: TokenType[]) {
    if (this.currentTokenIndex >= this.tokens.length) {
      return false;
    } else if (arr.some(x => x === this.currentToken.type)) {
      this.currentTokenIndex += 1;
      return true;
    }
    return false;
  }
  currentTokenMatches(tokenType: TokenType) {
    if (this.currentTokenIndex >= this.tokensLength) {
      return false;
    } else if (this.currentToken.type !== tokenType) {
      return false;
    }
    this.currentTokenIndex += 1;
    return true;
  }

  primary(): Expression {
    if (this.currentTokenMatches(TokenTypes.Int)) {
      return new Integer(Number(this.prevToken.literal));
    } else if (this.currentTokenMatches(TokenTypes.Float)) {
      return new Float(Number(this.prevToken.literal))
    } else if (this.currentTokenMatches(TokenTypes.LParen)) {
      const expr = this.expr();
      if (!this.currentTokenMatches(TokenTypes.RParen)) {
        throw new Error('Expected ")"');
      } else {
        return new Grouping(expr);
      }
    }
    return new Expression(); // doing this to satisfy ts
  }
  unary(): Expression {
    if (this.currentTokenIsOneOf([TokenTypes.Not, TokenTypes.Minus, TokenTypes.Plus])) {
      const op = this.prevToken;
      const operand = this.unary();
      return new UnOp(op, operand);
    }
    return this.primary();

  }
  factor(): Expression { // * or /
    return this.unary();
  }
  term(): Expression { // - or +
    let expr: Expression = this.factor();
    while (this.currentTokenIsOneOf([TokenTypes.Mult, TokenTypes.Div])) {
      const op = this.prevToken;
      const right = this.factor();
      expr = new BinOp(op, expr, right);
    }
    return expr;
  }
  expr(): Expression { // evaluates to a result
    let expr = this.term();
    while (this.currentTokenIsOneOf([TokenTypes.Plus, TokenTypes.Minus])) {
      const op = this.prevToken;
      const right = this.term();
      expr = new BinOp(op, expr, right);
    }
    return expr;
  }
  parse() {
    const ast = this.expr();
    return ast;
  }
}