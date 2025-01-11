class Node {
    constructor(range, leaf){
        this.range = range;
        this.keys = Array(2*range - 1).fill(null);
        this.children = Array(2*range).fill(null);
        this.numberOfKeys = 0;
        this.leaf = leaf;
    }

    //assuming the node is not full
    insertKey(key){
        let i = this.numberOfKeys - 1;
        if(this.leaf){
            while(i >= 0 && this.keys[i] > key){
                this.keys[i + 1] = this.keys[i];
                i--;
            }
            this.keys[i + 1] = key;
            this.numberOfKeys++;
        } else {
            while(i >= 0 && this.keys[i] > key){
                i--;
            }

            if(this.children[i + 1].numberOfKeys == 2*this.range - 1){
                this.splitChild(i + 1, this.children[i + 1]);
                if(this.keys[i + 1] < key){
                    i++;
                }
            }

            this.children[i + 1].insertKey(key);
        }
    }

    splitChild(i, child){
        const temp = new Node(child.range, child.leaf);
        temp.numberOfKeys = this.range - 1;

        for(let j = 0; j < this.range - 1; j++){
            temp.keys[j] = child.keys[j + this.range];
        }

        if(!child.leaf){
            for(let j = 0; j < this.range; j++){
                temp.children[j] = child.children[j + this.range];
            }
        }

        child.numberOfKeys = this.range - 1;

        for(let j = this.numberOfKeys; j >= i + 1; j--){
            this.children[j + 1] = this.children[j];
        }

        this.children[i + 1] = temp;

        for(let j = this.numberOfKeys - 1; j >= i; j--){
            this.keys[j + 1] = this.keys[j];
        }

        this.keys[i] = child.keys[this.range - 1];
        this.numberOfKeys++;
    }

    traverse(){
        for(let i = 0; i < this.numberOfKeys; i++){
            if(!this.leaf){
                this.children[i].traverse();
            }

            console.log(this.keys[i]);
        }

        if(!this.leaf){
            this.children[this.numberOfKeys].traverse();
        }
    }

    search(data){
        let i = 0;

        while(i < this.numberOfKeys && data > this.keys[i]){
            i++;
        }

        if(i < this.numberOfKeys && data === this.keys[i]){
            return this;
        }

        if(this.leaf){
            return null;
        }

        return this.children[i].search(data);
    }

    findKey(key){
        let i = 0;

        while(i < this.numberOfKeys && this.keys[i] < key){
            i++;
        }

        return i;
    }

    deleteKey(key){
        let index = this.findKey(key);

        if(index < this.numberOfKeys && this.keys[index] === key){
            if(this.leaf){
                this.removeFromLeaf(index);
            } else {
                this.removeFromNode(index);
            }
        } else {
            let flag = index === this.numberOfKeys ? index - 1 : index;
            let child = this.children[flag];

            if(child.numberOfKeys < this.range){
                this.fixChild(flag);
            }

            this.children[flag].deleteKey(key);
        }
    }

    removeFromLeaf(index){
        for(let i = index; i < this.numberOfKeys - 1; i++){
            this.keys[i] = this.keys[i + 1];
        }
        this.keys[this.numberOfKeys - 1] = null;
        this.numberOfKeys--;
    }

    removeFromNode(index){
        let key = this.keys[index];
        let leftChild = this.children[index];
        let rightChild = this.children[index + 1];

        if(leftChild.numberOfKeys >= this.range){
            const predKey = leftChild.getPredecessor(index);
            this.keys[index] = predKey;
            leftChild.deleteKey(predKey);
        } else if(rightChild.numberOfKeys >= this.range){
            const succKey = rightChild.getSuccessor(index);
            this.keys[index] = succKey;
            rightChild.deleteKey(succKey);
        } else {
            this.mergeChildren(index);
            leftChild.deleteKey(key);
        }
    }

    getPredecessor(index){
        let current = this.children[index];
        while(!current.leaf){
            current = current.children[current.numberOfKeys];
        }

        return current.keys[current.numberOfKeys - 1];
    }
    
    getSuccessor(index){
        let current = this.children[index + 1];
        while(!current.leaf){
            current = current.children[0];
        }

        return current.keys[0];
    }

    mergeChildren(index){
        const leftChild = this.children[index];
        const rightChild = this.children[index + 1];

        leftChild.keys[leftChild.numberOfKeys] = this.keys[index];
        leftChild.numberOfKeys++;

        for(let i = 0; i < rightChild.numberOfKeys; i++){
            leftChild.keys[leftChild.numberOfKeys + i] = rightChild.keys[i];
        }

        leftChild.numberOfKeys += rightChild.numberOfKeys;

        if(!leftChild.leaf){
            for(let i = 0; i < rightChild.numberOfKeys + 1; i++){
                leftChild.children[leftChild.numberOfKeys + i] = rightChild.children[i];
            }
        }

        for(let i = index + 1; i < this.numberOfKeys; i++){
            this.keys[i] = this.keys[i + 1];
            this.children[i + 1] = this.children[i + 2];
        }

        this.numberOfKeys--;
        rightChild.numberOfKeys = 0;
    }

    fixChild(index){
        if(index > 0 && this.children[index - 1].numberOfKeys >= this.range){
            this.borrowFromLeft(index);
        } else if(index < this.numberOfKeys && this.children[index + 1].numberOfKeys >= this.range){
            this.borrowFromRight(index);
        } else {
            if(index < this.numberOfKeys){
                this.mergeChildren(index);
            } else {
                this.mergeChildren(index - 1);
            }
        }
    }

    borrowFromLeft(index){
        const child = this.children[index];
        const sibling = this.children[index - 1];

        for(let i = child.numberOfKeys - 1; i >= 0; i--){
            child.keys[i + 1] = child.keys[i];
        }

        if(!child.leaf){
            for(let i = child.numberOfKeys; i >= 0; i--){
                child.children[i + 1] = child.children[i];
            }
        }

        child.keys[0] = this.keys[index - 1];
        this.keys[index - 1] = sibling.keys[sibling.numberOfKeys - 1];

        if(!sibling.leaf){
            child.children[0] = sibling.children[sibling.numberOfKeys];
        }

        child.numberOfKeys++;
        sibling.numberOfKeys--;
    }

    borrowFromRight(index){
        const child = this.children[index];
        const sibling = this.children[index + 1];

        child.keys[child.numberOfKeys] = this.keys[index];

        if(!child.leaf){
            child.children[child.numberOfKeys + 1] = sibling.children[0];
        }

        this.keys[index] = sibling.keys[0];

        for(let i = 1; i < sibling.numberOfKeys; i++){
            sibling.keys[i - 1] = sibling.keys[i];
        }

        if(!sibling.leaf){
            for(let i = 1; i <= sibling.numberOfKeys; i++){
                sibling.children[i - 1] = sibling.children[i];
            }
        }

        child.numberOfKeys++;
        sibling.numberOfKeys--;
    }
}

class BTree {
    constructor(range){
        this.range = range;
        this.root = null;
    }

    traverse(){
        if(this.root !== null){
            this.root.traverse();
        }
    }

    search(data){
        return this.root === null ? null : this.root.search(data);
    }

    insert(data){
        if(this.root === null){
            this.root = new Node(this.range, true);
            this.root.keys[0] = data;
            this.root.numberOfKeys = 1;
        } else {
            if(this.root.numberOfKeys === 2*this.range - 1){
                const temp = new Node(this.range, false);
                temp.children[0] = this.root;
                temp.splitChild(0, this.root);

                let i = 0;
                if(temp.keys[0] < data){
                    i++;
                }

                temp.children[i].insertKey(data);
                this.root = temp;
            } else {
                this.root.insertKey(data);
            }
        }
    }

    delete(data){
        if(this.root == null){
            return;
        }

        this.root.deleteKey(data);

        if(this.root.numberOfKeys == 0){
            if(this.root.leaf){
                this.root = null;
            } else {
                this.root = this.root.children[0];
            }
        }
    }
}

const tree = new BTree(3);

tree.insert(10);
tree.insert(20);
tree.insert(5);
tree.insert(6);
tree.insert(12);
tree.insert(30);
tree.insert(7);
tree.insert(17);

console.log("Traversal of the constructed tree is ");
tree.traverse();
