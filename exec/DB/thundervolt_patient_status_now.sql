-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: thundervolt.co.kr    Database: thundervolt
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.20.04.1

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
-- Table structure for table `patient_status_now`
--

DROP TABLE IF EXISTS `patient_status_now`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_status_now` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `temperature` double NOT NULL,
  `bpm` int NOT NULL,
  `oxygen_saturation` int NOT NULL,
  `slope` int DEFAULT NULL,
  `now` datetime(6) NOT NULL,
  `patient_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_status_now_patient_id_33d1da1d_fk_patient_id` (`patient_id`),
  CONSTRAINT `patient_status_now_patient_id_33d1da1d_fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4234 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_status_now`
--

LOCK TABLES `patient_status_now` WRITE;
/*!40000 ALTER TABLE `patient_status_now` DISABLE KEYS */;
INSERT INTO `patient_status_now` VALUES (8,38.6,80,98,0,'2022-11-21 16:00:00.000000',28),(9,38.3,84,97,0,'2022-11-21 17:00:00.000000',28),(10,38.8,82,97,0,'2022-11-21 18:00:00.000000',28),(11,38.8,79,99,0,'2022-11-21 19:00:00.000000',28),(12,38.5,80,98,0,'2022-11-21 20:00:00.000000',28),(13,38.5,83,98,0,'2022-11-21 21:00:00.000000',28),(14,38.3,79,97,0,'2022-11-21 22:00:00.000000',28),(15,39,80,98,0,'2022-11-21 23:00:00.000000',28);
/*!40000 ALTER TABLE `patient_status_now` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21 16:36:58
