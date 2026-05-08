const fs = require('fs');
const path = require('path');

const rootPackage = require('./package.json');
const version = rootPackage.version;

const subfolders = ['electron-shell', 'timestream-renderer'];

subfolders.forEach(folder => {
  const pkgPath = path.join(__dirname, folder, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.version = version;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`Updated ${folder} to version ${version}`);
  }
});
