export function flattenMatrix(matrix) {
    const flattenedArray = [];
  
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[row].length; column++) {
        flattenedArray.push(matrix[row][column]);
      }
    }
  
    return flattenedArray;
}