class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

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

class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = null;
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

        this.arr = sortedUnique;
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

    insert(root, value) {
        if (root === null) {
            root = new Node(value);
            return root;
        }
 
        if (value < root.value) {
            root.left = this.insert(root.left, value);
        } else if (value > root.value) { 
            root.right = this.insert(root.right, value);
        }

        return root;
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
bstree.insert(bstree.root, 11);
bstree.prettyPrint(bstree.root);