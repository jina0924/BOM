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
-- Table structure for table `patient_status_default`
--

DROP TABLE IF EXISTS `patient_status_default`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_status_default` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `temperature` double NOT NULL,
  `bpm` int NOT NULL,
  `oxygen_saturation` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_status_default`
--

LOCK TABLES `patient_status_default` WRITE;
/*!40000 ALTER TABLE `patient_status_default` DISABLE KEYS */;
INSERT INTO `patient_status_default` VALUES (1,36.5,80,97),(2,33,85,94),(3,37.1,99,87),(4,33.2,72,96),(5,37.7,97,88),(6,33.8,80,94),(7,37.9,80,98),(8,36.4,62,94),(9,36.7,89,96),(10,33.1,69,74),(11,37.5,98,95),(12,36.5,80,98),(13,32.5,93,98),(14,37.9,69,88),(15,36.5,80,98),(16,36.5,80,98),(17,33,85,94),(18,37.1,99,87),(19,33.2,72,98),(20,37.7,97,88),(21,33.8,80,94),(22,37.9,80,98),(23,36.4,62,94),(24,36.7,89,98),(25,33.1,69,74),(26,37.5,98,95),(27,36.5,80,98),(28,32.5,93,98),(29,37.9,69,88),(30,36.5,80,98);
/*!40000 ALTER TABLE `patient_status_default` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 19:59:03
