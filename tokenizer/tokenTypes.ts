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
  Mod: 'Mod',

  // two char
  Eq: 'Eq',
  Neq: 'Neq',
  Or: 'Or',
  And: 'And',
  If: 'If',
  Fn: 'Fn',
  Inc: 'Inc',
  Dec: 'Dec',
  Lteq: 'LessThanOrEquals',
  Gteq: 'GreaterThanOrEquals',
  
  // > 2 char
  Ident: 'Ident',
  Let: 'Let',
  Else: 'Else',
  True: 'True',
  False: 'False',
  Return: 'Return',
  Int: 'Int',
  Float: 'Float',
  String: 'String',
} as const

export type TokenType = typeof TokenTypes[keyof typeof TokenTypes]

export interface Token {
  type: TokenType;
  literal: string;
  line: number;
  error?:string;
}

export const Keywords = new Map<string, TokenType>([
  ['fn', TokenTypes.Fn],
  ['let', TokenTypes.Let],
  ['if', TokenTypes.If],
  ['else', TokenTypes.Else],
  ['return', TokenTypes.Return],
  ['true', TokenTypes.True],
  ['false', TokenTypes.False],
]);