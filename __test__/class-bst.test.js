"use strict";

const test = require('unit.js');
const _BST_ = require( "../src/class-bst.js" );

describe('Class BST (Binary Search Tree)', function() {
	const bst = new _BST_;

	it('must create a new instance of the class', function() {
		test.object(bst).isInstanceOf(_BST_);
	});

	describe('Default properties', function() {
		const bst = new _BST_;
		it('must have root:null', function() {
			test.object(bst).hasProperty('root', null);
		});
		it('must have count:0', function() {
			test.object(bst).hasProperty('count', 0);
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
			it('must return a correct node object', function() {
				test.value(bst.createNode(3)).is({
					value: 3,
					extra: {},
					left: null,
					right: null
				});
			});
		});

		describe('function push()', function() {
			const bst = new _BST_;
			bst.push(10);
			bst.push(15);
			bst.push(5);

			bst.push('3');	// ignore non numeric values
			bst.push();			//
			bst.push([]);		//

			it('must have set the root node', function() {
				test.value(bst.root).isObject()
			});

			it('must have incremented the node count', function() {
				test.value(bst.count).is(3);
			});

			it('must have set the root node\'s key: left', function() {
				test.value(bst.root.left.value).is(5);
			});

			it('must have set the root node\'s key: right', function() {
				test.value(bst.root.right.value).is(15);
			});

			it('must add multiple (x5) nodes with push()', function() {
				const bst = new _BST_;
				bst.push(1,2,3,4,5);
				test.value(bst.root.value).is(1);
				test.value(bst.count).is(5);
			});
		});

		describe('function min() & max()', function() {
			it('must return null on empty tree', function() {
				const bst = new _BST_;
				test.value(bst.min()).isNull();
			});

			const bst = new _BST_;
			bst.push(10,7,14,3,18);
			bst.push([22,{path: "/root/imgs/20200903090301001.jpg"}]);
			it('must return the node with the lowest value', function() {
				test.value(bst.min().value).is(3)
			});

			it('must return the node with the highest value', function() {
				test.value(bst.max().value).is(22)
			});

			it('must return with node\'s extra with the highest value', function() {
				test.value(bst.max().extra.path).is("/root/imgs/20200903090301001.jpg")
			})
		});

		describe('function find()', function() {
			it('must return false on empty tree', function() {
				const bst = new _BST_;
				test.value(bst.find(1)).is(false);
			});

			const bst = new _BST_;
			bst.push(10,7,14,3,18);

			it('must return false if no value found', function() {
				test.value(bst.find(1)).is(false)
			});

			it('must return the node with the value 14', function() {
				test.value(bst.find(14).value).is(14)
			});
		});

		describe('Tree traversal with extra', function() {
			const bst = new _BST_;
			bst.push(
				[1, {path: "1.jpeg"}],
				[2, { path: "2.jpeg" }],
				[3, { path: "3.jpeg" }]
			);

			describe('traversal: in order (_traverseInOrderExtra())', function () {
				it('must return an array with the following order: [{ path: "1.jpeg" }, { path: "2.jpeg" }, { path: "3.jpeg" }, { path: "4.jpeg" }', function () {
					const result = bst.traverseExtra(_BST_.IN_ORDER);
					console.log(result);
					test.value(result)
						.is([{ "path": "1.jpeg" }, { "path": "2.jpeg" }, { "path": "3.jpeg" }])
				});
			});
		});

		describe('Tree traversal', function() {
			const bst = new _BST_;
			bst.push(10,7,3,14,4,18,16,1,8,22,11);

			describe('function traverse()', function() {
				it('must throw on invalid order type', function() {
					test.exception(() => {
					  bst.traverse();
					});
				});

				it('must return empty array on empty tree', function() {
					const bst = new _BST_;
					test.value(bst.traverse()).is([])
				});

				describe('traversal: in order (_traverseInOrder())', function() {
					it('must return an array with the following order: 1,3,4,7,8,10,11,14,16,18,22', function() {
						test.value(bst.traverse(_BST_.IN_ORDER))
							.is([1,3,4,7,8,10,11,14,16,18,22])
					});
				});

				describe('traversal: in order (_traversePreOrder())', function() {
					it('must return an array with the following order: 10,7,3,1,4,8,14,11,18,16,22', function() {
						test.value(bst.traverse(_BST_.PRE_ORDER))
							.is([10,7,3,1,4,8,14,11,18,16,22])
					});
				});

				describe('traversal: in order (_traversePostOrder())', function() {
					it('must return an array with the following order: 1,4,3,8,7,11,16,22,18,14,10', function() {
						test.value(bst.traverse(_BST_.POST_ORDER))
							.is([1,4,3,8,7,11,16,22,18,14,10])
					});
				});

				describe('traversal: in order (_traverseLayerOrder())', function() {
					it('must return an array with array containing the node values of their layer', function() {
						test.value(bst.traverse(_BST_.LAYER_ORDER))
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
				const bst = new _BST_;
				bst.push(10,7,3,14,4,18,16,1,8,22,11);

				it('must return true for a valid binary search tree', function() {
					test.value(_BST_.isBST(Object.assign({}, bst.root))).is(true)
				});

				it('must return false for a invalid binary search tree', function() {
					const invalidBST = Object.assign({}, bst.root);
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
						_BST_.create({}, {left:'', right:''})
					});
				});
				it('must throw an error if propNames.left is not defined or empty', function() {
					test.exception(() => {
						_BST_.create({}, {value:'', right:''})
					});
				});
				it('must throw an error if propNames.right is not defined or empty', function() {
					test.exception(() => {
						_BST_.create({}, {value:'', left:''})
					});
				});
			});

			describe('functionality', function() {
				const bst = new _BST_;
				bst.push(10,7,3,14,4,18,16,1,8,22,11);

				const bstFromCreate = _BST_.create(bst.root);

				it('must return a new instance of the class', function() {
					test.value(bstFromCreate).isInstanceOf(_BST_);
				});

				it('the new instance must have 11 nodes', function() {
					test.value(bstFromCreate.count).is(11);
				});
			});
		});
	});


});

