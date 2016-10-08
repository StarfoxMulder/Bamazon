CREATE database Bamazon;

USE Bamazon;

CREATE TABLE `Products` (
	`itemID` INT NOT NULL,
	`productName` VARCHAR(100) NULL,
	`departmentName` VARCHAR(100) NULL,
	`price` INT NULL,
	`stockQuantity` INT NULL,
	PRIMARY KEY (`itemID`)
);

SELECT * FROM Products;
