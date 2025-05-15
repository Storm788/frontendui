#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

// Helper: perform case-preserving replacement of target with replacement
function preserveCaseReplace(text, target, replacement) {
  const regex = new RegExp(target, 'gi');
  return text.replace(regex, (match) => {
    if (match === match.toUpperCase()) {
      return replacement.toUpperCase();
    } else if (match === match.toLowerCase()) {
      return replacement.toLowerCase();
    } else if (match[0] === match[0].toUpperCase() &&
               match.slice(1) === match.slice(1).toLowerCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
    } else {
      return replacement;
    }
  });
}

// Helper: compute SHA256 checksum of given text
function computeChecksum(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

// Helper: prompt user for input
async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Function to process a single file copy with checksum checking
async function processFile(sourceFilePath, destFilePath, newName) {
  // Read the source file
  const content = await fs.readFile(sourceFilePath, 'utf8');
  // Replace "Scalar" with the provided newName preserving case
  const newContent = preserveCaseReplace(content, "Scalar", newName);
  // Compute checksum of new content
  const newChecksum = computeChecksum(newContent);
  // Define checksum file path
  const checksumFilePath = destFilePath + '.checksum.txt';

  let override = true;
  try {
    // Check if destination file exists
    await fs.access(destFilePath);
    // If exists, read the checksum file
    const storedChecksum = await fs.readFile(checksumFilePath, 'utf8');
    if (storedChecksum.trim() !== newChecksum) {
      console.warn(`Checksum mismatch for file ${destFilePath}. File has been modified.`);
      override = false;
    }
  } catch (err) {
    // If file does not exist or checksum file not found, proceed to write file
    override = true;
  }

  if (override) {
    await fs.writeFile(destFilePath, newContent, 'utf8');
    await fs.writeFile(checksumFilePath, newChecksum, 'utf8');
    console.log(`Created/Updated file: ${destFilePath}`);
  } else {
    console.log(`Skipped file: ${destFilePath} due to checksum mismatch.`);
  }
}

// Recursively copy a directory from srcDir to destDir, processing file names and content.
async function copyDirectory(srcDir, destDir, newName) {
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcEntryPath = path.join(srcDir, entry.name);
    // Replace "Empty" in file/directory names with newName
    let newEntryName = preserveCaseReplace(entry.name, "Empty", newName);
    const destEntryPath = path.join(destDir, newEntryName);

    if (entry.isDirectory()) {
      await copyDirectory(srcEntryPath, destEntryPath, newName);
    } else if (entry.isFile()) {
      await processFile(srcEntryPath, destEntryPath, newName);
    }
  }
}

(async () => {
  try {
    // Ask for the package name
    const packageName = await prompt("Enter the package name (pname): ");
    if (!packageName) {
      console.error("No package name provided. Exiting.");
      process.exit(1);
    }
    // Verify package exists (assuming packages are located at root/packages)
    const packageDir = path.resolve(__dirname, '..', 'packages', packageName);
    try {
      const stat = await fs.stat(packageDir);
      if (!stat.isDirectory()) throw new Error();
    } catch {
      console.error(`Package directory not found at ${packageDir}. Exiting.`);
      process.exit(1);
    }

    // Ask for the component set name
    const componentName = await prompt("Enter the component set name (cname): ");
    if (!componentName) {
      console.error("No component set name provided. Exiting.");
      process.exit(1);
    }
    // Check if the package's src directory contains a directory named componentName
    const componentDir = path.resolve(packageDir, 'src', componentName);
    try {
      const stat = await fs.stat(componentDir);
      if (!stat.isDirectory()) throw new Error();
    } catch {
      console.error(`Component directory not found at ${componentDir}. Exiting.`);
      process.exit(1);
    }

    // Ask for multiple Scalar names, comma separated.
    const scalarNamesInput = await prompt("Enter one or more Scalar names (sname), separated by commas: ");
    if (!scalarNamesInput) {
      console.error("No scalar names provided. Exiting.");
      process.exit(1);
    }
    // Split and trim the scalar names
    const scalarNames = scalarNamesInput.split(',')
                          .map(s => s.trim())
                          .filter(s => s.length > 0);
    if (scalarNames.length === 0) {
      console.error("No valid scalar names provided. Exiting.");
      process.exit(1);
    }

    // Define source file path: in the component directory under "Scalars" folder,
    // the file name is expected to be "{cname}ScalarAttribute.jsx"
    const sourceFileName = `${componentName}ScalarAttribute.jsx`;
    const sourceFilePath = path.join(componentDir, "Scalars", sourceFileName);
    try {
      await fs.access(sourceFilePath);
    } catch {
      console.error(`Source file ${sourceFilePath} does not exist. Exiting.`);
      process.exit(1);
    }

    // Process each scalar name
    for (const sname of scalarNames) {
      // Build destination file path: "{cname}{sname}Attrbibute.jsx" inside the same directory.
      const destFileName = `${componentName}${sname}Attribute.jsx`;
      const destFilePath = path.join(componentDir, "Scalars", destFileName);
      
      await processFile(sourceFilePath, destFilePath, sname);
    }
    
    console.log("Copy and replacement for all scalar names completed.");
  } catch (err) {
    console.error("Error:", err);
  }
})();
