CREATE DATABASE IF NOT EXISTS `mock_project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mock_project`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: mock_project
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `room` varchar(45) NOT NULL,
  `status` varchar(255) NOT NULL,
  `progress` int NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'60K01','Lớp IELTS band 6.0 khóa 1','101','FINISHED',10,'2022-05-19 00:00:00','2022-07-02 00:00:00',NULL,'2022-09-15 10:58:59'),(2,'65K01','Lớp IELTS band 6.5 khóa 1','102','FINISHED',12,'2022-05-19 00:00:00','2022-07-02 00:00:00',NULL,'2022-09-15 15:18:42'),(3,'70K01','Lớp IELTS band 7.0 khóa 1','101','FINISHED',15,'2022-05-10 00:00:00','2022-07-10 00:00:00',NULL,NULL),(4,'75K01','Lớp IELTS band 7.5 khóa 1','102','FINISHED',15,'2022-05-10 00:00:00','2022-07-10 00:00:00',NULL,NULL),(5,'BGK01','Lớp IELTS Beginner khóa 1','101','FINISHED',8,'2022-05-18 00:00:00','2022-06-16 00:00:00',NULL,NULL),(6,'60K02','Lớp IELTS band 6.0 khóa 2','101','FINISHED',12,'2022-06-09 00:00:00','2022-07-22 00:00:00',NULL,NULL),(7,'65K02','Lớp IELTS band 6.5 khóa 2','102','FINISHED',12,'2022-06-09 00:00:00','2022-07-22 00:00:00',NULL,NULL),(8,'70K02','Lớp IELTS band 7.0 khóa 2','101','FINISHED',15,'2022-06-10 00:00:00','2022-08-08 00:00:00',NULL,NULL),(9,'75K02','Lớp IELTS band 7.5 khóa 2','102','FINISHED',15,'2022-06-10 00:00:00','2022-08-08 00:00:00',NULL,NULL),(10,'BGK02','Lớp IELTS Beginner khóa 2','101','FINISHED',8,'2022-06-08 00:00:00','2022-07-06 00:00:00',NULL,NULL),(11,'60K03','Lớp IELTS band 6.0 khóa 3','101','FINISHED',12,'2022-06-29 00:00:00','2022-08-14 00:00:00',NULL,NULL),(12,'65K03','Lớp IELTS band 6.5 khóa 3','102','FINISHED',12,'2022-06-29 00:00:00','2022-08-14 00:00:00',NULL,NULL),(13,'70K03','Lớp IELTS band 7.0 khóa 3','101','FINISHED',15,'2022-06-30 00:00:00','2022-08-28 00:00:00',NULL,NULL),(14,'75K03','Lớp IELTS band 7.5 khóa 3','102','FINISHED',15,'2022-06-30 00:00:00','2022-08-28 00:00:00',NULL,NULL),(15,'BGK03','Lớp IELTS Beginner khóa 3','101','FINISHED',8,'2022-06-28 00:00:00','2022-07-26 00:00:00',NULL,NULL),(16,'60K04','Lớp IELTS band 6.0 khóa 4','101','FINISHED',12,'2022-07-19 00:00:00','2022-09-05 00:00:00',NULL,NULL),(17,'65K04','Lớp IELTS band 6.5 khóa 4','102','FINISHED',12,'2022-07-19 00:00:00','2022-09-05 00:00:00',NULL,NULL),(18,'70K04','Lớp IELTS band 7.0 khóa 4','101','STUDYING',13,'2022-07-20 00:00:00','2022-09-18 00:00:00',NULL,NULL),(19,'75K04','Lớp IELTS band 7.5 khóa 4','102','STUDYING',13,'2022-07-20 00:00:00','2022-09-18 00:00:00',NULL,NULL),(20,'BGK04','Lớp IELTS Beginner khóa 4','101','FINISHED',8,'2022-07-18 00:00:00','2022-08-16 00:00:00',NULL,NULL),(21,'60K05','Lớp IELTS band 6.0 khóa 5','101','STUDYING',10,'2022-08-09 00:00:00','2022-09-25 00:00:00',NULL,NULL),(22,'65K05','Lớp IELTS band 6.5 khóa 5','102','STUDYING',10,'2022-08-09 00:00:00','2022-09-25 00:00:00',NULL,NULL),(23,'70K05','Lớp IELTS band 7.0 khóa 5','101','STUDYING',10,'2022-08-10 00:00:00','2022-10-08 00:00:00',NULL,NULL),(24,'75K05','Lớp IELTS band 7.5 khóa 5','102','STUDYING',10,'2022-08-10 00:00:00','2022-10-08 00:00:00',NULL,NULL),(25,'BGK05','Lớp IELTS Beginner khóa 5','101','FINISHED',8,'2022-08-08 00:00:00','2022-09-06 00:00:00',NULL,NULL),(26,'60K06','Lớp IELTS band 6.0 khóa 6','101','STUDYING',10,'2022-08-09 00:00:00','2022-09-25 00:00:00',NULL,NULL),(27,'65K06','Lớp IELTS band 6.5 khóa 6','102','STUDYING',10,'2022-08-09 00:00:00','2022-09-25 00:00:00',NULL,NULL),(28,'70K06','Lớp IELTS band 7.0 khóa 6','101','STUDYING',10,'2022-08-10 00:00:00','2022-10-08 00:00:00',NULL,NULL),(29,'75K06','Lớp IELTS band 7.5 khóa 6','102','STUDYING',10,'2022-08-10 00:00:00','2022-10-08 00:00:00',NULL,NULL),(30,'BGK06','Lớp IELTS Beginner khóa 6','101','FINISHED',8,'2022-08-08 00:00:00','2022-09-06 00:00:00',NULL,NULL),(31,'60K07','Lớp IELTS band 6.0 khóa 7','101','STUDYING',2,'2022-09-09 00:00:00','2022-10-15 00:00:00',NULL,NULL),(32,'65K07','Lớp IELTS band 6.5 khóa 7','102','STUDYING',2,'2022-09-09 00:00:00','2022-10-15 00:00:00',NULL,NULL),(33,'70K07','Lớp IELTS band 7.0 khóa 7','101','STUDYING',2,'2022-09-10 00:00:00','2022-11-07 00:00:00',NULL,NULL),(34,'75K07','Lớp IELTS band 7.5 khóa 7','102','STUDYING',2,'2022-09-10 00:00:00','2022-11-07 00:00:00',NULL,NULL),(35,'BGK07','Lớp IELTS Beginner khóa 7','101','STUDYING',2,'2022-09-08 00:00:00','2022-10-06 00:00:00',NULL,NULL),(36,'60K08','Lớp IELTS band 6.0 khóa 8','101','STUDYING',2,'2022-09-09 00:00:00','2022-10-15 00:00:00',NULL,NULL),(37,'65K08','Lớp IELTS band 6.5 khóa 8','102','STUDYING',2,'2022-09-09 00:00:00','2022-10-15 00:00:00',NULL,NULL),(38,'70K08','Lớp IELTS band 7.0 khóa 8','101','STUDYING',2,'2022-09-10 00:00:00','2022-11-07 00:00:00',NULL,NULL),(39,'75K08','Lớp IELTS band 7.5 khóa 8','102','STUDYING',2,'2022-09-10 00:00:00','2022-11-07 00:00:00',NULL,NULL),(40,'BGK08','Lớp IELTS Beginner khóa 8','101','STUDYING',2,'2022-09-08 00:00:00','2022-10-06 00:00:00',NULL,NULL),(41,'60K09','Lớp IELTS band 6.0 khóa 9','101','STUDYING',3,'2022-09-09 00:00:00','2022-10-15 00:00:00',NULL,'2022-09-16 12:21:32'),(42,'65K09','Lớp IELTS band 6.5 khóa 9','102','STUDYING',2,'2022-09-09 00:00:00','2022-10-15 00:00:00',NULL,NULL),(43,'70K09','Lớp IELTS band 7.0 khóa 9','101','STUDYING',2,'2022-09-10 00:00:00','2022-11-07 00:00:00',NULL,NULL),(44,'75K09','Lớp IELTS band 7.5 khóa 9','102','STUDYING',2,'2022-09-10 00:00:00','2022-11-07 00:00:00',NULL,NULL),(45,'BGK09','Lớp IELTS Beginner khóa 9','101','STUDYING',2,'2022-09-08 00:00:00','2022-10-06 00:00:00',NULL,NULL),(46,'60K10','Lớp IELTS band 6.0 khóa 10','101','WAITING',0,'2022-09-29 00:00:00','2022-11-15 00:00:00',NULL,NULL),(47,'65K10','Lớp IELTS band 6.5 khóa 10','102','WAITING',0,'2022-09-29 00:00:00','2022-11-15 00:00:00',NULL,NULL),(48,'70K10','Lớp IELTS band 7.0 khóa 10','101','WAITING',0,'2022-09-30 00:00:00','2022-11-27 00:00:00',NULL,NULL),(49,'75K10','Lớp IELTS band 7.5 khóa 10','102','CANCELED',0,'2022-09-30 00:00:00','2022-11-27 00:00:00',NULL,'2022-09-15 17:30:20'),(50,'BGK10','Lớp IELTS Beginner khóa 10','101','WAITING',0,'2022-09-28 00:00:00','2022-10-26 00:00:00',NULL,NULL),(51,'60K11','Lớp IELTS band 6.0 khóa 11','101','WAITING',0,'2022-09-29 00:00:00','2022-11-15 00:00:00',NULL,NULL),(52,'65K11','Lớp IELTS band 6.5 khóa 11','102','WAITING',0,'2022-09-29 00:00:00','2022-11-15 00:00:00',NULL,NULL),(53,'70K11','Lớp IELTS band 7.0 khóa 11','101','WAITING',0,'2022-09-30 00:00:00','2022-11-27 00:00:00',NULL,NULL),(54,'75K11','Lớp IELTS band 7.5 khóa 11','102','WAITING',0,'2022-09-30 00:00:00','2022-11-27 00:00:00',NULL,NULL),(55,'BGK11','Lớp IELTS Beginner khóa 11','101','WAITING',0,'2022-09-28 00:00:00','2022-10-26 00:00:00',NULL,NULL),(56,'60K12','Lớp IELTS band 6.0 khóa 12','101','WAITING',0,'2022-09-29 00:00:00','2022-11-15 00:00:00',NULL,NULL),(57,'65K12','Lớp IELTS band 6.5 khóa 12','102','WAITING',0,'2022-09-29 00:00:00','2022-11-15 00:00:00',NULL,NULL),(58,'70K12','Lớp IELTS band 7.0 khóa 12','101','WAITING',0,'2022-09-30 00:00:00','2022-11-27 00:00:00',NULL,NULL),(59,'75K12','Lớp IELTS band 7.5 khóa 12','102','WAITING',0,'2022-09-30 00:00:00','2022-11-27 00:00:00',NULL,NULL),(60,'BGK12','Lớp IELTS Beginner khóa 12','101','WAITING',0,'2022-09-28 00:00:00','2022-10-26 00:00:00',NULL,NULL),(61,'60K13','Lớp IELTS band 6.0 khóa 13','101','CANCELED',0,'2022-09-29 00:00:00','2022-11-15 00:00:00',NULL,'2022-09-15 17:27:44'),(62,'65K13','Lớp IELTS band 6.5 khóa 13','102','WAITING',0,'2022-09-29 00:00:00','2022-11-15 00:00:00',NULL,NULL),(63,'70K13','Lớp IELTS band 7.0 khóa 13','101','WAITING',0,'2022-09-30 00:00:00','2022-11-27 00:00:00',NULL,NULL),(64,'75K13','Lớp IELTS band 7.5 khóa 13','102','WAITING',0,'2022-09-30 00:00:00','2022-11-27 00:00:00',NULL,NULL),(65,'BGK13','Lớp IELTS Beginner khóa 13','101','CANCELED',0,'2022-09-28 00:00:00','2022-10-26 00:00:00',NULL,'2022-09-15 17:26:42');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_course`
--

DROP TABLE IF EXISTS `class_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_course` (
  `class_id` int NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`class_id`,`course_id`),
  KEY `fk_course_class` (`course_id`),
  CONSTRAINT `fk_class_course` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  CONSTRAINT `fk_course_class` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_course`
--

LOCK TABLES `class_course` WRITE;
/*!40000 ALTER TABLE `class_course` DISABLE KEYS */;
INSERT INTO `class_course` VALUES (1,1),(6,1),(11,1),(16,1),(21,1),(26,1),(31,1),(36,1),(41,1),(46,1),(51,1),(56,1),(61,1),(2,2),(7,2),(12,2),(17,2),(22,2),(27,2),(32,2),(37,2),(42,2),(47,2),(52,2),(57,2),(62,2),(3,3),(8,3),(13,3),(18,3),(23,3),(28,3),(33,3),(38,3),(43,3),(48,3),(53,3),(58,3),(63,3),(4,4),(9,4),(14,4),(19,4),(24,4),(29,4),(34,4),(39,4),(44,4),(49,4),(54,4),(59,4),(64,4),(5,5),(10,5),(15,5),(20,5),(25,5),(30,5),(35,5),(40,5),(45,5),(50,5),(55,5),(60,5),(65,5);
/*!40000 ALTER TABLE `class_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_department`
--

DROP TABLE IF EXISTS `class_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_department` (
  `class_id` int NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`class_id`,`department_id`),
  KEY `fk_department_class` (`department_id`),
  CONSTRAINT `fk_class_department` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  CONSTRAINT `fk_department_class` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_department`
--

LOCK TABLES `class_department` WRITE;
/*!40000 ALTER TABLE `class_department` DISABLE KEYS */;
INSERT INTO `class_department` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(31,1),(32,1),(33,1),(34,1),(35,1),(46,1),(47,1),(48,1),(49,1),(50,1),(26,2),(27,2),(28,2),(29,2),(30,2),(36,2),(37,2),(38,2),(39,2),(40,2),(51,2),(52,2),(53,2),(54,2),(55,2),(41,3),(42,3),(43,3),(44,3),(45,3),(56,3),(57,3),(58,3),(59,3),(60,3),(61,4),(62,4),(63,4),(64,4),(65,4);
/*!40000 ALTER TABLE `class_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_timeslot`
--

DROP TABLE IF EXISTS `class_timeslot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_timeslot` (
  `class_id` int NOT NULL,
  `timeslot_id` int NOT NULL,
  PRIMARY KEY (`class_id`,`timeslot_id`),
  KEY `fk_timeslot_class` (`timeslot_id`),
  CONSTRAINT `fk_class_timeslot` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  CONSTRAINT `fk_timeslot_class` FOREIGN KEY (`timeslot_id`) REFERENCES `timeslot` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_timeslot`
--

LOCK TABLES `class_timeslot` WRITE;
/*!40000 ALTER TABLE `class_timeslot` DISABLE KEYS */;
INSERT INTO `class_timeslot` VALUES (5,2),(8,2),(15,2),(18,2),(25,2),(28,2),(35,2),(38,2),(45,2),(48,2),(55,2),(58,2),(65,2),(9,3),(19,3),(29,3),(39,3),(49,3),(59,3),(1,7),(10,7),(11,7),(20,7),(21,7),(30,7),(31,7),(40,7),(41,7),(50,7),(51,7),(60,7),(61,7),(2,8),(12,8),(22,8),(32,8),(42,8),(52,8),(62,8),(3,12),(13,12),(23,12),(33,12),(43,12),(53,12),(63,12),(4,13),(14,13),(24,13),(34,13),(44,13),(54,13),(64,13),(5,16),(15,16),(25,16),(35,16),(45,16),(55,16),(65,16),(6,19),(16,19),(26,19),(36,19),(46,19),(56,19),(7,20),(17,20),(27,20),(37,20),(47,20),(57,20),(1,21),(11,21),(21,21),(31,21),(41,21),(51,21),(61,21),(2,22),(12,22),(22,22),(32,22),(42,22),(52,22),(62,22),(8,23),(18,23),(28,23),(38,23),(48,23),(58,23),(9,24),(19,24),(29,24),(39,24),(49,24),(59,24),(3,26),(13,26),(23,26),(33,26),(43,26),(53,26),(63,26),(4,27),(14,27),(24,27),(34,27),(44,27),(54,27),(64,27),(10,28),(20,28),(30,28),(40,28),(50,28),(60,28),(6,33),(16,33),(26,33),(36,33),(46,33),(56,33),(7,34),(17,34),(27,34),(37,34),(47,34),(57,34);
/*!40000 ALTER TABLE `class_timeslot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `amount` bigint NOT NULL,
  `number_grade` int NOT NULL,
  `number_session` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'Khóa học IETLS band 6.0',9990000,4,12,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi2AK9obvvTeP6q6uGB0oyy77NR9kIIGM4Eu1n7DNI1M96AcO1UlNhVDgHFWEQNnKRfqU&usqp=CAU'),(2,'Khóa học IETLS band 6.5',9990000,4,12,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3px7XK0NMqgBqQb1I9sbHQ94Zes01lAHrnq3hFP0uNocY98RzfxodM5TxcShr3JRwolw&usqp=CAU'),(3,'Khóa học IETLS band 7.0',11990000,5,15,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT60gzm92p3NXpjttIqjpBSPa9udlVGyGTUq1Z7NhjIjNS_FI__TBSIROSCW8-GwQ4o_uE&usqp=CAU'),(4,'Khóa học IETLS band 7.5',11990000,5,15,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvFHvlhZZaXoqpuslP664U7IdcqqgMuEfQ0g&usqp=CAU'),(5,'Khóa học IELTS Beginner',8000000,3,10,NULL,NULL,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbdZ4amu2ebZWVv8TgJn7C9eoN19J_i5W1uw&usqp=CAU');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'HN1','Số 10 Tạ Quang Bửu, Hà Nội','0987654321',NULL,NULL),(2,'HN2','Số 240 Đội Cấn, Hà Nội','0566113366',NULL,NULL),(3,'HCM1','Số 8 ngõ 80 Minh Khai, TP.HCM','0998787878',NULL,NULL),(4,'DN1','Số 101 Phước Hưng, Đà Nẵng','0899061626',NULL,NULL);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `type` varchar(45) NOT NULL,
  `instruction` varchar(255) NOT NULL,
  `deadline` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKawhcsnik51sfk1k8twjfm36co` (`class_id`),
  CONSTRAINT `FKawhcsnik51sfk1k8twjfm36co` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (1,1,'Bài tập 1','google.com','HW','Cố lên em nhé 1','2022-08-22',NULL,NULL),(2,1,'Bài tập 2','google.com','HW','Cố lên em nhé 2','2022-08-23',NULL,NULL),(3,1,'Tài liệu 1','google.com','DOC','Cố lên em nhé 3',NULL,NULL,NULL),(4,1,'Tài liệu 2','google.com','DOC','Cố lên em nhé 4',NULL,NULL,NULL),(5,5,'Bài tập 3','google.com','HW','Cố lên em nhé 5','2023-01-01',NULL,NULL),(6,5,'Tài liệu 3','google.com','DOC','Cố lên em nhé 6',NULL,NULL,NULL),(7,1,'Bài tập 14/9','https://firebasestorage.googleapis.com/v0/b/mindxcijuly22.appspot.com/o/files%2Fstudent%2FChapter%205%20Theory.docx?alt=media&token=af481db5-d368-4067-8803-40b02f9b7c69','HW','123','2022-09-14','2022-09-14 11:10:35','2022-09-14 11:10:35'),(8,1,'Bài tập 14/9','https://firebasestorage.googleapis.com/v0/b/mindxcijuly22.appspot.com/o/files%2Fstudent%2FChapter%205%20Theory.docx?alt=media&token=af481db5-d368-4067-8803-40b02f9b7c69','HW','123','2022-09-11','2022-09-14 11:10:58','2022-09-14 11:10:58'),(9,7,'Bài tập 15/9','https://firebasestorage.googleapis.com/v0/b/mindxcijuly22.appspot.com/o/files%2Fstudent%2F03-Naming.pdf?alt=media&token=69131fbc-514d-4e27-99a1-e09c539217b2','HW','Hạn cuối: 17/9','2022-09-17','2022-09-15 23:22:58','2022-09-15 23:22:58');
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest`
--

DROP TABLE IF EXISTS `guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `employee_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employee` (`employee_id`),
  CONSTRAINT `fk_employee` FOREIGN KEY (`employee_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest`
--

LOCK TABLES `guest` WRITE;
/*!40000 ALTER TABLE `guest` DISABLE KEYS */;
INSERT INTO `guest` VALUES (1,'Khách 1','2000-01-01','1234@gmail.com','0147258369','HN',NULL,NULL,NULL),(2,'Khách 3','2000-01-01','1234@gmail.com','0147258369','HN',NULL,NULL,NULL),(3,'Khách 2','2000-02-02','1234@gmail.com','0147852369','HCM',1,NULL,NULL),(4,'Khách 4','2000-02-02','1234@gmail.com','0147852369','TB',1,NULL,NULL),(5,'Khách 5','2000-02-02','1234@gmail.com','0147852369','HP',2,NULL,NULL),(6,'Nguyễn Văn Giang','2000-08-11','nguyek25@gmail.com','0123478569','5th Avenue',NULL,'2022-09-14 08:49:43','2022-09-14 08:49:43'),(7,'John Smith','1998-09-12','nguyenthechinhk25@gmail.com','0874569147','5th Avenue',NULL,'2022-09-14 08:50:19','2022-09-14 08:50:19'),(8,'Hồ Văn Toàn','1996-06-10','hvantoan@gmail.com','08888456123','Hải Phòng',2,'2022-09-14 08:54:33','2022-09-14 11:03:50'),(9,'Nguyễn Huy Hoàng','2020-08-30','huyhoang@yahoo.com','0614235789','Đà Nẵng',NULL,'2022-09-14 10:06:01','2022-09-14 10:06:01'),(10,'Mai Văn Hương','2020-07-27','vhuong@yahoo.com','0745678912','Hải Dương',NULL,'2022-09-14 10:08:22','2022-09-14 10:08:22'),(11,'Nguyễn Thanh Tùng','2022-03-08','nttung@gmail.com','0566113369','Hà Nội',NULL,'2022-09-14 10:09:12','2022-09-14 10:09:12'),(12,'Trần Công Minh','2000-05-01','tcminhminh@gmail.com','0915333666','Cao Bằng',NULL,'2022-09-14 10:10:26','2022-09-14 10:10:26'),(13,'Trần Thanh Độ','1998-10-09','tthanhdo@github.com','0147258369','Hà Giang',NULL,'2022-09-14 10:11:06','2022-09-14 10:11:06'),(14,'Nguyễn Thế Chính','2000-09-05','ntchinh@gmail.com','0566113369','Bắc Giang',2,'2022-09-14 11:02:43','2022-09-14 11:03:15');
/*!40000 ALTER TABLE `guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_voucher`
--

DROP TABLE IF EXISTS `payment_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_voucher` (
  `voucher_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `student_name` varchar(45) NOT NULL,
  `student_phone` varchar(15) NOT NULL,
  `student_email` varchar(100) NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`voucher_id`,`employee_id`),
  KEY `fk_employee_payment_voucher` (`employee_id`),
  KEY `FKob4blklfrwr7o2tqd3yitpmp6` (`course_id`),
  CONSTRAINT `fk_employee_payment_voucher` FOREIGN KEY (`employee_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_payment_voucher` FOREIGN KEY (`voucher_id`) REFERENCES `voucher` (`id`),
  CONSTRAINT `FKob4blklfrwr7o2tqd3yitpmp6` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_voucher`
--

LOCK TABLES `payment_voucher` WRITE;
/*!40000 ALTER TABLE `payment_voucher` DISABLE KEYS */;
INSERT INTO `payment_voucher` VALUES (1,1,'Khách 1','0147258369','1234@gmail.com',2),(2,1,'Nguyễn Thế Chính','0258369147','ntchinh@gmail.com',4),(4,1,'Khách 2','0147852369','1234@gmail.com',1),(5,1,'Nguyễn Văn Giang','0123478569','nguyek25@gmail.com',3),(6,1,'Hồ Văn Toàn','08888456123','hvantoan@gmail.com',3),(7,1,'Ngô Duy Khánh','0258369147','ndkhanh@gmail.com',4),(8,1,'Lê Kim Liên','0258369147','lklien@gmail.com',2),(9,1,'Xuân Quang','0263177404','xquang@gmail.com',3),(10,1,'John Smith','0874569147','nguyenthechinhk25@gmail.com',4),(11,1,'Khách 1','0147258369','1234@gmail.com',4),(12,1,'Đỗ Văn Nam','0123456789','dvnam@gmail.com',3),(19,1,'Khách 5','0147852369','1234@gmail.com',5),(20,1,'Khách 3','0147258369','1234@gmail.com',5),(21,1,'Xuân Quang','0263177404','xquang@gmail.com',1),(22,1,'Đỗ Văn Nam','0123456789','dvnam@gmail.com',5),(23,1,'Nguyễn Thế Chính','0258369147','ntchinh@gmail.com',3),(24,1,'Hồ Văn Toàn','08888456123','hvantoan@gmail.com',5);
/*!40000 ALTER TABLE `payment_voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission_code` varchar(45) NOT NULL,
  `permission_name` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permission_code` (`permission_code`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'GUEST_READ','GUEST_READ',NULL,NULL),(2,'GUEST_POST','GUEST_POST',NULL,NULL),(3,'GUEST_PUT','GUEST_PUT',NULL,NULL),(4,'GUEST_DELETE','GUEST_DELETE',NULL,NULL),(5,'USER_READ','USER_READ',NULL,NULL),(6,'USER_POST','USER_POST',NULL,NULL),(7,'USER_PUT','USER_PUT',NULL,NULL),(8,'USER_DELETE','USER_DELETE',NULL,NULL),(9,'ROLE_READ','ROLE_READ',NULL,NULL),(10,'ROLE_POST','ROLE_POST',NULL,NULL),(11,'ROLE_PUT','ROLE_PUT',NULL,NULL),(12,'ROLE_DELETE','ROLE_DELETE',NULL,NULL),(13,'PERMISSION_READ','PERMISSION_READ',NULL,NULL),(14,'PERMISSION_POST','PERMISSION_POST',NULL,NULL),(15,'PERMISSION_PUT','PERMISSION_PUT',NULL,NULL),(16,'PERMISSION_DELETE','PERMISSION_DELETE',NULL,NULL),(17,'COURSE_READ','COURSE_READ',NULL,NULL),(18,'COURSE_POST','COURSE_POST',NULL,NULL),(19,'COURSE_PUT','COURSE_PUT',NULL,NULL),(20,'COURSE_DELETE','COURSE_DELETE',NULL,NULL),(21,'CLASS_READ','CLASS_READ',NULL,NULL),(22,'CLASS_POST','CLASS_POST',NULL,NULL),(23,'CLASS_PUT','CLASS_PUT',NULL,NULL),(24,'CLASS_DELETE','CLASS_DELETE',NULL,NULL),(25,'DEPARTMENT_READ','DEPARTMENT_READ',NULL,NULL),(26,'DEPARTMENT_POST','DEPARTMENT_POST',NULL,NULL),(27,'DEPARTMENT_PUT','DEPARTMENT_PUT',NULL,NULL),(28,'DEPARTMENT_DELETE','DEPARTMENT_DELETE',NULL,NULL),(29,'VOUCHER_READ','VOUCHER_READ',NULL,NULL),(30,'VOUCHER_POST','VOUCHER_POST',NULL,NULL),(31,'VOUCHER_PUT','VOUCHER_PUT',NULL,NULL),(32,'VOUCHER_DELETE','VOUCHER_DELETE',NULL,NULL),(33,'DOCUMENT_READ','DOCUMENT_READ',NULL,NULL),(34,'DOCUMENT_POST','DOCUMENT_POST',NULL,NULL),(35,'DOCUMENT_PUT','DOCUMENT_PUT',NULL,NULL),(36,'DOCUMENT_DELETE','DOCUMENT_DELETE',NULL,NULL);
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt_voucher`
--

DROP TABLE IF EXISTS `receipt_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt_voucher` (
  `voucher_id` int NOT NULL,
  `admin_id` int NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`voucher_id`,`admin_id`),
  KEY `fk_admin_receipt_voucher` (`admin_id`),
  KEY `fk_department_receipt_voucher` (`department_id`),
  CONSTRAINT `fk_admin_receipt_voucher` FOREIGN KEY (`admin_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_department_receipt_voucher` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  CONSTRAINT `fk_receipt_voucher` FOREIGN KEY (`voucher_id`) REFERENCES `voucher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt_voucher`
--

LOCK TABLES `receipt_voucher` WRITE;
/*!40000 ALTER TABLE `receipt_voucher` DISABLE KEYS */;
INSERT INTO `receipt_voucher` VALUES (14,1,1),(15,1,1),(3,1,2),(16,1,2),(17,1,2),(18,1,3),(25,1,3),(13,1,4);
/*!40000 ALTER TABLE `receipt_voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_code` varchar(45) NOT NULL,
  `role_name` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_code` (`role_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN','Quản trị viên',NULL,NULL),(2,'EMPLOYEE','Nhân viên',NULL,NULL),(3,'TEACHER','Giảng viên',NULL,NULL),(4,'STUDENT','Học viên',NULL,NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `fk_permission_role` (`permission_id`),
  CONSTRAINT `fk_permission_role` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`),
  CONSTRAINT `fk_role_permission` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (1,1),(2,1),(1,2),(2,2),(1,3),(2,3),(1,4),(1,5),(3,5),(4,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(2,17),(3,17),(4,17),(1,18),(1,19),(1,20),(1,21),(2,21),(3,21),(4,21),(1,22),(1,23),(3,23),(4,23),(1,24),(1,25),(2,25),(3,25),(4,25),(1,26),(1,27),(1,28),(1,29),(2,29),(1,30),(2,30),(1,31),(2,31),(1,32),(1,33),(3,33),(4,33),(1,34),(3,34),(4,34),(1,35),(3,35),(4,35),(1,36),(3,36),(4,36);
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_class`
--

DROP TABLE IF EXISTS `student_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_class` (
  `student_id` int NOT NULL,
  `class_id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `progress_grade` varchar(255) DEFAULT NULL,
  `test1_grade` varchar(255) DEFAULT NULL,
  `test2_grade` varchar(255) DEFAULT NULL,
  `test3_grade` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_id`,`class_id`),
  KEY `fk_class_student` (`class_id`),
  CONSTRAINT `fk_class_student` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  CONSTRAINT `fk_student_class` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_class`
--

LOCK TABLES `student_class` WRITE;
/*!40000 ALTER TABLE `student_class` DISABLE KEYS */;
INSERT INTO `student_class` VALUES (3,48,'STUDYING',NULL,NULL,NULL,NULL),(4,4,'STUDYING',NULL,NULL,NULL,NULL),(7,1,'FINISHED',NULL,NULL,NULL,NULL),(7,7,'FINISHED',NULL,NULL,NULL,NULL),(7,13,'FINISHED',NULL,NULL,NULL,NULL),(7,44,'STUDYING',NULL,NULL,NULL,NULL),(8,1,'FINISHED',NULL,NULL,NULL,NULL),(8,7,'FINISHED',NULL,NULL,NULL,NULL),(8,13,'FINISHED',NULL,NULL,NULL,NULL),(9,1,'FINISHED',NULL,NULL,NULL,NULL),(9,7,'FINISHED',NULL,NULL,NULL,NULL),(9,13,'FINISHED',NULL,NULL,NULL,NULL),(10,4,'FINISHED',NULL,NULL,NULL,NULL),(11,45,'STUDYING',NULL,NULL,NULL,NULL),(12,45,'STUDYING',NULL,NULL,NULL,NULL),(13,45,'STUDYING',NULL,NULL,NULL,NULL),(14,45,'STUDYING',NULL,NULL,NULL,NULL),(15,45,'STUDYING',NULL,NULL,NULL,NULL),(16,45,'STUDYING',NULL,NULL,NULL,NULL),(17,45,'STUDYING',NULL,NULL,NULL,NULL),(18,45,'STUDYING',NULL,NULL,NULL,NULL),(19,45,'STUDYING',NULL,NULL,NULL,NULL),(21,45,'STUDYING',NULL,NULL,NULL,NULL),(22,41,'STUDYING',NULL,NULL,NULL,NULL),(23,41,'STUDYING',NULL,NULL,NULL,NULL),(24,41,'STUDYING',NULL,NULL,NULL,NULL),(25,41,'STUDYING',NULL,NULL,NULL,NULL),(26,41,'STUDYING',NULL,NULL,NULL,NULL),(27,42,'STUDYING',NULL,NULL,NULL,NULL),(28,20,'STUDYING',NULL,NULL,NULL,NULL),(28,42,'STUDYING',NULL,NULL,NULL,NULL),(29,42,'STUDYING',NULL,NULL,NULL,NULL),(31,42,'STUDYING',NULL,NULL,NULL,NULL),(32,42,'STUDYING',NULL,NULL,NULL,NULL),(33,43,'STUDYING',NULL,NULL,NULL,NULL),(34,43,'STUDYING',NULL,NULL,NULL,NULL),(35,43,'STUDYING',NULL,NULL,NULL,NULL),(36,43,'STUDYING',NULL,NULL,NULL,NULL),(37,43,'STUDYING',NULL,NULL,NULL,NULL),(38,43,'STUDYING',NULL,NULL,NULL,NULL),(39,44,'STUDYING',NULL,NULL,NULL,NULL),(41,1,'FINISHED',NULL,NULL,NULL,NULL),(41,7,'FINISHED',NULL,NULL,NULL,NULL),(41,13,'FINISHED',NULL,NULL,NULL,NULL),(41,44,'STUDYING',NULL,NULL,NULL,NULL),(42,1,'STUDYING',NULL,NULL,NULL,NULL),(42,7,'FINISHED',NULL,NULL,NULL,NULL),(42,13,'FINISHED',NULL,NULL,NULL,NULL),(42,44,'STUDYING',NULL,NULL,NULL,NULL),(42,65,'STUDYING',NULL,NULL,NULL,NULL),(43,44,'STUDYING',NULL,NULL,NULL,NULL),(44,1,'STUDYING',NULL,NULL,NULL,NULL),(44,44,'STUDYING',NULL,NULL,NULL,NULL),(45,44,'STUDYING',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `student_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_grade`
--

DROP TABLE IF EXISTS `student_grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_grade` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `class_id` int NOT NULL,
  `grade_id` int NOT NULL,
  `grade_point` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_class_student_grade` (`class_id`),
  KEY `fk_student_grade` (`student_id`),
  CONSTRAINT `fk_class_student_grade` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  CONSTRAINT `fk_student_grade` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_grade`
--

LOCK TABLES `student_grade` WRITE;
/*!40000 ALTER TABLE `student_grade` DISABLE KEYS */;
INSERT INTO `student_grade` VALUES (1,7,1,1,9),(2,7,1,2,8),(3,7,1,3,5),(4,8,1,2,8),(5,8,1,3,5),(6,9,1,1,9),(7,9,1,2,7),(8,9,1,3,7),(9,41,1,2,10),(10,41,1,3,9),(11,8,1,4,8),(12,8,1,1,7),(13,33,43,5,5),(14,33,43,4,8);
/*!40000 ALTER TABLE `student_grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission`
--

DROP TABLE IF EXISTS `submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission` (
  `student_id` int NOT NULL,
  `document_id` int NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`student_id`,`document_id`),
  KEY `fk_document_student` (`document_id`),
  CONSTRAINT `fk_document_student` FOREIGN KEY (`document_id`) REFERENCES `document` (`id`),
  CONSTRAINT `fk_student_document` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission`
--

LOCK TABLES `submission` WRITE;
/*!40000 ALTER TABLE `submission` DISABLE KEYS */;
INSERT INTO `submission` VALUES (7,1,'https://firebasestorage.googleapis.com/v0/b/mindxcijuly22.appspot.com/o/files%2Fstudent%2FChapter%205%20Labwork.docx?alt=media&token=c3706089-31e2-4391-b740-318b65a42014','2022-09-14 09:11:39'),(7,7,'','2022-09-14 11:20:44');
/*!40000 ALTER TABLE `submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_class`
--

DROP TABLE IF EXISTS `teacher_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_class` (
  `teacher_id` int NOT NULL,
  `class_id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`teacher_id`,`class_id`),
  KEY `fk_class_teacher` (`class_id`),
  CONSTRAINT `fk_class_teacher` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  CONSTRAINT `fk_teacher_class` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_class`
--

LOCK TABLES `teacher_class` WRITE;
/*!40000 ALTER TABLE `teacher_class` DISABLE KEYS */;
INSERT INTO `teacher_class` VALUES (4,2,'FINISHED'),(4,6,'FINISHED'),(4,7,'FINISHED'),(4,11,'FINISHED'),(4,12,'FINISHED'),(5,3,'FINISHED'),(5,4,'FINISHED'),(5,8,'FINISHED'),(5,9,'FINISHED'),(5,13,'FINISHED'),(5,14,'FINISHED'),(5,18,'FINISHED'),(5,19,'FINISHED'),(5,23,'FINISHED'),(5,24,'FINISHED'),(5,28,'FINISHED'),(5,29,'FINISHED'),(5,33,'FINISHED'),(5,34,'FINISHED'),(5,38,'FINISHED'),(5,39,'FINISHED'),(6,5,'FINISHED'),(6,10,'FINISHED'),(6,15,'FINISHED'),(6,20,'FINISHED'),(6,25,'FINISHED'),(6,30,'FINISHED'),(6,35,'FINISHED'),(6,40,'FINISHED'),(20,1,'TEACHING'),(20,16,'FINISHED'),(20,17,'FINISHED'),(20,21,'FINISHED'),(20,22,'FINISHED'),(20,26,'FINISHED'),(20,27,'FINISHED'),(20,31,'FINISHED'),(20,32,'FINISHED'),(20,36,'FINISHED'),(20,37,'FINISHED'),(20,41,'TEACHING'),(20,42,'TEACHING'),(20,43,'TEACHING'),(30,44,'TEACHING'),(40,45,'TEACHING');
/*!40000 ALTER TABLE `teacher_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeslot`
--

DROP TABLE IF EXISTS `timeslot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeslot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(45) NOT NULL,
  `time` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeslot`
--

LOCK TABLES `timeslot` WRITE;
/*!40000 ALTER TABLE `timeslot` DISABLE KEYS */;
INSERT INTO `timeslot` VALUES (1,'Thứ hai','07:30 - 09:30',NULL,NULL),(2,'Thứ hai','10:00 - 12:00',NULL,NULL),(3,'Thứ hai','14:00 - 16:00',NULL,NULL),(4,'Thứ hai','16:30 - 18:30',NULL,NULL),(5,'Thứ hai','19:30 - 21:30',NULL,NULL),(6,'Thứ ba','07:30 - 09:30',NULL,NULL),(7,'Thứ ba','10:00 - 12:00',NULL,NULL),(8,'Thứ ba','14:00 - 16:00',NULL,NULL),(9,'Thứ ba','16:30 - 18:30',NULL,NULL),(10,'Thứ ba','19:30 - 21:30',NULL,NULL),(11,'Thứ tư','07:30 - 09:30',NULL,NULL),(12,'Thứ tư','10:00 - 12:00',NULL,NULL),(13,'Thứ tư','14:00 - 16:00',NULL,NULL),(14,'Thứ tư','16:30 - 18:30',NULL,NULL),(15,'Thứ tư','19:30 - 21:30',NULL,NULL),(16,'Thứ năm','07:30 - 09:30',NULL,NULL),(17,'Thứ năm','10:00 - 12:00',NULL,NULL),(18,'Thứ năm','14:00 - 16:00',NULL,NULL),(19,'Thứ năm','16:30 - 18:30',NULL,NULL),(20,'Thứ năm','19:30 - 21:30',NULL,NULL),(21,'Thứ sáu','07:30 - 09:30',NULL,NULL),(22,'Thứ sáu','10:00 - 12:00',NULL,NULL),(23,'Thứ sáu','14:00 - 16:00',NULL,NULL),(24,'Thứ sáu','16:30 - 18:30',NULL,NULL),(25,'Thứ sáu','19:30 - 21:30',NULL,NULL),(26,'Thứ bảy','07:30 - 09:30',NULL,NULL),(27,'Thứ bảy','10:00 - 12:00',NULL,NULL),(28,'Thứ bảy','14:00 - 16:00',NULL,NULL),(29,'Thứ bảy','16:30 - 18:30',NULL,NULL),(30,'Thứ bảy','19:30 - 21:30',NULL,NULL),(31,'Chủ nhật','07:30 - 09:30',NULL,NULL),(32,'Chủ nhật','10:00 - 12:00',NULL,NULL),(33,'Chủ nhật','14:00 - 16:00',NULL,NULL),(34,'Chủ nhật','16:30 - 18:30',NULL,NULL),(35,'Chủ nhật','19:30 - 21:30',NULL,NULL);
/*!40000 ALTER TABLE `timeslot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test1','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Nguyễn Văn Học','1998-12-22','ACTIVE','nvhoc@gmail.com','0987654321','Hà Nội',NULL,'2022-09-17 20:00:49'),(2,'test2','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Lý Thị Đào','1999-02-02','ACTIVE','ltdao@gmail.com','0987654321','Hà Nội',NULL,NULL),(3,'test3','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Cù Thị Bình','1999-03-03','ACTIVE','ctbinh@gmail.com','0987654321','Hồ Chí Minh',NULL,NULL),(4,'test4','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Trần Văn Khánh','2000-04-04','INACTIVE','tvkhanh@gmail.com','0987654321','Hải Phòng',NULL,NULL),(5,'test5','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Nguyễn Khanh Vân','2000-05-05','ACTIVE','nkvan@gmail.com','0123456789','Quảng Ninh',NULL,NULL),(6,'test6','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Lê Tuấn','2000-06-06','ACTIVE','ltuan@gmail.com','0123456789','Cần Thơ',NULL,NULL),(7,'test7','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Nguyễn Thế Chính','2000-07-07','ACTIVE','ntchinh@gmail.com','0258369147','Hồ Chí Minh',NULL,NULL),(8,'test8','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Phạm Tuấn Việt','2000-08-08','ACTIVE','ptviet@gmail.com','0258369147','Quảng Ninh',NULL,NULL),(9,'test9','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Ngô Duy Khánh','2000-09-09','ACTIVE','ndkhanh@gmail.com','0258369147','Bắc Giang',NULL,NULL),(10,'test10','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Nguyễn Văn Tuấn','2001-10-10','ACTIVE','nvtuan@gmail.com','0258369147','Bắc Ninh',NULL,NULL),(11,'test11','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Lê Kim Liên','2001-11-11','ACTIVE','lklien@gmail.com','0258369147','Lào Cai',NULL,NULL),(12,'test12','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Đỗ Văn Nam','2002-12-06','ACTIVE','dvnam@gmail.com','0123456789','Hải Phòng',NULL,NULL),(13,'test13','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Xuân Quang','1999-11-25','ACTIVE','xquang@gmail.com','0263177404','Ninh Thuận',NULL,NULL),(14,'test14','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Khang Nam','1998-02-15','ACTIVE','knam@gmail.com','0292163852','Quảng Bình',NULL,NULL),(15,'test15','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Ngọc Cao','1999-08-09','ACTIVE','ngcao@gmail.com','0727467944','Hà Nội',NULL,NULL),(16,'test16','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Trang Linh','1997-10-19','ACTIVE','trlinh@gmail.com','033962499','Hải Phòng',NULL,NULL),(17,'test17','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Nhã Diệp','1999-04-13','INACTIVE','han.du@hotmail.com','0566395029','Hồ Chí Minh',NULL,'2022-09-14 11:28:48'),(18,'test18','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Bích Uyên','1999-08-13','ACTIVE','svuong@hua.info.vn','01690962342','Vĩnh Long',NULL,NULL),(19,'test19','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Trâm San','1996-07-07','ACTIVE','ogiao@hotmail.com','0308828918','Lạng Sơn',NULL,NULL),(20,'test20','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Dung Quỳnh','2000-01-28','ACTIVE','lu.thu@gmail.com','0508838373','Đà Nẵng',NULL,NULL),(21,'test21','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Hồ Thanh Tâm','1999-03-30','ACTIVE','ophi@gmail.com','0960325861','Hải Phòng',NULL,NULL),(22,'test22','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Lê Danh Hùng','1998-02-05','ACTIVE','nu76@uong.com','0710457082','Vũng Tàu',NULL,NULL),(23,'test23','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Lê Ngân Uyên','1997-10-19','ACTIVE','chinh.thach@yahoo.com','0941261941','Cần Thơ',NULL,NULL),(24,'test24','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Lưu Kiên','1999-09-20','ACTIVE','thuan33@thi.org.vn','0322893370','Bình Dương',NULL,NULL),(25,'test25','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Trần Gia Đại','1999-07-20','ACTIVE','phi.khau@cup.com','0540520785','Long An',NULL,NULL),(26,'test26','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Nguyễn Xuân Chiến','1999-08-10','ACTIVE','quyet.le@phuong.int.vn','0319152068','Lâm Đồng',NULL,NULL),(27,'test27','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Phạm Thu Huyền','1998-06-18','ACTIVE','athi@thao.biz.vn','0851999567','Bình Dương',NULL,NULL),(28,'test28','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Châu Ngọc Hưng','2000-05-17','ACTIVE','omoc@trang.vn','0301744840','Hòa Bình',NULL,NULL),(29,'test29','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Lê Ngọc Hân','2000-04-30','ACTIVE','bi.thuc@gmail.com','0781855551','Bến Tre',NULL,NULL),(30,'test30','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Đỗ Ngọc Hưng','1998-07-19','ACTIVE','zle@khu.edu.vn','0751770110','Vĩnh Long',NULL,NULL),(31,'test31','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Đỗ Thị Ngọc Trinh','2000-11-17','ACTIVE','luong.di@mach.biz.vn','0276397595','Đắk Lắk',NULL,NULL),(32,'test32','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Bình Hồng','1997-12-01','ACTIVE','kim.chuong@gmail.com','0269730809','Hồ Chí Minh',NULL,NULL),(33,'test33','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Đại Hòa','2001-09-01','ACTIVE','dao36@dang.info.vn','(0123)409-9856','Hồ Chí Minh',NULL,NULL),(34,'test34','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Dung Hằng','1997-10-02','ACTIVE','luat28@hotmail.com','0601915542','Khánh Hòa',NULL,NULL),(35,'test35','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Kim Tiến Dũng','1999-10-13','ACTIVE','diem.hy@yahoo.com','0555496035','Gia Lai',NULL,NULL),(36,'test36','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Chu Thị Minh','1999-09-11','ACTIVE','truc31@duong.mil.vn','0272873913','Ninh Thuận',NULL,NULL),(37,'test37','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Nguyễn Văn Lâm','2000-07-22','ACTIVE','nham.khoa@gmail.com','0604938677','Phú Thọ',NULL,NULL),(38,'test38','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Ngô Thanh Thuận','2001-08-31','ACTIVE','ngo.thuan@la.info','0560919171','Hải Dương',NULL,NULL),(39,'test39','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Phi Thanh Duyên','1998-03-12','ACTIVE','ugiang@hotmail.com','0990962342','Hà Nội',NULL,NULL),(40,'test40','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Hoàng Thị Nga','1997-03-18','ACTIVE','thuan.diem@hotmail.com','0273710819','Quảng Nam',NULL,NULL),(41,'test41','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Nguyễn Thế Giang','1996-03-19','ACTIVE','cung.vi@chiem.com','0529261633','An Giang',NULL,NULL),(42,'test42','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Đào Khương Duy','2001-08-27','ACTIVE','jdao@yahoo.com','0876153216','Quảng Nam',NULL,NULL),(43,'test43','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Bạch Cốt Trân','2000-04-25','ACTIVE','tran83@don.edu.vn','0214560452','Hà Nội',NULL,NULL),(44,'test44','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Trần Bảo Tâm','1999-01-22','ACTIVE','tam11@yahoo.com','0125378633','Cần Thơ',NULL,NULL),(45,'test45','$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa','Dương Thu Thảo','1997-08-21','ACTIVE','ty45@bo.info','0688877893','Hải Phòng',NULL,NULL),(46,'testxx','$2a$10$NeN.HWO1I4e8gSgLuIOlse5c95lRcyJYMFrC1GdY1QTcJmlqIBYlS','Nguyễn Thế Chính','2022-09-04','INACTIVE','nguyenthechinhk25@gmail.com','0566113369','SN5, ngõ 121, đường Đại La, phường Trương Định, Hai Bà Trưng','2022-09-14 11:29:22','2022-09-14 11:29:37');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_role_user` (`role_id`),
  CONSTRAINT `fk_role_user` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1),(1,2),(2,2),(3,2),(17,2),(4,3),(5,3),(6,3),(17,3),(20,3),(30,3),(40,3),(7,4),(8,4),(9,4),(10,4),(11,4),(12,4),(13,4),(14,4),(15,4),(16,4),(18,4),(19,4),(21,4),(22,4),(23,4),(24,4),(25,4),(26,4),(27,4),(28,4),(29,4),(31,4),(32,4),(33,4),(34,4),(35,4),(36,4),(37,4),(38,4),(39,4),(41,4),(42,4),(43,4),(44,4),(45,4),(46,4);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` varchar(45) NOT NULL,
  `status` varchar(255) NOT NULL,
  `type` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES (1,'9990000','COMPLETED','PAY','Khách 1 đóng học phí khóa 6.5','2022-08-14 08:12:58','2022-08-14 08:12:58'),(2,'11990000','COMPLETED','PAY','Học viên đóng tiền khóa học lộ trình','2022-08-15 08:34:17','2022-08-15 08:34:17'),(3,'5000000','COMPLETED','REI','Tiền điện chi nhánh HN2 tháng 8','2022-08-16 08:35:00','2022-08-16 08:35:00'),(4,'9990000','COMPLETED','PAY','Khach 2 nop tiien hoc','2022-08-17 08:56:11','2022-08-17 08:56:11'),(5,'11990000','COMPLETED','PAY','Nop tien hoc khoa 7.0','2022-08-18 08:56:39','2022-08-18 08:56:39'),(6,'11990000','CANCELED','PAY','Da chuyen tien qua ngan hang','2022-08-19 08:57:11','2022-08-19 08:57:11'),(7,'11990000','COMPLETED','PAY','Nop tien hoc khoa nang cao','2022-08-20 08:57:42','2022-08-20 08:57:42'),(8,'9990000','PENDING','PAY','chua nop xong','2022-08-21 08:58:02','2022-08-21 08:58:02'),(9,'11990000','COMPLETED','PAY','','2022-08-22 08:58:28','2022-08-22 08:58:28'),(10,'11990000','PENDING','PAY','','2022-08-23 08:58:46','2022-08-23 08:58:46'),(11,'11990000','COMPLETED','PAY','','2022-08-24 08:59:07','2022-08-24 08:59:07'),(12,'11990000','COMPLETED','PAY','','2022-08-25 08:59:25','2022-08-25 08:59:25'),(13,'12000000','COMPLETED','REI','tien thue mat bang thang 7','2022-08-26 09:00:29','2022-08-26 09:00:29'),(14,'2000000','COMPLETED','REI','tien nuoc thang 7','2022-08-01 09:00:52','2022-08-01 09:00:52'),(15,'5000000','COMPLETED','REI','tien dien thang 7','2022-08-03 09:01:09','2022-08-03 09:01:09'),(16,'4000000','PENDING','REI','tien sua dieu hoa','2022-09-05 09:01:38','2022-09-05 09:01:38'),(17,'2000000','COMPLETED','REI','','2022-09-02 09:03:31','2022-09-02 09:03:31'),(18,'5000000','COMPLETED','REI','','2022-09-12 09:03:45','2022-09-12 09:03:45'),(19,'8000000','COMPLETED','PAY','Nop tien hoc thang 9','2022-09-11 09:53:00','2022-09-11 09:53:00'),(20,'8000000','COMPLETED','PAY','Khách 3 nộp tiền học tháng 9','2022-09-13 09:53:47','2022-09-13 09:53:47'),(21,'9990000','COMPLETED','PAY','','2022-09-13 09:54:06','2022-09-13 09:54:06'),(22,'8000000','COMPLETED','PAY','Nộp tiền học tháng 9','2022-09-14 09:54:37','2022-09-14 09:54:37'),(23,'11990000','COMPLETED','PAY','Tiền học khóa 7.0','2022-09-10 09:56:32','2022-09-10 09:56:32'),(24,'5000000','COMPLETED','PAY','Thu tiền','2022-09-14 11:36:55','2022-09-14 11:36:55'),(25,'2000000','COMPLETED','REI','Tiền điện','2022-09-14 11:37:38','2022-09-14 11:37:38');
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-17 20:14:02
