console.log('This is loaded');
var mysql = require('mysql');

exports.connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: "Fthefed22",
	database: 'bamazon'
});


// exports.mysqlKeys = new MySQL({
// 	consumer_key: 	'1gICw0UEMFgnAH5gFqjxSqYBt',
// 	consumer_secret: 	'w035RxoKCtli5MagNXbycnXEGH2taPOhI3norY6uvPt9GbtW34',
// 	access_token_key: '733151887-zIPqQwUSlaZbMECXGCt6SeGWNIFJGyDVMnCbTkzs',
// 	access_token_secret: 	'UmkcCsHC1z5xjPVYIXnHMrWUGkNsfTwQgOPfrABMOkvlw',
// });



/*

CREATE database Bamazon;
USE bamazon;

CREATE TABLE `Products` (
	`itemID` INT NOT NULL,
	`productName` VARCHAR(100) NULL,
	`departmentName` VARCHAR(100) NULL,
	`price` INT NULL,
	`stockQuantity` INT NULL,
	PRIMARY KEY (`itemID`)
);

SELECT * FROM Products;

*/