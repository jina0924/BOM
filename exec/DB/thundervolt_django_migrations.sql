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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-11-07 17:09:39.177030'),(2,'contenttypes','0002_remove_content_type_name','2022-11-07 17:09:39.335628'),(3,'auth','0001_initial','2022-11-07 17:09:39.881948'),(4,'auth','0002_alter_permission_name_max_length','2022-11-07 17:09:39.998923'),(5,'auth','0003_alter_user_email_max_length','2022-11-07 17:09:40.032852'),(6,'auth','0004_alter_user_username_opts','2022-11-07 17:09:40.059667'),(7,'auth','0005_alter_user_last_login_null','2022-11-07 17:09:40.084778'),(8,'auth','0006_require_contenttypes_0002','2022-11-07 17:09:40.102736'),(9,'auth','0007_alter_validators_add_error_messages','2022-11-07 17:09:40.122712'),(10,'auth','0008_alter_user_username_max_length','2022-11-07 17:09:40.143199'),(11,'auth','0009_alter_user_last_name_max_length','2022-11-07 17:09:40.163783'),(12,'auth','0010_alter_group_name_max_length','2022-11-07 17:09:40.201205'),(13,'auth','0011_update_proxy_permissions','2022-11-07 17:09:40.237157'),(14,'auth','0012_alter_user_first_name_max_length','2022-11-07 17:09:40.263010'),(15,'accounts','0001_initial','2022-11-07 17:09:40.947395'),(16,'account','0001_initial','2022-11-07 17:09:41.341827'),(17,'account','0002_email_max_length','2022-11-07 17:09:41.389723'),(18,'admin','0001_initial','2022-11-07 17:09:41.693912'),(19,'admin','0002_logentry_remove_auto_add','2022-11-07 17:09:41.726791'),(20,'admin','0003_logentry_add_action_flag_choices','2022-11-07 17:09:41.778356'),(21,'authtoken','0001_initial','2022-11-07 17:09:41.945332'),(22,'authtoken','0002_auto_20160226_1747','2022-11-07 17:09:42.010321'),(23,'authtoken','0003_tokenproxy','2022-11-07 17:09:42.034200'),(24,'wards','0001_initial','2022-11-07 17:09:43.402983'),(25,'batteries','0001_initial','2022-11-07 17:09:44.159796'),(26,'sessions','0001_initial','2022-11-07 17:09:44.271505'),(27,'sites','0001_initial','2022-11-07 17:09:44.350283'),(28,'sites','0002_alter_domain_unique','2022-11-07 17:09:44.402039'),(29,'socialaccount','0001_initial','2022-11-07 17:09:45.702778'),(30,'socialaccount','0002_token_max_lengths','2022-11-07 17:09:45.907575'),(31,'socialaccount','0003_extra_data_default_dict','2022-11-07 17:09:45.986155'),(32,'batteries','0002_batterystatusexcel_batterystatusnow_bmsstatusexcel_bmsstatusnow','2022-11-15 13:36:33.931609'),(33,'wards','0002_patientstatusexcel_patientstatusnow','2022-11-15 13:36:34.318513'),(35,'wards','0003_patientstatusdefault','2022-11-16 17:29:28.307213'),(38,'batteries','0003_batteryday_bmsday','2022-11-16 17:51:50.503568'),(39,'wards','0004_patientday','2022-11-16 17:51:50.778669'),(40,'batteries','0004_bmsbatterydefault','2022-11-18 23:43:21.742529');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21 16:36:55
