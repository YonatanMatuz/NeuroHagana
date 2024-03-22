-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2024 at 11:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `neuro_hagana`
--
CREATE DATABASE IF NOT EXISTS `neuro_hagana` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
USE `neuro_hagana`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL,
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `category`) VALUES(1, 'The Problem');
INSERT INTO `categories` (`categoryId`, `category`) VALUES(2, 'The Solution');
INSERT INTO `categories` (`categoryId`, `category`) VALUES(3, 'Social Impact');
INSERT INTO `categories` (`categoryId`, `category`) VALUES(5, 'TEAM');
INSERT INTO `categories` (`categoryId`, `category`) VALUES(6, 'ADVISORY BOARD');

-- --------------------------------------------------------

--
-- Table structure for table `infoTopicCategories`
--

CREATE TABLE `infoTopicCategories` (
  `categoryId` int(11) NOT NULL,
  `category` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `infoTopicCategories`
--

INSERT INTO `infoTopicCategories` (`categoryId`, `category`) VALUES(1, 'The Problem');
INSERT INTO `infoTopicCategories` (`categoryId`, `category`) VALUES(2, 'The Solution');
INSERT INTO `infoTopicCategories` (`categoryId`, `category`) VALUES(3, 'Social Impact');

-- --------------------------------------------------------

--
-- Table structure for table `infoTopics`
--

CREATE TABLE `infoTopics` (
  `infoId` int(11) NOT NULL,
  `title` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `categoryId` int(11) NOT NULL,
  `imageName` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `infoTopics`
--

INSERT INTO `infoTopics` (`infoId`, `title`, `description`, `categoryId`, `imageName`) VALUES(19, 'Our Solution', 'The NeuroHagana solution is the first effective treatment designed to be administered by emergency units immediately after a neurotrauma event without the wait for a diagnosis and the  unnecessary loss of time. \r\n\r\nThis unique emergency treatment prevents damage to the neuronal tissue, inhibiting the entire pathology cascade of excitotoxicity right from the start, similar to stopping a snowball from forming.\r\n\r\nThe treatment has to be administered in the first few hours after the injury to prevent serious neurological and functional damage. This gives the injured people the chance of getting their lives back.\r\n', 2, 'e81fb84b-a68f-4a1f-818b-d7de51db6542.jpg');
INSERT INTO `infoTopics` (`infoId`, `title`, `description`, `categoryId`, `imageName`) VALUES(20, 'How It Works', 'Neurotrauma injury triggers a glutamate cascade, causing glutamate excitotoxicity in the central nervous system and progressive neuronal tissue damage. \r\nThe treatment reduces glutamate excitotoxicity by lowering blood glutamate levels. This facilitates the efflux of excess glutamate from the central nervous system to the blood through the blood-brain barrier.\r\n', 2, '8339f589-10aa-497a-ade7-dc922f9a1b7d.jpg');
INSERT INTO `infoTopics` (`infoId`, `title`, `description`, `categoryId`, `imageName`) VALUES(21, 'Patients', 'The new treatment considerably reduces disabilities and improves the overall quality of life of neuro-traumatized patients by increasing their independence and potentially extending their lifespan. This increases their chance of returning to the work cycle, manage social lives and reassimilate into society. ', 3, '8d57e122-ef6c-4c51-95d0-7b44e8956d0b.jpeg');
INSERT INTO `infoTopics` (`infoId`, `title`, `description`, `categoryId`, `imageName`) VALUES(22, 'Families', 'By facilitating rapid recovery from trauma, the need for extensive home support is reduced, including in financial terms, as the associated costs are often borne by the family. Neurotrauma can profoundly disrupt the lives of patients and families, requiring significant adjustments to daily routines, caregiving responsibilities, and emotional care. Families may need to modify homes, vehicles, and environments to accommodate the needs of quadriplegic or paraplegic individuals.\r\n\r\n', 3, '909994b8-3a68-4707-860b-936ef02db2af.jpg');
INSERT INTO `infoTopics` (`infoId`, `title`, `description`, `categoryId`, `imageName`) VALUES(23, 'Medical staff', 'Impact on all medical staff dedicated to the treatment of neurotrauma who will finally be able to effectively treat new cases of neurotrauma.\r\n\r\n\r\n', 3, '6c2c36a0-610c-4f73-b4f3-14411b251902.jpg');
INSERT INTO `infoTopics` (`infoId`, `title`, `description`, `categoryId`, `imageName`) VALUES(24, 'Healthcare System', 'The costs associated with neurotrauma are not limited to immediate medical expenses; they include the long-term costs associated with ongoing care, therapy, and support services required by patients. \r\nThis financial strain is particularly pronounced due to the often prolonged duration of rehabilitation, the high costs of specialist treatments and therapies, and the need for ongoing medical supervision.\r\nIn the United States alone, the annual direct and indirect costs of SCI are estimated at 9.7$ billion.', 3, 'f6e72f26-2c29-458a-92ec-d7306d9209a7.jpg');
INSERT INTO `infoTopics` (`infoId`, `title`, `description`, `categoryId`, `imageName`) VALUES(27, 'The Problem', 'Neurotrauma, such as traumatic brain injury, spinal cord injury, stroke, and others, can have a wide range of permanent consequences. \r\n80% out of all permanent disabilities are caused by secondary injury.\r\n\r\nThe neuropathological process in spinal cord injury is divided into two phases: primary injury as a result of mechanical damage and secondary injury as a result of secondary events such as glutamate excitotoxicity, inflammatory response, axonal and neuronal cell death, and scar formation.\r\n', 1, '5caa5b47-2a8f-43e5-9466-f1b5d47347fa.png');

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--

CREATE TABLE `publications` (
  `publicationId` int(11) NOT NULL,
  `title` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `refUrl` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NOT NULL,
  `imageName` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`publicationId`, `title`, `description`, `refUrl`, `date`, `imageName`) VALUES(19, 'Glutamate', 'Substantially elevated serum glutamate and CSF GOT-1 levels associated with cerebral ischemia and poor neurological outcomes in subarachnoid hemorrhage patients.\r\nScientific Reports 2023; 13:5246', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10066256/pdf/41598_2023_Article_32302.pdf', '2023-03-04', '86260cfe-ce39-4f72-b8ee-8416f79726b9.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES(1, 'Admin');
INSERT INTO `roles` (`roleId`, `roleName`) VALUES(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `teamMemberCategories`
--

CREATE TABLE `teamMemberCategories` (
  `categoryId` int(11) NOT NULL,
  `category` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `teamMemberCategories`
--

INSERT INTO `teamMemberCategories` (`categoryId`, `category`) VALUES(1, 'Team');
INSERT INTO `teamMemberCategories` (`categoryId`, `category`) VALUES(2, 'Advisory Board');

-- --------------------------------------------------------

--
-- Table structure for table `teamMembers`
--

CREATE TABLE `teamMembers` (
  `teamMemberId` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `jobTitle` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `categoryId` int(11) NOT NULL,
  `imageName` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `teamMembers`
--

INSERT INTO `teamMembers` (`teamMemberId`, `name`, `jobTitle`, `description`, `categoryId`, `imageName`) VALUES(34, 'Angela Ruban Ph.D.', 'Founder & CEO', 'Independent neurobiology researcher at Tel Aviv University.\r\nChief Scientific Officer at Braintact Ltd. and Scientific Advisor at “Yeda”, the Tech Transfer Office of the Weizmann Institute. \r\n', 1, '1472c20d-ac38-458b-95a8-ac4796da6164.JPG');
INSERT INTO `teamMembers` (`teamMemberId`, `name`, `jobTitle`, `description`, `categoryId`, `imageName`) VALUES(35, 'Dani Schaumann', 'Co-Founder & Chairman', '+30 years of experience in international banking and finance, board directory and corporate mgmt. In countries such as US, India, China, Israel. \r\n', 1, '471ad817-5f8f-4a8a-b530-d42cc7ba8caa.png');
INSERT INTO `teamMembers` (`teamMemberId`, `name`, `jobTitle`, `description`, `categoryId`, `imageName`) VALUES(36, 'Joyce Bigio', 'Independent Director', 'Independent directory boards of several multinational companies such as FCA-FIAT Chrysler Automobiles and Prysmian. Currently serves on the boards of Luxemburg Real Estate Funds\r\n', 1, '8d70f01e-5911-45f5-9233-ba1d8582c8bc.jpg');
INSERT INTO `teamMembers` (`teamMemberId`, `name`, `jobTitle`, `description`, `categoryId`, `imageName`) VALUES(37, 'Yona Goldshmit Ph.D. ', 'VP of R&D', '+20 years of experience in preclinical research and drug development. PhD in Physiotherapy and Neuroscience, University of Melbourne. Author of over 40 scientific articles.\r\n', 1, 'ddf5fc05-d718-419b-b5ae-0897ce9c3288.jpg');
INSERT INTO `teamMembers` (`teamMemberId`, `name`, `jobTitle`, `description`, `categoryId`, `imageName`) VALUES(38, 'Salvatore Mascia Ph.D.', 'Advisory Board member', 'MIT, Massachusetts. Founder & President at CONTINUUS Pharmaceutical. Manager in Novartis. Doctoral Research in Merck Sharp & Dohme.\r\n', 2, '93c04ebe-3656-42ec-8b61-226f02ad5f2a.jpg');
INSERT INTO `teamMembers` (`teamMemberId`, `name`, `jobTitle`, `description`, `categoryId`, `imageName`) VALUES(39, 'Prof. Pietro Mortini', 'Advisory Board member', 'Head Neurosurgery and Radiosurgery Unit\r\nSan Raffaele Hospital – Milan;\r\nClinical Professor of Neurological Surgery The George Washington University - Washington, DC - USA\r\n', 2, '1399f690-ad78-4a31-bcca-142ab68c2b26.jpg');
INSERT INTO `teamMembers` (`teamMemberId`, `name`, `jobTitle`, `description`, `categoryId`, `imageName`) VALUES(40, 'Prof. Eithan Galun', 'Advisory Board member', 'Full professor of Gene & Cell Therapy at the Hebrew University of Jerusalem. A senior active physician at the Hadassah Hebrew University Hospital Liver Unit. Head of the Gene and Cell Therapy Institute at the Hadassah Hebrew University Hospital\r\n', 2, '5368369c-49ad-4666-997b-226813c08aa7.png');
INSERT INTO `teamMembers` (`teamMemberId`, `name`, `jobTitle`, `description`, `categoryId`, `imageName`) VALUES(41, 'Esmira Naftali Ph.D.', 'CDO & CMC Expert', 'Drug development professional and biopharmaceuticals CMC expert with over 20 years of international pharma industry experience in big Pharma and Biotechnology companie. PhD in Chemistry from University of Latvia, Riga.\r\n', 1, '93b7c2e8-254f-4933-9fd1-cb1507cbac91.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES(4, 'Angela', 'Ruban', 'angellruban@gmail.com', 'f0578fa4fd828b0b6cf079554086e07c418d9958c2c4b59b66009ff1242a1f515dea572ec148295511067982404c93c2c34769b31f3bfffc5da92731139fb957', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `infoTopicCategories`
--
ALTER TABLE `infoTopicCategories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `infoTopics`
--
ALTER TABLE `infoTopics`
  ADD PRIMARY KEY (`infoId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`publicationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `teamMemberCategories`
--
ALTER TABLE `teamMemberCategories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `teamMembers`
--
ALTER TABLE `teamMembers`
  ADD PRIMARY KEY (`teamMemberId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `infoTopicCategories`
--
ALTER TABLE `infoTopicCategories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `infotopics`
--
ALTER TABLE `infoTopics`
  MODIFY `infoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `publications`
--
ALTER TABLE `publications`
  MODIFY `publicationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teamMemberCategories`
--
ALTER TABLE `teamMemberCategories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teamMembers`
--
ALTER TABLE `teamMembers`
  MODIFY `teamMemberId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `infoTopics`
--
ALTER TABLE `infoTopics`
  ADD CONSTRAINT `infoTopics_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `infoTopicCategories` (`categoryId`);

--
-- Constraints for table `teamMembers`
--
ALTER TABLE `teamMembers`
  ADD CONSTRAINT `teamMembers_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `teamMembercategories` (`categoryId`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
