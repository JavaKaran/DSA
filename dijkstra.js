class Graph {
    constructor(){
        this.vertices = [];
        this.adjacencyList = {};
    }

    addVertex(data){
        this.vertices.push(data);
        this.adjacencyList[data] = [];
    }

    addEdge(vertex1, vertex2, weight){
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    changeWeight(vertex1, vertex2, weight){
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    dijkstra(source, end){
        let distances = {},
            parents = {},
            visited = new Set();

        for(let i = 0; i < this.vertices.length; i++){
            if(this.vertices[i] === source){
                distances[this.vertices[i]] = 0;
            } else {
                distances[this.vertices[i]] = Infinity;
            }

            parents[this.vertices[i]] = null;
        }

        let currentVertex = this.vertexWithMinDistance(distances, visited);

        while(currentVertex !== null){
            let distance = distances[currentVertex];
            let neighbors = this.adjacencyList[currentVertex];

            for(let neighbor in neighbors){
                let newDistance = distance + neighbors[neighbor];

                if(newDistance < distances[neighbor]){
                    distances[neighbor] = newDistance;
                    parents[neighbor] = currentVertex;
                }
            }

            visited.add(currentVertex);

            currentVertex = this.vertexWithMinDistance(distances, visited);
        }

        let shortestPath = [end];
        let parent = parents[end];

        while(parent){
            shortestPath.unshift(parent);
            parent = parents[parent];
        }

        console.log("Shortest Path: ", shortestPath);
        console.log("Distances", distances);
    }

    vertexWithMinDistance(distances, visited){
        let minDistance = Infinity;
        let minVertex = null;

        for(let vertex in distances){
            let distance = distances[vertex];
            
            if(distance < minDistance && !visited.has(vertex)){
                minDistance = distance;
                minVertex = vertex;
            }
        }

        return minVertex;
    }
}

let g = new Graph();

g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');

g.addEdge('A', 'B', 3);
g.addEdge('A', 'C', 2);
g.addEdge('B', 'D', 2);
g.addEdge('C', 'D', 6);

g.dijkstra('A', 'C');