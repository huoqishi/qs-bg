/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : qs

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 11/12/2017 17:45:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `topicId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
BEGIN;
INSERT INTO `comments` VALUES ('0034c3b0-dc28-11e7-b2e3-4dacd4916b65', 'decce2e0-dab3-11e7-8a13-2d4ef471b53b', '3718c040-db13-11e7-be95-eddf9895efe4', '十五字十五字十五字十五字十五字', '2017-12-08 14:56:41', '2017-12-08 14:56:41');
INSERT INTO `comments` VALUES ('53dc7990-dc28-11e7-971b-f9feaf14f8de', 'decce2e0-dab3-11e7-8a13-2d4ef471b53b', '3718c040-db13-11e7-be95-eddf9895efe4', '感觉还没错哦，哈哈哈哈哈!!!!!', '2017-12-08 14:59:02', '2017-12-08 14:59:02');
INSERT INTO `comments` VALUES ('6d21e570-dc28-11e7-971b-f9feaf14f8de', 'decce2e0-dab3-11e7-8a13-2d4ef471b53b', '3718c040-db13-11e7-be95-eddf9895efe4', '天气情,多云，阴，有月亮，星星', '2017-12-08 14:59:44', '2017-12-08 14:59:44');
INSERT INTO `comments` VALUES ('7adfd9f0-dc29-11e7-b8ae-3d5deae8b3d1', 'decce2e0-dab3-11e7-8a13-2d4ef471b53b', '3718c040-db13-11e7-be95-eddf9895efe4', '学霸就是这样赶时间的吗😂😂', '2017-12-08 15:07:17', '2017-12-08 15:07:17');
INSERT INTO `comments` VALUES ('8694f100-dc28-11e7-971b-f9feaf14f8de', 'decce2e0-dab3-11e7-8a13-2d4ef471b53b', '3718c040-db13-11e7-be95-eddf9895efe4', '天空没有我的足迹，但是我曾经飞过', '2017-12-08 15:00:27', '2017-12-08 15:00:27');
INSERT INTO `comments` VALUES ('ddf01c80-dc29-11e7-8bda-bf3f22da5724', 'decce2e0-dab3-11e7-8a13-2d4ef471b53b', '3718c040-db13-11e7-be95-eddf9895efe4', '坂。。。坂本大佬😂', '2017-12-08 15:10:03', '2017-12-08 15:10:03');
INSERT INTO `comments` VALUES ('eb957560-dc29-11e7-8bda-bf3f22da5724', 'decce2e0-dab3-11e7-8a13-2d4ef471b53b', '3718c040-db13-11e7-be95-eddf9895efe4', '你居然看的到别人写的东西，你更厉害 😂', '2017-12-08 15:10:26', '2017-12-08 15:10:26');
INSERT INTO `comments` VALUES ('f276eee0-dc29-11e7-8bda-bf3f22da5724', 'decce2e0-dab3-11e7-8a13-2d4ef471b53b', '3718c040-db13-11e7-be95-eddf9895efe4', '是的，这小孩是我邻居，他爹叫周伯通，也是个神人，能左手打太极右手打咏春。', '2017-12-08 15:10:37', '2017-12-08 15:10:37');
COMMIT;

-- ----------------------------
-- Table structure for thumbups
-- ----------------------------
DROP TABLE IF EXISTS `thumbups`;
CREATE TABLE `thumbups` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `topicId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `thumbUp` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of thumbups
-- ----------------------------
BEGIN;
INSERT INTO `thumbups` VALUES ('decce2e0-dab3-11e7-8a13-2d4ef471b53b', NULL, '3718c040-db13-11e7-be95-eddf9895efe4', 1, '2017-12-08 13:38:29', '2017-12-09 06:40:44');
COMMIT;

-- ----------------------------
-- Table structure for topics
-- ----------------------------
DROP TABLE IF EXISTS `topics`;
CREATE TABLE `topics` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` text CHARACTER SET utf8mb4,
  `content` text CHARACTER SET utf8mb4,
  `cover` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of topics
-- ----------------------------
BEGIN;
INSERT INTO `topics` VALUES ('273e6e90-dc8a-11e7-8c36-27c9dbd51da2', '十    王朝', '顾不上啊顾不上啊顾不上啊顾不上啊顾不上啊', '', '2017-12-09 02:39:18', '2017-12-09 02:39:18');
INSERT INTO `topics` VALUES ('3718c040-db13-11e7-be95-eddf9895efe4', '测试小ddddd明要吃饭ddd', '测试小明要吃饭，我是小明明奔asdf苛a', 'tmp.jpg', '2017-12-07 05:55:23', '2017-12-07 05:55:23');
INSERT INTO `topics` VALUES ('62647dc0-dc8a-11e7-8c36-27c9dbd51da2', '十   fghhhcfhh', '顾不上啊顾不上啊顾不上啊顾不上啊顾不上啊', '', '2017-12-09 02:40:57', '2017-12-09 02:40:57');
INSERT INTO `topics` VALUES ('66f7e890-dc8a-11e7-8c36-27c9dbd51da2', '十   fghhhcfhh', '顾不上啊顾不上啊顾不上啊顾不上啊顾不上啊', '', '2017-12-09 02:41:04', '2017-12-09 02:41:04');
INSERT INTO `topics` VALUES ('7db0b620-dc8a-11e7-8c36-27c9dbd51da2', '十   fghhhcfhh', '顾不上啊顾不上啊顾不上啊顾不上啊顾不上啊', '', '2017-12-09 02:41:43', '2017-12-09 02:41:43');
INSERT INTO `topics` VALUES ('dd22a920-db12-11e7-8f8f-b7e76655901b', '', '', '', '2017-12-07 05:52:52', '2017-12-07 05:52:52');
INSERT INTO `topics` VALUES ('e4940690-db12-11e7-8f8f-b7e76655901b', '', '', '', '2017-12-07 05:53:04', '2017-12-07 05:53:04');
INSERT INTO `topics` VALUES ('e9a5f030-db12-11e7-8f8f-b7e76655901b', '', '', '', '2017-12-07 05:53:13', '2017-12-07 05:53:13');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('9c485c00-daf5-11e7-a74e-19774c3dac7c', 'huoqishi1', NULL, '123456', NULL, NULL, '2017-12-07 02:23:28', '2017-12-07 02:23:28');
INSERT INTO `users` VALUES ('d455a790-daf7-11e7-a74e-19774c3dac7c', '', NULL, '', NULL, NULL, '2017-12-07 02:39:21', '2017-12-07 02:39:21');
INSERT INTO `users` VALUES ('decce2e0-dab3-11e7-8a13-2d4ef471b53b', 'huoqishi', '火骑士空空', '123456', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlY2NlMmUwLWRhYjMtMTFlNy04YTEzLTJkNGVmNDcxYjUzYiIsImlhdCI6MTUxMjc4NTk2OX0.VS15p-Lvxu1ju5TY18r-ot-Lg9gP7nhGsKw291EHvQY', '2017-12-06 18:32:53', '2017-12-09 02:19:29');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
