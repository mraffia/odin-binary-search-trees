# odin-binary-search-trees
Binary Search Trees project from Javascript section of the Full Stack Javascript Course on The Odin Project

## Implemented Bynary Search Tree Class Functions
- `buildTree` function which takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed. The buildTree function should return the level-0 root node.
- `prettyPrint` function that will visualize the binary search tree in a structured format in console.
- `insertNode` and `deleteNode` functions which accepts a value to insert/delete.
- `findNode` function which accepts a value and returns the node with the given value.
- `levelOrder` function which accepts another function as a parameter. `levelOrder` should traverse the tree in breadth-first level order and provide each node as the argument to the provided function. The method should return an array of values if no function is given.
- `inorder`, `preorder`, and `postorder` functions that accept a function parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided function given as an argument. The functions should return an array of values if no function is given.
- `getHeight` function which accepts a node and returns its height. Height is defined as the number of edges in longest path from a given node to a leaf node.
- `getDepth` function which accepts a node and returns its depth. Depth is defined as the number of edges in path from a given node to the tree’s root node.
- `isBalanced` function which checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
- `rebalance` function which rebalances an unbalanced tree.