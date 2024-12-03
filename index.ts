main();
async function main() {
  process.argv.slice(2).forEach(arg => {
    if (arg) {
      // assume arg is a file path and read it:
      readInputFile(arg);
    }
  });
}

async function readInputFile(path: string) {
  try {
    // const file = fs.readFileSync(arg, 'utf8');
    const file = Bun.file(path);
    const exists = await file.exists();
    if (exists) {
      const content = await file.text();
      console.log(content);
      return content;
    } else {
      console.error(`File not found: ${path}`);
    }
  } catch (error) {
    console.error(error);
  }

}
