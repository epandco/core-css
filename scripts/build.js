const path = require('path');
const fs = require('fs-extra');
const sass = require('sass');

async function main() {
  const cwd = process.cwd();
  const src = path.join(cwd, 'src');

  await fs.copy(src, cwd);

  const { css } = sass.renderSync({
    file: path.join(src, 'index.scss'),
    outputStyle: 'compressed',
  });

  await fs.outputFile(path.join(cwd, 'build.css'), css);
}

main()
  .then(() => console.log('\nBuild complete\n'))
  .catch((error) => console.error(`\nError: ${error.message}\n`));
