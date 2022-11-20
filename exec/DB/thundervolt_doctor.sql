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
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(17) NOT NULL,
  `image` varchar(100) NOT NULL,
  `phonenumber` varchar(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `department` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'임진경','doctor/doctor1.jpg','01012341234','1234@bom.com','소아청소년과'),(2,'김륜주','doctor/doctor2.jpg','01012341234','1234@bom.com','신경외과'),(3,'박철주','doctor/doctor3.jpg','01012341234','1234@bom.com','성형외과'),(4,'김민석','doctor/doctor4.jpg','01012341234','1234@bom.com','응급의학과'),(5,'하은주','doctor/doctor5.jpg','01012341234','1234@bom.com','안과'),(6,'류지원','doctor/doctor6.jpg','01012341234','1234@bom.com','내과'),(7,'조지민','doctor/doctor7.jpg','01012341234','1234@bom.com','순환기내과'),(8,'임서현','doctor/doctor8.jpg','01012341234','1234@bom.com','신경과'),(9,'김태희','doctor/doctor9.jpg','01012341234','1234@bom.com','소아청소년과'),(10,'최정현','doctor/doctor4.jpg','01012341234','1234@bom.com','소아청소년과'),(11,'박지태','doctor/doctor1.jpg','01012341234','1234@bom.com','소아청소년과'),(12,'임지원','doctor/doctor2.jpg','01012341234','1234@bom.com','소아청소년과'),(13,'김진주','doctor/doctor3.jpg','01012341234','1234@bom.com','재활의학과'),(14,'허민지','doctor/doctor4.jpg','01012341234','1234@bom.com','순환기내과'),(15,'김태경','doctor/doctor5.jpg','01012341234','1234@bom.com','순환기내과'),(16,'김태현','doctor/doctor6.jpg','01012341234','1234@bom.com','순환기내과'),(17,'원종철','doctor/doctor7.jpg','01012341234','1234@bom.com','신경외과'),(18,'이윤주','doctor/doctor8.jpg','01012341234','1234@bom.com','호흡기내과'),(19,'이남진','doctor/doctor9.jpg','01012341234','1234@bom.com','응급의학과'),(20,'이수민','doctor/doctor3.jpg','01012341234','1234@bom.com','재활의학과'),(21,'양석형','doctor/doctor3.jpg','01053676441','seokhyung@bom.com','성형외과'),(22,'박태희','doctor/doctor4.jpg','01058746684','taehee@bom.com','소아청소년과'),(23,'양동건','doctor/doctor5.jpg','01055452878','donggun@bom.com','호흡기내과'),(24,'조미연','doctor/doctor3.jpg','01005725170','miyeon@bom.com','내과'),(25,'박태희','doctor/doctor5.jpg','01041337341','taehee@bom.com','순환기내과'),(26,'조미연','doctor/doctor2.jpg','01028758802','miyeon@bom.com','소아청소년과'),(27,'안정원','doctor/doctor7.jpg','01016525360','garden@bom.com','안과'),(28,'양석형','doctor/doctor1.jpg','01076116365','seokhyung@bom.com','소아청소년과'),(29,'채송화','doctor/doctor4.jpg','01092118777','songhwa@bom.com','내과'),(30,'김준완','doctor/doctor7.jpg','01090196399','junwan@bom.com','내과'),(31,'장겨울','doctor/doctor8.jpg','01005762995','winter@bom.com','안과'),(32,'윤성한','doctor/doctor2.jpg','01027500943','sunghan@bom.com','소아청소년과'),(33,'김준완','doctor/doctor6.jpg','01041028190','junwan@bom.com','소아청소년과'),(34,'윤성한','doctor/doctor5.jpg','01091359815','sunghan@bom.com','순환기내과'),(35,'김준완','doctor/doctor1.jpg','01087699813','junwan@bom.com','신경과'),(36,'채송화','doctor/doctor9.jpg','01004886006','songhwa@bom.com','성형외과'),(37,'윤성한','doctor/doctor5.jpg','01088722729','sunghan@bom.com','호흡기내과'),(38,'양석형','doctor/doctor5.jpg','01070095251','seokhyung@bom.com','안과'),(39,'박태희','doctor/doctor5.jpg','01060818022','taehee@bom.com','신경과'),(40,'양석형','doctor/doctor7.jpg','01067682178','seokhyung@bom.com','순환기내과'),(41,'장겨울','doctor/doctor6.jpg','01087667414','winter@bom.com','신경과'),(42,'장겨울','doctor/doctor3.jpg','01053664350','winter@bom.com','소아청소년과'),(43,'안정원','doctor/doctor2.jpg','01047295416','garden@bom.com','순환기내과'),(44,'김준완','doctor/doctor7.jpg','01065571329','junwan@bom.com','호흡기내과'),(45,'양석형','doctor/doctor3.jpg','01040324888','seokhyung@bom.com','재활의학과'),(46,'김윤석','doctor/doctor4.jpg','01024812239','yoonseok@bom.com','순환기내과');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
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
