CREATE TABLE `semester` (
  `sem_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,
  `year` year NOT NULL,
  `semester` enum('first', 'second', 'summer', '') NOT NULL,
  PRIMARY KEY (`sem_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `account_idfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;