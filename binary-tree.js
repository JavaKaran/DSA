
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

    preInPostTraversal(root){
        let preorder = [];
        let inorder = [];
        let postorder = [];
    
        if(!root){
            return null;
        }
    
        let stack = [];
    
        stack.push([root, 1]);
    
        while(stack.length > 0){
            let [node, num] = stack.pop();
    
            if(num == 1){
                preorder.push(node.data);
                num = 2;
                stack.push([node, num]);
    
                if(node.left != null){
                    stack.push([node.left, 1]);
                }
            } else if (num == 2){
                inorder.push(node.data);
                num = 3;
                stack.push([node, num]);
    
                if(node.right != null){
                    stack.push([node.right, 1]);
                }
            } else {
                postorder.push(node.data);
            }
        }
    
        return [preorder, inorder, postorder];
    }

    print(arr) {
        for (let val of arr) {
            console.log(val + " ");
        }
        console.log("\n");
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

let traversals = tree.preInPostTraversal(tree.getRoot());

let pre = traversals[0];
let inOrder = traversals[1];
let post = traversals[2];

console.log("Inorder traversal: ");
tree.print(inOrder);
// tree.inorder(tree.getRoot());

console.log("Preorder traversal: ");
tree.print(pre);
// tree.preorder(tree.getRoot());

console.log("Postorder traversal: ");
tree.print(post);
// tree.postorder(tree.getRoot());