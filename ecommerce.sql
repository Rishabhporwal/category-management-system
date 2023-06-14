CREATE DATABASE  IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecommerce`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `parentId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parentId` (`parentId`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (5,'Mens',NULL,'2023-06-13 22:00:30','2023-06-13 22:00:30'),(6,'Womens',NULL,'2023-06-13 22:00:44','2023-06-13 22:00:44'),(7,'Clothing',6,'2023-06-13 22:13:01','2023-06-13 22:13:01'),(8,'Dresss',7,'2023-06-13 22:13:16','2023-06-13 22:13:16'),(9,'Causal Dresses',8,'2023-06-13 22:13:57','2023-06-13 22:13:57'),(10,'Party Dresses',8,'2023-06-13 22:14:06','2023-06-13 22:14:06'),(11,'T-Shirts',6,'2023-06-13 22:14:58','2023-06-13 22:14:58'),(12,'Printed T-shirts',11,'2023-06-13 22:15:28','2023-06-13 22:15:28'),(13,'Causal T-Shirts',11,'2023-06-13 22:15:38','2023-06-13 22:15:38'),(14,'Plain T-Shirts',11,'2023-06-13 22:15:48','2023-06-13 22:15:48'),(15,'Footwear',5,'2023-06-13 22:16:25','2023-06-13 22:16:25'),(16,'Branded',15,'2023-06-13 22:16:35','2023-06-13 22:16:35'),(17,'Non Branded',15,'2023-06-13 22:16:44','2023-06-13 22:16:44'),(18,'T-Shirts',5,'2023-06-13 22:17:00','2023-06-13 22:17:00'),(19,'Printed T-shirts',18,'2023-06-13 22:17:17','2023-06-13 22:17:17'),(20,'Causal T-Shirts',18,'2023-06-13 22:17:28','2023-06-13 22:17:28'),(21,'Plain T-Shirts',18,'2023-06-13 22:17:39','2023-06-13 22:17:39'),(22,'Shirts',5,'2023-06-13 22:17:50','2023-06-13 22:17:50'),(23,'Party Shirts',22,'2023-06-13 22:18:07','2023-06-13 22:18:07'),(24,'Causal Shirts',22,'2023-06-13 22:18:23','2023-06-13 22:18:23'),(25,'Plain Shirts',22,'2023-06-13 22:18:33','2023-06-13 22:18:33');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20230612115337-create-categories.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-14  5:22:37
