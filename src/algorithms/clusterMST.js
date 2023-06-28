// Building DisjointSets to hanlde clustering
class DisjointSet {
    constructor(numVertices) {
        this.parent = new Array(numVertices);
        this.rank = new Array(numVertices);

        for (let i = 0; i < numVertices; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }
  
    find(vertex) {
        if (this.parent[vertex] !== vertex) {
            this.parent[vertex] = this.find(this.parent[vertex]);
        }
        return this.parent[vertex];
    }
  
    union(vertexA, vertexB) {
        const rootA = this.find(vertexA);
        const rootB = this.find(vertexB);
    
        if (rootA !== rootB) {
            if (this.rank[rootA] < this.rank[rootB]) {
                this.parent[rootA] = rootB;
            } else if (this.rank[rootA] > this.rank[rootB]) {
                this.parent[rootB] = rootA;
            } else {
                this.parent[rootB] = rootA;
                this.rank[rootA]++;
            }
        }
    }
}
  
// Function to do MST Clustering
function clusterMST(mst, adjMatrix, numClusters) {
    // Pre process
    let clusters = [];
  
    // Remove k-1 edges with the highest weights
    for (let i = 0; i < mst.length; i++) {
        const src = mst[i][0];
        const dest = mst[i][1];
        const weight = mst[i][2];
    
        // Add the edge to the cluster list
        clusters.push({ src, dest, weight });
    }
  
    // Sort the clusters by weight in descending order
    clusters.sort((a, b) => b.weight - a.weight);
  
    // Remove k-1 highest weight edges
    let removed = clusters.slice(0, numClusters - 1);  // gather the removed edges
    clusters.splice(0, numClusters - 1);
  
    // Create the clusters from the remaining connected components in the modified MST
    const disjointSet = new DisjointSet(adjMatrix.length);
    const result = [];
  
    // Add vertices to the result for each cluster
    for (let i = 0; i < clusters.length; i++) {
        const { src, dest } = clusters[i];
        disjointSet.union(src, dest);
    }
  
    // Group vertices based on their root parent in the disjoint set
    for (let i = 0; i < adjMatrix.length; i++) {
        const root = disjointSet.find(i);
    
        if (!result[root]) {
            result[root] = [];
        }
    
        result[root].push(i + 1);
    }
  
    // Filter out empty clusters
    const finalClusters = result.filter(cluster => cluster !== undefined);
  
    return [finalClusters, removed];
}

export default clusterMST;