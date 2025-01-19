class DisjointSet {
    constructor(n) {
        this.rank = Array(n + 1).fill(0);
        this.parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.size = Array(n + 1).fill(1);
    }

    findUParent(node){
        if (node === this.parent[node]) {
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

const ds = new DisjointSet(7);

ds.unionByRank(1, 2);
ds.unionByRank(2, 3);
ds.unionByRank(4, 5);
ds.unionByRank(6, 7);
ds.unionByRank(5, 6);

console.log(ds.parent);