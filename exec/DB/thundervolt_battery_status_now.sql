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
-- Table structure for table `battery_status_now`
--

DROP TABLE IF EXISTS `battery_status_now`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `battery_status_now` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `voltage` double NOT NULL,
  `amount` int NOT NULL,
  `now` datetime(6) NOT NULL,
  `battery_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `battery_status_now_battery_id_e323cc2e_fk_battery_id` (`battery_id`),
  CONSTRAINT `battery_status_now_battery_id_e323cc2e_fk_battery_id` FOREIGN KEY (`battery_id`) REFERENCES `battery` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8463 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battery_status_now`
--

LOCK TABLES `battery_status_now` WRITE;
/*!40000 ALTER TABLE `battery_status_now` DISABLE KEYS */;
INSERT INTO `battery_status_now` VALUES (15,3.01,63,'2022-11-21 16:00:00.000000',3),(16,3.01,63,'2022-11-21 16:00:00.000000',4),(17,2.72,0,'2022-11-21 17:00:00.000000',3),(18,2.72,0,'2022-11-21 17:00:00.000000',4),(19,3.73,63,'2022-11-21 18:00:00.000000',3),(20,3.73,63,'2022-11-21 18:00:00.000000',4),(21,3.78,63,'2022-11-21 19:00:00.000000',3),(22,3.78,63,'2022-11-21 19:00:00.000000',4),(23,2.87,0,'2022-11-21 20:00:00.000000',3),(24,2.87,0,'2022-11-21 20:00:00.000000',4),(25,2.78,0,'2022-11-21 21:00:00.000000',3),(26,2.78,0,'2022-11-21 21:00:00.000000',4),(27,3.17,63,'2022-11-21 22:00:00.000000',3),(28,3.17,63,'2022-11-21 22:00:00.000000',4),(29,3.61,63,'2022-11-21 23:00:00.000000',3),(30,3.61,63,'2022-11-21 23:00:00.000000',4);
/*!40000 ALTER TABLE `battery_status_now` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21 16:37:05
