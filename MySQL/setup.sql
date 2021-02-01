/* Create database */
CREATE DATABASE express_jwt_react_dev_db;

/* Change to newly created database */
USE express_jwt_react_dev_db;

/* Create Users Table */
CREATE TABLE `Users` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) NOT NULL,
	`password` TEXT NOT NULL,
	`role` VARCHAR(255),
	PRIMARY KEY (`id`)
);