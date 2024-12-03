import { TokenTypes } from './types'
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
        break;
      case '-':
        tok.type = TokenTypes.Minus;
        tok.literal = '-';
      break;
      default:
        // if (isChar(
        break;
    }
    this.pos += 1;
    return tok;

  }
  eatWhitespace() {
    let currPos = this.pos;
    while (this.input[currPos] === ' ') {
      currPos += 1;
    }
    this.pos = currPos;
  }

  // advance() {
  //   this.pos++;
  //   if (this.pos < this.input.length) {
  //     this.currentChar = this.input[this.pos];
  //   } else {
  //     this.currentChar = '';
  //   }
  // }

  // peekNextChar() {
  //   const nextPos = this.pos + 1;
  //   if (nextPos < this.input.length) {
  //     return this.input[nextPos];
  //   } else {
  //     return '';
  //   }
  // }

}
function isLetter(str: string) {
  const isLowerCase = str >= 'a' && str <= 'z';
  const isUpperCase = str >= 'A' && str <= 'Z';
  return str.length == 1 && (isLowerCase || isUpperCase || str == '_');
}
