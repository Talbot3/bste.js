const test = require('unit.js');

const _BST_ = require( "../BST.js" );

// a valid BST structure
const VALID_BST_1 = {
	value: 10,
	left: { value: 8, left: null, right: null },
	right: { value: 12, left: null, right: null }
};
const VALID_BST_2 = {
	data: 10,
	leftNode: { data: 8, leftNode: null, rightNode: null },
	rightNode: { data: 12, leftNode: null, rightNode: null }
};

// a invalid BST structure
const INVALID_BST_1 = {
	value: 10,
	left: { value: 12, left: null, right: null },
	right: { value: 8, left: null, right: null }
};
const INVALID_BST_2 = {
	data: 10,
	leftNode: { data: 12, leftNode: null, rightNode: null },
	rightNode: { data: 8, leftNode: null, rightNode: null }
};

describe( "BST test", function() {
	
	describe( "BST traverse constants", function() {
		it( "should return 0: IN, 1: PRE, 2: POST, 3: LAYER order traversal", function() {
			test.value( _BST_._IN_ORDER )
				.is( 0 )
			test.value( _BST_._PRE_ORDER )
				.is( 1 )
			test.value( _BST_._POST_ORDER )
				.is( 2 )
			test.value( _BST_._LAYER_ORDER )
				.is( 3 )
		});
	});
	
	describe( "static #isBST()", function() {
		it( "should return true for the valid BST's and false for the invalid", function() {
			test.value( _BST_.isBST( VALID_BST_1 ) )
				.is( true );
			
			test.value( _BST_.isBST( VALID_BST_2, "data", "leftNode", "rightNode" ) )
				.is( true );
			
			test.value( _BST_.isBST( VALID_BST_2, "val", "ln", "rn" ) )
				.is( false );
				
			test.value( _BST_.isBST( INVALID_BST_1 ) )
				.is( false );
				
			test.value( _BST_.isBST( INVALID_BST_2, "data", "leftNode", "rightNode" ) )
				.is( false );
				
			test.value( _BST_.isBST( INVALID_BST_2,  "val", "ln", "rn" ) )
				.is( false );
		});
	});
	
	describe( "static #create()", function() {
		it( "should create a new and valid BST reference for all passed structures and return true when tested with #isBST()", function() {
			var bst_from_valid_1 = _BST_.create( VALID_BST_1, "value", "left", "right" );
			var bst_from_valid_2 = _BST_.create( VALID_BST_2, "data", "leftNode", "rightNode" );
			var bst_from_invalid_1 = _BST_.create( INVALID_BST_1, "value", "left", "right" );
			var bst_from_invalid_2 = _BST_.create( INVALID_BST_2, "data", "leftNode", "rightNode" );
			
			test.object( bst_from_valid_1 )
				.hasProperty( "root" )
				.hasProperty( "count", 3 );
			test.value( _BST_.isBST( bst_from_valid_1.root ) )
				.is( true );
			
			test.object( bst_from_valid_2 )
				.hasProperty( "root" )
				.hasProperty( "count", 3 );
			test.value( _BST_.isBST( bst_from_valid_2.root ) )
				.is( true );
			
			test.object( bst_from_invalid_1 )
				.hasProperty( "root" )
				.hasProperty( "count", 3 );
			test.value( _BST_.isBST( bst_from_invalid_1.root ) )
				.is( true );
			
			test.object( bst_from_invalid_2 )
				.hasProperty( "root" )
				.hasProperty( "count", 3 );
			test.value( _BST_.isBST( bst_from_invalid_2.root ) )
				.is( true );
		});
	});
	
	describe( "new BST()", function() {
		it( "should create a new BST reference with the default properties -> 'root':null , 'count':0 ", function() {
			var bst = new _BST_;
			
			test.object( bst )
				.hasProperty( "root", null )
				.hasProperty( "count", 0 );
		});
	});
	
	describe( "BST #push()", function() {
		var bst = new _BST_;
		it( "should create the root node with the value 10", function() {
			bst.push( 10 );
			
			test.object( bst )
				.hasProperty( "root" )
				.hasProperty( "count", 1 );
			
			test.value( bst.root )
				.is({
					value: 10,
					left: null,
					right: null
				});
		});
		it( "should add a left node with the value 8", function() {
			bst.push( 8 );
			
			test.object( bst )
				.hasProperty( "root" )
				.hasProperty( "count", 2 );
			
			test.value( bst.root )
				.is({
					value: 10,
					left: { value: 8, left: null, right: null },
					right: null
				});
		});
		it( "should add a right node with the value 12", function() {
			bst.push( 12 );
			
			test.object( bst )
				.hasProperty( "root" )
				.hasProperty( "count", 3 );
			
			test.value( bst.root )
				.is({
					value: 10,
					left: { value: 8, left: null, right: null },
					right: { value: 12, left: null, right: null }
				});
		});
	});
	
	describe( "Following tests use the same BST reference containing a valid bst with the values 8, 10, 12 with 10 as root", function() {
		var bst = new _BST_;
		bst.push( 10 );
		bst.push( 6 );
		bst.push( 2 );
		bst.push( 8 );
		bst.push( 15 );
		bst.push( 12 );
		
		describe( "BST #find()", function() {
			it( "should return a bst node for the node values: 8,10,12. Return false for the values: 7,9,11", function() {
				test.should( bst.find( 8 ) )
					.be.type( "object" );
				test.should( bst.find( 10 ) )
					.be.type( "object" );
				test.should( bst.find( 12 ) )
					.be.type( "object" );
					
				test.value( bst.find( 7 ) )
					.is( false );
				test.value( bst.find( 9 ) )
					.is( false );
				test.value( bst.find( 11 ) )
					.is( false );
			});
		});
		
		describe( "BST #min()", function() {
			it( "should return 2", function() {
				test.value( bst.min() )
					.is( 2 )
			});
			it( "should return the node with the value 2", function() {
				test.value( bst.min( true ) )
					.is({
						value: 2,
						left: null,
						right: null
					})
			});
		});
		
		describe( "BST #max()", function() {
			it( "should return 15", function() {
				test.value( bst.max() )
					.is( 15 )
			});
			it( "should return the node with the value 15", function() {
				test.value( bst.max( true ) )
					.is({
						value: 15,
						left: { value:12, left:null, right:null },
						right: null
					})
			});
		});
		
		describe( "BST #traverse()", function() {
			it( "should return an array in the IN order: 2,6,8,10,12,15", function() {
				test.value( bst.traverse( _BST_._IN_ORDER ) )
					.is( [2,6,8,10,12,15] )
			});
			it( "should return an array in the PRE order: 10,6,2,8,15,12", function() {
				test.value( bst.traverse( _BST_._PRE_ORDER ) )
					.is( [10,6,2,8,15,12] )
			});
			it( "should return an array in the POST order: 2,8,6,12,15,10", function() {
				test.value( bst.traverse( _BST_._POST_ORDER ) )
					.is( [2,8,6,12,15,10] )
			});
			it( "should return an array in the LAYER order (each layer's values in the ascending order): [10], [6,15], [2.8.12]", function() {
				test.value( bst.traverse( _BST_._LAYER_ORDER ) )
					.is( [ [10], [6,15], [2,8,12] ] )
			});
		});
	
	});
	
});