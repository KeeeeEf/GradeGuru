CREATE TABLE `courses` (
  `course_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sem_id` bigint(20) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `units` int NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `sem_id` (`sem_id`),
  CONSTRAINT `sem_idfk_1` FOREIGN KEY (`sem_id`) REFERENCES `semester` (`sem_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;