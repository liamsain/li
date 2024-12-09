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

    this.eatWhitespace();
    this.eatComment();
    if (this.pos >= this.inputLength) {
      return {
        type: TokenTypes.Eof,
        literal: '',
        line: this.line
      }
    }
    this.currentChar = this.input[this.pos];
    const tok: Token = {
      type: TokenTypes.Illegal,
      literal: '',
      line: this.line
    };
    switch (this.currentChar) {
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
        if (this.input[this.pos + 1] == '=') {
          tok.type = TokenTypes.Gteq;
          tok.literal = '>=';
          this.pos += 2;
        } else {
          tok.type = TokenTypes.Gt;
          tok.literal = '>';
          this.pos += 1;
        }
        break;
      case '<':
        if (this.input[this.pos + 1] == '=') {
          tok.type = TokenTypes.Lteq;
          tok.literal = '<=';
          this.pos += 2;
        } else {
          tok.type = TokenTypes.Lt;
          tok.literal = '<';
          this.pos += 1;
        }
        break;
      case '%':
        tok.type = TokenTypes.Mod;
        tok.literal = '%';
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
      case '\'':
        tok.type = TokenTypes.String;
        const str = this.readString();
        tok.literal = str;
        if (str[str.length - 1] != '\'') {
          tok.type = TokenTypes.Illegal;
          tok.error = `Line ${this.line} | String was not terminated: ${str}`;
        }
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
        } else if (isDigit(this.currentChar)) {
          const numStr = this.readNumber();
          const numStrSplit = numStr.split('.');
          tok.literal = numStr;
          if (numStrSplit.length == 1) {
            tok.type = TokenTypes.Int;
          } else if (numStrSplit.length == 2) {
            tok.type = TokenTypes.Float;
          } else {
            tok.type = TokenTypes.Illegal;
          }
        }
        break;
    }
    return tok;
  }

  eatWhitespace() {
    let currPos = this.pos;
    while (true) {
      if (this.input[currPos] === ' ') {
        currPos += 1;
      } else if (this.input[currPos] == '\n') {
        this.line += 1;
        currPos += 1;
      } else {
        break;
      }
    }
    this.pos = currPos;
  }

  eatComment() {
    const isAtComment = () => this.input[this.pos] === '/' && this.input[this.pos + 1] === '/';
    const isAtNewLineCh = () => this.input[this.pos] == '\n';
    const isAtEndOfInput = () => this.pos >= this.inputLength;
    if (isAtComment()) {
      while (true) {
        while (!isAtNewLineCh() && !isAtEndOfInput()) {
          this.pos += 1;
        }
        this.eatWhitespace();
        if (!isAtComment() || isAtEndOfInput()) {
          break;
        }
      }
    }
  }

  readString(): string {
    const startPos = this.pos;
    while (this.pos <= this.inputLength - 1) {
      this.pos += 1;
      if (this.input[this.pos] == '\'') {
        this.pos += 1;
        break;
      }
    }
    return this.input.substring(startPos, this.pos);

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
    while (this.pos <= this.inputLength - 1 && (isDigit(this.input[this.pos]) || this.input[this.pos] == '.')) {
      this.pos += 1;
    }
    return this.input.substring(startPos, this.pos);
  }
}
function isDigit(ch: string) {
  return ch.length === 1 && ch >= '0' && ch <= '9';
}

function isLetter(str: string) {
  const isLowerCase = str >= 'a' && str <= 'z';
  const isUpperCase = str >= 'A' && str <= 'Z';
  return str.length == 1 && (isLowerCase || isUpperCase || str == '_');
}
