import type { Expression } from '../parser/parserTypes';
import { TokenTypes } from '../tokenizer/tokenTypes';
import { Integer, Float, Grouping, BinOp, UnOp, LiString, Bool } from '../parser/parserTypes'
const LocalTypes = {
  Number: 'Number',
  String: 'String',
};
export class Interpreter {
  logError(msg: string, line: number) {
    console.error(`Interpreter error on line ${line}\n${msg}`);
  }
  interpret(n: Expression) {
    if (n instanceof Integer) {
      return n.value;
    } else if (n instanceof Float) {
      return n.value;
    } else if (n instanceof LiString) {
      return n.value;
    } else if (n instanceof Bool) {
      return n.value;
    } else if (n instanceof Grouping) {
      return this.interpret(n.value);
    } else if (n instanceof BinOp) {
      const leftVal = this.interpret(n.left);
      const rightVal = this.interpret(n.right);
      if (!leftVal || !rightVal) {
        this.logError(`One half of a binary operation is undefined`, n.line);
        return;
      }
      if (n.operator.type == TokenTypes.Plus) {
        if (typeof leftVal === 'number' && typeof rightVal === 'number') {
          return leftVal + rightVal;
        } else if (typeof leftVal === 'string' && typeof rightVal === 'string') {
          return leftVal.slice(0, leftVal.length - 1) + rightVal.slice(1, rightVal.length);
        } else {
          this.logError(`Tried to add ${leftVal} and ${rightVal}\nYou can only add numbers together or strings together`, n.line);
          return;
        }
      } else if (n.operator.type === TokenTypes.Minus) {
        if (typeof leftVal === 'number' && typeof rightVal === 'number') {
          return leftVal - rightVal;
        } else {
          this.logError(`Tried to subtract ${rightVal} from ${leftVal}\nYou can only subtract numbers`, n.line);
          return;
        }
      } else if (n.operator.type === TokenTypes.Mult) {
        if (typeof leftVal === 'number' && typeof rightVal === 'number') {
          return leftVal * rightVal;
        } else {
          this.logError(`Tried to multiply ${leftVal} with ${rightVal}\nYou can only multiply numbers`, n.line);
          return;
        }
      } else if (n.operator.type === TokenTypes.Div) {
        if (typeof leftVal === 'number' && typeof rightVal === 'number') {
          return leftVal / rightVal;
        } else {
          this.logError(`Tried to divide ${rightVal} by ${leftVal}\nYou can only divide numbers`, n.line,);
          return;
        }
      } else if (n.operator.type === TokenTypes.Mod) {
        if (typeof leftVal === 'number' && typeof rightVal === 'number') {
          return leftVal % rightVal;
        } else {
          this.logError(`Tried to mod ${rightVal} by ${leftVal}\nYou can only mod numbers`, n.line);
        }
      }
    } else if (n instanceof UnOp) {
      const operand = this.interpret(n.operand);
      if (n.op.type == TokenTypes.Plus) {
        if (typeof operand === 'number') {
          return +operand;
        } else {
          this.logError(`Tried to use + unary operator on ${operand}\nYou can only use the + unary operator on numbers`, n.line,);
          return;
        }
      } else if (n.op.type === TokenTypes.Minus) {
        if (typeof operand === 'number') {
          return -operand;
        } else {
          this.logError(`Tried to use - unary operator on ${operand}\nYou can only use the - unary operator on numbers`, n.line,);
          return;
        }
      } else if (n.op.type === TokenTypes.Not) {
        // todo
        if (typeof operand === 'boolean') {
          return !operand;
        } else {
          this.logError(`Tried to use the ! operator on ${operand}\nYou can only use that operator on a boolean expression.`, n.line,);
          return;
        }
      } 
    }
  }
}