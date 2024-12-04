import { TokenTypes, Keywords } from './tokenTypes'
import type { Token } from './tokenTypes'

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
      case '\n': 
        this.line += 1;
        this.pos += 1;
      break;
      case '{':
        tok.type = TokenTypes.LBrace;
        tok.literal = '{';
        this.pos += 1;
        break;
      case '}':
        tok.type = TokenTypes.RBrace;
        tok.literal = '}';
        this.pos += 1;
        break;
      case '|':
        if (this.input[this.pos + 1] == '|') {
          tok.type = TokenTypes.Or;
          tok.literal = '||';
          this.pos += 2;
        } else {
          this.pos += 1;
        }
        break;
      case '&':
        if (this.input[this.pos + 1] == '&') {
          tok.type = TokenTypes.And;
          tok.literal = '&&';
          this.pos += 2;
        } else {
          this.pos += 1;
        }
        break;
      case '(':
        tok.type = TokenTypes.LParen;
        tok.literal = '(';
        this.pos += 1;
        break;
      case ')':
        tok.type = TokenTypes.RParen;
        tok.literal = ')';
        this.pos += 1;
      break;
      case '!':
        if (this.input[this.pos + 1] == '=') {
          tok.type = TokenTypes.Neq;
          tok.literal = '!=';
          this.pos += 2;
        } else {
          tok.type = TokenTypes.Not;
          tok.literal = '!';
          this.pos += 1;
        }
      break;
      case '/':
        tok.type = TokenTypes.Div;
        tok.literal = '/';
        this.pos += 1;
        break;
      case '*':
        tok.type = TokenTypes.Mult;
        tok.literal = '*';
        this.pos += 1;
        break;
      case '>':
        tok.type = TokenTypes.Gt;
        tok.literal = '>';
        this.pos += 1;
        break;
      case '<':
        tok.type = TokenTypes.Lt;
        tok.literal = '<';
        this.pos += 1;
        break;
      case '=':
        if (this.input[this.pos + 1] == '=') {
          tok.type = TokenTypes.Eq;
          tok.literal = '==';
          this.pos += 2;
        } else {
          tok.type = TokenTypes.Assign;
          tok.literal = '=';
          this.pos += 1;
        }
        break;
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
        console.log('cur ', this.currentChar);
        if (isLetter(this.currentChar)) {
          tok.literal = this.readIdentifier();
          const keyword = Keywords.get(tok.literal);
          if (keyword) {
            tok.type = keyword
          } else {
            tok.type = TokenTypes.Ident;
          }
        } else if (isDigit(this.currentChar)) {
          tok.literal = this.readNumber();
          tok.type = TokenTypes.Int;
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
  readNumber(): string {
    const startPos = this.pos;
    while (this.pos <= this.inputLength - 1 && isDigit(this.input[this.pos])) {
      this.pos += 1;
    }
    return this.input.substring(startPos, this.pos);
  }
}
function isDigit(str: string) {
  return str.length === 1 && !isNaN(parseInt(str));
}

function isLetter(str: string) {
  const isLowerCase = str >= 'a' && str <= 'z';
  const isUpperCase = str >= 'A' && str <= 'Z';
  return str.length == 1 && (isLowerCase || isUpperCase || str == '_');
}
