class Graph {
    constructor(){
        this.list = {};
    }

    addNode(node){
        if(!this.list[node]){
            this.list[node] = [];
        }
    }

    addEdge(node1, node2, weight){
        if(!this.list[node1]) this.addNode(node1);
        if(!this.list[node2]) this.addNode(node2);

        this.list[node1].push({ node: node2, weight })
    }

    topoSort(graph){
        let visited = new Set();
        let stack = [];

        Object.keys(graph).forEach((node) => {
            if(!visited.has(node)){
                this.topoSortHelper(node, visited, stack);
            }
        })

        return stack.reverse();
    }

    topoSortHelper(node, visited, stack){
        visited.add(node);

        this.list[node].forEach((edge) => {
            if(!visited.has(edge.node)){
                this.topoSortHelper(edge.node, visited, stack);
            }
        })

        stack.push(node);
    }

    shortestPath(source){
        const topoOrder = this.topoSort(this.list);

        console.log("Topo Order: ", topoOrder);

        let distances = {};
        Object.keys(this.list).forEach((node) => {
            distances[node] = Infinity;
        })

        distances[source] = 0;

        topoOrder.forEach((node) => {
            if(distances[node] !== Infinity){
                this.list[node].forEach((edge) => {
                    if(distances[node] + edge.weight < distances[edge.node]){
                        distances[edge.node] = distances[node] + edge.weight;
                    }
                })
            }
        })

        return distances;
    }
}

const g = new Graph();
g.addEdge('A', 'B', 1);
g.addEdge('A', 'C', 4);
g.addEdge('B', 'C', 2);
g.addEdge('B', 'D', 6);
g.addEdge('C', 'D', 3);

console.log("Shortest Path in DAG:");
const shortestPaths = g.shortestPath('A');
console.log(shortestPaths);