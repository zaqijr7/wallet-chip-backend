-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 14, 2021 at 06:57 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `walletchip`
--

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `is_transfer` tinyint(1) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 0,
  `transactionDate` datetime NOT NULL,
  `note` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `receiver_id`, `is_transfer`, `amount`, `transactionDate`, `note`, `createdAt`, `updatedAt`) VALUES
(5, 5, 7, 1, 40000, '2021-02-11 23:26:20', 'Buying Macbook', '2021-02-11 16:51:44', '0000-00-00 00:00:00'),
(6, 5, 7, 0, 40000, '2021-02-11 23:26:20', 'Buying Macbook', '2021-02-11 16:51:44', '0000-00-00 00:00:00'),
(7, 5, 6, 1, 25000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 16:59:15', '0000-00-00 00:00:00'),
(8, 5, 6, 0, 25000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 16:59:15', '0000-00-00 00:00:00'),
(9, 5, 6, 1, 25000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:01:43', '0000-00-00 00:00:00'),
(10, 5, 6, 0, 25000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:01:43', '0000-00-00 00:00:00'),
(11, 5, 6, 1, 25000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:07:12', '0000-00-00 00:00:00'),
(12, 5, 6, 0, 25000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:07:12', '0000-00-00 00:00:00'),
(13, 5, 6, 1, 25000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:08:45', '0000-00-00 00:00:00'),
(14, 5, 6, 0, 25000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:08:45', '0000-00-00 00:00:00'),
(15, 7, 5, 1, 25000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:13:11', '0000-00-00 00:00:00'),
(16, 7, 5, 0, 25000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:13:11', '0000-00-00 00:00:00'),
(17, 7, 5, 1, 5000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:15:08', '0000-00-00 00:00:00'),
(18, 7, 5, 0, 5000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:15:08', '0000-00-00 00:00:00'),
(19, 7, 5, 1, 5000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:15:35', '0000-00-00 00:00:00'),
(20, 7, 5, 0, 5000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:15:35', '0000-00-00 00:00:00'),
(21, 7, 5, 1, 1000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:17:03', '0000-00-00 00:00:00'),
(22, 7, 5, 0, 1000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:17:03', '0000-00-00 00:00:00'),
(23, 7, 5, 1, 2000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:17:34', '0000-00-00 00:00:00'),
(24, 7, 5, 0, 2000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-11 17:17:34', '0000-00-00 00:00:00'),
(25, 7, 5, 1, 15000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 08:05:48', '0000-00-00 00:00:00'),
(26, 7, 5, 0, 15000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 08:05:48', '0000-00-00 00:00:00'),
(27, 7, 5, 1, 50000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 08:07:36', '0000-00-00 00:00:00'),
(28, 7, 5, 0, 50000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 08:07:36', '0000-00-00 00:00:00'),
(29, 7, 5, 1, 50000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 08:09:34', '0000-00-00 00:00:00'),
(30, 7, 5, 0, 50000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 08:09:34', '0000-00-00 00:00:00'),
(31, 5, 7, 1, 20000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 16:32:10', '0000-00-00 00:00:00'),
(32, 5, 7, 0, 20000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 16:32:10', '0000-00-00 00:00:00'),
(33, 6, 8, 1, 80000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 16:47:12', '0000-00-00 00:00:00'),
(34, 6, 8, 0, 80000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 16:47:12', '0000-00-00 00:00:00'),
(35, 6, 8, 1, 20000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 16:48:14', '0000-00-00 00:00:00'),
(36, 6, 8, 0, 20000, '2021-02-11 23:26:20', 'Buying Zenbook', '2021-02-12 16:48:14', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `balance` int(11) NOT NULL DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) NOT NULL,
  `picture` varchar(255) NOT NULL DEFAULT 'no_photo.png',
  `phone` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `balance`, `password`, `pin`, `verified`, `picture`, `phone`, `createdAt`, `updatedAt`) VALUES
(5, 'Sam', 'Dicova', 'samdicova', 'samdicova@gmail.com', 80000, '$2a$08$tBWryWj4kUC89Op1sCCPpO.tRcUtdOoP1zx6AIVr5FsaZT.YMLWIm', '$2a$08$gqqJ78/jfwRTXUhufZ1S2uKDAfCnxwdA4O3zP8ChysaPxrL05kvRm', 1, 'no_photo.png', '+62-895-3261-7640', '2021-02-11 12:57:44', '2021-02-12 16:33:04'),
(6, NULL, NULL, 'mathiuskormasela', 'mathiuskormasela@gmail.com', 0, '$2a$10$Uy14MRw.42vhutUn63bshu9L6HDT.2cZN7Nn4DLddvI5s3PBo/GKy', '$2a$08$1mNfVjZbllrOx7qrN7xCx.vGfztIUoDA.snJ41XXw0vU2GTqJV.uK', 1, 'picture-1613147192073.JPG', NULL, '2021-02-11 13:19:59', '2021-02-12 16:48:14'),
(7, 'Mathius', 'Kormasela', 'mathiuskormasela12', 'mathiuskormasela12@gmail.com', 20000, '$2a$08$6OjwdxWNDNYE4k7Dr0PZp.oKJfkG17XW39sCD8JDq21RSpdf/xZAO', '$2a$08$7LVteUvtLmMwRjDHE6VRK.JVbqEXbX7N1jtgKSdw0hw9n3AsXbwem', 1, 'picture-1613142963229.JPG', '089532617640', '2021-02-11 13:21:22', '2021-02-12 16:32:10'),
(8, 'Evalina', 'Sianturi', 'Evalina', 'evalinasianturi77@gmail.com', 100000, '$2a$10$eE37kbZl6qG6uXw6scjGge6G/hrz.Pg99VbYu72Z66EBJ55VzhOqG', '$2a$08$Fc9KJF4koWVyWdJEOQRV9.JIxLkdjVL27p5KkZ2INJpgc3w81LyXa', 1, 'picture-1613148251542.png', '+62-895-3261-7640', '2021-02-12 16:34:17', '2021-02-12 16:48:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `recieverId` (`receiver_id`),
  ADD KEY `sender_id` (`user_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
