var mysql = require('mysql');
var inquirer = require('inquirer');
var key = require("./key.js");

//first, display all of the items for sale
// include their id, name, and price
inventory();

function inventory() {
	key.connection.query('SELECT * FROM products', function(err, res) {
		console.log("_____________ --- WELCOME TO BAMAZON --- ______________");
		console.log("___________ --- OUR CURRENT INVENTORY --- _____________");
		console.log("_______________________________________________________");
		for(var j = 0; j < res.length; j++) {
			if(res[j].stockQuantity > 0){
				console.log(res[j].itemID +")  |  "+res[j].productName+"  |  $"+res[j].price);
			}
		}
		console.log("_______________________________________________________");
	});
	setTimeout(function() {transaction();}, 1000); 
};
	//then prompt users with two messages
	//	the first should ask them the id of the product they would like to buy
	// the second should ask how many units of the product they would like to buy
function transaction() {
	inquirer.prompt([
		{
			type: "input",
			message: "Please enter the ID Number of the item you wish to purchase: \n",
			name: "orderID"
		},
		{
			type: "input",
			message: "Please enter the quantity of this item you wish to purchase: \n",
			name: "orderQuant"
		}
	]).then(function(answers){
		var orderID = answers.orderID;
			orderID--;
		var orderQuant = answers.orderQuant;
		console.log(orderID+" "+orderQuant);

		key.connection.query('SELECT * FROM products', function(err, res) {
			for(var i = 0; i < res.length; i++) {
				var orderTotal = res[orderID].price * orderQuant;
				if(i == orderID) {
					if(res[i].stockQuantity > orderQuant) {
						newInv = res[i].stockQuantity - orderQuant;
						prodName = res[orderID].productName;

						key.connection.query(
							'UPDATE products SET stockQuantity = ? Where itemID = ?',
							[newInv, i],
							function(err, res) {
								if (err) throw err;

								console.log("Thank you for your purchase of "+orderQuant+" "+prodName+".");
								console.log("Your total comes to $"+orderTotal);

								inquirer.prompt([
									{
										type: "input",
										message: "If you would like to make another purchase, please enter 'MORE': ",
										name: "orderNew"
									}
								]).then(function(answers){
									var more = answers.orderNew.toUpperCase();
									if(more == 'MORE') {
										inventory();
									} else {
										console.log("Goodbye for now! Thanks for Baming with Bamazon!");
									}
								  });
							}
						)
					} else if (res[i].stockQuantity == orderQuant) {
						newInv = res[i].stockQuantity - orderQuant;
						itmId = i;
						key.connection.query('UPDATE products SET ? WHERE ?', [{stockQuantity: newInv}, {itemID: itmId}], function(err, res) {
								if (err) throw err;

								console.log("Thank you for your purchase of "+orderQuant+" "+prodName+".");
								console.log("You just bought us clean out of "+prodName+"! Enjoy your rare goodies!");
								console.log("Your total comes to $"+orderTotal);


								inquirer.prompt([
									{
										type: "input",
										message: "If you would like to make another purchase, please enter 'MORE': ",
										name: "orderNew"
									}
								]).then(function(answers){
									var more = answers.orderNew.toUpperCase();
									if(more == 'MORE') {
										inventory();
									} else {
										console.log("Goodbye for now! Thanks for Baming with Bamazon!");
									}
								  });
							}
						);
					} else if (res[i].stockQuantity < orderQuant) {
						console.log("We're sorry, but only "+res[i].stockQuantity+
						" "+res[orderID].productName+" remains in stock in stock.");

						inquirer.prompt([
							{
								type: "in",
								message: "If you would like to update your order, please enter 'UPDATE': ",
								name: "orderUpdate"
							}
						]).then(function(answers){
							var update = answers.orderUpdate.toUpperCase();
							if(update == 'UPDATE') {
								inventory();
							} else {
								console.log("Goodbye for now! Thanks for Baming with Bamazon!");
							}
						})
					}
				}
			}
		})
	})
};

//check store inventory to see if bamazon can meet the user request


//if not, the app should log a phrase like 'insufficient quantity' and 
//  prevent the transaction from completing (updating the database in anyway)


//if there are sufficient quantities of the item, fulfill the customer's order
//	this means updating the database to reflect remaining quantities


//once db update has gone through, show the customer the total cost of their purchase

