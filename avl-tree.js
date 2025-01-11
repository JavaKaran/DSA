class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor(){
        this.root = null;
    }

    height(node){
        if(node === null){
            return 0;
        }

        return node.height;
    }

    rightRotate(node){
        let left = node.left;
        let leftRight = left.right;

        left.right = node;
        node.left = leftRight;

        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        left.height = Math.max(this.height(left.left), this.height(left.right)) + 1;

        return left;
    }

    leftRotate(node){
        let right = node.right;
        let rightLeft = right.left;

        right.left = node;
        node.right = rightLeft;

        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        right.height = Math.max(this.height(right.left), this.height(right.right)) + 1;

        return right;
    }

    getBalanceFactor(node){
        if(node === null){
            return 0;
        }

        return this.height(node.left) - this.height(node.right);
    }

    nodeWithMinimumValue(node){
        let current = node;
        while(current.left !== null){
            current = current.left;
        }

        return current;
    }

    add(data){
        this.root = this.addNode(this.root, data);
    }

    addNode(root, data){
        if(root === null){
            return new Node(data);
        }

        if(data < root.data){
            root.left = this.addNode(root.left, data);
        } else if(data > root.data){
            root.right = this.addNode(root.right, data);
        } else {
            return root;
        }

        root.height = Math.max(this.height(root.left), this.height(root.right)) + 1;

        let balanceFactor = this.getBalanceFactor(root);

        // left heavy
        if(balanceFactor > 1){
            // if data added on left of root.left, do right rotation
            if(data < root.left.data){
                return this.rightRotate(root);
            } else 
            // if data added on right of root.left, do left rotation and then right rotation
            if(data > root.left.data){
                root.left = this.leftRotate(root.left);
                return this.rightRotate(root);
            }
        }

        // right heavy
        if(balanceFactor < -1){
            // if data added on right of root.right, do left rotation
            if(data > root.right.data){
                return this.leftRotate(root);
            } else 
            // if data added on left of root.right, do right rotation and then left rotation
            if(data < root.right.data){
                root.right = this.rightRotate(root.right);
                return this.leftRotate(root);
            }
        }

        return root;
    }

    delete(data){
        this.root = this.removeNode(this.root, data);
    }

    removeNode(root, data){
        if(root === null){
            return root;
        }

        if(data < root.data){
            root.left = this.removeNode(root.left, data);
        } else if(data > root.data){
            root.right = this.removeNode(root.right, data);
        } else {
            if((root.left === null) || (root.right === null)){
                let temp = null;
                if(root.left === null){
                    temp = root.right;
                } else {
                    temp = root.left;
                }

                if(temp === null){
                    temp = root;
                    root = null;
                } else {
                    root = temp;
                }
            } else {
                let temp = this.nodeWithMinimumValue(root.right);
                root.data = temp.data;
                root.right = this.removeNode(root.right, temp.data);
            }
        }
        
        if (root == null){
            return root;
        }

        root.height = Math.max(this.height(root.left), this.height(root.right)) + 1;

        let balanceFactor = this.getBalanceFactor(root);

        if(balanceFactor > 1){
            if(this.getBalanceFactor(root.left) >= 0){
                return this.rightRotate(root);
            } else {
                root.left = this.leftRotate(root.left);
                return this.rightRotate(root);
            }
        }

        if(balanceFactor < -1){
            if(this.getBalanceFactor(root.right) <= 0){
                return this.leftRotate(root);
            } else {
                root.right = this.rightRotate(root);
                return this.leftRotate(root);
            }
        }

        return root;
    }

    preOrder(root){
        if(root !== null){
            console.log(root.data);
            this.preOrder(root.left);
            this.preOrder(root.right);
        }
    }
}

let tree = new AVLTree();

tree.add(10);
tree.add(56);
tree.add(35);
tree.add(62);
tree.add(72);

console.log("Preorder Traversal: ");
tree.preOrder(tree.root);

tree.delete(10);

console.log("Preorder Traversal: ");
tree.preOrder(tree.root);
