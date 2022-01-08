#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const tsconfig = require('./tsconfig.js');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function rewriteTsconfig() {
  return new Promise((resolve) => {
    rl.question('✋ tsconfig.json already exists. Replace it? (y/n) \n', (res) => { resolve(res) })
  })
}


(async () => {
  const tsconfigPath = path.join(process.cwd(), './tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) {
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  } else {
    const answer = await rewriteTsconfig();
    if (answer === 'y' || answer === 'Y' || answer === 'yes' || answer === 'Yes' || answer === 'YES' || !answer) {
      console.log(`replacing tsconfig.json`);
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    } else {
      console.log(`tsconfig.json was not replaced.`);
    }
  }

  const packageJsonPath = path.join(process.cwd(), './package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`✋ package.json does not exist.`);
    return;
  } else {
    const packageJson = require(packageJsonPath);
    // get the dev dependencies
    if (!packageJson.devDependencies) packageJson.devDependencies = {};
    const devDependencies = Object.keys(packageJson.devDependencies || {});
    // add typescript to the dev dependencies
    if (!devDependencies.includes('typescript')) {
      packageJson.devDependencies['typescript'] = '^4.5.4 ';
    }
    // write the package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  console.log('✅ Done. Hit npm install to install typescript.');

  process.exit()
})()