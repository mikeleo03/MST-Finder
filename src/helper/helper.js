// Sort by the first and second elemen, then switch to help
function sortFirstAndSecond1(matrix) {
    const sortedMatrix = [];
  
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
    
        // Check if the first element is greater than the second element
        if (row[0] > row[1]) {
            // Swap the elements
            const temp = row[0];
            row[0] = row[1];
            row[1] = temp;
        }
    
        sortedMatrix.push(row);
    }
  
    return sortedMatrix;
}

function sortFirstAndSecond2(matrix) {
    const sortedMatrix = [];
  
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
    
        // Check if the first element is smaller than the second element
        if (row[0] < row[1]) {
            // Swap the elements
            const temp = row[1];
            row[1] = row[0];
            row[0] = temp;
        }
    
        sortedMatrix.push(row);
    }
  
    return sortedMatrix;
}

// Convert matrix of char into integer by parsing one by one
function convertMatrixToIntegers(adjMatrix) {
    const numVertices = adjMatrix.length;
    const intMatrix = [];
  
    for (let i = 0; i < numVertices; i++) {
        const row = [];
        for (let j = 0; j < numVertices; j++) {
            row.push(parseInt(adjMatrix[i][j]));
        }
        intMatrix.push(row);
    }
  
    return intMatrix;
}

export { sortFirstAndSecond1, sortFirstAndSecond2, convertMatrixToIntegers };