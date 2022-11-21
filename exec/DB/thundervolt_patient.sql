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
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(17) NOT NULL,
  `number` varchar(9) NOT NULL,
  `hospitalized_date` date NOT NULL,
  `discharged_date` date DEFAULT NULL,
  `birth` date NOT NULL,
  `sex` varchar(1) NOT NULL,
  `nok_name` varchar(17) NOT NULL,
  `nok_phonenumber` varchar(11) NOT NULL,
  `user_type` varchar(7) NOT NULL,
  `is_warning` tinyint(1) NOT NULL,
  `doctor_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `ward_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `patient_ward_id_c75d2fbe_fk_ward_id` (`ward_id`),
  KEY `patient_doctor_id_7fea0f90_fk_doctor_id` (`doctor_id`),
  CONSTRAINT `patient_doctor_id_7fea0f90_fk_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`),
  CONSTRAINT `patient_user_id_da78c715_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `patient_ward_id_c75d2fbe_fk_ward_id` FOREIGN KEY (`ward_id`) REFERENCES `ward` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'정진아','225070001','2022-05-03',NULL,'1992-09-24','F','한기철','01046321881','patient',1,1,51,47),(2,'서유리','225070002','2022-05-11','2022-05-17','1995-05-07','F','이지수','01067945539','patient',0,1,52,47),(3,'유혜영','225070003','2022-05-13','2022-05-15','1982-12-02','F','최지숙','01057731546','patient',1,1,53,47),(4,'박민주','225070004','2022-05-22','2022-06-01','1997-06-21','F','윤기준','01034409978','patient',0,1,54,47),(5,'김민지','225070005','2022-05-31','2022-06-06','1997-05-01','F','정진아','01031349932','patient',0,1,55,47),(6,'최수영','225070006','2022-06-02',NULL,'1987-04-28','F','이진행','01079332810','patient',0,2,56,47),(7,'권혜린','225070007','2022-06-06','2022-09-21','1995-01-07','F','박정혜','01093920977','patient',0,5,57,47),(8,'서주영','225070008','2022-06-25',NULL,'1981-04-24','F','박기범','01016638351','patient',0,7,58,47),(9,'김민준','225070009','2022-07-11',NULL,'1993-05-07','M','홍혜숙','01055139956','patient',0,7,59,47),(10,'최주영','225070010','2022-07-26',NULL,'1990-05-05','M','이준혁','01083357720','patient',0,11,60,47),(11,'김윤주','225070011','2022-08-04',NULL,'1987-08-04','F','박기준','01078831547','patient',0,16,61,47),(12,'박연수','225070012','2022-08-16',NULL,'1999-12-31','M','윤미래','01078769935','patient',0,7,62,47),(13,'고아라','225070013','2022-08-23',NULL,'2000-05-28','F','이기현','01062886977','patient',0,9,63,47),(14,'김세희','225070014','2022-09-08',NULL,'1993-05-24','F','윤설희','01095578870','patient',0,12,64,47),(15,'김소미','225070015','2022-09-21',NULL,'1984-05-15','F','최혜진','01015527735','patient',0,14,65,47),(16,'김진우','225070016','2022-09-30',NULL,'2003-05-09','M','임진혁','01057433449','patient',0,3,66,47),(17,'김혜미','225070017','2022-10-02',NULL,'1995-05-01','F','서혜주','01032996843','patient',0,3,67,47),(18,'최준하','225070018','2022-10-06',NULL,'1990-05-03','M','류현수','01079086590','patient',0,1,68,47),(19,'이창주','225070019','2022-10-19',NULL,'1991-05-16','M','김미영','01099704426','patient',0,1,69,47),(20,'이예은','225070020','2022-10-07',NULL,'1982-05-29','F','김윤주','01036744562','patient',0,7,70,47),(21,'이아빈','225070021','2022-06-01',NULL,'1991-07-21','F','사혜지','01026234867','patient',0,7,71,47),(22,'박찬홍','225070022','2022-06-12',NULL,'1994-02-07','M','조선희','01053358668','patient',0,7,72,47),(23,'김지윤','225070023','2022-05-18',NULL,'1965-05-24','M','진현아','01034886403','patient',0,7,73,47),(24,'신동한','225070024','2022-08-22',NULL,'1972-03-29','M','고혜민','01023319889','patient',0,9,74,47),(25,'이승연','225070025','2022-05-21',NULL,'1969-09-29','F','고유림','01066832218','patient',0,6,75,47),(26,'김예원','225070026','2022-08-19',NULL,'1973-05-25','F','민윤수','01076354521','patient',0,16,76,47),(27,'김민철','225070027','2022-09-22',NULL,'1979-06-29','M','정민지','01066479970','patient',0,16,77,47),(28,'문요성','225070028','2022-09-26',NULL,'1983-07-21','M','장효정','01039382285','patient',1,5,78,47),(29,'유병찬','225070029','2022-10-26',NULL,'1977-04-07','M','허윤주','01033829957','patient',0,5,79,47),(30,'신혜정','225070030','2022-08-18',NULL,'1974-09-07','F','김춘배','01056327756','patient',0,2,80,47),(31,'김춘식','225070031','2022-06-28',NULL,'1969-03-21','F','김오현','01044619766','patient',0,2,81,47),(32,'김민수','225070032','2022-06-11',NULL,'1992-03-29','M','김예지','01074467783','patient',0,2,82,47),(33,'김사랑','225080001','2022-08-08',NULL,'1992-09-07','F','김현수','01067745639','patient',0,6,83,48),(34,'신승우','225050001','2022-06-17',NULL,'1991-10-09','M','이미영','01018185866','patient',0,5,84,45),(35,'한서현','225100001','2022-10-04',NULL,'1954-01-25','F','소명숙','01074323381','patient',0,9,85,50),(36,'강혜원','223060001','2022-08-15',NULL,'1996-11-22','F','허정환','01008220439','patient',0,14,86,26),(37,'정채원','222030001','2022-09-01',NULL,'2004-08-12','F','유중혁','01096922342','patient',0,1,87,13),(38,'강혜원','221030001','2022-11-18',NULL,'1960-11-24','F','장인하','01082555260','patient',0,5,88,3),(39,'홍인하','224090001','2022-09-30',NULL,'1950-08-15','M','소명숙','01043610750','patient',0,6,89,39),(40,'하혜성','224070001','2022-05-25',NULL,'1990-09-09','M','윤승헌','01038223462','patient',0,1,90,37),(41,'배시영','224070002','2022-05-20',NULL,'1958-06-01','F','윤승헌','01084932716','patient',0,8,91,37),(42,'한서현','223060002','2022-07-13',NULL,'1968-04-06','F','김현아','01044908024','patient',0,18,92,26),(43,'전성호','224090002','2022-05-27',NULL,'2004-10-04','M','장여진','01046516359','patient',0,4,93,39),(44,'김재섭','222030002','2022-05-26',NULL,'1969-05-05','M','성명옥','01038998165','patient',0,19,94,13),(45,'신승우','224070003','2022-05-13',NULL,'1956-01-28','M','장인하','01014256236','patient',0,8,95,37),(46,'권덕수','221020001','2022-08-30',NULL,'1970-10-16','M','표수진','01082201895','patient',0,8,96,2),(47,'권영빈','224040001','2022-05-10',NULL,'2005-07-10','M','윤승헌','01077196439','patient',0,6,97,34),(48,'봉미선','222050001','2022-09-05',NULL,'1999-11-12','F','소명숙','01057598924','patient',0,3,98,15),(49,'문광일','225060001','2022-09-30',NULL,'2001-07-02','M','나영애','01042051479','patient',0,4,99,46),(50,'한가영','225050002','2022-05-20',NULL,'1972-08-06','F','정유현','01099172498','patient',0,20,100,45),(51,'하혜성','224080001','2022-05-19',NULL,'2004-11-17','M','서예숙','01042777731','patient',0,16,101,38),(52,'오연화','223080001','2022-06-27',NULL,'1995-12-12','F','허정환','01021247427','patient',0,6,102,28);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21 16:37:01
