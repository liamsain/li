import type { Token, TokenType } from '../tokenizer/tokenTypes';
import { TokenTypes } from '../tokenizer/tokenTypes';
import { Bool, LiString, BinOp, Expression, UnOp, Integer, Grouping, Float } from './parserTypes';

export class Parser {
  tokens: Token[];
  currentTokenIndex: number;
  tokensLength: number;
  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.currentTokenIndex = 0;
    this.tokensLength = tokens.length;
  }

  currentTokenIsOneOf(arr: TokenType[]) {
    if (this.currentTokenIndex >= this.tokens.length) {
      return false;
    } else if (arr.some(x => x === this.tokens[this.currentTokenIndex].type)) {
      return true;
    }
    return false;
  }
  currentTokenMatches(tokenType: TokenType) {
    if (this.currentTokenIndex >= this.tokensLength) {
      const prev = this.tokens[this.currentTokenIndex - 1];
      console.error(`Parser error: Found ${prev.literal} at the end of parsing at line ${prev.line}`);
      return false;
    } else if (this.tokens[this.currentTokenIndex].type !== tokenType) {
      return false;
    }
    return true;
  }

  primary(): Expression {
    const currentTok = this.tokens[this.currentTokenIndex];
    if (this.currentTokenIsOneOf([TokenTypes.True, TokenTypes.False])) {
      console.log(currentTok);
      const result = new Bool(currentTok.literal === 'true', currentTok.line);
      this.currentTokenIndex += 1;
      return result;
    }
    if (this.currentTokenMatches(TokenTypes.String)) {
      const result = new LiString(String(currentTok.literal), currentTok.line);
      this.currentTokenIndex += 1;
      return result;
    }
    if (this.currentTokenMatches(TokenTypes.Int)) {
      const result = new Integer(Number(currentTok.literal), currentTok.line);
      this.currentTokenIndex += 1;
      return result
    } else if (this.currentTokenMatches(TokenTypes.Float)) {
      const result = new Float(Number(currentTok.literal), currentTok.line)
      this.currentTokenIndex += 1;
      return result;
    } else if (this.currentTokenMatches(TokenTypes.LParen)) {
      this.currentTokenIndex += 1;
      const expr = this.addSub();
      if (!this.currentTokenMatches(TokenTypes.RParen)) {
        const tok = this.tokens[this.currentTokenIndex];
        throw new Error(`Parser error: Expected ')' at line ${tok.line}, but received '${tok.literal}'`);
      } else {
        const tok = this.tokens[this.currentTokenIndex];
        return new Grouping(expr, tok.line);
      }
    }
    return new Expression(); // doing this to satisfy ts
  }

  unary(): Expression {
    if (this.currentTokenIsOneOf([TokenTypes.Not, TokenTypes.Minus, TokenTypes.Plus])) {
      const op = this.tokens[this.currentTokenIndex];
      this.currentTokenIndex += 1;
      const operand = this.unary();
      return new UnOp(op, operand, op.line);
    }
    return this.primary();
  }


  multiDiv(): Expression {
    let expr: Expression = this.unary();
    while (this.currentTokenIsOneOf([TokenTypes.Mult, TokenTypes.Div, TokenTypes.Mod])) {
      const op = this.tokens[this.currentTokenIndex];
      this.currentTokenIndex += 1;
      const right = this.unary();
      expr = new BinOp(op, expr, right, op.line);
    }
    return expr;
  }

  addSub(): Expression {
    let expr = this.multiDiv();
    while (this.currentTokenIsOneOf([TokenTypes.Plus, TokenTypes.Minus])) {
      const op = this.tokens[this.currentTokenIndex];
      this.currentTokenIndex += 1;
      const right = this.multiDiv();
      expr = new BinOp(op, expr, right, op.line);
    }
    return expr;
  }

  parse() {
    const ast = this.addSub();
    return ast;
  }
}