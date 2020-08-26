"use strict";

/**
 * Binary Search Tree class
 */
class BinarySearchTree {
	/**
	 * 超时器
	 */
	#timer;
	#timerHandler;
	#preTime;
	#curTime;
	#latestDiffTime;
	#delayTime;
	/**
	 * Traversal type constants
	 */
	static get IN_ORDER() { return 'IN_ORDER'; }
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
	 * 
	 * @param {Function} fn 
	 * @param {Number} delay 
	 */
	setTimerHandler(fn, delay=10000) {
		this.#timerHandler = fn;
		this.#delayTime = delay;
	}

	_calTime() {
		if (!this.#curTime && !this.#preTime) {
			this.#curTime = this.#preTime = (new Date()).getTime();
		} else {
			this.#preTime = this.#curTime;
			this.#curTime = (new Date()).getTime();
		}
		this.#latestDiffTime = this.#curTime - this.#preTime;
		if (this.#timer && this.#latestDiffTime < this.#delayTime) {
			clearTimeout(this.#timer);
		}
		if (this.#timerHandler) {
			this.#timer = setTimeout(this.#timerHandler, this.#delayTime);
		}
	}

	/**
	 * Create a new node object
	 * @param {Number} value The node value
	 * @return {Object|Null} node or null if value is not a number
	 */
	createNode(value, extra = {}) {
		return (typeof value !== 'number')
			? null
				: {
						value: value,
						extra,
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
		this._calTime();
		values.forEach(value => {
			let _node;
			if (Array.isArray(value)){
				_node = this.createNode(...value);
				value = value[0];
			} else {
				_node = this.createNode(value);
			}

			if (!_node)	// return if the node is invalid (not numeric)
				return;

			this.count++;	// increment node count

			if (!this.root)	// set the root node if there is none
				return this.root = _node;

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
		});
	}


	/**
	 * Return the node with the lowest value
	 * @return {Object|Null} Node or Null if there is no node
	 */
	min() {
		if (!this.root)
			return null;

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
		if (!this.root)
			return null;

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
			if (node.value === value)
				return node;
			if (node.left) {
				let _node = this.find(value, node.left);
				if (_node)
					return _node;
			}
			if (node.right) {
				let _node = this.find(value, node.right);
				if (_node)
					return _node;
			}
		}
		return false;
	}

	traverseExtra(orderType, node = this.root) {
		if (!node) {
			return [];
		}
		switch(orderType) {
			case BinarySearchTree.IN_ORDER: return this._traverseInOrderExtra(node);
			case BinarySearchTree.PRE_ORDER: return this._traversePreOrderExtra(node);
			case BinarySearchTree.POST_ORDER: return this._traversePostOrderExtra(node);
			case BinarySearchTree.LAYER_ORDER: return this._traverseLayerOrderExtra(node);
			default: throw "Invalid order type";
		}
	}

	/**
	 * Return an Array with the node values in the given traverse order
	 * @param {String} BinarySearchTree order type constants
	 * @param {Object} The root node to begin with
	 * @return {Array} ordered node values
	 * @throws On invalid order type
	 */
	traverse(orderType, node = this.root) {
		if (!node)
			return [];

		switch(orderType) {
			case BinarySearchTree.IN_ORDER:		return this._traverseInOrder(node);
			case BinarySearchTree.PRE_ORDER:		return this._traversePreOrder(node);
			case BinarySearchTree.POST_ORDER:	return this._traversePostOrder(node);
			case BinarySearchTree.LAYER_ORDER:	return this._traverseLayerOrder(node);
			default: throw "Invalid order type";
		}
	}

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
	 * In Order traversal extra
	 * @param {Object} node tree node
	 * @return {Array} "in order" node values
	 */
	_traverseInOrderExtra(node, res = []) {
		if (node) {
			res = this._traverseInOrderExtra(node.left, res);
			res.push(node.extra);
			res = this._traverseInOrderExtra(node.right, res);
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
	 * Pre Order traversal extra
	 * @param {Object} node tree node
	 * @return {Array} "pre order" node values
	 */
	_traversePreOrderExtra(node, res = []) {
		if (node) {
			res.push(node.extra);
			res = (node.left) ? this._traversePreOrderExtra(node.left, res) : res;
			res = (node.right) ? this._traversePreOrderExtra(node.right, res) : res;
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
	 * Post Order traversal extra
	 * @param {Object} node tree node
	 * @return {Array} "post order" node values
	 */
	_traversePostOrderExtra(node, res = []) {
		if (node) {
			res = (node.left) ? this._traversePostOrderExtra(node.left, res) : res;
			res = (node.right) ? this._traversePostOrderExtra(node.right, res) : res;
			res.push(node.extra);
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
	 * Layer Order traversal extra
	 * @param {Object} node tree node
	 * @return {Array} An array containing the node values by layer (root layer = 0)
	 */
	_traverseLayerOrderExtra(node, res = [], layer = 0) {
		res[layer] = (!res[layer]) ? [] : res[layer];
		if (node) {
			res[layer].push(node.extra);
			res = (node.left) ? this._traverseLayerOrderExtra(node.left, res, layer+1) : res;
			res = (node.right) ? this._traverseLayerOrderExtra(node.right, res, layer+1) : res;
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
		if (typeof root !== 'object')
			return false;

		if (typeof propNames !== 'object'
				|| !propNames.value
					|| !propNames.left
						|| !propNames.right)
			throw 'propNames must be an object containing the keys: value,left,right with a String value';

			// function to scan the tree
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
	}

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
		if (typeof root !== 'object')
			return false;

		if (typeof propNames !== 'object'
				|| !propNames.value
					|| !propNames.left
						|| !propNames.right)
			throw 'propNames must be an object containing the keys: value,left,right with a String value';

		const nodeValues = (function preOrderValueExtract(node, propNames, values) {
			if (node) {
				values.push(node[propNames.value]);
				values = preOrderValueExtract(node[propNames.left], propNames, values);
				values = preOrderValueExtract(node[propNames.right], propNames, values);
			}
			return values
		})(root, propNames, []);

		const bst = new BinarySearchTree;
		bst.push(...nodeValues);
		return bst;
	}

}

module.exports = BinarySearchTree;
