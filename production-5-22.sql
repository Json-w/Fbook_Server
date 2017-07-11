-- MySQL dump 10.13  Distrib 5.7.17, for osx10.12 (x86_64)
--
-- Host: 182.254.228.128    Database: Fbook
-- ------------------------------------------------------
-- Server version	5.7.17-log

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
  `imageUrl` text,
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`isbn`,`user_id`),
  KEY `fk_book_user_idx` (`user_id`),
  CONSTRAINT `fk_book_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (18,'9787121168635',1,'疯狂HTML 5/CSS 3/JavaScript讲义','李刚','疯狂HTML 5/CSS 3/JavaScript讲义，ISBN：9787121168635，作者：李刚 编著',1,NULL,'https://img3.doubanio.com/mpic/s27359270.jpg',1),(20,'9787115275790',NULL,'JavaScript高级程序设计（第3版）','[美] Nicholas C. Zakas','本书是JavaScript 超级畅销书的最新版。ECMAScript 5 和HTML5 在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为JavaScript 增添了很多适应未来发展的新特性。本书这一版除增加5 章全新内容外，其他章节也有较大幅度的增补和修订，新内容篇幅约占三分之一。全书从JavaScript 语言实现的各个组成部分——语言核心、DOM、BOM、事件模型讲起，深入浅出地探讨了面向对象编程、Ajax 与Comet 服务器端通信，HTML5 表单、媒体、Canvas（包括WebGL）及Web Workers、地理定位、跨文档传递消息、客户端存储（包括IndexedDB）等新API，还介绍了离线应用和与维护、性能、部署相关的最佳开发实践。本书附录展望了未来的API 和ECMAScript Harmony 规范。\n本书适合有一定编程经验的Web 应用开发人员阅读，也可作为高校及社会实用技术培训相关专业课程的教材。',1,NULL,'https://img3.doubanio.com/lpic/s8958650.jpg',1),(36,'9787506365413',NULL,'钟繇','宋德林','东汉元嘉元年(公元151年)六月初六这天吃罢早饭，钟皓满头银发高束，一把白须飘胸，穿着一身上衣为宽袖偏襟……',22,NULL,'https://img3.doubanio.com/f/shire/5522dd1f5b742d1e1394a17f44d590646b63871d/pics/book-default-large.gif',0),(37,'9787115351531',NULL,'图解HTTP','【日】上野宣','本书对互联网基盘——HTTP协议进行了全面系统的介绍。作者由HTTP协议的发展历史娓娓道来，严谨细致地剖析了HTTP协议的结构，列举诸多常见通信场景及实战案例，最后延伸到Web安全、最新技术动向等方面。本书的特色为在讲解的同时，辅以大量生动形象的通信图例，更好地帮助读者深刻理解HTTP通信过程中客户端与服务器之间的交互情况。读者可通过本书快速了解并掌握HTTP协议的基础，前端工程师分析抓包数据，后端工程师实现REST API、实现自己的HTTP服务器等过程中所需的HTTP相关知识点本书均有介绍。\n本书适合Web开发工程师，以及对HTTP协议感兴趣的各层次读者。',1,NULL,'https://img3.doubanio.com/lpic/s27283822.jpg',0),(38,'9787543074729',NULL,'英语语法看这本就够了大全集','克里斯汀','',1,NULL,'https://img3.doubanio.com/lpic/s28046370.jpg',0),(39,'9787115369093',NULL,'重构','[美]马丁•福勒（Martin Fowler）','本书清晰揭示了重构的过程，解释了重构的原理和最佳实践方式，并给出了何时以及何地应该开始挖掘代码以求改善。书中给出了70 多个可行的重构，每个重构都介绍了一种经过验证的代码变换手法的动机和技术。本书提出的重构准则将帮助你一次一小步地修改你的代码，从而减少了开发过程中的风险。',1,NULL,'https://img3.doubanio.com/lpic/s28259431.jpg',0),(41,'9787115281609',NULL,'锋利的jQuery','单东林','《锋利的jQuery(第2版)》循序渐进地对jQuery的各种函数和方法调用进行了介绍，读者可以系统地掌握jQuery的选择器、DOM操作、事件和动画、AJAX应用、插件、jQuery Mobile、jQuery各个版本变化、jQuery性能优化和技巧等知识点，并结合每个章节后面的案例演示进行练习，达到掌握核心知识点的目的。\n为使读者更好地进行开发实践，《锋利的jQuery(第2版)》的第8章将前7章讲解的知识点和效果进行了整合，打造出一个非常有个性的网站，并从案例研究、网站材料、网站结构、网站样式和网站脚本等方面指导读者参与到项目建设中来。',27,NULL,'https://img1.doubanio.com/lpic/s28026858.jpg',0),(42,'9787121232930',NULL,'深入分析Java Web技术内幕（修订版）','许令波','《深入分析Java Web技术内幕（修订版）》新增了淘宝在无线端的应用实践，包括：CDN 动态加速、多终端化改造、 多终端Session 统一 ，以及在大流量的情况下，如何跨越性能、网络和一个地区的电力瓶颈等内容，并提供了比较完整的解决方案。\n《深入分析Java Web技术内幕（修订版）》主要围绕Java Web 相关技术从三方面全面、深入地进行了阐述。首先介绍前端知识，即在JavaWeb 开发中涉及的一些基本知识，包括Web 请求过程、HTTP、DNS 技术和CDN 技术。其次深入介绍了Java 技术，包括I/O 技术、中文编码问题、Javac 编译原理、class 文件结构解析、ClassLoader 工作机制及JVM 的内存管理等。最后介绍了Java 服务端技术，主要包括Servlet、Session 与Cookie、Tomcat 与Jetty服务器、Spring 容器、iBatis 框架和Velocity 框架等原理介绍，并介绍了服务端的一些优化技术。\n《深入分析Java Web技术内幕（修订版）》不仅介绍这些技术和框架的工作原理，而且结合示例来讲解，通过通俗易懂的文字和丰富、生动的配图，让读者充分并深入理解它们的内部工作原理，同时还结合了设计模式来介绍这些技术背后的架构思维。',1,NULL,'https://img1.doubanio.com/lpic/s27394419.jpg',1),(43,'9787560536453',NULL,'商务英语周末课堂','柳培均','《新东方·商务英语周末课堂:会议英语》专门针对在工作中需要经常主持或出席英语会议，想进一步提高自身会议英语水平的读者编写。要展示自己的能力，在各种会议中的突出表现必不可少。为此，只有掌握会议英语的常用表达，了解会议的召集与筹备流程，有效地控制会议进度、进行议题转换和会议总结等，才能在众多与会者中脱颖而出。认真学习《新东方·商务英语周末课堂:会议英语》，不但可以掌握会议英语的必备表达，更可以熟悉会议流程，为日后主持或参加英语会议打下坚实的基础。随书附赠的MP3光盘对书中的“Key Expressions”、“强化串记”、“迷你测验”及“综合训练”四部分内容进行了朗读。',21,NULL,'https://img3.doubanio.com/lpic/s6237806.jpg',0),(45,'9787506365413',NULL,'钟繇','宋德林','东汉元嘉元年(公元151年)六月初六这天吃罢早饭，钟皓满头银发高束，一把白须飘胸，穿着一身上衣为宽袖偏襟……',21,NULL,'https://img3.doubanio.com/f/shire/5522dd1f5b742d1e1394a17f44d590646b63871d/pics/book-default-large.gif',0);
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
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`book_id`,`startTime`),
  KEY `fk_record_user1_idx` (`user_id`),
  KEY `fk_record_book1_idx` (`book_id`),
  CONSTRAINT `fk_record_book1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_record_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record`
--

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;
INSERT INTO `record` VALUES (15,1,41,'2017-05-14 07:51:50','2017-05-16 14:15:46',0),(30,21,42,'2017-05-16 16:10:07','2017-05-16 16:37:03',0),(31,21,42,'2017-05-16 16:36:02','2017-05-16 16:36:18',0),(32,21,42,'2017-05-16 16:36:43',NULL,1),(33,21,42,'2017-05-17 10:58:23',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'pei','9c1dd1900282a69f96c6fb420e957e08',NULL,'wangpei9679@163.com',NULL),(4,'test','202cb962ac59075b964b07152d234b70',NULL,'wangpei9679@gmail.com',NULL),(12,'32','444',NULL,NULL,NULL),(13,'3','2',NULL,NULL,NULL),(14,'12','33',NULL,NULL,NULL),(15,'1221','1',NULL,NULL,NULL),(16,'2','21123',NULL,NULL,NULL),(21,'1','c4ca4238a0b923820dcc509a6f75849b',NULL,NULL,NULL),(22,'Warner','c4ca4238a0b923820dcc509a6f75849b','18108013146','warner.hooh@gmail.com','Software Park, Chengdu'),(23,'Warner1','c4ca4238a0b923820dcc509a6f75849b',NULL,'www@q.com',NULL),(24,'Warner2','c4ca4238a0b923820dcc509a6f75849b',NULL,'aa@q.com',NULL),(26,'warner3','c4ca4238a0b923820dcc509a6f75849b',NULL,'1111@a.com',NULL),(27,'release','123fead50246387983ee340507115ef4',NULL,'wangpei9679@qq.com',NULL);
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

-- Dump completed on 2017-05-22 23:25:34
