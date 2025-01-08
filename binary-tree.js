
class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor(){
        this.root = null;
    }

    insert(data){
        let node = new Node(data);

        if(this.root === null){
            this.root = node;
        } else {
            this.insertNode(this.root, node);
        }
    }

    insertNode(root, node){
        if(node.data < root.data){
            if(root.left === null){
                root.left = node;
            } else {
                this.insertNode(root.left, node);
            }
        } else {
            if(root.right === null){
                root.right = node;
            } else {
                this.insertNode(root.right, node);
            }
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

    inorder(root){
        if(root !== null){
            this.inorder(root.left);
            console.log(root.data + " => ");
            this.inorder(root.right);
        }
    }

    preorder(root){
        if(root !== null){
            console.log(root.data + " => ");
            this.preorder(root.left);
            this.preorder(root.right);
        }
    }

    postorder(root){
        if(root !== null){
            this.postorder(root.left);
            this.postorder(root.right);
            console.log(root.data + " => ");
        }
    }

    findMin(root){
        if(root.left === null){
            return root;
        } else {
            return this.findMin(root.left);
        }
    }

    getRoot(){
        return this.root;
    }

    search(node, data){
        if(node === null){
            return;
        } else if(data < node.data){
            return this.search(node.left, data);
        } else if(data > node.data){
            return this.search(node.right, data);
        } else {
            return node;
        }
    }
}

let tree = new BinaryTree();

tree.insert(35);
tree.insert(64);
tree.insert(3);
tree.insert(56);
tree.insert(34);
tree.insert(61);
tree.insert(13);

tree.remove(35);

console.log("Root: ",tree.getRoot());

console.log("Inorder traversal: ");
tree.inorder(tree.getRoot());

console.log("Preorder traversal: ");
tree.preorder(tree.getRoot());

console.log("Postorder traversal: ");
tree.postorder(tree.getRoot());