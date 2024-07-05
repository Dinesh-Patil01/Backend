const fs = require('fs');
const path = require('path');

const operation = process.argv[2];
const filePath = process.argv[3];
const content = process.argv[4];

switch (operation) {
  case 'read':
    readFile(filePath);
    break;
  case 'delete':
    deleteFile(filePath);
    break;
  case 'create':
    createFile(filePath);
    break;
  case 'append':
    appendToFile(filePath, content);
    break;
  case 'rename':
    renameFile(filePath, content);
    break;
  case 'list':
    listDirectory(filePath);
    break;
  default:
    console.log(`Invalid operation '${operation}'`);
}

function readFile(file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file '${file}':`, err);
    } else {
      console.log(data);
    }
  });
}

function deleteFile(file) {
  fs.unlink(file, (err) => {
    if (err) {
      console.error(`Error deleting file '${file}':`, err);
    } else {
      console.log(`File '${file}' deleted`);
    }
  });
}

function createFile(file) {
  fs.writeFile(file, '', (err) => {
    if (err) {
      console.error(`Error creating file '${file}':`, err);
    } else {
      console.log(`File '${file}' created`);
    }
  });
}

function appendToFile(file, content) {
  fs.appendFile(file, content + '\n', (err) => {
    if (err) {
      console.error(`Error appending to file '${file}':`, err);
    } else {
      console.log(`Content appended to the file '${file}'`);
    }
  });
}

function renameFile(oldPath, newPath) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(`Error renaming file '${oldPath}' to '${newPath}':`, err);
    } else {
      console.log(`File '${oldPath}' renamed to '${newPath}'`);
    }
  });
}

function listDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error listing directory '${directory}':`, err);
    } else {
      files.forEach(file => {
        console.log(file);
      });
    }
  });
}
