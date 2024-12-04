export const TokenTypes = {
  // single char
  Plus: 'Plus',
  Minus: 'Minus',
  Mult: 'Mult',
  Div: 'Div',
  Lt: 'Lt',
  Gt: 'Gt',
  LParen: 'LParen',
  RParen: 'RParen',
  Assign: 'Assign',
  SemiColon: 'SemiColon',
  Illegal: 'Illegal',
  Eof: 'Eof',
  LBrace: 'LBrace',
  RBrace: 'RBrace',
  Not: 'Not',

  // two char
  Eq: 'Eq',
  Neq: 'Neq',
  Or: 'Or',
  And: 'And',
  If: 'If',
  Fn: 'Fn',
  Inc: 'Inc',
  Dec: 'Dec',
  
  // > 2 char
  Ident: 'Ident',
  Let: 'Let',
  Else: 'Else',
  True: 'True',
  False: 'False',
  Return: 'Return',
  Int: 'Int',
} as const

export type TokenType = typeof TokenTypes[keyof typeof TokenTypes]

export interface Token {
  type: TokenType;
  literal: string;
}

export const Keywords = new Map<string, TokenType>([
  ['fn', TokenTypes.Function],
  ['let', TokenTypes.Let],
  ['if', TokenTypes.If],
  ['else', TokenTypes.Else],
  ['return', TokenTypes.Return],
  ['true', TokenTypes.True],
  ['false', TokenTypes.False],
]);