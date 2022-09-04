CREATE TABLE `transactions` (
	`id` int NOT NULL AUTO_INCREMENT,
	`amount` int NOT NULL,
	`created_at` time NOT NULL,
	`merchant` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;
