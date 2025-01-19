class DisjointSet {
    constructor(n){
        this.parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.size = Array(n + 1).fill(1);
        this.rank = Array(n + 1).fill(0);
    }

    findUParent(node){
        if(node === this.parent[node]){
            return node;
        }

        this.parent[node] = this.findUParent(this.parent[node]);
        return this.parent[node];
    }

    unionByRank(node1, node2){
        const node1Parent = this.findUParent(node1);
        const node2Parent = this.findUParent(node2);

        if(node1Parent == node2Parent) return;

        if(this.rank[node1Parent] < this.rank[node2Parent]){
            this.parent[node1Parent] = node2Parent;
        } else if(this.rank[node2Parent] < this.rank[node1Parent]){
            this.parent[node2Parent] = node1Parent;
        } else {
            this.parent[node2Parent] = node1Parent;
            this.rank[node1Parent] += 1;
        }
    }

    unionBySize(node1, node2){
        const node1Parent = this.findUParent(node1);
        const node2Parent = this.findUParent(node2);

        if(node1Parent == node2Parent) return;

        if(this.size[node1Parent] < this.size[node2Parent]){
            this.parent[node1Parent] = node2Parent;
            this.size[node2Parent] += this.size[node1Parent];
        } else {
            this.parent[node2Parent] = node1Parent;
            this.size[node1Parent] += this.size[node2Parent];
        }
    }
}

class Graph {
    constructor(){
        this.adjacencyList = new Map();
        this.edges = [];
    }

    addEdge(source, destination, weight){
        if(!this.adjacencyList.has(source)) this.adjacencyList.set(source, []);
        if(!this.adjacencyList.has(destination)) this.adjacencyList.set(destination, []);

        this.adjacencyList.get(source).push({source, destination, weight});
        this.adjacencyList.get(destination).push({source, destination, weight});

        this.edges.push({ source, destination, weight });
    }

    kruskalMST(){
        this.edges.sort((a,b) => a.weight - b.weight);

        const size = this.adjacencyList.size;
        const ds = new DisjointSet(size);

        const mst = [];
        let totalWeight = 0;

        for(const { source, destination, weight } of this.edges){
            if(ds.findUParent(source) !== ds.findUParent(destination)){
                ds.unionBySize(source, destination);
                mst.push({ source, destination, weight });
                totalWeight += weight;
            }
        }

        return { mst, totalWeight };
    }
}

const g = new Graph();

g.addEdge(0, 1, 10);
g.addEdge(0, 2, 6);
g.addEdge(0, 3, 5);
g.addEdge(1, 3, 15);
g.addEdge(2, 3, 4);

const mst = g.kruskalMST();
console.log("MST: ");
mst.mst.forEach(element => {
    console.log(`${element.source} -> ${element.destination} (${element.weight})`);
});

console.log("Total Weight:", mst.totalWeight);