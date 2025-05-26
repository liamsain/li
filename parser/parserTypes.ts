import type { Token } from '../tokenizer/tokenTypes';
export class Node { }
export class Statement extends Node { }
export class Expression extends Node { }

export class Integer extends Expression {
  value: number = 0;
  line: number;
  constructor(val: number, line: number) {
    super();
    this.value = val
    this.line = line;
  }
}
export class Float extends Expression {
  value: number = 0;
  line: number;
  constructor(val: number, line: number) {
    super();
    this.value = val;
    this.line = line;
  }
}
export class Bool extends Expression {
  value: boolean;
  line: number;
  constructor(val: boolean, line: number) {
    super();
    this.value = val;
    this.line = line;
  }
}
export class LiString extends Expression {
  value: string;
  line: number;
  constructor(val: string, line: number) {
    super();
    this.value = val;
    this.line = line;
  }
}
export class UnOp extends Expression {
  // e.g. -x
  op: Token;
  operand: Expression;
  line: number;
  constructor(op: Token, operand: Expression, line: number) {
    super();
    this.op = op;
    this.operand = operand;
    this.line = line;
  }
}
export class Grouping extends Expression {
  // example : (<expr>)
  value: Expression;
  line: number;
  constructor(val: Expression, line: number) {
    super();
    this.value = val;
    this.line = line;
  }
}
export class BinOp extends Expression {
  // e.g. x + y
  operator: Token;
  left: Expression;
  right: Expression;
  line: number;
  constructor(op: Token, left: Expression, right: Expression, line: number) {
    super();
    this.operator = op;
    this.left = left;
    this.right = right;
    this.line = line;
  }
}

export class WhileStatement extends Statement {

}

export class Assignment extends Statement {

}

export class IfStatement extends Statement {

}
export class ForStatement extends Statement {

}