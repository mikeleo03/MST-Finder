// Prim Algorithm for MST Finding
function prim(adjMatrix) {
    // Initialization
    const numVertices = adjMatrix.length;
    const visited = new Array(numVertices).fill(false);
    const minDistances = new Array(numVertices).fill(Infinity);
    const parent = new Array(numVertices).fill(null);
    
    // Setup minimum distance
    minDistances[0] = 0;
    
    // Processing
    for (let i = 0; i < numVertices - 1; i++) {
        const minIndex = findMinDistanceVertex(visited, minDistances);
        visited[minIndex] = true;
    
        for (let j = 0; j < numVertices; j++) {
            if (adjMatrix[minIndex][j] !== 0 && !visited[j] && adjMatrix[minIndex][j] < minDistances[j]) {
                parent[j] = minIndex;
                minDistances[j] = adjMatrix[minIndex][j];
            }
        }
    }
    
    // Minimum spanning tree result
    const minSpanningTree = [];
    for (let i = 1; i < numVertices; i++) {
        minSpanningTree.push([parent[i], i, adjMatrix[parent[i]][i]]);
    }
  
    return minSpanningTree;
}

// Helper function to look for the minimum distance of vertex in a graph
function findMinDistanceVertex(visited, minDistances) {
    let minDistance = Infinity;
    let minIndex = -1;
  
    for (let i = 0; i < minDistances.length; i++) {
        if (!visited[i] && minDistances[i] < minDistance) {
            minDistance = minDistances[i];
            minIndex = i;
        }
    }
  
    return minIndex;
}

export default prim;