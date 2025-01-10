class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(){
        this.root = null;
    }

    insert(data){
        const node = new Node(data);
        
        if(this.root === null){
            this.root = node
        } else {
            this.insertNode(this.root, node);
        }
    }

    insertNode(root, node){
        if(node.data < root.data){
            if(root.left == null){
                root.left = node;
            } else {
                this.insertNode(root.left, node);
            }
        } else {
            if(root.right == null){
                root.right = node;
            } else {
                this.insertNode(root.right, node);
            }
        }
    }

    search(root, data){
        if(root.data == data){
            return root;
        }

        if(data < root.data){
            this.search(root.left, data);
        } else {
            this.search(root.right, data);
        }
    }

    findMin(root){
        if(root.left === null){
            return root;
        } else {
            return this.findMin(root.left);
        }
    }

    remove(data){
        this.root = this.removeNode(this.root, data);
    }

    removeNode(root, data){
        if(root === null){
            return;
        } else if(data < root.data){
            root.left = this.removeNode(root.left, data);
            return root;
        } else if(data > root.data){
            root.right = this.removeNode(root.right, data);
            return root;
        } else {
            if(root.left === null && root.right === null){
                root = null;
                return root;
            }

            if(root.left === null){
                root = root.right;
                return root;
            } else if(root.right === null){
                root = root.left;
                return root;
            }

            let minNode = this.findMin(root.right);
            root.data = minNode.data;
            root.right = this.removeNode(root.right, minNode.data);
            return root;
        }
    }

    getRoot(){
        return this.root;
    }

    inorder(root){
        if(root){
            this.inorder(root.left);
            console.log(root.data);
            this.inorder(root.right);
        }
    }

    preorder(root){
        if(root){
            console.log(root.data);
            this.preorder(root.left);
            this.preorder(root.right);
        }
    }

    postorder(root){
        if(root){
            this.postorder(root.left);
            this.postorder(root.right);
            console.log(root.data);
        }
    }

    bfs(root){
        if(!root){
            return;
        }

        const result = [];
        let queue = [];

        queue.push(root);

        while(queue.length > 0){
            const levelSize = queue.length;
            const currentLevel = [];

            for(let i = 0; i < levelSize; i++){
                const node = queue.shift();

                console.log(node.data);
                currentLevel.push(node.data);

                if(node.left){
                    queue.push(node.left);
                }

                if(node.right){
                    queue.push(node.right);
                }
            }

            result.push(currentLevel);
        }

        return result;
    }
}

let tree = new BinarySearchTree();

tree.insert(54);
tree.insert(35);
tree.insert(13);
tree.insert(4);
tree.insert(44);
tree.insert(59);
tree.insert(63);

tree.remove(44);

console.log("Root:", tree.getRoot());

console.log("Inorder Traversal:");
tree.inorder(tree.getRoot());

console.log("Preorder Traversal:");
tree.preorder(tree.getRoot());

console.log("Postorder Traversal:");
tree.postorder(tree.getRoot());

console.log("BFS Traversal:");
tree.bfs(tree.getRoot());