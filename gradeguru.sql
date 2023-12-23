CREATE DATABASE gradeguru;

USE gradeguru;

CREATE TABLE `account` (
  `account_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(60) NOT NULL,
  `email_address` varchar(128) NOT NULL UNIQUE,
  `account_type` int(2) NOT NULL DEFAULT 1,
  `account_status` enum('active','abolished') NOT NULL,
  `passwd` varchar(255) NOT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `semester` (
  `sem_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,
  `year` year NOT NULL,
  `semester` enum('first', 'second', 'summer', '') NOT NULL,
  PRIMARY KEY (`sem_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `account_idfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `courses` (
  `course_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sem_id` bigint(20) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `units` int NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `sem_id` (`sem_id`),
  CONSTRAINT `sem_idfk_1` FOREIGN KEY (`sem_id`) REFERENCES `semester` (`sem_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `criteria` (
  `criteria_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) NOT NULL,
  `type` varchar(255) NOT NULL,
  `percentage` decimal(5,2) NOT NULL,
  PRIMARY KEY (`criteria_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_idfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `activity` (
  `activity_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) NOT NULL,
  `criteria_id` bigint(20) NOT NULL,
  `term` varchar(255),
  `activity` varchar(255),
  `total` int NOT NULL,
  `score` int NOT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `course_id` (`course_id`),
  KEY `criteria_id` (`criteria_id`),
  CONSTRAINT `course_idfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE,
  CONSTRAINT `criteria_idfk_1` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`criteria_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
