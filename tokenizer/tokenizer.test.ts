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
    expect(expected[i]).toStrictEqual(actual);
    // expect(expected[i].literal).toBe(actual.literal);
    // expect(expected[i].type).toBe(actual.type);
    // expect(expected[i].line).toBe(actual.line);
  }

}
describe('tokenizer', () => {
  it('handles plus and minus', () => {
    const input = '   +-   ';
    const expected: Token[] = [
      { type: TokenTypes.Plus, literal: '+', line: 1 },
      { type: TokenTypes.Minus, literal: '-', line: 1 },
      { type: TokenTypes.Eof, literal: '', line: 1 },
    ];

    runTests(expected, input);
  });

  it('handles simple expression', () => {
    const input = 'x + x';
    const expected: Token[] = [
      { type: TokenTypes.Ident, literal: 'x', line: 1 },
      { type: TokenTypes.Plus, literal: '+', line: 1 },
      { type: TokenTypes.Ident, literal: 'x', line: 1 },
      { type: TokenTypes.Eof, literal: '', line: 1 },
    ];
    runTests(expected, input);
  });

  it('handles longer idents and semicolons', () => {
    const input = 'abba - abba;';
    const expected: Token[] = [
      { type: TokenTypes.Ident, literal: 'abba', line: 1 },
      { type: TokenTypes.Minus, literal: '-', line: 1 },
      { type: TokenTypes.Ident, literal: 'abba', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.Eof, literal: '', line: 1 },
    ];
    runTests(expected, input);
  });
  it('handles simle assignment statement', () => {
    const input = 'let num = 10;';
    const expected: Token[] = [
      { type: TokenTypes.Let, literal: 'let', line: 1 },
      { type: TokenTypes.Ident, literal: 'num', line: 1 },
      { type: TokenTypes.Assign, literal: '=', line: 1 },
      { type: TokenTypes.Int, literal: '10', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.Eof, literal: '', line: 1 },
    ];
    runTests(expected, input);
  });
  it('handles loads of sing char token types', () => {
    const input = '(first + second) / 555 * 10 - 3 > 2 < 700; { 4 * 4};!something %;'
    const expected: Token[] = [
      { type: TokenTypes.LParen, literal: '(', line: 1 },
      { type: TokenTypes.Ident, literal: 'first', line: 1 },
      { type: TokenTypes.Plus, literal: '+', line: 1 },
      { type: TokenTypes.Ident, literal: 'second', line: 1 },
      { type: TokenTypes.RParen, literal: ')', line: 1 },
      { type: TokenTypes.Div, literal: '/', line: 1 },
      { type: TokenTypes.Int, literal: '555', line: 1 },
      { type: TokenTypes.Mult, literal: '*', line: 1 },
      { type: TokenTypes.Int, literal: '10', line: 1 },
      { type: TokenTypes.Minus, literal: '-', line: 1 },
      { type: TokenTypes.Int, literal: '3', line: 1 },
      { type: TokenTypes.Gt, literal: '>', line: 1 },
      { type: TokenTypes.Int, literal: '2', line: 1 },
      { type: TokenTypes.Lt, literal: '<', line: 1 },
      { type: TokenTypes.Int, literal: '700', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.LBrace, literal: '{', line: 1 },
      { type: TokenTypes.Int, literal: '4', line: 1 },
      { type: TokenTypes.Mult, literal: '*', line: 1 },
      { type: TokenTypes.Int, literal: '4', line: 1 },
      { type: TokenTypes.RBrace, literal: '}', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.Not, literal: '!', line: 1 },
      { type: TokenTypes.Ident, literal: 'something', line: 1 },
      { type: TokenTypes.Mod, literal: '%', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.Eof, literal: '', line: 1 },
    ];
    runTests(expected, input);
  });

  it('handles loads of two char token types', () => {
    const input = '5 == 5;6 != 2; 3 || 0; 5 && 10; if (5 == 10) >= <='
    const expected: Token[] = [
      { type: TokenTypes.Int, literal: '5', line: 1 },
      { type: TokenTypes.Eq, literal: '==', line: 1 },
      { type: TokenTypes.Int, literal: '5', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.Int, literal: '6', line: 1 },
      { type: TokenTypes.Neq, literal: '!=', line: 1 },
      { type: TokenTypes.Int, literal: '2', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.Int, literal: '3', line: 1 },
      { type: TokenTypes.Or, literal: '||', line: 1 },
      { type: TokenTypes.Int, literal: '0', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.Int, literal: '5', line: 1 },
      { type: TokenTypes.And, literal: '&&', line: 1 },
      { type: TokenTypes.Int, literal: '10', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.If, literal: 'if', line: 1 },
      { type: TokenTypes.LParen, literal: '(', line: 1 },
      { type: TokenTypes.Int, literal: '5', line: 1 },
      { type: TokenTypes.Eq, literal: '==', line: 1 },
      { type: TokenTypes.Int, literal: '10', line: 1 },
      { type: TokenTypes.RParen, literal: ')', line: 1 },
      { type: TokenTypes.Gteq, literal: '>=', line: 1 },
      { type: TokenTypes.Lteq, literal: '<=', line: 1 },
      { type: TokenTypes.Eof, literal: '', line: 1 },
    ];
    runTests(expected, input);
  });
  it('handles multiline programs', () => {
    const input = `let x = 10;
    let y = 5;`;
    const expected: Token[] = [
      { type: TokenTypes.Let, literal: 'let', line: 1 },
      { type: TokenTypes.Ident, literal: 'x', line: 1 },
      { type: TokenTypes.Assign, literal: '=', line: 1 },
      { type: TokenTypes.Int, literal: '10', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.Let, literal: 'let', line: 2 },
      { type: TokenTypes.Ident, literal: 'y', line: 2 },
      { type: TokenTypes.Assign, literal: '=', line: 2 },
      { type: TokenTypes.Int, literal: '5', line: 2 },
      { type: TokenTypes.SemiColon, literal: ';', line: 2 },
      { type: TokenTypes.Eof, literal: '', line: 2 },
    ];
    runTests(expected, input);
  });

  it('handles keywords', () => {
    const input = 'fn let if else return true false';
    const expected: Token[] = [
      { type: TokenTypes.Fn, literal: 'fn', line: 1 },
      { type: TokenTypes.Let, literal: 'let', line: 1 },
      { type: TokenTypes.If, literal: 'if', line: 1 },
      { type: TokenTypes.Else, literal: 'else', line: 1 },
      { type: TokenTypes.Return, literal: 'return', line: 1 },
      { type: TokenTypes.True, literal: 'true', line: 1 },
      { type: TokenTypes.False, literal: 'false', line: 1 },
      { type: TokenTypes.Eof, literal: '', line: 1 },
    ];
    runTests(expected, input);
  });
  it('handles keywords in expressions', () => {
    const input = 'if (x == 10) { return true; } else { return false; }';
    const expected: Token[] = [
      { type: TokenTypes.If, literal: 'if', line: 1 },
      { type: TokenTypes.LParen, literal: '(', line: 1 },
      { type: TokenTypes.Ident, literal: 'x', line: 1 },
      { type: TokenTypes.Eq, literal: '==', line: 1 },
      { type: TokenTypes.Int, literal: '10', line: 1 },
      { type: TokenTypes.RParen, literal: ')', line: 1 },
      { type: TokenTypes.LBrace, literal: '{', line: 1 },
      { type: TokenTypes.Return, literal: 'return', line: 1 },
      { type: TokenTypes.True, literal: 'true', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.RBrace, literal: '}', line: 1 },
      { type: TokenTypes.Else, literal: 'else', line: 1 },
      { type: TokenTypes.LBrace, literal: '{', line: 1 },
      { type: TokenTypes.Return, literal: 'return', line: 1 },
      { type: TokenTypes.False, literal: 'false', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.RBrace, literal: '}', line: 1 },
      { type: TokenTypes.Eof, literal: '', line: 1 },
    ];
    runTests(expected, input);
  });

  it('handles comments', () => {
    const input = `let x = 10; // this is a comment
    let y = 5;`;
    const expected: Token[] = [
      { type: TokenTypes.Let, literal: 'let', line: 1 },
      { type: TokenTypes.Ident, literal: 'x', line: 1 },
      { type: TokenTypes.Assign, literal: '=', line: 1 },
      { type: TokenTypes.Int, literal: '10', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.Let, literal: 'let', line: 2 },
      { type: TokenTypes.Ident, literal: 'y', line: 2 },
      { type: TokenTypes.Assign, literal: '=', line: 2 },
      { type: TokenTypes.Int, literal: '5', line: 2 },
      { type: TokenTypes.SemiColon, literal: ';', line: 2 },
      { type: TokenTypes.Eof, literal: '', line: 2 },
    ];
    runTests(expected, input);
  });

  it('handles comments on multiple lines', () => {
    const input = `// this is a comment
    // this is another comment
    let x = 10;`;
    const expected: Token[] = [
      { type: TokenTypes.Let, literal: 'let', line: 3 },
      { type: TokenTypes.Ident, literal: 'x', line: 3 },
      { type: TokenTypes.Assign, literal: '=', line: 3 },
      { type: TokenTypes.Int, literal: '10', line: 3 },
      { type: TokenTypes.SemiColon, literal: ';', line: 3 },
      { type: TokenTypes.Eof, literal: '', line: 3 },
    ];
    runTests(expected, input);
  });
  it('handles when there is a comment on the last line', () => {
    const input = `let x = 10; 
    // this is a comment`;
    const expected: Token[] = [
      { type: TokenTypes.Let, literal: 'let', line: 1 },
      { type: TokenTypes.Ident, literal: 'x', line: 1 },
      { type: TokenTypes.Assign, literal: '=', line: 1 },
      { type: TokenTypes.Int, literal: '10', line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.Eof, literal: '', line: 2 },
    ];
    runTests(expected, input);
  });

  it('handles ints and floats', () => {
    const input = '1234 1234.44 1234.4.4';
    const expected: Token[] = [
      { type: TokenTypes.Int, literal: '1234', line: 1 },
      { type: TokenTypes.Float, literal: '1234.44', line: 1 },
      { type: TokenTypes.Illegal, literal: '1234.4.4', line: 1 },
      { type: TokenTypes.Eof, literal: '', line: 1 },
    ];
    runTests(expected, input);
  });

  it('handles strings', () => {
    const input = `let x = 'alright mate';`
    const expected: Token[] = [
      { type: TokenTypes.Let, literal: 'let', line: 1 },
      { type: TokenTypes.Ident, literal: 'x', line: 1 },
      { type: TokenTypes.Assign, literal: '=', line: 1 },
      { type: TokenTypes.String, literal: `'alright mate'`, line: 1 },
      { type: TokenTypes.SemiColon, literal: ';', line: 1 },
      { type: TokenTypes.Eof, literal: '', line: 1 },
    ]
    runTests(expected, input );
  });

  it('handles unterminated strings', () => {
    const input = `let x = 'alright mat`
    const expected: Token[] = [
      { type: TokenTypes.Let, literal: 'let', line: 1 },
      { type: TokenTypes.Ident, literal: 'x', line: 1 },
      { type: TokenTypes.Assign, literal: '=', line: 1 },
      { type: TokenTypes.Illegal, literal: `'alright mat`, line: 1, error: `Line 1 | String was not terminated: 'alright mat`},
      { type: TokenTypes.Eof, literal: '', line: 1 },
    ]
    runTests(expected, input );

  });

});