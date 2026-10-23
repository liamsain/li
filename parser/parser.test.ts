import { describe, it, expect } from 'bun:test';
import { Parser } from '.';
import { Tokenizer } from '../tokenizer';
import type { Token } from '../tokenizer/tokenTypes';
import { BinOp, Integer } from './parserTypes';

describe('parser', () => {
  it ('parses a simple maths expression', () => {
    const exp = '2 + 42';
    const tokenizer = new Tokenizer(exp);
    const parser = new Parser(tokenizer.getAllTokens());
    const tree = parser.parse();
    expect(tree).toBeInstanceOf(BinOp);
    const castedTree = tree as BinOp;
    expect(castedTree.operator.literal).toBe('+');
    expect(castedTree.left).toBeInstanceOf(Integer);
    expect(castedTree.right).toBeInstanceOf(Integer);
    const castedLeft = castedTree.left as Integer;
    const castedRight = castedTree.right as Integer;
    expect(castedLeft.value).toBe(2);
    expect(castedRight.value).toBe(42);
    console.log(castedTree);

  });
  it ('parses a slightly complex maths expression', () => {
    const exp = '2 + 42 * 2 + (47 * -21)';
    const tokenizer = new Tokenizer(exp);
    const tokens: Token[] = tokenizer.getAllTokens();
    const parser = new Parser(tokens);
    const tree = parser.parse();
    expect(tree).toBeInstanceOf(BinOp);
    const castedTree = tree as BinOp;
    expect(castedTree.operator.literal).toBe('+');
  });
});