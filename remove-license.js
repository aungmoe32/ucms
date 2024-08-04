const fs = require("fs");
const path = require("path");

const files = [
  "esm/__internal/core/license/trial_panel.client.js",
  "cjs/__internal/core/license/trial_panel.client.js",
];

function Replace(file) {
  // Define the file path
  const filePath = path.join(__dirname, "node_modules/devextreme", file);

  // console.log(filePath);

  // Define the content to be replaced and the new content
  const originalContent = `this._reassignComponent();`;
  const newContent = "";

  // Read the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    //   console.log(data);

    // Replace the content
    const modifiedData = data.replace(originalContent, newContent);

    // Write the modified content back to the file
    fs.writeFile(filePath, modifiedData, "utf8", (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
        return;
      }
      //   console.log(`File ${filePath} has been modified successfully.`);
    });
  });
}

files.map((file) => Replace(file));
