/*
* This script combines all SVG files in the "svgs" folder into a single file.
* It removes the <svg> tag, replaces fill="black" with :fill="fillColor",
* and wraps each SVG in a <template> tag.
* run this script with `node PATH-TO-combine-svgs.cjs` in the terminal.
*/

const fs = require("node:fs");
const path = require("node:path");

// Path to the svgs folder (current directory)
const svgsFolder = path.join(__dirname, "svgs");

// Output file path (inside the svgs folder)
const outputFile = path.join(svgsFolder, "combined-svgs.txt");

// Read all files in the svgs folder
fs.readdir(svgsFolder, (err, files) => {
  if (err) {
    console.error("Error reading the svgs folder:", err);
    return;
  }

  // Filter only .svg files
  const svgFiles = files.filter(file => file.endsWith(".svg"));

  // Read and transform all SVG content
  const combinedSVGs = svgFiles.map((file) => {
    const filePath = path.join(svgsFolder, file);
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract the filename without extension and convert to lowercase
    const fileName = path.basename(file, ".svg").toLowerCase();

    // Remove the <svg> tag, replace fill="black" with :fill="fillColor", and wrap in a <template> tag
    const svgContent = content
      .replace(/<svg[^>]*>/, "") // Remove opening <svg> tag
      .replace(/<\/svg>/, "") // Remove closing </svg> tag
      .replace(/fill="black"/g, ":fill=\"fillColor\"") // Replace fill="black" with :fill="fillColor"
      .trim();

    return `<template v-else-if="name === '${fileName}'">\n${svgContent}\n</template>`;
  });

  // Create a string array of all filenames
  const iconNames = svgFiles.map(file => `"${path.basename(file, ".svg").toLowerCase()}"`);
  const iconsArray = `\n\nconst icons = [${iconNames.join(", ")}];`;

  // Write the transformed SVGs and the icons array to the output file
  fs.writeFileSync(outputFile, combinedSVGs.join("\n\n") + iconsArray, "utf-8");
  // console.log(`Combined SVGs written to ${outputFile}`);
});
