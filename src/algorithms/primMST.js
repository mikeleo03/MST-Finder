// Prim Algorithm for MST Finding
function prim(adjMatrix) {
    // Initialization
    let numVertices = adjMatrix.length;
    let parent = [];
    let minDistances = [];
    let visited = [];
    
    // Initialize all minDistance as infinity and not visited
    for (let i = 0; i < numVertices; i++) {
        minDistances[i] = Infinity; 
        visited[i] = false;
    }

    // Preprocessing
    minDistances[0] = 0;
    parent[0] = -1; // First node is always root
    
    // Processing
    const minSpanningTree = [];
    for (let i = 0; i < numVertices; i++) {
        const minIndex = findMinDistanceVertex(minDistances, visited, numVertices);
        visited[minIndex] = true;
        
        if (adjMatrix[minIndex]) {
            for (let j = 0; j < numVertices; j++) {
                if (adjMatrix[minIndex][j] && visited[j] == false && adjMatrix[minIndex][j] < minDistances[j]) {
                    parent[j] = minIndex;
                    minDistances[j] = adjMatrix[minIndex][j];
                }
            }

            if (adjMatrix[minIndex][parent[minIndex]]) {
                minSpanningTree.push([parent[minIndex], minIndex, adjMatrix[minIndex][parent[minIndex]]]);
            }
        }
    }
    
    // Minimum spanning tree result  
    return minSpanningTree;
}

// Helper function to look for the minimum distance of vertex in a graph
function findMinDistanceVertex(minDistances, visited, numVertices) {
    let minDistance = Infinity;
    let minIndex;
  
    for (let i = 0; i < numVertices; i++) {
        if (visited[i] == false && minDistances[i] < minDistance) {
            minDistance = minDistances[i];
            minIndex = i;
        }
    }
  
    return minIndex;
}

export default prim;