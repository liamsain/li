import type { Token } from '../tokenizer/tokenTypes';
export class Statement { }
export class Expression {}
export class Integer extends Expression {
  value: number = 0;
  constructor(val: number) {
    super();
    this.value = val
  }
}
export class Float extends Expression {
  value: number = 0;
  constructor(val: number) {
    super();
    this.value = val;
  }
}
export class UnOp extends Expression {
  // e.g. -x
  op: Token;
  operand: Expression;
  constructor(op: Token, operand: Expression) {
    super();
    this.op = op;
    this.operand = operand;
  }
  strRep(): string {
    return `UnOp ${this.op.literal}, ${this.operand}`;
  }
}
export class Grouping extends Expression {
  // example : (<expr>)
  value: Expression;
  constructor(val: Expression) {
    super();
    this.value = val;
  }
  strRep(): string {
    return `Grouping ${this.value}`;
  }
}
export class BinOp extends Expression {
  // e.g. x + y
  op: Token;
  left: Expression;
  right: Expression;
  constructor(op: Token, left: Expression, right: Expression) {
    super();
    this.op = op;
    this.left = left;
    this.right = right;
  }
  strRep() {
    return `BinOp ${this.op.literal}, ${this.left}, ${this.right}`;
  }
}

export class WhileStatement extends Statement {

}

export class Assignment extends Statement {

}