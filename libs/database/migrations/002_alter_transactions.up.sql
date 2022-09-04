ALTER TABLE transactions ADD COLUMN account_id VARCHAR(255) NOT NULL AFTER id;

CREATE TABLE `budgets` (
  `category` VARCHAR(255) NOT NULL,
  `limit` int NOT NULL,
  PRIMARY KEY (`category`)
);

CREATE TABLE `merchants` (
	`name` VARCHAR(255) NOT NULL,
	`category` VARCHAR(255) NOT NULL,
	`up_category` VARCHAR(255),
	PRIMARY KEY (`name`)
);

CREATE TABLE `accounts` (
  `id` VARCHAR(255) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL
);
