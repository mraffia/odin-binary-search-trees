function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    } else {
        let sorted = [];

        let left = mergeSort(arr.slice(0, arr.length / 2));
        let right = mergeSort(arr.slice(arr.length / 2));

        let leftPointer = 0;
        let rightPointer = 0;
        
        while (sorted.length < left.length + right.length) {
            if (rightPointer >= right.length) {
                sorted.push(left[leftPointer]);
                leftPointer++;
            } else if (leftPointer >= left.length) {
                sorted.push(right[rightPointer]);
                rightPointer++;
            } else if (left[leftPointer] < right[rightPointer]) {
                sorted.push(left[leftPointer]);
                leftPointer++;
            } else {
                sorted.push(right[rightPointer]);
                rightPointer++;
            }
        }
    
        return sorted;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = null;
        this.inorderArr = [];
        this.preorderArr = [];
        this.postorderArr = [];
    }

    buildTree(arr, start, end) {
        if (start > end){
            return null;
        }

        let mid = parseInt((start + end) / 2);
        let node = new Node(arr[mid]);

        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);

        return node;
    }

    setRoot() {
        let sorted = mergeSort(this.arr);
        let sortedUnique = [...new Set(sorted)];

        this.root = this.buildTree(sortedUnique, 0, sortedUnique.length -1);
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    insertNode(root, value) {
        if (root === null) {
            root = new Node(value);
            return root;
        }
 
        if (value < root.value) {
            root.left = this.insertNode(root.left, value);
        } else if (value > root.value) { 
            root.right = this.insertNode(root.right, value);
        }

        return root;
    }

    deleteNode(root, value) {
        if (root === null) {
            return root;
        }

        if (root.value > value) {
            root.left = this.deleteNode(root.left, value);
            return root;
        } else if (root.value < value) {
            root.right = this.deleteNode(root.right, value);
            return root;
        }

        if (root.left === null) {
            let temp = root.right;
            return temp;
        } else if (root.right === null) {
            let  temp = root.left;
            return temp;
        } else {
            let succParent = root;
            let succ = root.right;
          
            while (succ.left !== null) {
                succParent = succ;
                succ = succ.left;
            }

            if (succParent !== root) {
                succParent.left = succ.right;
            } else {
                succParent.right = succ.right;
            }

            root.value = succ.value;
    
            return root;
        }
    }

    findNode(root, value) {
        if (root === null || root.value === value) {
            return root;
        }
        
        if (root.value < value) {
            return this.findNode(root.right, value);
        } else {
            return this.findNode(root.left, value);
        }
    }

    levelOrder(root) {
        let levelOrderArr = [];
        if (root !== null) {
            let queue = [];
            queue.push(root);

            while (queue.length !== 0) {
                let current = queue[0];
                levelOrderArr.push(current.value);

                if (current.left !== null) {
                    queue.push(current.left);
                } 

                if (current.right !== null) {
                    queue.push(current.right);
                }

                queue.shift();
            }
        }

        return levelOrderArr;
    }

    inorder(root) {
        this.inorderArr = [];
        this.inorderRec(root);
        return this.inorderArr;
    }

    inorderRec(root) {
        if (root !== null) {
            this.inorderRec(root.left);
            this.inorderArr.push(root.value);
            this.inorderRec(root.right);
        }
    }

    preorder(root) {
        this.preorderArr = [];
        this.preorderRec(root);
        return this.preorderArr;
    }

    preorderRec(root) {
        if (root !== null) {
            this.preorderArr.push(root.value);
            this.preorderRec(root.left);
            this.preorderRec(root.right);
        }
    }

    postorder(root) {
        this.postorderArr = [];
        this.postorderRec(root);
        return this.postorderArr;
    }

    postorderRec(root) {
        if (root !==  null) {
            this.postorderRec(root.left);
            this.postorderRec(root.right);
            this.postorderArr.push(root.value);
        }
    }

    getHeight(root) {
        if (root === null) {
            return 0;
        } else {
            let leftHeight = this.getHeight(root.left);
            let rightHeight = this.getHeight(root.right);
   
            if (leftHeight > rightHeight) {
                return (leftHeight + 1);
            } else {
                return (rightHeight + 1);
            }
        }
    }

    getDepth(root, value) {
        if (root === null) {
            return 0;
        }

        if (root.value === value) {
            return 1;
        }
        
        if (root.value < value) {
            return 1 + this.getDepth(root.right, value);
        } else {
            return 1 + this.getDepth(root.left, value);
        }
    }

    isBalanced(root) {
        if(root == null) { 
            return true;
        }

        let leftHeight = this.getHeight(root.left)
        let rightHeight = this.getHeight(root.right)
    
        if (Math.abs(leftHeight - rightHeight) <= 1 &&
        this.isBalanced(root.left) === true && 
        this.isBalanced(root.right) === true) {
            return true;
        }

        return false;
    }

    rebalance() {
        this.arr = this.inorder(this.root);
        this.setRoot();
    }
}

// TEST
let bstree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
bstree.setRoot();

// prettyPrint
bstree.prettyPrint(bstree.root);

// findNode
console.log(bstree.findNode(bstree.root, 67));

// insert
bstree.insertNode(bstree.root, 11);
bstree.prettyPrint(bstree.root);

// delete
bstree.deleteNode(bstree.root, 11);
bstree.prettyPrint(bstree.root);
bstree.deleteNode(bstree.root, 5);
bstree.prettyPrint(bstree.root);
bstree.deleteNode(bstree.root, 8);
bstree.prettyPrint(bstree.root);

// levelOrder
console.log(bstree.levelOrder(bstree.root));

// inorder
console.log(bstree.inorder(bstree.root));

// preorder
console.log(bstree.preorder(bstree.root));

// postorder
console.log(bstree.postorder(bstree.root));

// getHeight
console.log(bstree.getHeight(bstree.root));

// getDepth
console.log(bstree.getDepth(bstree.root, 3));

// isBalanced
console.log(bstree.isBalanced(bstree.root));

// rebalance
bstree.rebalance();
bstree.prettyPrint(bstree.root);
