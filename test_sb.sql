-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: test_sb
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `UserOrmEntities`
--

DROP TABLE IF EXISTS `UserOrmEntities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserOrmEntities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(128) NOT NULL,
  `lastName` varchar(128) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `secret` varchar(255) NOT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserOrmEntities`
--

LOCK TABLES `UserOrmEntities` WRITE;
/*!40000 ALTER TABLE `UserOrmEntities` DISABLE KEYS */;
INSERT INTO `UserOrmEntities` VALUES (1,'name',NULL,'124','123',NULL,'bb3c7d95-ce3e-43fd-bcea-3c4c777fa919.jpg','2022-06-28 08:23:33','2022-06-29 13:21:03'),(2,'name',NULL,'124','123',NULL,NULL,'2022-06-28 08:23:53','2022-06-28 08:23:53'),(3,'Art',NULL,'123@e','$2b$10$zws7xbnPY7Yr3PbSJaPGj.c/MF1bMrAdiKsUtMlomE1iDjHS1OOCe',NULL,NULL,'2022-06-28 09:17:56','2022-06-28 09:17:56'),(4,'Art',NULL,'123@e','$2b$10$jmv79iPjnr.iM73jji3ul.1eZWTu2yJGslsLGGwecY.OBaRNd4nF2',NULL,NULL,'2022-06-28 09:20:04','2022-06-28 09:20:04'),(5,'Art',NULL,'123@e','$2b$10$2mbMIqUMauFTnfSuxkDdXOfYmo4qM.jxyyGFf7fTccf5/J9IXAGg6',NULL,NULL,'2022-06-28 09:28:31','2022-06-28 09:28:31'),(6,'Art',NULL,'123@e','$2b$10$pvmt9NcsbZb1GrEhV2VPHeMovt0.hVazltgh2Ea/Fn37vrhlMpb4a',NULL,NULL,'2022-06-28 09:29:28','2022-06-28 09:29:28'),(7,'Art',NULL,'123@e','$2b$10$MIQlfHgK9aKWivKlkw4tGuXuxDaoqmflAWGd2uVNdEbF42OZdjzni',NULL,NULL,'2022-06-28 09:29:57','2022-06-28 09:29:57'),(8,'Art',NULL,'123@e.sdf','$2b$10$zMNbToCiBrq2II36iN/GR.CXipOGZl65Kms/8J3ur73ediGG5GaZS',NULL,NULL,'2022-06-28 10:06:06','2022-06-28 10:06:06'),(9,'5215',NULL,'123@e.sds','$2b$10$h9y3uIpx7gh1gyOV9MnJSuqh5gmQhaqeuleC0mKaM99TIcVCbOHES',NULL,NULL,'2022-06-28 10:06:39','2022-06-28 10:06:39'),(10,'asdfsaf','updated','updated@esdag.com','$2b$10$zzFguof7T0P3JM.9cftT9uHgq.Mcrl8LhatzBHXE0X.e7Vt2S3r2y','Male','7892e986-304f-4973-963c-0ef8e076b6ce.png','2022-06-28 10:48:33','2022-06-29 13:22:47'),(11,'asdfsaf',NULL,'123@esdagd.com','$2b$10$Py.SdQx3G2kb2tX9vZ0YB.3aAZynFsEr.qTvYy.e2MFXXLBDr35nC',NULL,NULL,'2022-06-29 11:59:06','2022-06-29 11:59:06'),(12,'asdfsaf',NULL,'123@esdagdd.com','$2b$10$nqPkMuPhDWxcNIA/.g97C.WtANeZIAP2UIPxzN6vMugDINOswiDom',NULL,NULL,'2022-06-29 11:59:09','2022-06-29 11:59:09'),(13,'asdfsaf',NULL,'123@esdagddd.com','$2b$10$BT1oujAaYfQ9L1PyqaioceXNjZXlmMDOnyqTft7ajwiElgjL7wMYm',NULL,NULL,'2022-06-29 11:59:12','2022-06-29 11:59:12'),(14,'asdfsaf',NULL,'123@esdagdddd.com','$2b$10$6imZoptf6cMWQ8IPevu9a.gkwxIK.OyI6Xm4KL.4JuKC4n1MoMpee',NULL,NULL,'2022-06-29 11:59:14','2022-06-29 11:59:14'),(15,'asdfsaf',NULL,'123@esdagddddd.com','$2b$10$9Z2.H/pe5fSM/do2.EWMcOMizAbFPxHXL7HNEPi..612XAQJIvCkS',NULL,NULL,'2022-06-29 11:59:16','2022-06-29 11:59:16'),(16,'asdfsaf',NULL,'123@esdagdddddd.com','$2b$10$rOsr368Pf6bd5vOJug7K3e6V12Fp2g2DnWHVW7WtrInwge0EV.k1W',NULL,NULL,'2022-06-29 11:59:18','2022-06-29 11:59:18'),(17,'asdfsaf',NULL,'123@esdagddddddd.com','$2b$10$e588VRUFrm8xQG3lC6KV4uhgvF5AEdRbKnfJJacsxQTH5lYQaCC3G',NULL,NULL,'2022-06-29 11:59:19','2022-06-29 11:59:19'),(18,'asdfsaf',NULL,'123@esdagdddddddd.com','$2b$10$xBE7lAJ1EOAfL5tkH6WUweuHgBCdmX9xnQbzeXPR.PPzRhF/i3yMO',NULL,NULL,'2022-06-29 11:59:22','2022-06-29 11:59:22'),(19,'asdfsaf',NULL,'1234@esdagdddddddd.com','$2b$10$SW4I.8.QnpQkLx0rw7.7nOI1b3au5xNWge1paQ5Izgewf6YqbXHSC',NULL,NULL,'2022-06-29 11:59:25','2022-06-29 11:59:25'),(20,'asdfsaf',NULL,'12345@esdagdddddddd.com','$2b$10$fgGwy1pOxWptaoaU8EtUk.Dh3OGX21RopoREaoplPx9cQXlREQV.i',NULL,NULL,'2022-06-29 11:59:27','2022-06-29 11:59:27'),(21,'asdfsaf',NULL,'123456@esdagdddddddd.com','$2b$10$/e/AybNAU9CUGOuARESAN.2hDvh1uLggAsd/WGbcSQG2Z2p1zEN/a',NULL,NULL,'2022-06-29 11:59:31','2022-06-29 11:59:31'),(22,'asdfsaf',NULL,'1234567@esdagdddddddd.com','$2b$10$Lk1UoG.S.VEV31KvCDi6oOFNPGKKaGDE8MC2LTfSMCAvL6FRh/.d6',NULL,NULL,'2022-06-29 11:59:34','2022-06-29 11:59:34'),(23,'asdfsaf',NULL,'12345678@esdagdddddddd.com','$2b$10$0ShYJtG/MRqbpphviFgoyOAfB4WAe7IJqcErlAJpllZ2rtfLp0kxq',NULL,NULL,'2022-06-29 11:59:36','2022-06-29 11:59:36'),(24,'asdfsaf',NULL,'123456789@esdagdddddddd.com','$2b$10$I7bjGsKAymbjfQbvfEpCiOHjrshoPM6QPz2HtrRTV7nYuM0nsdUa.',NULL,NULL,'2022-06-29 11:59:38','2022-06-29 11:59:38');
/*!40000 ALTER TABLE `UserOrmEntities` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-29 13:33:31
