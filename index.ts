import { Tokenizer } from './tokenizer';
import { Parser } from './parser';
import { Interpreter } from './interpreter';
main();
async function main() {
  const filePaths: string[] = process.argv.slice(2);
  if (filePaths.length) {
    for (const file of filePaths) {
      await readInputFile(file);
    }
  }
}

async function readInputFile(path: string) {
  try {
    const file = Bun.file(path);
    const exists = await file.exists();
    if (exists) {
      const content = await file.text();
      const tok = new Tokenizer(content);
      const tokens = tok.getAllTokens();
      console.log('Tokens: ');
      console.log(tokens);
      const parser = new Parser(tokens);
      const ast = parser.parse();
      console.log('AST: ');
      console.dir(ast, {depth: null});
      const interpreter = new Interpreter();
      console.log(interpreter.interpret(ast));
    } else {
      console.error(`File not found: ${path}`);
    }
  } catch (error) {
    console.error(error);
  }

}
