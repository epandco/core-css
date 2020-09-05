const path = require('path');
const fs = require('fs-extra');
const sass = require('sass');

async function main() {
  const cwd = process.cwd();
  const src = path.join(cwd, 'src');
  const build = path.join(cwd, 'build');

  await fs.copy(src, process.cwd());

  const filesToCompile = [
    {
      input: path.join(src, 'index.scss'),
      output: path.join(build, 'index.css')
    },
    {
      input: path.join(src, 'base.scss'),
      output: path.join(build, 'base.css')
    },
    {
      input: path.join(src, 'utilities', 'index.scss'),
      output: path.join(build, 'utilities.css')
    }
  ];

  for (const file of filesToCompile) {
    const { css } = sass.renderSync({
      file: file.input,
      outputStyle: 'compressed'
    });
  
    await fs.outputFile(file.output, css);
  }
}

main()
  .then(() => console.log('Build complete'))
  .catch(error => console.log(`Error: ${error.message}`));
