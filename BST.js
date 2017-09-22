(function( global, factory ) {
	
	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// export as module for environments like NodeJS
		module.exports = factory( null, true );
	} else {
		factory( global, false );
	}
	
})( ( typeof window !== "undefined" ) ? window : this, function( global, noGlobal ) {
	
	"use strict";
	
	/*
	 * Create a new node structure
	 * @param {*} value The node value
	 * @return {Object}
	 */
	function createNode( value ) {
		return {
			value: value,
			left: null,
			right: null
		};
	}
	
	// Binary Search Tree constructor
	var BST = function() {
		this.root = null;
		this.count = 0;
	};
	
	// Ordertype constants
	BST._IN_ORDER = 0;
	BST._PRE_ORDER = 1;
	BST._POST_ORDER = 2;
	BST._LAYER_ORDER = 3;
	
	/*
	 * check if the given bst structure is valid
	 * @param {Object} node The root node of the Binary Search Tree
	 * @param {String} pnValue The node's property key name to get the value
	 * @param {String} pnLeft The node's property key name to get the left node
	 * @param {String} pnRight The node's property key name to get the right node
	 * @return {Boolean} True if valid else false
	 */
	BST.isBST = function( node, pnValue, pnLeft, pnRight ) {
		if ( !node ) return false;
		pnValue = pnValue || "value";
		pnLeft = pnLeft || "left";
		pnRight = pnRight || "right";
		if ( typeof node[ pnValue ] === "undefined" || typeof node[ pnLeft ] === "undefined" || typeof node[ pnRight ] === "undefined" ) return false;
		if ( node[ pnLeft ] ) {
			if ( node[ pnLeft ][ pnValue ] > node[ pnValue ] ) return false;
			if ( !BST.isBST( node[ pnLeft ], pnValue, pnLeft, pnRight ) ) return false;
		}
		if ( node[ pnRight ] ) {
			if ( node[ pnRight ][ pnValue ] < node[ pnValue ] ) return false;
			if ( !BST.isBST( node[ pnRight ], pnValue, pnLeft, pnRight ) ) return false;
		}
		return true;
	};
	
	/*
	 * create a new BST object from any Binary Search Tree data structure
	 * by passing the root node an its property key names { value / left node / right node }
	 * @param {Object} node The root node of the Binary Search Tree
	 * @param {String} pnValue The node's property key name to get the value
	 * @param {String} pnLeft The node's property key name to get the left node
	 * @param {String} pnRight The node's property key name to get the right node
	 * @return {Object} A new BST object
	 */
	BST.create = function( node, pnValue, pnLeft, pnRight ) {
		function traverse( node, pnValue, pnLeft, pnRight, data ) {
			if ( node ) {
				data = traverse( node[ pnLeft ], pnValue, pnLeft, pnRight, data );
				data.push( node[ pnValue ] );
				data = traverse( node[ pnRight ], pnValue, pnLeft, pnRight, data );
			}
			return data;
		}
		var values = traverse( node, pnValue, pnLeft, pnRight, [] );
		var bst = new BST;
		for( var i = 0, len = values.length; i < len; i++ ) {
			bst.push( values[i] );
		}
		return bst;
	};
	
	/*
	 * add a new node into the BST
	 * @param {*} value The node's value
	 */
	BST.prototype.push = function( value ) {
		var newNode = createNode( value );
		this.count++;
		if ( !this.root ) {
			this.root = newNode;
		} else {
			var node = this.root;
			while( node ) {
				if ( value < node.value ) {
					if ( !node.left ) return node.left = newNode; 
					node = node.left;
				} else {
					if ( !node.right ) return node.right = newNode;
					node = node.right;
				}
			}
		}
	};
	
	/*
	 * Get the first node which value matches the search value
	 * @param {*} search The search value to match a node's value property
	 * @return {Object|Boolean} Returns the node with the searched value or false
	 */
	BST.prototype.find = function( search, node ) {
		node = node || this.root;
		if ( node.value == search ) return node;
		if ( node.left ) {
			var result = this.find( search, node.left );
			if ( result ) return result;
		}
		if ( node.right ) {
			var result = this.find( search, node.right );
			if ( result ) return result;
		}
		return false;
	};
	
	/*
	 * Get the lowest value of the BST
	 * @param {Boolean} returnNode If true, min will return the node which contains the lowest value else the value itself
	 * @return {*|Object|Null} The lowest BST value / node with the lowest value or Null if no root is given
	 */
	BST.prototype.min = function( returnNode ) {
		if ( !this.root ) return null;
		var node = this.root;
		while( node ) {
			if ( !node.left ) return ( returnNode ) ? node : node.value;
			node = node.left;
		}
	};
	
	/*
	 * Get the highest value of the BST
	 * @param {Boolean} returnNode If true, min will return the node which contains the highest value else the value itself
	 * @return {*|Object|Null} The highest BST value / node with the highest value or Null if no root is given
	 */
	BST.prototype.max = function( returnNode ) {
		if ( !this.root ) return null;
		var node = this.root;
		while( node ) {
			if ( !node.right ) return ( returnNode ) ? node : node.value;
			node = node.right;
		}
	};

	/*
	 * Traverse the BST and return an Array with the node values in the given order
	 * @param {Number} order Defines the traverse order by passing one of the BST ordertype constants
	 * @param {Object} root An optional root node to begin with
	 * @return {Array} An array containing the node values in the given order
	 * @throws
	 * * If traverse got called statically AND no root node is given
	 * * If an invalid order is given
	 */
	BST.traverse = BST.prototype.traverse = function( order, root ) {
		if ( !root && !this ) throw "When calling traverse statically you must provide a root node!";
		root = root || this.root;
		if ( !root ) return [];
		switch( order ) {
			case BST._IN_ORDER:			{ return BST.traverse.inOrder( root );		} break;
			case BST._PRE_ORDER:		{ return BST.traverse.preOrder( root );		} break;
			case BST._POST_ORDER:	{ return BST.traverse.postOrder( root );	} break;
			case BST._LAYER_ORDER:	{ return BST.traverse.layerOder( root );		} break;
			default: throw "Invalid order argument, please use the BST ordertype constants";
		}
	};
	
	/*
	 * In Order traversal
	 * @param {Object} node The root node
	 * @return {Array} An array containing the node values in the given order
	 */
	BST.traverse.inOrder = function( node, data ) {
		data = data || [];
		if ( node ) {
			data = BST.traverse.inOrder( node.left, data );
			data.push( node.value );
			data = BST.traverse.inOrder( node.right, data );
		}
		return data;
	};
	
	/*
	 * Pre Order traversal
	 * @param {Object} node The root node
	 * @return {Array} An array containing the node values in the given order
	 */
	BST.traverse.preOrder = function( node, data ) {
		data = data || [];
		if ( node ) {
			data.push( node.value );
			data = ( node.left ) ? BST.traverse.preOrder( node.left, data ) : data;
			data = ( node.right ) ? BST.traverse.preOrder( node.right, data ) : data;
		}
		return data;
	};
	
	/*
	 * Post Order traversal
	 * @param {Object} node The root node
	 * @return {Array} An array containing the node values in the given order
	 */
	BST.traverse.postOrder = function( node, data ) {
		data = data || [];
		if ( node ) {
			data = ( node.left ) ? BST.traverse.postOrder( node.left, data ) : data;
			data = ( node.right ) ? BST.traverse.postOrder( node.right, data ) : data;
			data.push( node.value );
		}
		return data;
	};

	/*
	 * Layer Order traversal
	 * @param {Object} node The root node
	 * @return {Array} An array containing the node values by layer (height)
	 * * The root layer starts at 0
	 */
	BST.traverse.layerOder = function( node, data, layer ) {
		layer = layer || 0;
		data = data || [];
		data[ layer ] = ( !data[ layer ] ) ? [] : data[ layer ];
		if ( node ) {
			data[ layer ].push( node.value );
			data = ( node.left ) ? BST.traverse.layerOder( node.left, data, layer+1 ) : data;
			data = ( node.right ) ? BST.traverse.layerOder( node.right, data, layer+1 ) : data;
		}
		return data;
	};
	
	if ( noGlobal ) return BST;
	
	global.BST = BST;
	
});
