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
-- Table structure for table `ward`
--

DROP TABLE IF EXISTS `ward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ward` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `number` varchar(3) NOT NULL,
  `user_type` varchar(4) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `ward_user_id_69d97913_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ward`
--

LOCK TABLES `ward` WRITE;
/*!40000 ALTER TABLE `ward` DISABLE KEYS */;
INSERT INTO `ward` VALUES (1,'101','ward',1),(2,'102','ward',2),(3,'103','ward',3),(4,'104','ward',4),(5,'105','ward',5),(6,'106','ward',6),(7,'107','ward',7),(8,'108','ward',8),(9,'109','ward',9),(10,'110','ward',10),(11,'201','ward',11),(12,'202','ward',12),(13,'203','ward',13),(14,'204','ward',14),(15,'205','ward',15),(16,'206','ward',16),(17,'207','ward',17),(18,'208','ward',18),(19,'209','ward',19),(20,'210','ward',20),(21,'301','ward',21),(22,'302','ward',22),(23,'303','ward',23),(24,'304','ward',24),(25,'305','ward',25),(26,'306','ward',26),(27,'307','ward',27),(28,'308','ward',28),(29,'309','ward',29),(30,'310','ward',30),(31,'401','ward',31),(32,'402','ward',32),(33,'403','ward',33),(34,'404','ward',34),(35,'405','ward',35),(36,'406','ward',36),(37,'407','ward',37),(38,'408','ward',38),(39,'409','ward',39),(40,'410','ward',40),(41,'501','ward',41),(42,'502','ward',42),(43,'503','ward',43),(44,'504','ward',44),(45,'505','ward',45),(46,'506','ward',46),(47,'507','ward',47),(48,'508','ward',48),(49,'509','ward',49),(50,'510','ward',50);
/*!40000 ALTER TABLE `ward` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21 16:37:04
