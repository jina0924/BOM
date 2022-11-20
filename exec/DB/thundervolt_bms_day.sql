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
-- Table structure for table `bms_day`
--

DROP TABLE IF EXISTS `bms_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bms_day` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `min_t` int NOT NULL,
  `max_t` int NOT NULL,
  `now` datetime(6) NOT NULL,
  `bms_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bms_day_bms_id_95d3f1d0_fk_bms_id` (`bms_id`),
  CONSTRAINT `bms_day_bms_id_95d3f1d0_fk_bms_id` FOREIGN KEY (`bms_id`) REFERENCES `bms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=831 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bms_day`
--

LOCK TABLES `bms_day` WRITE;
/*!40000 ALTER TABLE `bms_day` DISABLE KEYS */;
INSERT INTO `bms_day` VALUES (1,26,26,'2022-10-09 15:00:00.000000',1),(2,26,26,'2022-10-09 16:00:00.000000',1),(3,26,26,'2022-10-09 17:00:00.000000',1),(4,26,26,'2022-10-09 18:00:00.000000',1),(5,26,26,'2022-10-09 19:00:00.000000',1),(6,26,26,'2022-10-09 20:00:00.000000',1),(7,26,26,'2022-10-09 21:00:00.000000',1),(8,26,26,'2022-10-09 22:00:00.000000',1),(9,26,26,'2022-10-09 23:00:00.000000',1),(10,26,26,'2022-10-10 00:00:00.000000',1),(11,26,26,'2022-10-10 01:00:00.000000',1),(12,26,26,'2022-10-10 02:00:00.000000',1),(13,26,26,'2022-10-10 03:00:00.000000',1),(14,26,26,'2022-10-10 04:00:00.000000',1),(15,26,26,'2022-10-10 05:00:00.000000',1),(16,26,26,'2022-10-10 06:00:00.000000',1),(17,26,26,'2022-10-10 07:00:00.000000',1),(18,26,26,'2022-10-10 08:00:00.000000',1),(19,26,26,'2022-10-10 09:00:00.000000',1),(20,26,26,'2022-10-10 10:00:00.000000',1),(21,26,26,'2022-10-10 11:00:00.000000',1),(22,26,26,'2022-10-10 12:00:00.000000',1),(23,26,26,'2022-10-10 13:00:00.000000',1),(24,26,26,'2022-10-10 14:00:00.000000',1),(25,26,26,'2022-10-10 15:00:00.000000',1),(26,26,26,'2022-10-10 16:00:00.000000',1),(27,26,26,'2022-10-10 17:00:00.000000',1),(28,26,26,'2022-10-10 18:00:00.000000',1),(29,26,26,'2022-10-10 19:00:00.000000',1),(30,26,26,'2022-10-10 20:00:00.000000',1),(31,26,26,'2022-10-10 21:00:00.000000',1),(32,26,26,'2022-10-10 22:00:00.000000',1),(33,26,26,'2022-10-10 23:00:00.000000',1),(34,26,26,'2022-10-11 00:00:00.000000',1),(35,26,26,'2022-10-11 01:00:00.000000',1),(36,26,26,'2022-10-11 02:00:00.000000',1),(37,26,26,'2022-10-11 03:00:00.000000',1),(38,26,26,'2022-10-11 04:00:00.000000',1),(39,26,26,'2022-10-11 05:00:00.000000',1),(40,26,26,'2022-10-11 06:00:00.000000',1),(41,26,26,'2022-10-11 07:00:00.000000',1),(42,26,26,'2022-10-11 08:00:00.000000',1),(43,26,26,'2022-10-11 09:00:00.000000',1),(44,26,26,'2022-10-11 10:00:00.000000',1),(45,26,26,'2022-10-11 11:00:00.000000',1),(46,26,26,'2022-10-11 12:00:00.000000',1),(47,26,26,'2022-10-11 13:00:00.000000',1),(48,26,26,'2022-10-11 14:00:00.000000',1),(49,26,26,'2022-10-11 15:00:00.000000',1),(50,26,26,'2022-10-11 16:00:00.000000',1),(51,26,26,'2022-10-11 17:00:00.000000',1),(52,26,26,'2022-10-11 18:00:00.000000',1),(53,26,26,'2022-10-11 19:00:00.000000',1),(54,26,26,'2022-10-11 20:00:00.000000',1),(55,26,26,'2022-10-11 21:00:00.000000',1),(56,26,26,'2022-10-11 22:00:00.000000',1),(57,26,26,'2022-10-11 23:00:00.000000',1),(58,26,26,'2022-10-12 00:00:00.000000',1),(59,26,26,'2022-10-12 01:00:00.000000',1),(60,26,26,'2022-10-12 02:00:00.000000',1),(61,26,26,'2022-10-12 03:00:00.000000',1),(62,26,26,'2022-10-12 04:00:00.000000',1),(63,26,26,'2022-10-12 05:00:00.000000',1),(64,26,26,'2022-10-12 06:00:00.000000',1),(65,26,26,'2022-10-12 07:00:00.000000',1),(66,26,26,'2022-10-12 08:00:00.000000',1),(67,26,26,'2022-10-12 09:00:00.000000',1),(68,26,26,'2022-10-12 10:00:00.000000',1),(69,26,26,'2022-10-12 11:00:00.000000',1),(70,26,26,'2022-10-12 12:00:00.000000',1),(71,26,26,'2022-10-12 13:00:00.000000',1),(72,26,26,'2022-10-12 14:00:00.000000',1),(73,26,26,'2022-10-12 15:00:00.000000',1),(74,26,26,'2022-10-12 16:00:00.000000',1),(75,26,26,'2022-10-12 17:00:00.000000',1),(76,26,26,'2022-10-12 18:00:00.000000',1),(77,26,26,'2022-10-12 19:00:00.000000',1),(78,26,26,'2022-10-12 20:00:00.000000',1),(79,26,26,'2022-10-12 21:00:00.000000',1),(80,26,26,'2022-10-12 22:00:00.000000',1),(81,26,26,'2022-10-12 23:00:00.000000',1),(82,26,26,'2022-10-13 00:00:00.000000',1),(83,26,26,'2022-10-13 01:00:00.000000',1),(84,26,26,'2022-10-13 02:00:00.000000',1),(85,26,26,'2022-10-13 03:00:00.000000',1),(86,26,26,'2022-10-13 04:00:00.000000',1),(87,26,26,'2022-10-13 05:00:00.000000',1),(88,26,26,'2022-10-13 06:00:00.000000',1),(89,26,26,'2022-10-13 07:00:00.000000',1),(90,26,26,'2022-10-13 08:00:00.000000',1),(91,26,26,'2022-10-13 09:00:00.000000',1),(92,26,26,'2022-10-13 10:00:00.000000',1),(93,26,26,'2022-10-13 11:00:00.000000',1),(94,26,26,'2022-10-13 12:00:00.000000',1),(95,26,26,'2022-10-13 13:00:00.000000',1),(96,26,26,'2022-10-13 14:00:00.000000',1),(97,26,26,'2022-10-13 15:00:00.000000',1),(98,26,26,'2022-10-13 16:00:00.000000',1),(99,26,26,'2022-10-13 17:00:00.000000',1),(100,26,26,'2022-10-13 18:00:00.000000',1),(101,26,26,'2022-10-13 19:00:00.000000',1),(102,26,26,'2022-10-13 20:00:00.000000',1),(103,26,26,'2022-10-13 21:00:00.000000',1),(104,26,26,'2022-10-13 22:00:00.000000',1),(105,26,26,'2022-10-13 23:00:00.000000',1),(106,26,26,'2022-10-14 00:00:00.000000',1),(107,26,26,'2022-10-14 01:00:00.000000',1),(108,26,26,'2022-10-14 02:00:00.000000',1),(109,26,26,'2022-10-14 03:00:00.000000',1),(110,26,26,'2022-10-14 04:00:00.000000',1),(111,26,26,'2022-10-14 05:00:00.000000',1),(112,26,26,'2022-10-14 06:00:00.000000',1),(113,26,26,'2022-10-14 07:00:00.000000',1),(114,26,26,'2022-10-14 08:00:00.000000',1),(115,26,26,'2022-10-14 09:00:00.000000',1),(116,26,26,'2022-10-14 10:00:00.000000',1),(117,26,26,'2022-10-14 11:00:00.000000',1),(118,26,26,'2022-10-14 12:00:00.000000',1),(119,26,26,'2022-10-14 13:00:00.000000',1),(120,26,26,'2022-10-14 14:00:00.000000',1),(121,26,26,'2022-10-14 15:00:00.000000',1),(122,26,26,'2022-10-14 16:00:00.000000',1),(123,26,26,'2022-10-14 17:00:00.000000',1),(124,26,26,'2022-10-14 18:00:00.000000',1),(125,26,26,'2022-10-14 19:00:00.000000',1),(126,26,26,'2022-10-14 20:00:00.000000',1),(127,26,26,'2022-10-14 21:00:00.000000',1),(128,26,26,'2022-10-14 22:00:00.000000',1),(129,26,26,'2022-10-14 23:00:00.000000',1),(130,26,26,'2022-10-15 00:00:00.000000',1),(131,26,26,'2022-10-15 01:00:00.000000',1),(132,26,26,'2022-10-15 02:00:00.000000',1),(133,26,26,'2022-10-15 03:00:00.000000',1),(134,26,26,'2022-10-15 04:00:00.000000',1),(135,26,26,'2022-10-15 05:00:00.000000',1),(136,26,26,'2022-10-15 06:00:00.000000',1),(137,26,26,'2022-10-15 07:00:00.000000',1),(138,26,26,'2022-10-15 08:00:00.000000',1),(139,26,26,'2022-10-15 09:00:00.000000',1),(140,26,26,'2022-10-15 10:00:00.000000',1),(141,26,26,'2022-10-15 11:00:00.000000',1),(142,26,26,'2022-10-15 12:00:00.000000',1),(143,26,26,'2022-10-15 13:00:00.000000',1),(144,26,26,'2022-10-15 14:00:00.000000',1),(145,26,26,'2022-10-15 15:00:00.000000',1),(146,26,26,'2022-10-15 16:00:00.000000',1),(147,26,26,'2022-10-15 17:00:00.000000',1),(148,26,26,'2022-10-15 18:00:00.000000',1),(149,26,26,'2022-10-15 19:00:00.000000',1),(150,26,26,'2022-10-15 20:00:00.000000',1),(151,26,26,'2022-10-15 21:00:00.000000',1),(152,26,26,'2022-10-15 22:00:00.000000',1),(153,26,26,'2022-10-15 23:00:00.000000',1),(154,26,26,'2022-10-16 00:00:00.000000',1),(155,26,26,'2022-10-16 01:00:00.000000',1),(156,26,26,'2022-10-16 02:00:00.000000',1),(157,26,26,'2022-10-16 03:00:00.000000',1),(158,26,26,'2022-10-16 04:00:00.000000',1),(159,26,26,'2022-10-16 05:00:00.000000',1),(160,26,26,'2022-10-16 06:00:00.000000',1),(161,26,26,'2022-10-16 07:00:00.000000',1),(162,26,26,'2022-10-16 08:00:00.000000',1),(163,26,26,'2022-10-16 09:00:00.000000',1),(164,26,26,'2022-10-16 10:00:00.000000',1),(165,26,26,'2022-10-16 11:00:00.000000',1),(166,26,26,'2022-10-16 12:00:00.000000',1),(167,26,26,'2022-10-16 13:00:00.000000',1),(168,26,26,'2022-10-16 14:00:00.000000',1),(169,26,26,'2022-10-16 15:00:00.000000',1),(170,26,26,'2022-10-16 16:00:00.000000',1),(171,26,26,'2022-10-16 17:00:00.000000',1),(172,26,26,'2022-10-16 18:00:00.000000',1),(173,26,26,'2022-10-16 19:00:00.000000',1),(174,26,26,'2022-10-16 20:00:00.000000',1),(175,26,26,'2022-10-16 21:00:00.000000',1),(176,26,26,'2022-10-16 22:00:00.000000',1),(177,26,26,'2022-10-16 23:00:00.000000',1),(178,26,26,'2022-10-17 00:00:00.000000',1),(179,26,26,'2022-10-17 01:00:00.000000',1),(180,26,26,'2022-10-17 02:00:00.000000',1),(181,26,26,'2022-10-17 03:00:00.000000',1),(182,26,26,'2022-10-17 04:00:00.000000',1),(183,26,26,'2022-10-17 05:00:00.000000',1),(184,26,26,'2022-10-17 06:00:00.000000',1),(185,26,26,'2022-10-17 07:00:00.000000',1),(186,26,26,'2022-10-17 08:00:00.000000',1),(187,26,26,'2022-10-17 09:00:00.000000',1),(188,26,26,'2022-10-17 10:00:00.000000',1),(189,26,26,'2022-10-17 11:00:00.000000',1),(190,26,26,'2022-10-17 12:00:00.000000',1),(191,26,26,'2022-10-17 13:00:00.000000',1),(192,26,26,'2022-10-17 14:00:00.000000',1),(193,26,26,'2022-10-17 15:00:00.000000',1),(194,26,26,'2022-10-17 16:00:00.000000',1),(195,26,26,'2022-10-17 17:00:00.000000',1),(196,26,26,'2022-10-17 18:00:00.000000',1),(197,26,26,'2022-10-17 19:00:00.000000',1),(198,26,26,'2022-10-17 20:00:00.000000',1),(199,26,26,'2022-10-17 21:00:00.000000',1),(200,26,26,'2022-10-17 22:00:00.000000',1),(201,26,26,'2022-10-17 23:00:00.000000',1),(202,26,26,'2022-10-18 00:00:00.000000',1),(203,26,26,'2022-10-18 01:00:00.000000',1),(204,26,26,'2022-10-18 02:00:00.000000',1),(205,26,26,'2022-10-18 03:00:00.000000',1),(206,26,26,'2022-10-18 04:00:00.000000',1),(207,26,26,'2022-10-18 05:00:00.000000',1),(208,26,26,'2022-10-18 06:00:00.000000',1),(209,26,26,'2022-10-18 07:00:00.000000',1),(210,26,26,'2022-10-18 08:00:00.000000',1),(211,26,26,'2022-10-18 09:00:00.000000',1),(212,26,26,'2022-10-18 10:00:00.000000',1),(213,26,26,'2022-10-18 11:00:00.000000',1),(214,26,26,'2022-10-18 12:00:00.000000',1),(215,26,26,'2022-10-18 13:00:00.000000',1),(216,26,26,'2022-10-18 14:00:00.000000',1),(217,26,26,'2022-10-18 15:00:00.000000',1),(218,26,26,'2022-10-18 16:00:00.000000',1),(219,26,26,'2022-10-18 17:00:00.000000',1),(220,26,26,'2022-10-18 18:00:00.000000',1),(221,26,26,'2022-10-18 19:00:00.000000',1),(222,26,26,'2022-10-18 20:00:00.000000',1),(223,26,26,'2022-10-18 21:00:00.000000',1),(224,26,26,'2022-10-18 22:00:00.000000',1),(225,26,26,'2022-10-18 23:00:00.000000',1),(226,26,26,'2022-10-19 00:00:00.000000',1),(227,26,26,'2022-10-19 01:00:00.000000',1),(228,26,26,'2022-10-19 02:00:00.000000',1),(229,26,26,'2022-10-19 03:00:00.000000',1),(230,26,26,'2022-10-19 04:00:00.000000',1),(231,26,26,'2022-10-19 05:00:00.000000',1),(232,26,26,'2022-10-19 06:00:00.000000',1),(233,26,26,'2022-10-19 07:00:00.000000',1),(234,26,26,'2022-10-19 08:00:00.000000',1),(235,26,26,'2022-10-19 09:00:00.000000',1),(236,26,26,'2022-10-19 10:00:00.000000',1),(237,26,26,'2022-10-19 11:00:00.000000',1),(238,26,26,'2022-10-19 12:00:00.000000',1),(239,26,26,'2022-10-19 13:00:00.000000',1),(240,26,26,'2022-10-19 14:00:00.000000',1),(241,26,26,'2022-10-19 15:00:00.000000',1),(242,26,26,'2022-10-19 16:00:00.000000',1),(243,26,26,'2022-10-19 17:00:00.000000',1),(244,26,26,'2022-10-19 18:00:00.000000',1),(245,26,26,'2022-10-19 19:00:00.000000',1),(246,26,26,'2022-10-19 20:00:00.000000',1),(247,26,26,'2022-10-19 21:00:00.000000',1),(248,26,26,'2022-10-19 22:00:00.000000',1),(249,26,26,'2022-10-19 23:00:00.000000',1),(250,26,26,'2022-10-20 00:00:00.000000',1),(251,26,26,'2022-10-20 01:00:00.000000',1),(252,26,26,'2022-10-20 02:00:00.000000',1),(253,26,26,'2022-10-20 03:00:00.000000',1),(254,26,26,'2022-10-20 04:00:00.000000',1),(255,26,26,'2022-10-20 05:00:00.000000',1),(256,26,26,'2022-10-20 06:00:00.000000',1),(257,26,26,'2022-10-20 07:00:00.000000',1),(258,26,26,'2022-10-20 08:00:00.000000',1),(259,26,26,'2022-10-20 09:00:00.000000',1),(260,26,26,'2022-10-20 10:00:00.000000',1),(261,26,26,'2022-10-20 11:00:00.000000',1),(262,26,26,'2022-10-20 12:00:00.000000',1),(263,26,26,'2022-10-20 13:00:00.000000',1),(264,26,26,'2022-10-20 14:00:00.000000',1),(265,26,26,'2022-10-20 15:00:00.000000',1),(266,26,26,'2022-10-20 16:00:00.000000',1),(267,26,26,'2022-10-20 17:00:00.000000',1),(268,26,26,'2022-10-20 18:00:00.000000',1),(269,26,26,'2022-10-20 19:00:00.000000',1),(270,26,26,'2022-10-20 20:00:00.000000',1),(271,26,26,'2022-10-20 21:00:00.000000',1),(272,26,26,'2022-10-20 22:00:00.000000',1),(273,26,26,'2022-10-20 23:00:00.000000',1),(274,26,26,'2022-10-21 00:00:00.000000',1),(275,26,26,'2022-10-21 01:00:00.000000',1),(276,26,26,'2022-10-21 02:00:00.000000',1),(277,26,26,'2022-10-21 03:00:00.000000',1),(278,26,26,'2022-10-21 04:00:00.000000',1),(279,26,26,'2022-10-21 05:00:00.000000',1),(280,26,26,'2022-10-21 06:00:00.000000',1),(281,26,26,'2022-10-21 07:00:00.000000',1),(282,26,26,'2022-10-21 08:00:00.000000',1),(283,26,26,'2022-10-21 09:00:00.000000',1),(284,26,26,'2022-10-21 10:00:00.000000',1),(285,26,26,'2022-10-21 11:00:00.000000',1),(286,26,26,'2022-10-21 12:00:00.000000',1),(287,26,26,'2022-10-21 13:00:00.000000',1),(288,26,26,'2022-10-21 14:00:00.000000',1),(289,26,26,'2022-10-21 15:00:00.000000',1),(290,26,26,'2022-10-21 16:00:00.000000',1),(291,26,26,'2022-10-21 17:00:00.000000',1),(292,26,26,'2022-10-21 18:00:00.000000',1),(293,26,26,'2022-10-21 19:00:00.000000',1),(294,26,26,'2022-10-21 20:00:00.000000',1),(295,26,26,'2022-10-21 21:00:00.000000',1),(296,26,26,'2022-10-21 22:00:00.000000',1),(297,26,26,'2022-10-21 23:00:00.000000',1),(298,26,26,'2022-10-22 00:00:00.000000',1),(299,26,26,'2022-10-22 01:00:00.000000',1),(300,26,26,'2022-10-22 02:00:00.000000',1),(301,26,26,'2022-10-22 03:00:00.000000',1),(302,26,26,'2022-10-22 04:00:00.000000',1),(303,26,26,'2022-10-22 05:00:00.000000',1),(304,26,26,'2022-10-22 06:00:00.000000',1),(305,26,26,'2022-10-22 07:00:00.000000',1),(306,26,26,'2022-10-22 08:00:00.000000',1),(307,26,26,'2022-10-22 09:00:00.000000',1),(308,26,26,'2022-10-22 10:00:00.000000',1),(309,26,26,'2022-10-22 11:00:00.000000',1),(310,26,26,'2022-10-22 12:00:00.000000',1),(311,26,26,'2022-10-22 13:00:00.000000',1),(312,26,26,'2022-10-22 14:00:00.000000',1),(313,26,26,'2022-10-22 15:00:00.000000',1),(314,26,26,'2022-10-22 16:00:00.000000',1),(315,26,26,'2022-10-22 17:00:00.000000',1),(316,26,26,'2022-10-22 18:00:00.000000',1),(317,26,26,'2022-10-22 19:00:00.000000',1),(318,26,26,'2022-10-22 20:00:00.000000',1),(319,26,26,'2022-10-22 21:00:00.000000',1),(320,26,26,'2022-10-22 22:00:00.000000',1),(321,26,26,'2022-10-22 23:00:00.000000',1),(322,26,26,'2022-10-23 00:00:00.000000',1),(323,26,26,'2022-10-23 01:00:00.000000',1),(324,26,26,'2022-10-23 02:00:00.000000',1),(325,26,26,'2022-10-23 03:00:00.000000',1),(326,26,26,'2022-10-23 04:00:00.000000',1),(327,26,26,'2022-10-23 05:00:00.000000',1),(328,26,26,'2022-10-23 06:00:00.000000',1),(329,26,26,'2022-10-23 07:00:00.000000',1),(330,26,26,'2022-10-23 08:00:00.000000',1),(331,26,26,'2022-10-23 09:00:00.000000',1),(332,26,26,'2022-10-23 10:00:00.000000',1),(333,26,26,'2022-10-23 11:00:00.000000',1),(334,26,26,'2022-10-23 12:00:00.000000',1),(335,26,26,'2022-10-23 13:00:00.000000',1),(336,26,26,'2022-10-23 14:00:00.000000',1),(337,26,26,'2022-10-23 15:00:00.000000',1),(338,26,26,'2022-10-23 16:00:00.000000',1),(339,26,26,'2022-10-23 17:00:00.000000',1),(340,26,26,'2022-10-23 18:00:00.000000',1),(341,26,26,'2022-10-23 19:00:00.000000',1),(342,26,26,'2022-10-23 20:00:00.000000',1),(343,26,26,'2022-10-23 21:00:00.000000',1),(344,26,26,'2022-10-23 22:00:00.000000',1),(345,26,26,'2022-10-23 23:00:00.000000',1),(346,26,26,'2022-10-24 00:00:00.000000',1),(347,26,26,'2022-10-24 01:00:00.000000',1),(348,26,26,'2022-10-24 02:00:00.000000',1),(349,26,26,'2022-10-24 03:00:00.000000',1),(350,26,26,'2022-10-24 04:00:00.000000',1),(351,26,26,'2022-10-24 05:00:00.000000',1),(352,26,26,'2022-10-24 06:00:00.000000',1),(353,26,26,'2022-10-24 07:00:00.000000',1),(354,26,26,'2022-10-24 08:00:00.000000',1),(355,26,26,'2022-10-24 09:00:00.000000',1),(356,26,26,'2022-10-24 10:00:00.000000',1),(357,26,26,'2022-10-24 11:00:00.000000',1),(358,26,26,'2022-10-24 12:00:00.000000',1),(359,26,26,'2022-10-24 13:00:00.000000',1),(360,26,26,'2022-10-24 14:00:00.000000',1),(361,26,26,'2022-10-24 15:00:00.000000',1),(362,26,26,'2022-10-24 16:00:00.000000',1),(363,26,26,'2022-10-24 17:00:00.000000',1),(364,26,26,'2022-10-24 18:00:00.000000',1),(365,26,26,'2022-10-24 19:00:00.000000',1),(366,26,26,'2022-10-24 20:00:00.000000',1),(367,26,26,'2022-10-24 21:00:00.000000',1),(368,26,26,'2022-10-24 22:00:00.000000',1),(369,26,26,'2022-10-24 23:00:00.000000',1),(370,26,26,'2022-10-25 00:00:00.000000',1),(371,26,26,'2022-10-25 01:00:00.000000',1),(372,26,26,'2022-10-25 02:00:00.000000',1),(373,26,26,'2022-10-25 03:00:00.000000',1),(374,26,26,'2022-10-25 04:00:00.000000',1),(375,26,26,'2022-10-25 05:00:00.000000',1),(376,26,26,'2022-10-25 06:00:00.000000',1),(377,26,26,'2022-10-25 07:00:00.000000',1),(378,26,26,'2022-10-25 08:00:00.000000',1),(379,26,26,'2022-10-25 09:00:00.000000',1),(380,26,26,'2022-10-25 10:00:00.000000',1),(381,26,26,'2022-10-25 11:00:00.000000',1),(382,26,26,'2022-10-25 12:00:00.000000',1),(383,26,26,'2022-10-25 13:00:00.000000',1),(384,26,26,'2022-10-25 14:00:00.000000',1),(385,26,26,'2022-10-25 15:00:00.000000',1),(386,26,26,'2022-10-25 16:00:00.000000',1),(387,26,26,'2022-10-25 17:00:00.000000',1),(388,26,26,'2022-10-25 18:00:00.000000',1),(389,26,26,'2022-10-25 19:00:00.000000',1),(390,26,26,'2022-10-25 20:00:00.000000',1),(391,26,26,'2022-10-25 21:00:00.000000',1),(392,26,26,'2022-10-25 22:00:00.000000',1),(393,26,26,'2022-10-25 23:00:00.000000',1),(394,26,26,'2022-10-26 00:00:00.000000',1),(395,26,26,'2022-10-26 01:00:00.000000',1),(396,26,26,'2022-10-26 02:00:00.000000',1),(397,26,26,'2022-10-26 03:00:00.000000',1),(398,26,26,'2022-10-26 04:00:00.000000',1),(399,26,26,'2022-10-26 05:00:00.000000',1),(400,26,26,'2022-10-26 06:00:00.000000',1),(401,26,26,'2022-10-26 07:00:00.000000',1),(402,26,26,'2022-10-26 08:00:00.000000',1),(403,26,26,'2022-10-26 09:00:00.000000',1),(404,26,26,'2022-10-26 10:00:00.000000',1),(405,26,26,'2022-10-26 11:00:00.000000',1),(406,26,26,'2022-10-26 12:00:00.000000',1),(407,26,26,'2022-10-26 13:00:00.000000',1),(408,26,26,'2022-10-26 14:00:00.000000',1),(409,26,26,'2022-10-26 15:00:00.000000',1),(410,26,26,'2022-10-26 16:00:00.000000',1),(411,26,26,'2022-10-26 17:00:00.000000',1),(412,26,26,'2022-10-26 18:00:00.000000',1),(413,26,26,'2022-10-26 19:00:00.000000',1),(414,26,26,'2022-10-26 20:00:00.000000',1),(415,26,26,'2022-10-26 21:00:00.000000',1),(416,26,26,'2022-10-26 22:00:00.000000',1),(417,26,26,'2022-10-26 23:00:00.000000',1),(418,26,26,'2022-10-27 00:00:00.000000',1),(419,26,26,'2022-10-27 01:00:00.000000',1),(420,26,26,'2022-10-27 02:00:00.000000',1),(421,26,26,'2022-10-27 03:00:00.000000',1),(422,26,26,'2022-10-27 04:00:00.000000',1),(423,26,26,'2022-10-27 05:00:00.000000',1),(424,26,26,'2022-10-27 06:00:00.000000',1),(425,26,26,'2022-10-27 07:00:00.000000',1),(426,26,26,'2022-10-27 08:00:00.000000',1),(427,26,26,'2022-10-27 09:00:00.000000',1),(428,26,26,'2022-10-27 10:00:00.000000',1),(429,26,26,'2022-10-27 11:00:00.000000',1),(430,26,26,'2022-10-27 12:00:00.000000',1),(431,26,26,'2022-10-27 13:00:00.000000',1),(432,26,26,'2022-10-27 14:00:00.000000',1),(433,26,26,'2022-10-27 15:00:00.000000',1),(434,26,26,'2022-10-27 16:00:00.000000',1),(435,26,26,'2022-10-27 17:00:00.000000',1),(436,26,26,'2022-10-27 18:00:00.000000',1),(437,26,26,'2022-10-27 19:00:00.000000',1),(438,26,26,'2022-10-27 20:00:00.000000',1),(439,26,26,'2022-10-27 21:00:00.000000',1),(440,26,26,'2022-10-27 22:00:00.000000',1),(441,26,26,'2022-10-27 23:00:00.000000',1),(442,26,26,'2022-10-28 00:00:00.000000',1),(443,26,26,'2022-10-28 01:00:00.000000',1),(444,26,26,'2022-10-28 02:00:00.000000',1),(445,26,26,'2022-10-28 03:00:00.000000',1),(446,26,26,'2022-10-28 04:00:00.000000',1),(447,26,26,'2022-10-28 05:00:00.000000',1),(448,26,26,'2022-10-28 06:00:00.000000',1),(449,26,26,'2022-10-28 07:00:00.000000',1),(450,26,26,'2022-10-28 08:00:00.000000',1),(451,26,26,'2022-10-28 09:00:00.000000',1),(452,26,26,'2022-10-28 10:00:00.000000',1),(453,26,26,'2022-10-28 11:00:00.000000',1),(454,26,26,'2022-10-28 12:00:00.000000',1),(455,26,26,'2022-10-28 13:00:00.000000',1),(456,26,26,'2022-10-28 14:00:00.000000',1),(457,26,26,'2022-10-28 15:00:00.000000',1),(458,26,26,'2022-10-28 16:00:00.000000',1),(459,26,26,'2022-10-28 17:00:00.000000',1),(460,26,26,'2022-10-28 18:00:00.000000',1),(461,26,26,'2022-10-28 19:00:00.000000',1),(462,26,26,'2022-10-28 20:00:00.000000',1),(463,26,26,'2022-10-28 21:00:00.000000',1),(464,26,26,'2022-10-28 22:00:00.000000',1),(465,26,26,'2022-10-28 23:00:00.000000',1),(466,26,26,'2022-10-29 00:00:00.000000',1),(467,26,26,'2022-10-29 01:00:00.000000',1),(468,26,26,'2022-10-29 02:00:00.000000',1),(469,26,26,'2022-10-29 03:00:00.000000',1),(470,26,26,'2022-10-29 04:00:00.000000',1),(471,26,26,'2022-10-29 05:00:00.000000',1),(472,26,26,'2022-10-29 06:00:00.000000',1),(473,26,26,'2022-10-29 07:00:00.000000',1),(474,26,26,'2022-10-29 08:00:00.000000',1),(475,26,26,'2022-10-29 09:00:00.000000',1),(476,26,26,'2022-10-29 10:00:00.000000',1),(477,26,26,'2022-10-29 11:00:00.000000',1),(478,26,26,'2022-10-29 12:00:00.000000',1),(479,26,26,'2022-10-29 13:00:00.000000',1),(480,26,26,'2022-10-29 14:00:00.000000',1),(481,26,26,'2022-10-29 15:00:00.000000',1),(482,26,26,'2022-10-29 16:00:00.000000',1),(483,26,26,'2022-10-29 17:00:00.000000',1),(484,26,26,'2022-10-29 18:00:00.000000',1),(485,26,26,'2022-10-29 19:00:00.000000',1),(486,26,26,'2022-10-29 20:00:00.000000',1),(487,26,26,'2022-10-29 21:00:00.000000',1),(488,26,26,'2022-10-29 22:00:00.000000',1),(489,26,26,'2022-10-29 23:00:00.000000',1),(490,26,26,'2022-10-30 00:00:00.000000',1),(491,26,26,'2022-10-30 01:00:00.000000',1),(492,26,26,'2022-10-30 02:00:00.000000',1),(493,26,26,'2022-10-30 03:00:00.000000',1),(494,26,26,'2022-10-30 04:00:00.000000',1),(495,26,26,'2022-10-30 05:00:00.000000',1),(496,26,26,'2022-10-30 06:00:00.000000',1),(497,26,26,'2022-10-30 07:00:00.000000',1),(498,26,26,'2022-10-30 08:00:00.000000',1),(499,26,26,'2022-10-30 09:00:00.000000',1),(500,26,26,'2022-10-30 10:00:00.000000',1),(501,26,26,'2022-10-30 11:00:00.000000',1),(502,26,26,'2022-10-30 12:00:00.000000',1),(503,26,26,'2022-10-30 13:00:00.000000',1),(504,26,26,'2022-10-30 14:00:00.000000',1),(505,26,26,'2022-10-30 15:00:00.000000',1),(506,26,26,'2022-10-30 16:00:00.000000',1),(507,26,26,'2022-10-30 17:00:00.000000',1),(508,26,26,'2022-10-30 18:00:00.000000',1),(509,26,26,'2022-10-30 19:00:00.000000',1),(510,26,26,'2022-10-30 20:00:00.000000',1),(511,26,26,'2022-10-30 21:00:00.000000',1),(512,26,26,'2022-10-30 22:00:00.000000',1),(513,26,26,'2022-10-30 23:00:00.000000',1),(514,26,26,'2022-10-31 00:00:00.000000',1),(515,26,26,'2022-10-31 01:00:00.000000',1),(516,26,26,'2022-10-31 02:00:00.000000',1),(517,26,26,'2022-10-31 03:00:00.000000',1),(518,26,26,'2022-10-31 04:00:00.000000',1),(519,26,26,'2022-10-31 05:00:00.000000',1),(520,26,26,'2022-10-31 06:00:00.000000',1),(521,26,26,'2022-10-31 07:00:00.000000',1),(522,26,26,'2022-10-31 08:00:00.000000',1),(523,26,26,'2022-10-31 09:00:00.000000',1),(524,26,26,'2022-10-31 10:00:00.000000',1),(525,26,26,'2022-10-31 11:00:00.000000',1),(526,26,26,'2022-10-31 12:00:00.000000',1),(527,26,26,'2022-10-31 13:00:00.000000',1),(528,26,26,'2022-10-31 14:00:00.000000',1),(529,26,26,'2022-10-31 15:00:00.000000',1),(530,26,26,'2022-10-31 16:00:00.000000',1),(531,26,26,'2022-10-31 17:00:00.000000',1),(532,26,26,'2022-10-31 18:00:00.000000',1),(533,26,26,'2022-10-31 19:00:00.000000',1),(534,26,26,'2022-10-31 20:00:00.000000',1),(535,26,26,'2022-10-31 21:00:00.000000',1),(536,26,26,'2022-10-31 22:00:00.000000',1),(537,26,26,'2022-10-31 23:00:00.000000',1),(538,26,26,'2022-11-01 00:00:00.000000',1),(539,26,26,'2022-11-01 01:00:00.000000',1),(540,26,26,'2022-11-01 02:00:00.000000',1),(541,26,26,'2022-11-01 03:00:00.000000',1),(542,26,26,'2022-11-01 04:00:00.000000',1),(543,26,26,'2022-11-01 05:00:00.000000',1),(544,26,26,'2022-11-01 06:00:00.000000',1),(545,26,26,'2022-11-01 07:00:00.000000',1),(546,26,26,'2022-11-01 08:00:00.000000',1),(547,26,26,'2022-11-01 09:00:00.000000',1),(548,26,26,'2022-11-01 10:00:00.000000',1),(549,26,26,'2022-11-01 11:00:00.000000',1),(550,26,26,'2022-11-01 12:00:00.000000',1),(551,26,26,'2022-11-01 13:00:00.000000',1),(552,26,26,'2022-11-01 14:00:00.000000',1),(553,26,26,'2022-11-01 15:00:00.000000',1),(554,26,26,'2022-11-01 16:00:00.000000',1),(555,26,26,'2022-11-01 17:00:00.000000',1),(556,26,26,'2022-11-01 18:00:00.000000',1),(557,26,26,'2022-11-01 19:00:00.000000',1),(558,26,26,'2022-11-01 20:00:00.000000',1),(559,26,26,'2022-11-01 21:00:00.000000',1),(560,26,26,'2022-11-01 22:00:00.000000',1),(561,26,26,'2022-11-01 23:00:00.000000',1),(562,26,26,'2022-11-02 00:00:00.000000',1),(563,26,26,'2022-11-02 01:00:00.000000',1),(564,26,26,'2022-11-02 02:00:00.000000',1),(565,26,26,'2022-11-02 03:00:00.000000',1),(566,26,26,'2022-11-02 04:00:00.000000',1),(567,26,26,'2022-11-02 05:00:00.000000',1),(568,26,26,'2022-11-02 06:00:00.000000',1),(569,26,26,'2022-11-02 07:00:00.000000',1),(570,26,26,'2022-11-02 08:00:00.000000',1),(571,26,26,'2022-11-02 09:00:00.000000',1),(572,26,26,'2022-11-02 10:00:00.000000',1),(573,26,26,'2022-11-02 11:00:00.000000',1),(574,26,26,'2022-11-02 12:00:00.000000',1),(575,26,26,'2022-11-02 13:00:00.000000',1),(576,26,26,'2022-11-02 14:00:00.000000',1),(577,26,26,'2022-11-02 15:00:00.000000',1),(578,26,26,'2022-11-02 16:00:00.000000',1),(579,26,26,'2022-11-02 17:00:00.000000',1),(580,26,26,'2022-11-02 18:00:00.000000',1),(581,26,26,'2022-11-02 19:00:00.000000',1),(582,26,26,'2022-11-02 20:00:00.000000',1),(583,26,26,'2022-11-02 21:00:00.000000',1),(584,26,26,'2022-11-02 22:00:00.000000',1),(585,26,26,'2022-11-02 23:00:00.000000',1),(586,26,26,'2022-11-03 00:00:00.000000',1),(587,26,26,'2022-11-03 01:00:00.000000',1),(588,26,26,'2022-11-03 02:00:00.000000',1),(589,26,26,'2022-11-03 03:00:00.000000',1),(590,26,26,'2022-11-03 04:00:00.000000',1),(591,26,26,'2022-11-03 05:00:00.000000',1),(592,26,26,'2022-11-03 06:00:00.000000',1),(593,26,26,'2022-11-03 07:00:00.000000',1),(594,26,26,'2022-11-03 08:00:00.000000',1),(595,26,26,'2022-11-03 09:00:00.000000',1),(596,26,26,'2022-11-03 10:00:00.000000',1),(597,26,26,'2022-11-03 11:00:00.000000',1),(598,26,26,'2022-11-03 12:00:00.000000',1),(599,26,26,'2022-11-03 13:00:00.000000',1),(600,26,26,'2022-11-03 14:00:00.000000',1),(601,26,26,'2022-11-03 15:00:00.000000',1),(602,26,26,'2022-11-03 16:00:00.000000',1),(603,26,26,'2022-11-03 17:00:00.000000',1),(604,26,26,'2022-11-03 18:00:00.000000',1),(605,26,26,'2022-11-03 19:00:00.000000',1),(606,26,26,'2022-11-03 20:00:00.000000',1),(607,26,26,'2022-11-03 21:00:00.000000',1),(608,26,26,'2022-11-03 22:00:00.000000',1),(609,26,26,'2022-11-03 23:00:00.000000',1),(610,26,26,'2022-11-04 00:00:00.000000',1),(611,26,26,'2022-11-04 01:00:00.000000',1),(612,26,26,'2022-11-04 02:00:00.000000',1),(613,26,26,'2022-11-04 03:00:00.000000',1),(614,26,26,'2022-11-04 04:00:00.000000',1),(615,26,26,'2022-11-04 05:00:00.000000',1),(616,26,26,'2022-11-04 06:00:00.000000',1),(617,26,26,'2022-11-04 07:00:00.000000',1),(618,26,26,'2022-11-04 08:00:00.000000',1),(619,26,26,'2022-11-04 09:00:00.000000',1),(620,26,26,'2022-11-04 10:00:00.000000',1),(621,26,26,'2022-11-04 11:00:00.000000',1),(622,26,26,'2022-11-04 12:00:00.000000',1),(623,26,26,'2022-11-04 13:00:00.000000',1),(624,26,26,'2022-11-04 14:00:00.000000',1),(625,26,26,'2022-11-04 15:00:00.000000',1),(626,26,26,'2022-11-04 16:00:00.000000',1),(627,26,26,'2022-11-04 17:00:00.000000',1),(628,26,26,'2022-11-04 18:00:00.000000',1),(629,26,26,'2022-11-04 19:00:00.000000',1),(630,26,26,'2022-11-04 20:00:00.000000',1),(631,26,26,'2022-11-04 21:00:00.000000',1),(632,26,26,'2022-11-04 22:00:00.000000',1),(633,26,26,'2022-11-04 23:00:00.000000',1),(634,26,26,'2022-11-05 00:00:00.000000',1),(635,26,26,'2022-11-05 01:00:00.000000',1),(636,26,26,'2022-11-05 02:00:00.000000',1),(637,26,26,'2022-11-05 03:00:00.000000',1),(638,26,26,'2022-11-05 04:00:00.000000',1),(639,26,26,'2022-11-05 05:00:00.000000',1),(640,26,26,'2022-11-05 06:00:00.000000',1),(641,26,26,'2022-11-05 07:00:00.000000',1),(642,26,26,'2022-11-05 08:00:00.000000',1),(643,26,26,'2022-11-05 09:00:00.000000',1),(644,26,26,'2022-11-05 10:00:00.000000',1),(645,26,26,'2022-11-05 11:00:00.000000',1),(646,26,26,'2022-11-05 12:00:00.000000',1),(647,26,26,'2022-11-05 13:00:00.000000',1),(648,26,26,'2022-11-05 14:00:00.000000',1),(649,26,26,'2022-11-05 15:00:00.000000',1),(650,26,26,'2022-11-05 16:00:00.000000',1),(651,26,26,'2022-11-05 17:00:00.000000',1),(652,26,26,'2022-11-05 18:00:00.000000',1),(653,26,26,'2022-11-05 19:00:00.000000',1),(654,26,26,'2022-11-05 20:00:00.000000',1),(655,26,26,'2022-11-05 21:00:00.000000',1),(656,26,26,'2022-11-05 22:00:00.000000',1),(657,26,26,'2022-11-05 23:00:00.000000',1),(658,26,26,'2022-11-06 00:00:00.000000',1),(659,26,26,'2022-11-06 01:00:00.000000',1),(660,26,26,'2022-11-06 02:00:00.000000',1),(661,26,26,'2022-11-06 03:00:00.000000',1),(662,26,26,'2022-11-06 04:00:00.000000',1),(663,26,26,'2022-11-06 05:00:00.000000',1),(664,26,26,'2022-11-06 06:00:00.000000',1),(665,26,26,'2022-11-06 07:00:00.000000',1),(666,26,26,'2022-11-06 08:00:00.000000',1),(667,26,26,'2022-11-06 09:00:00.000000',1),(668,26,26,'2022-11-06 10:00:00.000000',1),(669,26,26,'2022-11-06 11:00:00.000000',1),(670,26,26,'2022-11-06 12:00:00.000000',1),(671,26,26,'2022-11-06 13:00:00.000000',1),(672,26,26,'2022-11-06 14:00:00.000000',1),(673,26,26,'2022-11-06 15:00:00.000000',1),(674,26,26,'2022-11-06 16:00:00.000000',1),(675,26,26,'2022-11-06 17:00:00.000000',1),(676,26,26,'2022-11-06 18:00:00.000000',1),(677,26,26,'2022-11-06 19:00:00.000000',1),(678,26,26,'2022-11-06 20:00:00.000000',1),(679,26,26,'2022-11-06 21:00:00.000000',1),(680,26,26,'2022-11-06 22:00:00.000000',1),(681,26,26,'2022-11-06 23:00:00.000000',1),(682,26,26,'2022-11-07 00:00:00.000000',1),(683,26,26,'2022-11-07 01:00:00.000000',1),(684,26,26,'2022-11-07 02:00:00.000000',1),(685,26,26,'2022-11-07 03:00:00.000000',1),(686,26,26,'2022-11-07 04:00:00.000000',1),(687,26,26,'2022-11-07 05:00:00.000000',1),(688,26,26,'2022-11-07 06:00:00.000000',1),(689,26,26,'2022-11-07 07:00:00.000000',1),(690,26,26,'2022-11-07 08:00:00.000000',1),(691,26,26,'2022-11-07 09:00:00.000000',1),(692,26,26,'2022-11-07 10:00:00.000000',1),(693,26,26,'2022-11-07 11:00:00.000000',1),(694,26,26,'2022-11-07 12:00:00.000000',1),(695,26,26,'2022-11-07 13:00:00.000000',1),(696,26,26,'2022-11-07 14:00:00.000000',1),(697,26,26,'2022-11-07 15:00:00.000000',1),(698,26,26,'2022-11-07 16:00:00.000000',1),(699,26,26,'2022-11-07 17:00:00.000000',1),(700,26,26,'2022-11-07 18:00:00.000000',1),(701,26,26,'2022-11-07 19:00:00.000000',1),(702,26,26,'2022-11-07 20:00:00.000000',1),(703,26,26,'2022-11-07 21:00:00.000000',1),(704,26,26,'2022-11-07 22:00:00.000000',1),(705,26,26,'2022-11-07 23:00:00.000000',1),(706,26,26,'2022-11-08 00:00:00.000000',1),(707,26,26,'2022-11-08 01:00:00.000000',1),(708,26,26,'2022-11-08 02:00:00.000000',1),(709,26,26,'2022-11-08 03:00:00.000000',1),(710,26,26,'2022-11-08 04:00:00.000000',1),(711,26,26,'2022-11-08 05:00:00.000000',1),(712,26,26,'2022-11-08 06:00:00.000000',1),(713,26,26,'2022-11-08 07:00:00.000000',1),(714,26,26,'2022-11-08 08:00:00.000000',1),(715,26,26,'2022-11-08 09:00:00.000000',1),(716,26,26,'2022-11-08 10:00:00.000000',1),(717,26,26,'2022-11-08 11:00:00.000000',1),(718,26,26,'2022-11-08 12:00:00.000000',1),(719,26,26,'2022-11-08 13:00:00.000000',1),(720,26,26,'2022-11-08 14:00:00.000000',1),(721,26,26,'2022-11-08 15:00:00.000000',1),(722,26,26,'2022-11-08 16:00:00.000000',1),(723,26,26,'2022-11-08 17:00:00.000000',1),(724,26,26,'2022-11-08 18:00:00.000000',1),(725,26,26,'2022-11-08 19:00:00.000000',1),(726,26,26,'2022-11-08 20:00:00.000000',1),(727,26,26,'2022-11-08 21:00:00.000000',1),(728,26,26,'2022-11-08 22:00:00.000000',1),(729,26,26,'2022-11-08 23:00:00.000000',1),(730,26,26,'2022-11-09 00:00:00.000000',1),(731,26,26,'2022-11-09 01:00:00.000000',1),(732,26,26,'2022-11-09 02:00:00.000000',1),(733,26,26,'2022-11-09 03:00:00.000000',1),(734,26,26,'2022-11-09 04:00:00.000000',1),(735,26,26,'2022-11-09 05:00:00.000000',1),(736,26,26,'2022-11-09 06:00:00.000000',1),(737,26,26,'2022-11-09 07:00:00.000000',1),(738,26,26,'2022-11-09 08:00:00.000000',1),(739,26,26,'2022-11-09 09:00:00.000000',1),(740,26,26,'2022-11-09 10:00:00.000000',1),(741,26,26,'2022-11-09 11:00:00.000000',1),(742,26,26,'2022-11-09 12:00:00.000000',1),(743,26,26,'2022-11-09 13:00:00.000000',1),(744,26,26,'2022-11-09 14:00:00.000000',1),(745,26,26,'2022-11-09 15:00:00.000000',1),(746,26,26,'2022-11-09 16:00:00.000000',1),(747,26,26,'2022-11-09 17:00:00.000000',1),(748,26,26,'2022-11-09 18:00:00.000000',1),(749,26,26,'2022-11-09 19:00:00.000000',1),(750,26,26,'2022-11-09 20:00:00.000000',1),(751,26,26,'2022-11-09 21:00:00.000000',1),(752,26,26,'2022-11-09 22:00:00.000000',1),(753,26,26,'2022-11-09 23:00:00.000000',1),(754,26,26,'2022-11-10 00:00:00.000000',1),(755,26,26,'2022-11-10 01:00:00.000000',1),(756,26,26,'2022-11-10 02:00:00.000000',1),(757,26,26,'2022-11-10 03:00:00.000000',1),(758,26,26,'2022-11-10 04:00:00.000000',1),(759,26,26,'2022-11-10 05:00:00.000000',1),(760,26,26,'2022-11-10 06:00:00.000000',1),(761,26,26,'2022-11-10 07:00:00.000000',1),(762,25,26,'2022-11-10 08:00:00.000000',1),(763,26,26,'2022-11-10 09:00:00.000000',1),(764,26,26,'2022-11-10 10:00:00.000000',1),(765,26,26,'2022-11-10 11:00:00.000000',1),(766,26,26,'2022-11-10 12:00:00.000000',1),(767,26,26,'2022-11-10 13:00:00.000000',1),(768,26,26,'2022-11-10 14:00:00.000000',1),(769,26,26,'2022-11-10 15:00:00.000000',1),(770,26,26,'2022-11-10 16:00:00.000000',1),(771,26,26,'2022-11-10 17:00:00.000000',1),(772,26,26,'2022-11-10 18:00:00.000000',1),(773,26,26,'2022-11-10 19:00:00.000000',1),(774,26,26,'2022-11-10 20:00:00.000000',1),(775,26,26,'2022-11-10 21:00:00.000000',1),(776,26,26,'2022-11-10 22:00:00.000000',1),(777,26,26,'2022-11-10 23:00:00.000000',1),(778,26,26,'2022-11-11 00:00:00.000000',1),(779,26,26,'2022-11-11 01:00:00.000000',1),(780,26,26,'2022-11-11 02:00:00.000000',1),(781,26,26,'2022-11-11 03:00:00.000000',1),(782,0,26,'2022-11-11 04:00:00.000000',1),(783,26,26,'2022-11-11 05:00:00.000000',1),(784,26,26,'2022-11-11 06:00:00.000000',1),(785,26,26,'2022-11-11 07:00:00.000000',1),(786,26,26,'2022-11-11 08:00:00.000000',1),(787,26,26,'2022-11-11 09:00:00.000000',1),(788,26,26,'2022-11-11 10:00:00.000000',1),(789,26,26,'2022-11-11 11:00:00.000000',1),(790,26,26,'2022-11-11 12:00:00.000000',1),(791,26,26,'2022-11-11 13:00:00.000000',1),(792,26,26,'2022-11-11 14:00:00.000000',1),(793,26,26,'2022-11-11 15:00:00.000000',1),(794,26,26,'2022-11-11 16:00:00.000000',1),(795,26,26,'2022-11-11 17:00:00.000000',1),(796,26,26,'2022-11-11 18:00:00.000000',1),(797,26,26,'2022-11-11 19:00:00.000000',1),(798,0,0,'2022-11-14 12:00:00.000000',1),(799,0,26,'2022-11-14 13:00:00.000000',1),(800,0,27,'2022-11-14 14:00:00.000000',1),(801,26,26,'2022-11-15 12:00:00.000000',1),(802,26,26,'2022-11-15 13:00:00.000000',1),(803,26,26,'2022-11-15 15:00:00.000000',1),(804,26,26,'2022-11-15 16:00:00.000000',1),(805,26,26,'2022-11-15 17:00:00.000000',1),(806,26,26,'2022-11-15 18:00:00.000000',1),(807,26,26,'2022-11-15 19:00:00.000000',1),(808,26,26,'2022-11-15 20:00:00.000000',1),(809,26,26,'2022-11-15 21:00:00.000000',1),(810,26,26,'2022-11-15 22:00:00.000000',1),(811,26,26,'2022-11-15 23:00:00.000000',1),(812,26,26,'2022-11-16 00:00:00.000000',1),(813,0,0,'2022-11-16 08:00:00.000000',1),(814,0,26,'2022-11-16 09:00:00.000000',1),(815,0,26,'2022-11-16 10:00:00.000000',1),(816,26,26,'2022-11-16 11:00:00.000000',1),(817,26,26,'2022-11-16 16:00:00.000000',1),(818,0,25,'2022-11-17 16:00:00.000000',1),(819,0,26,'2022-11-17 17:00:00.000000',1),(820,26,26,'2022-11-17 18:00:00.000000',1),(821,0,23,'2022-11-18 11:00:00.000000',1),(822,0,24,'2022-11-18 13:00:00.000000',1),(823,0,28,'2022-11-18 14:00:00.000000',1),(824,26,26,'2022-11-18 17:00:00.000000',1),(825,26,26,'2022-11-18 18:00:00.000000',1),(826,26,26,'2022-11-18 19:00:00.000000',1),(827,26,26,'2022-11-18 20:00:00.000000',1),(828,26,26,'2022-11-18 21:00:00.000000',1),(829,26,26,'2022-11-19 01:00:00.000000',1),(830,26,26,'2022-11-19 02:00:00.000000',1);
/*!40000 ALTER TABLE `bms_day` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 19:59:07
