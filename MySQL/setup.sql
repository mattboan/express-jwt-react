/* Create Users Table */
CREATE TABLE `Users2` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) NOT NULL,
	`password` TEXT NOT NULL,
	`role` VARCHAR(255),
	PRIMARY KEY (`id`)
);