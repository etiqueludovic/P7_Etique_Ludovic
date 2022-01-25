-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 25 jan. 2022 à 09:45
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet7`
--
CREATE DATABASE IF NOT EXISTS `projet7` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8_general_ci;
USE `projet7`;

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `CreatAt` timestamp NOT NULL,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `user_name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `CreatAt`, `content`, `user_id`, `post_id`, `user_name`) VALUES
(6, '2022-01-20 06:51:34', 'C\'est moi le plus Fort', 13, 8, 'HULK'),
(8, '2022-01-20 06:51:55', 'ça va faire mal !!', 12, 8, 'Thor'),
(11, '2022-01-22 14:27:08', 'Message test', 12, 9, 'Thor'),
(12, '2022-01-22 14:35:21', 'Message test2', 12, 9, 'Thor'),
(13, '2022-01-23 17:58:51', 'Salut Thor !!', 35, 8, 'Iron Man');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `imageUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `profil_image` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `CreatAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `username` (`username`),
  KEY `profil_image` (`profil_image`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `userId`, `title`, `content`, `imageUrl`, `username`, `profil_image`, `CreatAt`) VALUES
(8, 12, 'Nouveau', 'Je me présente Thor dieu du Tonnerre', 'THOR-1642674042956.jpg', 'Thor', 'http://localhost:3000/images/b57ae37099b4a304bbbaca5c05106902004aebb7r1-1080-802v2_00-1642674345620.jpg', '2022-01-20 10:20:43'),
(9, 13, 'En colère', 'Moi quand je me met en colère', 'Hulk-1642690932.jpg', 'HULK', 'http://localhost:3000/images/Hulk-1642770399.jpg', '2022-01-20 15:02:13'),
(16, 35, 'Homme de fer', 'Me voici me voilà Iron Man !!!', 'ironman-post-1642964432.jpg', 'Iron Man', 'http://localhost:3000/images/ironman-profil-1642958488.jpg', '2022-01-23 19:00:33');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `profil_image` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `bio` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `isAdmin` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `Profil_image` (`profil_image`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `profil_image`, `bio`, `isAdmin`) VALUES
(12, 'Thor', 'thor@thor.fr', '$2b$10$.0A0g9NK.Ck3U9tK85voyel5swfsQa/tuu0VlvLHhwdKp/Pj8T9mG', 'http://localhost:3000/images/b57ae37099b4a304bbbaca5c05106902004aebb7r1-1080-802v2_00-1642674345620.jpg', NULL, 0),
(13, 'HULK', 'hulk@hulk.fr', '$2b$10$I51IgxoIWOT1EDtjAm3OGuzzMgkFh0EZug74ekrsRrKwfv9GMdpVu', 'http://localhost:3000/images/Hulk-1642770399.jpg', 'Le meilleur Avenger', 0),
(14, 'Chargé-e Com', 'charge@com.fr', '$2b$10$nBD2Z9RI.C60c7OhhA/4QOKmDyvU2jyqDziFS5iL6m.xX.FmVv/kG', NULL, NULL, 1),
(35, 'Iron Man', 'IronMan@I.fr', '$2b$10$OyBlFSMcyBMF0uTsWgHXzOqOL0U4.Ajm9AP4wB9psfI0i6e7B6YAq', 'http://localhost:3000/images/ironman-profil-1642958488.jpg', NULL, 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_name`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`profil_image`) REFERENCES `user` (`profil_image`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
