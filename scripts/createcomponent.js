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

// Copy file from srcPath to destPath, processing its content and checking checksum.
async function copyAndProcessFile(srcPath, destPath, newName) {
  let content = await fs.readFile(srcPath, 'utf8');
  // Replace "Empty" fragments in file content using preserveCaseReplace.
  const newContent = preserveCaseReplace(content, "Empty", newName);
  const newChecksum = computeChecksum(newContent);
  // Define checksum file path (destPath + .checksum.txt)
  const checksumFilePath = destPath + '.checksum.txt';

  let shouldWrite = true;
  try {
    // Check if destination file exists; if so, read its checksum file.
    await fs.access(destPath);
    const storedChecksum = (await fs.readFile(checksumFilePath, 'utf8')).trim();
    if (storedChecksum !== newChecksum) {
      console.warn(`Checksum mismatch for file ${destPath}. Skipping overwrite.`);
      shouldWrite = false;
    }
  } catch (err) {
    // If file or checksum file does not exist, proceed with writing.
    shouldWrite = true;
  }

  if (shouldWrite) {
    await fs.writeFile(destPath, newContent, 'utf8');
    await fs.writeFile(checksumFilePath, newChecksum, 'utf8');
    console.log(`Processed file: ${destPath}`);
  } else {
    console.log(`Skipped file: ${destPath}`);
  }
}

// Recursively copy a directory from srcDir to destDir, processing file names and content.
async function copyDirectory(srcDir, destDir, newName) {
  await fs.mkdir(destDir, { recursive: true });
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcEntryPath = path.join(srcDir, entry.name);
    // Replace "Empty" in file/directory names:
    let newEntryName = preserveCaseReplace(entry.name, "Empty", newName);
    const destEntryPath = path.join(destDir, newEntryName);

    if (entry.isDirectory()) {
      await copyDirectory(srcEntryPath, destEntryPath, newName);
    } else if (entry.isFile()) {
      await copyAndProcessFile(srcEntryPath, destEntryPath, newName);
    }
  }
}

// Prompt user with a question and return the answer.
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

(async () => {
  try {
    // Ask the user for the destination directory (relative to 'packages')
    const destRelative = await prompt("Enter the destination directory relative to 'packages' (e.g., 'myFaculty/templates'): ");
    if (!destRelative) {
      console.error("No destination provided. Exiting.");
      process.exit(1);
    }

    // Ask the user for the new names to replace "Empty" (comma-separated)
    const newNamesInput = await prompt("Enter the new names to replace 'Empty' (comma-separated): ");
    if (!newNamesInput) {
      console.error("No new names provided. Exiting.");
      process.exit(1);
    }
    // Split and trim into an array of new names
    const newNames = newNamesInput.split(',').map(n => n.trim()).filter(Boolean);
    if (newNames.length === 0) {
      console.error("No valid new names provided. Exiting.");
      process.exit(1);
    }

    // Define the root destination directory (under packages/{destRelative}/src)
    const destRoot = path.resolve(__dirname, '..', 'packages', destRelative, 'src');

    // Define source directory: in our _empty package the templates are under packages/_empty/src/Empty
    const srcDir = path.resolve(__dirname, '..', 'packages', '_empty', 'src', 'Empty');
    console.log(`Source directory: ${srcDir}`);

    // Process each new name separately
    for (const newName of newNames) {
      const destDir = path.join(destRoot, newName);
      console.log(`\nProcessing new component: ${newName}`);
      console.log(`Destination: ${destDir}`);
      await copyDirectory(srcDir, destDir, newName);
    }
    console.log("\nCopy and replacement completed for all new names.");
  } catch (err) {
    console.error("Error:", err);
  }
})();
