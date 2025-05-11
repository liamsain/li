import { Tokenizer } from './tokenizer';
import { Parser } from './parser';
main();
async function main() {
  const filePaths: string[] = process.argv.slice(2);
  if (filePaths.length) {
    for (const file of filePaths) {
      console.log('from loop: ', file);
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
      console.log(ast);
    } else {
      console.error(`File not found: ${path}`);
    }
  } catch (error) {
    console.error(error);
  }

}
