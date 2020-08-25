# BinarySearchTree.js

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/binarysearchtree-js)
![Travis build](https://travis-ci.org/SchwSimon/BinarySearchTree.js.svg?branch=master)
[![License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat)](https://opensource.org/licenses/ISC)

Class to create Binary Search Trees

## Installation

```sh
npm install binarysearchtree-js --save
```

### Default node structure

```js
{
  value: 10,  // some numeric value
  left: null, // node object or null
  right: null // node object or null
}
```

### Usage

```js
const BinarySearchTree = require('binarysearchtree-js');

  // traversal order type constants
BinarySearchTree.IN_ORDER;
BinarySearchTree.PRE_ORDER;
BinarySearchTree.POST_ORDER;
BinarySearchTree.LAYER_ORDER;

const bst = new BinarySearchTree;
bst.root; 	// the root node
bst.count;  // the node count

bst.push(10);           // add a node with the value 10
bst.push(2,21,32,44);   // add multiple nodes at once
bst.push("1", [], null) // Non-numeric inputs are ignored
bst.push(
  [22, {path: "22Frame.jpeg"}],
  [13, { path: "13Frame.jpeg" }],
  [2, { path: "2Frame.jpeg" }]
);
bst.find(10);   // returns the node with the value 10
bst.find(1);    // returns false if node does not exist

bst.min();      // returns the lowest value
bst.min(true);  // returns the node with the lowest value
bst.max();      // returns the highest value
bst.max(true);  // returns the node with the highest value
bst.traverseExtra(BinarySearchTree._IN_ORDER);    // Traverse the tree
bst.traverse(BinarySearchTree._IN_ORDER);    // Traverse the tree
bst.traverse(BinarySearchTree._PRE_ORDER);   // and return an Array
bst.traverse(BinarySearchTree._POST_ORDER);  // with the node values
bst.traverse(BinarySearchTree._LAYER_ORDER); // in the given order

  // Returns a new instance of BinarySearchTree
  // from any tree data with any given structure
  // by providing the root node and its node key names
BinarySearchTree.create(
  root,       // root node
  'myData',   // value property name
  'leftNode', // left node property name
  'rightNode' // right node property name
);

  // checks if the input tree is a valid Binary Search Tree
  // node.left < node.right == true
BinarySearchTree.isBST(bst) // true
  // also possible with different node structures
BinarySearchTree.isBST(
  root,       // root node
  'myData',   // value property name
  'leftNode', // left node property name
  'rightNode' // right node property name
)
```
