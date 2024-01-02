import { flattenMatrix } from "./flattenMatrix.js";

const compare = (a, b) =>
  a.length === b.length &&
  a.every((element, index) => element === b[index]);

function processMatrix(matrix) {
  let rows = 3
  let cols = 3
  
  // Trim the matrix to remove empty parts
  const trimmedMatrix = matrix.map(row =>
    row.map(cell => cell.trim())
  );

  // Find the minimum and maximum row and column indices with non-empty cells
  let minRow = rows;
  let maxRow = 0;
  let minCol = cols;
  let maxCol = 0;

  trimmedMatrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell !== '') {
        minRow = Math.min(minRow, rowIndex);
        maxRow = Math.max(maxRow, rowIndex);
        minCol = Math.min(minCol, colIndex);
        maxCol = Math.max(maxCol, colIndex);
      }
    });
  });

  // Extract the non-empty part of the matrix
  const resultMatrix = trimmedMatrix.slice(minRow, maxRow + 1).map(row =>
    row.slice(minCol, maxCol + 1)
  );

  // Expand the matrix back to the specified size
  const expandedMatrix = Array.from({ length: rows }, () => Array(cols).fill(''));

  resultMatrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      expandedMatrix[rowIndex][colIndex] = cell;
    });
  });

  return expandedMatrix;
}

export function optimizeRecipe(recipe) {
  let matrix = [
    [recipe[0] || "", recipe[1] || "", recipe[2]] || "",
    [recipe[3] || "", recipe[4] || "", recipe[5]] || "",
    [recipe[6] || "", recipe[7] || "", recipe[8]] || "",
  ];

  matrix = processMatrix(matrix)

  return flattenMatrix(matrix);
}