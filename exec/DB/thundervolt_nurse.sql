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
-- Table structure for table `nurse`
--

DROP TABLE IF EXISTS `nurse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurse` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(17) NOT NULL,
  `image` varchar(100) NOT NULL,
  `phonenumber` varchar(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `position` varchar(20) NOT NULL,
  `ward_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nurse_ward_id_53012b4e_fk_ward_id` (`ward_id`),
  CONSTRAINT `nurse_ward_id_53012b4e_fk_ward_id` FOREIGN KEY (`ward_id`) REFERENCES `ward` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse`
--

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;
INSERT INTO `nurse` VALUES (1,'이서윤','nurse/nurse1.jpg','01037218352','seoyoon@bom.com','수간호사',43),(2,'김헤영','nurse/nurse2.jpg','01093816657','hyeyoung@bom.com','간호과장',1),(3,'최수진','nurse/nurse3.jpg','01079941763','sujin@bom.com','평간호사',20),(4,'김민지','nurse/nurse4.jpg','01090758870','minji@bom.com','책임간호사',27),(5,'이지민','nurse/nurse5.jpg','01038290331','jimin@bom.com','주임간호사',22),(6,'박서현','nurse/nurse6.jpg','01048223117','seohyeon@bom.com','수간호사',47),(7,'김지윤','nurse/nurse7.jpg','01027691312','jiyun@bom.com','간호과장',14),(8,'이지현','nurse/nurse8.jpg','01032554551','jihyeon@bom.com','평간호사',28),(9,'황가영','nurse/nurse9.jpg','01093828856','gayoung@bom.com','책임간호사',15),(10,'김혜윤','nurse/nurse1.jpg','01048923847','hyeyoon@bom.com','주임간호사',47),(11,'박민서','nurse/nurse2.jpg','01049289097','minseo@bom.com','수간호사',32),(12,'김하윤','nurse/nurse3.jpg','01082796876','hayoon@bom.com','간호과장',3),(13,'김수아','nurse/nurse4.jpg','01037951393','sua@bom.com','평간호사',47),(14,'최서아','nurse/nurse5.jpg','01023178099','seoa@bom.com','책임간호사',3),(15,'김유나','nurse/nurse6.jpg','01079933045','yoona@bom.com','주임간호사',1),(16,'김예은','nurse/nurse7.jpg','01057489032','yeeun@bom.com','수간호사',35),(17,'이소율','nurse/nurse8.jpg','01040295585','soyool@bom.com','간호과장',37),(18,'정채원','nurse/nurse9.jpg','01033247687','chaewon@bom.com','평간호사',47),(19,'김예린','nurse/nurse1.jpg','01029393001','yerin@bom.com','책임간호사',43),(20,'김나은','nurse/nurse2.jpg','01040655663','naeun@bom.com','주임간호사',47),(21,'윤시은','nurse/nurse3.jpg','01032817337','sieun@bom.com','수간호사',47),(23,'문해진','nurse/nurse3.jpg','01034247138','haejin@bom.com','간호과장',24),(24,'장하진','nurse/nurse2.jpg','01044141481','hajin@bom.com','수간호사',30),(25,'정한결','nurse/nurse9.jpg','01058922933','hangyeol@bom.com','간호과장',20),(26,'장하진','nurse/nurse1.jpg','01089038236','hajin@bom.com','간호과장',30),(27,'김이경','nurse/nurse9.jpg','01051135169','ekyung@bom.com','주임간호사',19),(28,'임희윤','nurse/nurse5.jpg','01069209057','heeyoon@bom.com','책임간호사',22),(29,'김이경','nurse/nurse2.jpg','01070471224','ekyung@bom.com','수간호사',40),(30,'장하진','nurse/nurse4.jpg','01021023142','hajin@bom.com','수간호사',22),(31,'장하진','nurse/nurse3.jpg','01001400310','hajin@bom.com','주임간호사',39),(32,'임희윤','nurse/nurse5.jpg','01084614542','heeyoon@bom.com','수간호사',50),(33,'서재인','nurse/nurse4.jpg','01097459592','jaein@bom.com','수간호사',8),(34,'김이경','nurse/nurse8.jpg','01048431790','ekyung@bom.com','간호과장',16),(35,'강인혜','nurse/nurse6.jpg','01019475637','inhye@bom.com','책임간호사',48),(36,'김이경','nurse/nurse2.jpg','01042299045','ekyung@bom.com','수간호사',41),(37,'허연우','nurse/nurse5.jpg','01093950864','yeonwoo@bom.com','책임간호사',25),(38,'허연우','nurse/nurse9.jpg','01097417154','yeonwoo@bom.com','간호과장',35),(39,'장하진','nurse/nurse6.jpg','01027378726','hajin@bom.com','책임간호사',42),(40,'정한결','nurse/nurse8.jpg','01074559819','hangyeol@bom.com','평간호사',42),(41,'문해진','nurse/nurse3.jpg','01025446762','haejin@bom.com','책임간호사',29),(42,'허연우','nurse/nurse6.jpg','01005981530','yeonwoo@bom.com','주임간호사',12),(43,'정한결','nurse/nurse6.jpg','01086362116','hangyeol@bom.com','책임간호사',27),(44,'김이경','nurse/nurse4.jpg','01094436652','ekyung@bom.com','주임간호사',28),(45,'정한결','nurse/nurse8.jpg','01072425211','hangyeol@bom.com','간호과장',44),(46,'문해진','nurse/nurse5.jpg','01019349904','haejin@bom.com','평간호사',34),(47,'김이경','nurse/nurse3.jpg','01092108068','ekyung@bom.com','주임간호사',32);
/*!40000 ALTER TABLE `nurse` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 19:59:05
