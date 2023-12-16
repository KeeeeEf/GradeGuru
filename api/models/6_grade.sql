CREATE TABLE `grade` (
  `grade_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `activity_id` bigint(20) NOT NULL,
  `activity` varchar(255),
  `grade` decimal(3,2) NOT NULL,
  PRIMARY KEY (`grade_id`),
  KEY `activity_id` (`activity_id`),
  CONSTRAINT `activity_idfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;