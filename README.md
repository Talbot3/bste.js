# BST.js

Class to create Binary Search Trees

## Documentation

### BST Tree Structure

```js
{
  value: 10
  left: {
    value: 8,
    left: null,
    right: null
  },
  right: {
    value: 12,
    left: null,
    right: null
  }
}
```

### BST properties & constants

> **root** The root node  
> **count** The node count  
> **_IN_ORDER** | **_PRE_ORDER** | **_POST_ORDER** | **_LAYER_ORDER**
```js
var bst = new BST;
bst.root;
bst.count;

// BST ordertype constants:
BST._IN_ORDER;    // 0
BST._PRE_ORDER;   // 1
BST._POST_ORDER;  // 2
BST._LAYER_ORDER; // 3
```

### BST functions

> **push()** Add a node
```js
bst.push( 10 );
bst.push( 8 );
bst.push( 12 );
```
> **find()** Find and return a node by its value
```js
bst.find( 8 );  // returns the node with the value 8
bst.find( 15 ); // returns false
```
> **min()** Get the lowest value in the tree or the node with the lowest value  
> **max()** Get the highest value in the tree or the node with the highest value
```js
bst.min();      // returns 8
bst.min(true);  // returns the node with the value 8
bst.max();      // returns 12
bst.max(true);  // returns the node with the value 12
```
> **traverse()** Traverse the BST and return an Array with the node values in the given order  
> Use the BST ordertype constants to choose the order  
>  traverse & the traverse algorithms can also be called statically
>  BUT if called statically you must provide a root node
```js
bst.traverse( BST._IN_ORDER );
bst.traverse( BST._PRE_ORDER );
bst.traverse( BST._POST_ORDER );
bst.traverse( BST._LAYER_ORDER );

// static calls
BST.traverse( BST._IN_ORDER, rootNode );
BST.traverse.inOrder( rootNode );
BST.traverse.preOrder( rootNode );
BST.traverse.postOrder( rootNode );
BST.traverse.layerOder( rootNode );
```

### BST static functions
> **create()** creates a new BST object from any given Binary Search Tree data structure  
> by proving the associated node key names
```js
var Random_Binary_Search_Tree = {
  myData: 10,
  leftNode: {
    myData: 8,
    leftNode: null,
    rightNode: null
  },
  rightNode: {
    myData: 12,
    leftNode: null,
    rightNode: null
  }
};
var bst = BST.create(
  Random_Binary_Search_Tree,
  "myData",   // the node's value property name
  "leftNode", // the node's left node property name
  "rightNode" // the node's right node property name
);
```
> **isBST()** checks if a the given structure is a valid Binary Search Tree, by passing a root node
```js
var bst = new BST;
bst.push( 10 );
BST.isBST( bst ); // true

var ValidStructure = {
  value: 10,
  left: {
    value: 8,
    left: null,
    right: null
  },
  right: {
    value: 12,
    left: null,
    right: null
  }
};
var Invalidtructure = {
  value: 10,
  left: {
    value: 12,
    left: null,
    right: null
  },
  right: {
    value: 8,
    left: null,
    right: null
  }
};
var Valid_Structure_With_Different_Property_Names = {
  data: 10,
  leftNode: {
    data: 8,
    leftNode: null,
    rightNode: null
  },
  rightNode: {
    data: 12,
    leftNode: null,
    rightNode: null
  }
};

BST.isBST( ValidStructure );    // true
BST.isBST( Invalidtructure );   // false
BST.isBST(                      // true
  Valid_Structure_With_Different_Property_Names,
  "data", // the node's value property name
  "leftNode", // the node's left node property name
  "rightNode" // the node's right node property name
);
```
