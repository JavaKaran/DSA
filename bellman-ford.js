class Graph {
    constructor(){
        this.edges = [];
    }

    addEdge(source, destination, weight){
        this.edges.push([source, destination, weight]);
    }

    bellmandFord(source, vertices){
        let distances = {};

        for(let i = 0; i < vertices; i++){
            distances[i] = Infinity;
        }

        distances[source] = 0;

        for(let i = 1; i < vertices; i++){
            for(const [source, destination, weight] of this.edges){
                if(distances[source] !== Infinity && distances[source] + weight < distances[destination]){
                    distances[destination] = distances[source] + weight;
                }
            }
        }

        for(const [source, destination, weight] of this.edges){
            if(distances[source] !== Infinity && distances[source] + weight < distances[destination]){
                return false;
            }
        }

        return distances;
    }
}

const graph = new Graph();

graph.addEdge(0, 1, 4);
graph.addEdge(0, 2, 5);
graph.addEdge(1, 2, -3);
graph.addEdge(1, 3, 6);
graph.addEdge(2, 3, 1);

const vertices = 4;

console.log(graph.bellmandFord(1, vertices));