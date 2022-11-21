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
-- Table structure for table `bms_status_now`
--

DROP TABLE IF EXISTS `bms_status_now`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bms_status_now` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `temperature` int NOT NULL,
  `now` datetime(6) NOT NULL,
  `bms_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bms_status_now_bms_id_8c76184d_fk_bms_id` (`bms_id`),
  CONSTRAINT `bms_status_now_bms_id_8c76184d_fk_bms_id` FOREIGN KEY (`bms_id`) REFERENCES `bms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4233 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bms_status_now`
--

LOCK TABLES `bms_status_now` WRITE;
/*!40000 ALTER TABLE `bms_status_now` DISABLE KEYS */;
INSERT INTO `bms_status_now` VALUES (8,26,'2022-11-21 16:00:00.000000',2),(9,26,'2022-11-21 17:00:00.000000',2),(10,26,'2022-11-21 18:00:00.000000',2),(11,26,'2022-11-21 19:00:00.000000',2),(12,26,'2022-11-21 20:00:00.000000',2),(13,26,'2022-11-21 21:00:00.000000',2),(14,26,'2022-11-21 22:00:00.000000',2),(15,26,'2022-11-21 23:00:00.000000',2);
/*!40000 ALTER TABLE `bms_status_now` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21 16:37:00
