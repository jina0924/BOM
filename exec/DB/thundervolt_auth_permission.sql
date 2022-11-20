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
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add user',1,'add_user'),(2,'Can change user',1,'change_user'),(3,'Can delete user',1,'delete_user'),(4,'Can view user',1,'view_user'),(5,'Can add doctor',2,'add_doctor'),(6,'Can change doctor',2,'change_doctor'),(7,'Can delete doctor',2,'delete_doctor'),(8,'Can view doctor',2,'view_doctor'),(9,'Can add patient',3,'add_patient'),(10,'Can change patient',3,'change_patient'),(11,'Can delete patient',3,'delete_patient'),(12,'Can view patient',3,'view_patient'),(13,'Can add ward',4,'add_ward'),(14,'Can change ward',4,'change_ward'),(15,'Can delete ward',4,'delete_ward'),(16,'Can view ward',4,'view_ward'),(17,'Can add patient status',5,'add_patientstatus'),(18,'Can change patient status',5,'change_patientstatus'),(19,'Can delete patient status',5,'delete_patientstatus'),(20,'Can view patient status',5,'view_patientstatus'),(21,'Can add nurse',6,'add_nurse'),(22,'Can change nurse',6,'change_nurse'),(23,'Can delete nurse',6,'delete_nurse'),(24,'Can view nurse',6,'view_nurse'),(25,'Can add alert',7,'add_alert'),(26,'Can change alert',7,'change_alert'),(27,'Can delete alert',7,'delete_alert'),(28,'Can view alert',7,'view_alert'),(29,'Can add battery',8,'add_battery'),(30,'Can change battery',8,'change_battery'),(31,'Can delete battery',8,'delete_battery'),(32,'Can view battery',8,'view_battery'),(33,'Can add bms',9,'add_bms'),(34,'Can change bms',9,'change_bms'),(35,'Can delete bms',9,'delete_bms'),(36,'Can view bms',9,'view_bms'),(37,'Can add bms status',10,'add_bmsstatus'),(38,'Can change bms status',10,'change_bmsstatus'),(39,'Can delete bms status',10,'delete_bmsstatus'),(40,'Can view bms status',10,'view_bmsstatus'),(41,'Can add battery status',11,'add_batterystatus'),(42,'Can change battery status',11,'change_batterystatus'),(43,'Can delete battery status',11,'delete_batterystatus'),(44,'Can view battery status',11,'view_batterystatus'),(45,'Can add Token',12,'add_token'),(46,'Can change Token',12,'change_token'),(47,'Can delete Token',12,'delete_token'),(48,'Can view Token',12,'view_token'),(49,'Can add token',13,'add_tokenproxy'),(50,'Can change token',13,'change_tokenproxy'),(51,'Can delete token',13,'delete_tokenproxy'),(52,'Can view token',13,'view_tokenproxy'),(53,'Can add email address',14,'add_emailaddress'),(54,'Can change email address',14,'change_emailaddress'),(55,'Can delete email address',14,'delete_emailaddress'),(56,'Can view email address',14,'view_emailaddress'),(57,'Can add email confirmation',15,'add_emailconfirmation'),(58,'Can change email confirmation',15,'change_emailconfirmation'),(59,'Can delete email confirmation',15,'delete_emailconfirmation'),(60,'Can view email confirmation',15,'view_emailconfirmation'),(61,'Can add social account',16,'add_socialaccount'),(62,'Can change social account',16,'change_socialaccount'),(63,'Can delete social account',16,'delete_socialaccount'),(64,'Can view social account',16,'view_socialaccount'),(65,'Can add social application',17,'add_socialapp'),(66,'Can change social application',17,'change_socialapp'),(67,'Can delete social application',17,'delete_socialapp'),(68,'Can view social application',17,'view_socialapp'),(69,'Can add social application token',18,'add_socialtoken'),(70,'Can change social application token',18,'change_socialtoken'),(71,'Can delete social application token',18,'delete_socialtoken'),(72,'Can view social application token',18,'view_socialtoken'),(73,'Can add log entry',19,'add_logentry'),(74,'Can change log entry',19,'change_logentry'),(75,'Can delete log entry',19,'delete_logentry'),(76,'Can view log entry',19,'view_logentry'),(77,'Can add permission',20,'add_permission'),(78,'Can change permission',20,'change_permission'),(79,'Can delete permission',20,'delete_permission'),(80,'Can view permission',20,'view_permission'),(81,'Can add group',21,'add_group'),(82,'Can change group',21,'change_group'),(83,'Can delete group',21,'delete_group'),(84,'Can view group',21,'view_group'),(85,'Can add content type',22,'add_contenttype'),(86,'Can change content type',22,'change_contenttype'),(87,'Can delete content type',22,'delete_contenttype'),(88,'Can view content type',22,'view_contenttype'),(89,'Can add session',23,'add_session'),(90,'Can change session',23,'change_session'),(91,'Can delete session',23,'delete_session'),(92,'Can view session',23,'view_session'),(93,'Can add site',24,'add_site'),(94,'Can change site',24,'change_site'),(95,'Can delete site',24,'delete_site'),(96,'Can view site',24,'view_site'),(97,'Can add patient status excel',25,'add_patientstatusexcel'),(98,'Can change patient status excel',25,'change_patientstatusexcel'),(99,'Can delete patient status excel',25,'delete_patientstatusexcel'),(100,'Can view patient status excel',25,'view_patientstatusexcel'),(101,'Can add patient status now',26,'add_patientstatusnow'),(102,'Can change patient status now',26,'change_patientstatusnow'),(103,'Can delete patient status now',26,'delete_patientstatusnow'),(104,'Can view patient status now',26,'view_patientstatusnow'),(105,'Can add bms status excel',27,'add_bmsstatusexcel'),(106,'Can change bms status excel',27,'change_bmsstatusexcel'),(107,'Can delete bms status excel',27,'delete_bmsstatusexcel'),(108,'Can view bms status excel',27,'view_bmsstatusexcel'),(109,'Can add battery status excel',28,'add_batterystatusexcel'),(110,'Can change battery status excel',28,'change_batterystatusexcel'),(111,'Can delete battery status excel',28,'delete_batterystatusexcel'),(112,'Can view battery status excel',28,'view_batterystatusexcel'),(113,'Can add bms status now',29,'add_bmsstatusnow'),(114,'Can change bms status now',29,'change_bmsstatusnow'),(115,'Can delete bms status now',29,'delete_bmsstatusnow'),(116,'Can view bms status now',29,'view_bmsstatusnow'),(117,'Can add battery status now',30,'add_batterystatusnow'),(118,'Can change battery status now',30,'change_batterystatusnow'),(119,'Can delete battery status now',30,'delete_batterystatusnow'),(120,'Can view battery status now',30,'view_batterystatusnow'),(121,'Can add patient status default',31,'add_patientstatusdefault'),(122,'Can change patient status default',31,'change_patientstatusdefault'),(123,'Can delete patient status default',31,'delete_patientstatusdefault'),(124,'Can view patient status default',31,'view_patientstatusdefault'),(125,'Can add patient day',32,'add_patientday'),(126,'Can change patient day',32,'change_patientday'),(127,'Can delete patient day',32,'delete_patientday'),(128,'Can view patient day',32,'view_patientday'),(129,'Can add battery day',33,'add_batteryday'),(130,'Can change battery day',33,'change_batteryday'),(131,'Can delete battery day',33,'delete_batteryday'),(132,'Can view battery day',33,'view_batteryday'),(133,'Can add bms day',34,'add_bmsday'),(134,'Can change bms day',34,'change_bmsday'),(135,'Can delete bms day',34,'delete_bmsday'),(136,'Can view bms day',34,'view_bmsday'),(137,'Can add bms battery default',35,'add_bmsbatterydefault'),(138,'Can change bms battery default',35,'change_bmsbatterydefault'),(139,'Can delete bms battery default',35,'delete_bmsbatterydefault'),(140,'Can view bms battery default',35,'view_bmsbatterydefault');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 19:58:59
