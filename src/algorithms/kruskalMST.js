// Kruskal Algorithm for MST Finding
function kruskal(adjMatrix) {
    const numVertices = adjMatrix.length;
    const edges = [];
  
    // Create a list of all edges
    for (let i = 0; i < numVertices; i++) {
        for (let j = i + 1; j < numVertices; j++) {
            if (adjMatrix[i][j] !== 0) {
            edges.push([i, j, adjMatrix[i][j]]);
            }
        }
    }
  
    // Sort edges in ascending order by weight
    edges.sort((a, b) => a[2] - b[2]);
  
    const parent = new Array(numVertices);
    for (let i = 0; i < numVertices; i++) {
        parent[i] = i;
    }

    // Some inner helper function
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
  
    function union(x, y) {
        const rootX = find(x);
        const rootY = find(y);
    
        parent[rootX] = rootY;
    }
    
    // Minimum spanning tree result
    const minSpanningTree = [];
    for (let i = 0; i < edges.length; i++) {
        const [src, dest, weight] = edges[i];
        if (find(src) !== find(dest)) {
            union(src, dest);
            minSpanningTree.push(edges[i]);
        }
    }
  
    return minSpanningTree;
}
  
export default kruskal;
  