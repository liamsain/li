import { describe, it, expect } from 'bun:test';
import { Tokenizer } from './tokenizer';
import { TokenTypes } from './tokenTypes';
import type { Token } from './tokenTypes';

function runTests(expected: Token[], input: string, log = false) {
  const tokenizer = new Tokenizer(input);
  for (let i = 0; i < expected.length; i++) {
    const actual = tokenizer.getToken();
    if (log) {
      console.log('expected', expected[i]);
      console.log('actual', actual);
    }
    expect(expected[i].literal).toBe(actual.literal);
    expect(expected[i].type).toBe(actual.type);
  }

}
describe('tokenizer', () => {
  it('handles plus and minus', () => {
    const input = '   +-   ';
    const expected: Token[] = [
      { type: TokenTypes.Plus, literal: '+' },
      { type: TokenTypes.Minus, literal: '-' },
      { type: TokenTypes.Eof, literal: '' },
    ];

    runTests(expected, input);
  });

  it('handles simple expression', () => {
    const input = 'x + x';
    const expected: Token[] = [
      { type: TokenTypes.Ident, literal: 'x' },
      { type: TokenTypes.Plus, literal: '+' },
      { type: TokenTypes.Ident, literal: 'x' },
      { type: TokenTypes.Eof, literal: '' },
    ];
    runTests(expected, input);
  });

  it('handles longer idents and semicolons', () => {
    const input = 'abba - abba;';
    const expected: Token[] = [
      { type: TokenTypes.Ident, literal: 'abba' },
      { type: TokenTypes.Minus, literal: '-' },
      { type: TokenTypes.Ident, literal: 'abba' },
      { type: TokenTypes.SemiColon, literal: ';' },
      { type: TokenTypes.Eof, literal: '' },
    ];
    runTests(expected, input );
  });
  it ('handles simle assignment statement', () => {
    const input = 'let num = 10;';
    const expected: Token[] = [
      {type: TokenTypes.Let, literal: 'let'},
      {type: TokenTypes.Ident, literal: 'num'},
      {type: TokenTypes.Assign, literal: '='},
      {type: TokenTypes.Int, literal: '10'},
      {type: TokenTypes.SemiColon, literal: ';'},
      {type: TokenTypes.Eof, literal: ''},
    ];
    runTests(expected, input);
  });
  it ('handles loads of sing char token types', () => {
    const input = '(first + second) / 555 * 10 - 3 > 2 < 700; { 4 * 4};!something;'
    const expected: Token[] = [
      { type: TokenTypes.LParen, literal: '(' },
      { type: TokenTypes.Ident, literal: 'first' },
      { type: TokenTypes.Plus, literal: '+' },
      { type: TokenTypes.Ident, literal: 'second' },
      { type: TokenTypes.RParen, literal: ')' },
      { type: TokenTypes.Div, literal: '/' },
      { type: TokenTypes.Int, literal: '555' },
      { type: TokenTypes.Mult, literal: '*' },
      { type: TokenTypes.Int, literal: '10' },
      { type: TokenTypes.Minus, literal: '-' },
      { type: TokenTypes.Int, literal: '3' },
      { type: TokenTypes.Gt, literal: '>' },
      { type: TokenTypes.Int, literal: '2' },
      { type: TokenTypes.Lt, literal: '<' },
      { type: TokenTypes.Int, literal: '700' },
      { type: TokenTypes.SemiColon, literal: ';' },
      { type: TokenTypes.LBrace, literal: '{' },
      { type: TokenTypes.Int, literal: '4' },
      { type: TokenTypes.Mult, literal: '*' },
      { type: TokenTypes.Int, literal: '4' },
      { type: TokenTypes.RBrace, literal: '}' },
      { type: TokenTypes.SemiColon, literal: ';' },
      { type: TokenTypes.Not, literal: '!'},
      { type: TokenTypes.Ident, literal: 'something'},
      { type: TokenTypes.SemiColon, literal: ';' },
      { type: TokenTypes.Eof, literal: '' },
    ];
    runTests(expected, input);
  });

  it ('handles loads of two char token types', () => {
    const input = '5 == 5;6 != 2; 3 || 0; 5 && 10; if (5 == 10)'
    const expected: Token[] = [
      {type: TokenTypes.Int, literal: '5' },
      {type: TokenTypes.Eq, literal: '==' },
      {type: TokenTypes.Int, literal: '5' },
      {type: TokenTypes.SemiColon, literal: ';' },
      {type: TokenTypes.Int, literal: '6' },
      {type: TokenTypes.Neq, literal: '!=' },
      {type: TokenTypes.Int, literal: '2' },
      {type: TokenTypes.SemiColon, literal: ';' },
      {type: TokenTypes.Int, literal: '3' },
      {type: TokenTypes.Or, literal: '||' },
      {type: TokenTypes.Int, literal: '0' },
      {type: TokenTypes.SemiColon, literal: ';' },
      {type: TokenTypes.Int, literal: '5' },
      {type: TokenTypes.And, literal: '&&' },
      {type: TokenTypes.Int, literal: '10' },
      {type: TokenTypes.SemiColon, literal: ';' },
      {type: TokenTypes.If, literal: 'if' },
      {type: TokenTypes.LParen, literal: '(' },
      {type: TokenTypes.Int, literal: '5' },
      {type: TokenTypes.Eq, literal: '==' },
      {type: TokenTypes.Int, literal: '10' },
      {type: TokenTypes.RParen, literal: ')' },
      {type: TokenTypes.Eof, literal: '' },
    ];
    runTests(expected, input);
  });
  it ('handles multiline programs', () => {
    const input = `let x = 10;
    let y = 5;`;
    const expected: Token[] = [
      {type: TokenTypes.Let, literal: 'let'},
      {type: TokenTypes.Ident, literal: 'x'},
      {type: TokenTypes.Assign, literal: '='},
      {type: TokenTypes.Int, literal: '10'},
      {type: TokenTypes.SemiColon, literal: ';'},
      {type: TokenTypes.Let, literal: 'let'},
      {type: TokenTypes.Ident, literal: 'y'},
      {type: TokenTypes.Assign, literal: '='},
      {type: TokenTypes.Int, literal: '5'},
      {type: TokenTypes.SemiColon, literal: ';'},
      {type: TokenTypes.Eof, literal: ''},
    ];
    runTests(expected, input);
  });

  it('handles keywords', () => {
    const input = 'fn let if else return true false';
    const expected: Token[] = [
      {type: TokenTypes.Fn, literal: 'fn'},
      {type: TokenTypes.Let, literal: 'let'},
      {type: TokenTypes.If, literal: 'if'},
      {type: TokenTypes.Else, literal: 'else'},
      {type: TokenTypes.Return, literal: 'return'},
      {type: TokenTypes.True, literal: 'true'},
      {type: TokenTypes.False, literal: 'false'},
      {type: TokenTypes.Eof, literal: ''},
    ];
    runTests(expected, input);
  });
  it('handles keywords in expressions', () => {
    const input = 'if (x == 10) { return true; } else { return false; }';
    const expected: Token[] = [
      {type: TokenTypes.If, literal: 'if'},
      {type: TokenTypes.LParen, literal: '('},
      {type: TokenTypes.Ident, literal: 'x'},
      {type: TokenTypes.Eq, literal: '=='},
      {type: TokenTypes.Int, literal: '10'},
      {type: TokenTypes.RParen, literal: ')'},
      {type: TokenTypes.LBrace, literal: '{'},
      {type: TokenTypes.Return, literal: 'return'},
      {type: TokenTypes.True, literal: 'true'},
      {type: TokenTypes.SemiColon, literal: ';'},
      {type: TokenTypes.RBrace, literal: '}'},
      {type: TokenTypes.Else, literal: 'else'},
      {type: TokenTypes.LBrace, literal: '{'},
      {type: TokenTypes.Return, literal: 'return'},
      {type: TokenTypes.False, literal: 'false'},
      {type: TokenTypes.SemiColon, literal: ';'},
      {type: TokenTypes.RBrace, literal: '}'},
      {type: TokenTypes.Eof, literal: ''},
    ];
    runTests(expected, input);
  });

  it('handles comments', () => {
    const input = `let x = 10; // this is a comment
    let y = 5;`;
    const expected: Token[] = [
      {type: TokenTypes.Let, literal: 'let'},
      {type: TokenTypes.Ident, literal: 'x'},
      {type: TokenTypes.Assign, literal: '='},
      {type: TokenTypes.Int, literal: '10'},
      {type: TokenTypes.SemiColon, literal: ';'},
      {type: TokenTypes.Let, literal: 'let'},
      {type: TokenTypes.Ident, literal: 'y'},
      {type: TokenTypes.Assign, literal: '='},
      {type: TokenTypes.Int, literal: '5'},
      {type: TokenTypes.SemiColon, literal: ';'},
      {type: TokenTypes.Eof, literal: ''},
    ];
    runTests(expected, input);
  });

  it('handles comments on multiple lines', () => {
    const input = `// this is a comment
    // this is another comment
    let x = 10;`;
    const expected: Token[] = [
      {type: TokenTypes.Let, literal: 'let'},
      {type: TokenTypes.Ident, literal: 'x'},
      {type: TokenTypes.Assign, literal: '='},
      {type: TokenTypes.Int, literal: '10'},
      {type: TokenTypes.SemiColon, literal: ';'},
      {type: TokenTypes.Eof, literal: ''},
    ];
    runTests(expected, input);
  });
  it ('handles when there is a comment on the last line', () => {
    const input = `let x = 10; 
    // this is a comment`;
    const expected: Token[] = [
      {type: TokenTypes.Let, literal: 'let'},
      {type: TokenTypes.Ident, literal: 'x'},
      {type: TokenTypes.Assign, literal: '='},
      {type: TokenTypes.Int, literal: '10'},
      {type: TokenTypes.SemiColon, literal: ';'},
      {type: TokenTypes.Eof, literal: ''},
    ];
    runTests(expected, input);
  });




});