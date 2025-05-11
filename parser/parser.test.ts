import { describe, it, expect } from 'bun:test';
import { Parser } from '.';
import { Tokenizer } from '../tokenizer';
import type { Token } from '../tokenizer/tokenTypes';

describe('parser', () => {
  it ('does something', () => {
    const exp = '2 + 42 * 2 + (47 * -21)';
    const tokenizer = new Tokenizer(exp);
    const tokens: Token[] = tokenizer.getAllTokens();
    const parser = new Parser(tokens);
  });
});