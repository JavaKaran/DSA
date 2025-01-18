class Graph {
    constructor(vertices){
        this.adjacencyList = new Map();
        this.vertices = vertices;
    }

    addEdge(source, destination, weight){
        if(!this.adjacencyList.has(source)) this.adjacencyList.set(source, []);
        if(!this.adjacencyList.has(destination)) this.adjacencyList.set(destination, []);

        this.adjacencyList.get(source).push({source, destination, weight});
        this.adjacencyList.get(destination).push({source, destination, weight});
    }

    primsMST(){
        const visited = new Set();
        const priorityQueue = [];
        const mst = [];
        let totalWeight = 0;

        const startNode = 0;
        visited.add(startNode);

        this.adjacencyList.get(startNode).forEach(edge => priorityQueue.push(edge));

        const sortQueue = () => priorityQueue.sort((a, b) => a.weight - b.weight);

        while(priorityQueue.length > 0){
            sortQueue();

            const { source, destination, weight } = priorityQueue.shift();

            if(visited.has(destination)) continue;

            mst.push({ source, destination, weight });

            totalWeight += weight;

            visited.add(destination);

            this.adjacencyList.get(destination).forEach((edge) => {
                if(!visited.has(edge.destination)){
                    priorityQueue.push(edge);
                }
            })
        }

        console.log("MST Path:");

        mst.forEach(edge =>
            console.log(`Edge: ${edge.source} -> ${edge.destination}, Weight: ${edge.weight}`)
        );

        return totalWeight;
    }
}

const g = new Graph(5);
g.addEdge(0, 1, 2);
g.addEdge(0, 3, 6);
g.addEdge(1, 3, 8);
g.addEdge(1, 2, 3);
g.addEdge(1, 4, 5);
g.addEdge(2, 4, 7);

console.log("MST weight", g.primsMST());