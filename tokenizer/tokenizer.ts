import { TokenTypes, Keywords } from './types'
import type { Token } from './types'

export class Tokenizer {
  input: string;
  currentChar: string = '';
  pos: number = 0;
  tokens: Token[] = [];
  inputLength: number = 0;
  line: number = 1;

  constructor(input: string) {
    this.input = input;
    this.inputLength = input.length;
  }

  getToken(): Token {
    debugger;
    this.eatWhitespace();
    if (this.pos >= this.inputLength) {
      return {
        type: TokenTypes.Eof,
        literal: ''
      }
    }
    this.currentChar = this.input[this.pos];
    const tok: Token = {
      type: TokenTypes.Illegal,
      literal: ''
    };
    switch (this.currentChar) {
      case '+':
        tok.type = TokenTypes.Plus;
        tok.literal = '+';
        this.pos += 1;
        break;
      case '-':
        tok.type = TokenTypes.Minus;
        tok.literal = '-';
        this.pos += 1;
        break;
      case ';':
        tok.type = TokenTypes.SemiColon;
        tok.literal = ';'
        this.pos += 1;
        break;
      default:
        if (isLetter(this.currentChar)) {
          tok.literal = this.readIdentifier();
          const keyword = Keywords.get(tok.literal);
          if (keyword) {
            tok.type = keyword
          } else {
            tok.type = TokenTypes.Ident;
          }
        }
        break;
    }
    return tok;
  }

  eatWhitespace() {
    let currPos = this.pos;
    while (this.input[currPos] === ' ') {
      currPos += 1;
    }
    this.pos = currPos;
  }

  readIdentifier(): string {
    const startPos = this.pos;
    while (this.pos <= this.inputLength - 1 && isLetter(this.input[this.pos])) {
      this.pos += 1;
    }
    return this.input.substring(startPos, this.pos);
  }

}


function isLetter(str: string) {
  const isLowerCase = str >= 'a' && str <= 'z';
  const isUpperCase = str >= 'A' && str <= 'Z';
  return str.length == 1 && (isLowerCase || isUpperCase || str == '_');
}
