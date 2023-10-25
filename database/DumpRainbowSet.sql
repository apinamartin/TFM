-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rainbow_set
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `credenciales`
--

DROP TABLE IF EXISTS `credenciales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credenciales` (
  `pw` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credenciales`
--

LOCK TABLES `credenciales` WRITE;
/*!40000 ALTER TABLE `credenciales` DISABLE KEYS */;
INSERT INTO `credenciales` VALUES ('1234');
/*!40000 ALTER TABLE `credenciales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id_member` int NOT NULL AUTO_INCREMENT,
  `member_name` varchar(20) NOT NULL,
  `birthday` date NOT NULL,
  `zodiac` varchar(20) NOT NULL,
  `descrip` varchar(300) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_member`),
  UNIQUE KEY `id_member` (`id_member`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'Kenchi','2002-12-13','Sagitario','¡Hola, soy Kenchi! Soy una persona super extrovertida y ambiciosa, siempre he estado interesado por el mundo de las artes, sobre todo del baile y de la interpretación. Me encanta ser parte de Rainbow Set, para mi es como otra familia, aparte de grupo de baile somos un gran grupo de amigos.','src/assets/members/kenchi.jpeg'),(2,'Adri','2002-10-01','Libra','Soy Adri y mi color favorito es el azul. Desde pequeño he sido una persona aficionada por el arte, siempre lo he percibido como una forma de expresión y libertad. Me encanta dibujar y bailar, además de estudiar moda. Rainbow Set es mi segundo hogar, ya que disfruto mucho bailando con mis amigos.','src/assets/members/adri.jpeg'),(3,'Prisma','1998-12-28','Capricornio','¡Soy Prisma y soy quien ha programado esta web! A parte de ser informático y bailar K-Pop, adoro los videojuegos. Siempre he estado rodeado de tecnología. También soy el payaso del grupo (aunque también el mayor). Para mi Rainbow es una vía de escape para desconectar, gracias a todos los miembros.','src/assets/members/prisma.jpeg'),(4,'Fabi','2001-06-16','Virgo','Hola soy Fabi. Soy un fanático de los videojuegos y, de vez en cuando, me convierto en camarógrafo de covers de K-Pop. Mi vida es una mezcla entre ritmo, diversión y creatividad. Lo que más me gusta de ser parte de Rainbow Set es que no sólo disfruto bailando, sino que lo hago junto a buenos amigos.','src/assets/members/fabi.jpg'),(5,'Carlos','2005-05-06','Tauro','Hola soy Carlos. Me encanta bailar desde que tengo conocimiento y le he dedicado mucho tiempo a ello. Soy tímido pero cuando cojo confianza me encanta hacer reír a la gente. Conocí a Rainbow gracias al baile y lo agradezco mucho, ya que con ellos bailar es muy divertido y me anima a auto superarme.','src/assets/members/carlos.jpeg'),(6,'Iker','2003-06-28','Cáncer','¡Hola! Mi nombre es Iker, me gusta mucho bailar, es lo qué más me apasiona pero sobre todo con mi grupo de baile Rainbow Set. Estoy muy feliz con ellos y me hacen sentir super cómodo, somos un grupo muy divertido y amigable, nos ayudamos entre nosotros y fuera del baile somos muy buenos amigos.','src/assets/members/iker.jpeg'),(7,'Moflad','2001-10-31','Escorpio','¡Hola a todos! Soy Moflad, soy una persona introvertida y bastante calmada. Me gustan mucho los videojuegos al igual que el baile. Empecé a bailar gracias a mi hermana, que me integró en el mundo del K-Pop. Ahora disfruto bailando con mis amigos de Rainbow Set, que son como una pequeña familia.','src/assets/members/moflad.jpeg');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members_posts`
--

DROP TABLE IF EXISTS `members_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members_posts` (
  `id_post` int NOT NULL,
  `id_member` int NOT NULL,
  KEY `fk_miembro` (`id_member`),
  KEY `fk_post` (`id_post`),
  CONSTRAINT `fk_miembro` FOREIGN KEY (`id_member`) REFERENCES `members` (`id_member`),
  CONSTRAINT `fk_post` FOREIGN KEY (`id_post`) REFERENCES `posts` (`id_post`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members_posts`
--

LOCK TABLES `members_posts` WRITE;
/*!40000 ALTER TABLE `members_posts` DISABLE KEYS */;
INSERT INTO `members_posts` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(2,1),(2,6),(3,1),(3,2),(3,3),(4,1),(4,2),(4,4),(5,1),(5,5),(5,6),(5,7);
/*!40000 ALTER TABLE `members_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id_post` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `content` varchar(300) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `upload_time` datetime NOT NULL,
  PRIMARY KEY (`id_post`),
  UNIQUE KEY `id_post` (`id_post`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Nueva cover en Youtube - Party O\'Clock de NMIXX','¡Hola a todos! Hemos subido nueva cover en nuestro canal de YouTube. En esta ocasión se trata de Party O\'Clock de NMIXX. Darnos vuestro apoyo dándonos una visita y un like, y si aún no estáis suscritos, ¡id a hacerlo!','https://www.youtube.com/embed/VLsPbAxD8so?si=M5wnC-nDoatj4dau','2023-07-23 16:00:00'),(2,'Nueva cover en Youtube - Shhh de KISS OF LIFE','¡Hola a todos! Hemos subido nueva cover en nuestro canal de YouTube. En esta ocasión se trata de Shhh de KISS OF LIFE. Darnos vuestro apoyo dándonos una visita y un like, y si aún no estáis suscritos, ¡id a hacerlo!','https://www.youtube.com/embed/3XcdokCsxYY?si=zwYvqS-AN3O_nA8-','2023-07-30 16:00:00'),(3,'Nueva cover en Youtube - Do not touch de MISAMO','¡Hola a todos! Hemos subido nueva cover en nuestro canal de YouTube. En esta ocasión se trata de Do not touch de MISAMO, la subunidad japonesa de TWICE. Darnos vuestro apoyo dándonos una visita y un like, y si aún no estáis suscritos, ¡id a hacerlo!','https://www.youtube.com/embed/8abSUok016I?si=CCOY0SgOasuIqDvk','2023-08-20 16:00:00'),(4,'Nueva cover en Youtube - ETA de NewJeans','¡Hola a todos! Hemos subido nueva cover en nuestro canal de YouTube. En esta ocasión se trata de ETA de NewJeans. Darnos vuestro apoyo dándonos una visita y un like, y si aún no estáis suscritos, ¡id a hacerlo!','https://www.youtube.com/embed/k0t5-gf04lg?si=MuHYvysNNrE1XQ_o','2023-08-27 16:00:00'),(5,'Dance in Public - Baggy Jeans de NCT U','¡Hola a todos! Os comunicamos que vamos a realizar un Dance in Public de la canción Baggy Jeans de NCT U este domingo 24 a las 12:30 en Gran Vía. ¡Allí os esperamos!','','2023-09-19 16:00:00');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-25 19:06:32
