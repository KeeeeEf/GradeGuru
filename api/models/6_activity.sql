CREATE TABLE `activity` (
  `activity_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) NOT NULL,
  `criteria_id` bigint(20) NOT NULL,
  `activity` varchar(255),
  `total` int NOT NULL,
  `score` int NOT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `course_id` (`course_id`),
  KEY `criteria_id` (`criteria_id`),
  CONSTRAINT `course_idfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  CONSTRAINT `criteria_idfk_1` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`criteria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;