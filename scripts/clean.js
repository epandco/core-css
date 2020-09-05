const path = require('path');
const fs = require('fs-extra');

async function main() {
  const cwd = process.cwd();

  const files = [
    'build.css',
    ...(await fs.readdir(path.join(cwd, 'src')))
  ];

  for (const file of files) {
    await fs.remove(path.join(cwd, file));
  }
}

main()
  .then(() => console.log('\nBuild files removed\n'))
  .catch((error) => console.error(`\nError: ${error.message}\n`));