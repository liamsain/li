import { describe, it, expect } from 'bun:test';
import { Tokenizer } from './tokenizer';
import { TokenTypes } from './types';
import type { Token } from './types';
const simpleTests = [
  {
    input: `-+`,
    expected: [
      { type: TokenTypes.Minus, literal: '-' },
      { type: TokenTypes.Plus, literal: '+' },
      { type: TokenTypes.Eof, literal: '' },
    ]
  },

  {
    input: `x + x`,
    expected: [
      { type: TokenTypes.Ident, literal: 'x' },
      { type: TokenTypes.Plus, literal: '+' },
      { type: TokenTypes.Ident, literal: 'x' },
      { type: TokenTypes.Eof, literal: '' },
    ]
  },
  {
    input: `let x = 10;`,
    expected: [
      { type: TokenTypes.Let, literal: 'let' },
      { type: TokenTypes.Ident, literal: 'x' },
      { type: TokenTypes.Assign, literal: '=' },
      { type: TokenTypes.Int, literal: '10' },
      { type: TokenTypes.SemiColon, literal: ';' },
      { type: TokenTypes.Eof, literal: '' },
    ]
  }];

function runTests(expected: Token[], tokenizer: Tokenizer, log = false) {
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

    const tokenizer = new Tokenizer(input);
    runTests(expected, tokenizer);
  });

  it('handles simple expression', () => {
    const input = 'x + x';
    const expected: Token[] = [
      { type: TokenTypes.Ident, literal: 'x' },
      { type: TokenTypes.Plus, literal: '+' },
      { type: TokenTypes.Ident, literal: 'x' },
      { type: TokenTypes.Eof, literal: '' },
    ];
    const t = new Tokenizer(input);
    runTests(expected, t);
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
    const t = new Tokenizer(input);
    runTests(expected, t );

  });

});