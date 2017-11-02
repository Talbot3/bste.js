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

	/**
	 * Binary Search Tree class
	 */
	class BST {
		static get IN_ORDER() { return 'IN_ORDER' };
		static get PRE_ORDER() { return 'PRE_ORDER'; }
		static get POST_ORDER() { return 'POST_ORDER'; }
		static get LAYER_ORDER() { return 'LAYER_ORDER'; }

		/**
		 * constructor
		 */
		constructor() {
			this.root = null;
			this.count = 0;
		}

		/**
		 * Create a new node object
		 * @param {Number} value The node value
		 * @return {Object|Null} node or null if value is not a number
		 */
		createNode(value) {
			if (typeof value !== 'number') return null;
			return {
				value: value,
				left: null,
				right: null
			}
		}

		/**
		 * Add one or multiple new node to the tree
		 * increment the node count
		 * @param {Number} value The node's value
		 */
		push(...values) {
			values.forEach(value => {
				let _node = this.createNode(value);
					// return if the node is invalid
				if (!_node) return;
					// increment node count
				this.count++;
				if (!this.root) {
						// set the root node if null
					this.root = _node;
				} else {
					let node = this.root;
					while(node) {
						if (value < node.value) {
							if (!node.left)
								return node.left = _node;
							node = node.left;
						} else {
							if (!node.right)
								return node.right = _node;
							node = node.right;
						}
					}
				}
			})
		}

		/**
		 * Return the node with the lowest value
		 * @return {Object|Null} Node or Null if there is no node
		 */
		min() {
			if (!this.root) return null;
			let node = this.root;
			while(node) {
				if (!node.left) return node;
				node = node.left;
			}
		}

		/**
		 * Return the node with the higest value
		 * @return {Object|Null} Node or Null if there is no node
		 */
		max() {
			if (!this.root) return null;
			let node = this.root;
			while(node) {
				if (!node.right) return node;
				node = node.right;
			}
		}

		/**
		 * Return the first node which value matches the search value
		 * @param {Number} the search value
		 * @return {Object|Boolean} Returns the node with the searched value else false
		 */
		find(value, node = this.root) {
			if (node) {
				if (node.value === value) return node;
				if (node.left) {
					let _node = this.find(value, node.left);
					if (_node) return _node;
				}
				if (node.right) {
					let _node = this.find(value, node.right);
					if (_node) return _node;
				}
			}
			return false;
		}

		/**
		 * Return an Array with the node values in the given traverse order
		 * @param {String} BST order type constants
		 * @param {Object} The root node to begin with
		 * @return {Array} ordered node values
		 * @throws On invalid order type
		 */
		traverse(orderType, node = this.root) {
			if (!node) return [];
			switch(orderType) {
				case BST.IN_ORDER:		{ return this._traverseInOrder(node);		} break;
				case BST.PRE_ORDER:		{ return this._traversePreOrder(node);	} break;
				case BST.POST_ORDER:	{ return this._traversePostOrder(node);	} break;
				case BST.LAYER_ORDER:	{ return this._traverseLayerOrder(node);} break;
				default: throw "Invalid order type";
			}
		};

		/**
		 * In Order traversal
		 * @param {Object} node tree node
		 * @return {Array} "in order" node values
		 */
		_traverseInOrder(node, res = []) {
			if (node) {
				res = this._traverseInOrder(node.left, res);
				res.push(node.value);
				res = this._traverseInOrder(node.right, res);
			}
			return res;
		}

		/**
		 * Pre Order traversal
		 * @param {Object} node tree node
		 * @return {Array} "pre order" node values
		 */
		_traversePreOrder(node, res = []) {
			if (node) {
				res.push(node.value);
				res = (node.left) ? this._traversePreOrder(node.left, res) : res;
				res = (node.right) ? this._traversePreOrder(node.right, res) : res;
			}
			return res;
		}

		/**
		 * Post Order traversal
		 * @param {Object} node tree node
		 * @return {Array} "post order" node values
		 */
		_traversePostOrder(node, res = []) {
			if (node) {
				res = (node.left) ? this._traversePostOrder(node.left, res) : res;
				res = (node.right) ? this._traversePostOrder(node.right, res) : res;
				res.push(node.value);
			}
			return res;
		}

		/**
		 * Layer Order traversal
		 * @param {Object} node tree node
		 * @return {Array} An array containing the node values by layer (root layer = 0)
		 */
		_traverseLayerOrder(node, res = [], layer = 0) {
			res[layer] = (!res[layer]) ? [] : res[layer];
			if (node) {
				res[layer].push(node.value);
				res = (node.left) ? this._traverseLayerOrder(node.left, res, layer+1) : res;
				res = (node.right) ? this._traverseLayerOrder(node.right, res, layer+1) : res;
			}
			return res;
		}

		/**
		 * Check if the given the binary search tree is valid or not
		 * @param {Object} root The root node
		 * @param {Object} propNames The node property names
		 * @return {Boolean} True if valid else false
		 * @throws if the propNames argument is not an object or has empty or not existing keys [value,left,right]
		 */
		static isBST(root, propNames = {value:'value',left:'left',right:'right'}) {
			if (typeof root !== 'object') return false;
			if (typeof propNames !== 'object'
					|| !propNames.value
						|| !propNames.left
							|| !propNames.right)
				throw 'propNames must be an object containing the keys: value,left,right with a String value';
			const scanTree = (node, propNames) => {
				if (node[propNames.left]) {
					if (node[propNames.left][propNames.value] > node[propNames.value]) return false;
					if (!scanTree(node[propNames.left], propNames)) return false;
				}
				if (node[propNames.right]) {
					if (node[propNames.right][propNames.value] < node[propNames.value]) return false;
					if (!scanTree(node[propNames.right], propNames)) return false;
				}
				return true;
			}
			return scanTree(root, propNames);
		};

		/**
		 * Return a new instance of the BST class containing the nodes from the
		 * given root node in the same order
		 * NOTE: if the given tree is invalid the ouput tree will be valid
		 * * therefor the order will change
		 * @param {Object} root The root node
		 * @param {Object} propNames The node property names
		 * @return {Object} new instance of the class
		 * @throws if the propNames argument is not an object or has empty or not existing keys [value,left,right]
		 */
		static create(root, propNames = {value:'value',left:'left',right:'right'}) {
			if (typeof root !== 'object') return false;
			if (typeof propNames !== 'object'
					|| !propNames.value
						|| !propNames.left
							|| !propNames.right)
				throw 'propNames must be an object containing the keys: value,left,right with a String value';
			let nodeValues = (function preOrderValueExtract(node, propNames, nodeValues) {
				if (node) {
					nodeValues.push(node[propNames.value]);
					nodeValues = preOrderValueExtract(node[propNames.left], propNames, nodeValues);
					nodeValues = preOrderValueExtract(node[propNames.right], propNames, nodeValues);
				}
				return nodeValues
			})(root, propNames, [])
			let newBST = new BST;
			newBST.push(...nodeValues);
			return newBST;
		};

	}

	if (noGlobal) return BST;

	global.BST = BST;

});
