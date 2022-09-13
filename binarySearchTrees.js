class Node {
    constructor(data) {
        this.data = data;
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

        console.log(left);
        console.log(right);

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
        this.root = this.buildTree(arr);
    }

    buildTree(arr, start, end) {
        let sorted = mergeSort(arr);
        let sortedUnique = [...new Set(sorted)];

        if (start > end){
            return null;
        }

        let mid = parseInt((start + end) / 2);
        let node = new Node(sortedUnique[mid]);

        node.left = buildTree(sortedUnique, start, mid - 1);
        node.right = buildTree(sortedUnique, mid + 1, end);

        return node;
    }


}
