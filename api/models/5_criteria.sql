CREATE TABLE `criteria` (
  `criteria_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) NOT NULL,
  `type` varchar(255) NOT NULL,
  `percentage` decimal(4,2) NOT NULL,
  PRIMARY KEY (`criteria_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_idfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
