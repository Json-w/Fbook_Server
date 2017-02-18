-- MySQL dump 10.13  Distrib 5.6.35, for Linux (i686)
--
-- Host: localhost    Database: Fbook
-- ------------------------------------------------------
-- Server version	5.6.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(45) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `bookName` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `brief` text,
  `user_id` int(11) NOT NULL,
  `times` int(11) DEFAULT NULL,
  `imageUrl` varchar(75) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`isbn`,`user_id`),
  KEY `fk_book_user_idx` (`user_id`),
  CONSTRAINT `fk_book_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'123456',1,'test','test','test',1,NULL,NULL),(2,'223456',1,'test2','test','test',1,NULL,NULL),(6,'9787506365413',1,'钟繇','宋德林','东汉元嘉元年(公元151年)六月初六这天吃罢早饭，钟皓满头银发高束，一把白须飘胸，穿着一身上衣为宽袖偏襟……',1,NULL,'https://img1.doubanio.com/f/shire/5522dd1f5b742d1e1394a17f44d590646b63871d/'),(15,'9787111305958',1,'编写高质量代码','曹刘阳','本书以网站重构为楔子，深刻而直接地指出了Web前端开发中存在的重要问题—代码难以维护。如何才能提高代码的可维护性？人是最关键的因素！于是本书紧接着全方位地解析了作为一名合格的前端开发工程师应该掌握的技能和承担的职责，这对刚加入前端开发这一行的读者来说有很大的指导意义。同时，还解读了制定规范和团队合作的重要性。\n本书的核心内容是围绕Web前端开发的三大技术要素——HTML、CSS和JavaScript来深入地探讨编写高质量的HTML代码、CSS代码和JavaScript代码的方法、技巧、规范和最佳实践，从而为编写易于维护的Web前端代码打下坚实的基础。这不是一本单纯的“技术”书籍，没有系统地讲解Web前端开发的基础知识，它更专注于“技巧”，探索如何为“技术”提供最佳“技巧”。\n本书包含了大量的开发思想和原则，都是作者在长期开发实践中积累下来的经验和心得，不同水平的Web前端开发者都会从中获得启发。尤其是对于那些中初级水平的读者而言，本书是一本不可多得的内功修炼秘籍。',1,NULL,'https://img3.doubanio.com/mpic/s4388771.jpg'),(18,'9787121168635',1,'疯狂HTML 5/CSS 3/JavaScript讲义','李刚','疯狂HTML 5/CSS 3/JavaScript讲义，ISBN：9787121168635，作者：李刚 编著',1,NULL,'https://img3.doubanio.com/mpic/s27359270.jpg'),(20,'9787115275790',NULL,'JavaScript高级程序设计（第3版）','[美] Nicholas C. Zakas','本书是JavaScript 超级畅销书的最新版。ECMAScript 5 和HTML5 在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为JavaScript 增添了很多适应未来发展的新特性。本书这一版除增加5 章全新内容外，其他章节也有较大幅度的增补和修订，新内容篇幅约占三分之一。全书从JavaScript 语言实现的各个组成部分——语言核心、DOM、BOM、事件模型讲起，深入浅出地探讨了面向对象编程、Ajax 与Comet 服务器端通信，HTML5 表单、媒体、Canvas（包括WebGL）及Web Workers、地理定位、跨文档传递消息、客户端存储（包括IndexedDB）等新API，还介绍了离线应用和与维护、性能、部署相关的最佳开发实践。本书附录展望了未来的API 和ECMAScript Harmony 规范。\n本书适合有一定编程经验的Web 应用开发人员阅读，也可作为高校及社会实用技术培训相关专业课程的教材。',1,NULL,'https://img3.doubanio.com/lpic/s8958650.jpg'),(24,'9787111186823',NULL,'UML和模式应用','拉曼','《UML和模式应用(原书第3版)》英文版面世以来，广受业界专家和读者的好评，历经3个版本的锤炼，吸收了大量OOA，D的精华思想和现代实践方法。全书叙述清晰、用词精炼、构思巧妙，将面向对象分析设计的概念、过程、方法、原则和个人的实践建议娓娓道来，以实例为证，将软件的分析和设计的过程叙述得如逻辑推理一般，于细节处见真知。\n《UML和模式应用(原书第3版)》是一本经典的面向对象分析设计技术的入门书，适用范围广泛，从初学者到有一定对象技术知识但希望进一步提高开发水平的中级读者，甚至是资深的专业人员，都可以从本书获益匪浅，同时，本书也适合作为高等院校相关课程的教材和各类培训班的辅导教材。',1,NULL,'https://img3.doubanio.com/lpic/s1919002.jpg');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_record_user1_idx` (`user_id`),
  KEY `fk_record_book1_idx` (`book_id`),
  CONSTRAINT `fk_record_book1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_record_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record`
--

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;
/*!40000 ALTER TABLE `record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'pei','pei',NULL,'wangpei9679@163.com',NULL),(4,'test','123',NULL,'wangpei9679@gmail.com',NULL),(5,'doubanTest1','doubanTest2',NULL,NULL,NULL),(6,'doubanTest3','doubanTest3',NULL,NULL,NULL),(7,'doubanTest4','doubanTest4',NULL,NULL,NULL),(8,'doubanTest5','doubanTest5',NULL,NULL,NULL),(9,'doubanTest6','doubanTest6',NULL,NULL,NULL),(10,'aaa','bbbb',NULL,NULL,NULL),(11,'a','v',NULL,NULL,NULL),(12,'32','444',NULL,NULL,NULL),(13,'3','2',NULL,NULL,NULL),(14,'12','33',NULL,NULL,NULL),(15,'1221','1',NULL,NULL,NULL),(16,'2','21123',NULL,NULL,NULL),(21,'1','1',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-18  0:35:10
