'use strict';

const test = require('unit.js');
const _BST_ = require( "../BST.js" );

describe('Class BST (Binary Search Tree)', function() {
	it('must create a new instance of the class', function() {
		test.object(new _BST_).isInstanceOf(_BST_);
	});

	describe('Default properties', function() {
		let newBST = new _BST_;
		it('must have root:null', function() {
			test.object(newBST).hasProperty('root', null)
		});
		it('must have count:0', function() {
			test.object(newBST).hasProperty('count', 0)
		});
	})

	describe('Static constants', function() {
		it('must have IN_ORDER:"IN_ORDER"', function() {
			test.value(_BST_.IN_ORDER).is('IN_ORDER')
		});
		it('must have PRE_ORDER:"PRE_ORDER"', function() {
			test.value(_BST_.PRE_ORDER).is('PRE_ORDER')
		});
		it('must have POST_ORDER:"POST_ORDER"', function() {
			test.value(_BST_.POST_ORDER).is('POST_ORDER')
		});
		it('must have LAYER_ORDER:"LAYER_ORDER"', function() {
			test.value(_BST_.LAYER_ORDER).is('LAYER_ORDER')
		});
	});

	describe('Non static class functionality', function() {
		describe('function createNode()', function() {
			let newBST = new _BST_;
			it('must return this object', function() {
				let obj = newBST.createNode(1);
				test.value(obj).is({
					value: 1,
					left: null,
					right: null
				});
			});
		});

		describe('function push()', function() {
			let newBST = new _BST_;
			it('must set the root node', function() {
				newBST.push(10);
				test.value(newBST.root).isObject()
			});
			it('must have incremented count: 1', function() {
				test.value(newBST.count).is(1);
			});
			it('must set the root node\'s key: left', function() {
				newBST.push(5);
				test.value(newBST.root.left.value).is(5);
			});
			it('must set the root node\'s key: right', function() {
				newBST.push(15);
				test.value(newBST.root.right.value).is(15);
			});
			it('must add 5 nodes', function() {
				let newBST = new _BST_;
				newBST.push(1,2,3,4,5);
				test.value(newBST.count).is(5);
			});
		});

		describe('function min() & max()', function() {
			it('must return null on empty tree', function() {
				let newBST = new _BST_;
				test.value(newBST.min()).isNull()
			});

			let newBST = new _BST_;
			newBST.push(10,7,14,3,18);
			it('must return a node', function() {
				test.value(newBST.min()).isObject()
			});
			it('must be the node with the value 3', function() {
				test.value(newBST.min().value).is(3)
			});
			it('must be the node with the value 18', function() {
				test.value(newBST.max().value).is(18)
			});
		});

		describe('function find()', function() {
			it('must return false on empty tree', function() {
				let newBST = new _BST_;
				test.value(newBST.find(1)).is(false)
			});

			let newBST = new _BST_;
			newBST.push(10,7,14,3,18);
			it('must return false if no value found', function() {
				test.value(newBST.find(1)).is(false)
			});
			it('must return the node with the value 14', function() {
				test.value(newBST.find(14).value).is(14)
			});
		});

		describe('Tree traversal', function() {
			let newBST = new _BST_;
			newBST.push(10,7,3,14,4,18,16,1,8,22,11);
			describe('function traverse()', function() {
				it('must throw on invalid order type', function() {
					test.exception(() => {
					  newBST.traverse();
					});
				});
				it('must return empty array on empty tree', function() {
					let newBST = new _BST_;
					 test.value(newBST.traverse()).is([])
				});

				describe('traversal: in order (_traverseInOrder())', function() {
					it('must return an array with the following order: 1,3,4,7,8,10,11,14,16,18,22', function() {
						test.value(newBST.traverse(_BST_.IN_ORDER))
							.is([1,3,4,7,8,10,11,14,16,18,22])
					});
				});

				describe('traversal: in order (_traversePreOrder())', function() {
					it('must return an array with the following order: 10,7,3,1,4,8,14,11,18,16,22', function() {
						test.value(newBST.traverse(_BST_.PRE_ORDER))
							.is([10,7,3,1,4,8,14,11,18,16,22])
					});
				});

				describe('traversal: in order (_traversePostOrder())', function() {
					it('must return an array with the following order: 1,4,3,8,7,11,16,22,18,14,10', function() {
						test.value(newBST.traverse(_BST_.POST_ORDER))
							.is([1,4,3,8,7,11,16,22,18,14,10])
					});
				});

				describe('traversal: in order (_traverseLayerOrder())', function() {
					it('must return an array with array containing the node values of their layer', function() {
						test.value(newBST.traverse(_BST_.LAYER_ORDER))
							.is([[10],[7,14],[3,8,11,18],[1,4,16,22]])
					});
				});
			});
		});
	});

	describe('Static class functionality', function() {
		describe('function isBST()', function() {
			describe('arguments', function() {
				it('must return false if root is not an object', function() {
					test.value(_BST_.isBST()).is(false)
				});
				it('must throw an error if propNames is not an object', function() {
					test.exception(() => {
						_BST_.isBST({}, 1)
					});
				});
				it('must throw an error if propNames.value is not defined or empty', function() {
					test.exception(() => {
						_BST_.isBST({}, {left:'',right:''})
					});
				});
				it('must throw an error if propNames.left is not defined or empty', function() {
					test.exception(() => {
						_BST_.isBST({}, {value:'',right:''})
					});
				});
				it('must throw an error if propNames.right is not defined or empty', function() {
					test.exception(() => {
						_BST_.isBST({}, {value:'',left:''})
					});
				});
			});

			describe('functionality', function() {
				let newBST = new _BST_;
				newBST.push(10,7,3,14,4,18,16,1,8,22,11);
				let validBST = Object.assign({}, newBST.root);
				it('must return true for a valid binary search tree', function() {
					test.value(_BST_.isBST(validBST)).is(true)
				});
				it('must return false for a invalid binary search tree', function() {
					let invalidBST = Object.assign({}, newBST.root);
					invalidBST	// 10
						.right		// 14
							.right	// 18
								.left.value = 20;	// 16 change this to an invalid value
					test.value(_BST_.isBST(invalidBST)).is(false)
				});
			});
		});

		describe('function create()', function() {
			describe('arguments', function() {
				it('must return false if root is not an object', function() {
					test.value(_BST_.create()).is(false)
				});
				it('must throw an error if propNames is not an object', function() {
					test.exception(() => {
						_BST_.create({}, 1)
					});
				});
				it('must throw an error if propNames.value is not defined or empty', function() {
					test.exception(() => {
						_BST_.create({}, {left:'',right:''})
					});
				});
				it('must throw an error if propNames.left is not defined or empty', function() {
					test.exception(() => {
						_BST_.create({}, {value:'',right:''})
					});
				});
				it('must throw an error if propNames.right is not defined or empty', function() {
					test.exception(() => {
						_BST_.create({}, {value:'',left:''})
					});
				});
			});

			describe('functionality', function() {
				let newBST = new _BST_;
				newBST.push(10,7,3,14,4,18,16,1,8,22,11);
				it('must return a new instance of the class', function() {
					test.value(_BST_.create(newBST.root)).isInstanceOf(_BST_);
				});
				it('the new instance must have 11 nodes', function() {
					let newBstInstance = _BST_.create(newBST.root);
					test.value(newBstInstance.count).is(11);
				});
			});
		});
	});
});
