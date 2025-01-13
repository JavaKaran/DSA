class Graph {
    constructor(numNodes = 8){
        // this.matrix = [];
        // for(let i = 0; i < numNodes; i++){
        //     this.matrix.push(new Array(numNodes).fill(0));
        // }

        this.list = {};
    }

    addNode(node) {
        this.list[node] = [];
    }

    addEdge(node1, node2){
        // this.matrix[node1][node2] = 1;
        // this.matrix[node2][node1] = 1;

        this.list[node1].push(node2);
        this.list[node2].push(node1);
    }

    removeEdge(node1, node2){
        // this.matrix[node1][node2] = 0;
        // this.matrix[node2][node1] = 0;

        this.list[node1] = this.list[node1].filter(n => n !== node2);
        this.list[node2] = this.list[node2].filter(n => n !== node1);
    }

    isEdgeMatrix(node1, node2){
        return this.matrix[node1][node2] == 1
    }

    isEdgeList(node1, node2){
        return this.list[node1].includes(node2);
    }

    dfs(startNode, visited = new Set()){
        visited.add(startNode);
        console.log(startNode);

        this.list[startNode].forEach((node) => {
            if(!visited.has(node)){
                this.dfs(node, visited);
            }
        })
    }

    bfs(startNode){
        const visited = new Set();
        const queue = [startNode];
        visited.add(startNode);

        while(queue.length > 0){
            const currentNode = queue.shift();
            console.log(currentNode);

            this.list[currentNode].forEach((node) => {
                if(!visited.has(node)){
                    visited.add(node);
                    queue.push(node);
                }
            })
        }
    }
}

let g = new Graph();
g.addNode('A');
g.addNode('B');
g.addNode('C');
g.addNode('D');
g.addNode('E');
g.addNode('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('B', 'E');
g.addEdge('C', 'F');
g.addEdge('E', 'F');

console.log("DFS:");
g.dfs('A');
console.log("BFS:");
g.bfs('A');