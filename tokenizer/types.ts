export const TokenTypes = {
  Plus: 'Plus',
  Minus: 'Minus',
  Mult: 'Mult',
  Div: 'Div',
  Ident: 'Ident',
  LParen: 'LParen',
  RParen: 'RParen',
  Assign: 'Assign',
  Eq: 'Equals',
  Neq: 'Neq',
  Lt: 'Lt',
  Gt: 'Gt',
  Or: 'Or',
  And: 'And',
  Int: 'Int',
  Eof: 'Eof',
  SemiColon: 'SemiColon',
  Illegal: '',
  
  Let: 'Let',
  Function: 'Fn',
  If: 'If',
  Else: 'Else',
  True: 'True',
  False: 'False',
  Return: 'Return'
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