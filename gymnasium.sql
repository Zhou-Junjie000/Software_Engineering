/*
 Navicat Premium Data Transfer

 Source Server         : 180.76.154.60
 Source Server Type    : MySQL
 Source Server Version : 50737
 Source Host           : 180.76.154.60:3306
 Source Schema         : gymnasium

 Target Server Type    : MySQL
 Target Server Version : 50737
 File Encoding         : 65001

 Date: 28/04/2022 17:55:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_book
-- ----------------------------
DROP TABLE IF EXISTS `t_book`;
CREATE TABLE `t_book`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '预约类型 私教  团体课 器材',
  `coachid` int(11) NULL DEFAULT NULL COMMENT '教练id',
  `courseid` int(11) NULL DEFAULT NULL COMMENT '课程id',
  `materialid` int(255) NULL DEFAULT NULL COMMENT '器材id',
  `booktime` timestamp(0) NULL DEFAULT NULL COMMENT '预约时间',
  `userid` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `createtime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '生成时间',
  `area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '场地',
<<<<<<< HEAD
=======
  `cost` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '1',
  `cost1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '2',
`cost2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '3',
`pay` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '3',

>>>>>>> e1a8a41 (sprint4)
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_book
-- ----------------------------
<<<<<<< HEAD
INSERT INTO `t_book` VALUES (1, 'coach', 1, NULL, NULL, '2022-01-26 12:00:00', 5, '2022-04-25 14:55:48', '101');
INSERT INTO `t_book` VALUES (2, 'coach', 1, NULL, NULL, '2022-01-26 12:00:00', 5, '2022-04-25 14:57:00', '101');
INSERT INTO `t_book` VALUES (3, 'course', NULL, 1, NULL, '2022-04-25 18:00:00', 10, '2022-04-25 16:42:50', '104');
INSERT INTO `t_book` VALUES (4, 'course', NULL, 1, NULL, '2022-04-25 18:00:00', 10, '2022-04-25 16:47:03', '104');
INSERT INTO `t_book` VALUES (5, 'course', NULL, 1, NULL, '2022-04-25 18:00:00', 10, '2022-04-25 16:58:30', '104');
INSERT INTO `t_book` VALUES (11, 'course', NULL, 1, NULL, '2022-04-27 18:00:00', 10, '2022-04-27 14:53:13', '104');
INSERT INTO `t_book` VALUES (13, 'course', NULL, 3, NULL, '2022-04-27 17:00:00', 10, '2022-04-27 14:53:15', '102');
INSERT INTO `t_book` VALUES (18, 'coach', 1, NULL, NULL, '2022-04-27 18:00:00', 10, '2022-04-27 16:28:29', '101');
INSERT INTO `t_book` VALUES (22, 'material', NULL, NULL, 4, '2022-04-27 17:00:00', 10, '2022-04-27 16:55:51', '102');
INSERT INTO `t_book` VALUES (30, 'material', NULL, NULL, 5, '2022-04-28 16:00:00', 12, '2022-04-28 15:36:22', '102');
INSERT INTO `t_book` VALUES (31, 'coach', 1, NULL, NULL, '2022-04-28 20:00:00', 13, '2022-04-28 15:43:54', '101');
INSERT INTO `t_book` VALUES (32, 'coach', 2, NULL, NULL, '2022-04-28 19:00:00', 13, '2022-04-28 15:44:04', '102');
INSERT INTO `t_book` VALUES (33, 'material', NULL, NULL, 4, '2022-04-28 17:00:00', 13, '2022-04-28 15:44:18', '102');
INSERT INTO `t_book` VALUES (34, 'material', NULL, NULL, 4, '2022-04-28 20:00:00', 13, '2022-04-28 15:54:59', '102');
INSERT INTO `t_book` VALUES (35, 'material', NULL, NULL, 2, '2022-04-28 19:00:00', 13, '2022-04-28 15:55:35', '102');
INSERT INTO `t_book` VALUES (37, 'material', NULL, NULL, 4, '2022-04-28 17:00:00', 10, '2022-04-28 16:10:40', '102');
INSERT INTO `t_book` VALUES (38, 'course', NULL, 1, NULL, '2022-04-28 18:00:00', 10, '2022-04-28 16:10:56', '104');
INSERT INTO `t_book` VALUES (39, 'coach', 1, NULL, NULL, '2022-04-28 18:00:00', 14, '2022-04-28 16:59:09', '101');
INSERT INTO `t_book` VALUES (41, 'course', NULL, 1, NULL, '2022-04-28 18:00:00', 14, '2022-04-28 16:59:25', '104');
INSERT INTO `t_book` VALUES (42, 'course', NULL, 3, NULL, '2022-04-28 17:00:00', 14, '2022-04-28 16:59:30', '102');
INSERT INTO `t_book` VALUES (43, 'material', NULL, NULL, 4, '2022-04-28 20:00:00', 14, '2022-04-28 16:59:48', '102');
=======
INSERT INTO `t_book` VALUES (1, 'coach', 1, NULL, NULL, '2022-01-26 12:00:00', 5, '2022-04-25 14:55:48', '101',NULL,NULL,NULL,NULL);
INSERT INTO `t_book` VALUES (2, 'coach', 1, NULL, NULL, '2022-01-26 12:00:00', 5, '2022-04-25 14:57:00', '101',NULL,NULL,NULL,NULL);
INSERT INTO `t_book` VALUES (3, 'course', NULL, 1, NULL, '2022-04-25 18:00:00', 10, '2022-04-25 16:42:50', '104',NULL,NULL,NULL,NULL);


>>>>>>> e1a8a41 (sprint4)

-- ----------------------------
-- Table structure for t_card
-- ----------------------------
DROP TABLE IF EXISTS `t_card`;
CREATE TABLE `t_card`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类型',
  `startdate` date NULL DEFAULT NULL COMMENT '开始日期',
  `enddate` date NULL DEFAULT NULL COMMENT '结束日期',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `createtime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `fee` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '价格',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_card
-- ----------------------------
INSERT INTO `t_card` VALUES (3, 6, '年卡', '2022-01-01', '2022-12-31', '这是一个年卡', '2022-04-10 08:37:52', '1200');
INSERT INTO `t_card` VALUES (4, 7, '月卡', '2022-04-10', '2023-05-31', '这是一个月卡', '2022-04-10 08:38:29', '600');
INSERT INTO `t_card` VALUES (6, NULL, '团体课卡', '2022-04-13', '2022-05-31', '这是一个团体课卡', '2022-04-24 14:22:38', '300');
INSERT INTO `t_card` VALUES (7, NULL, '私教卡', '2022-04-12', '2022-05-31', '这是私教卡', '2022-04-24 21:32:15', '100');
<<<<<<< HEAD

=======
INSERT INTO `t_card` VALUES (2, NULL, '器材卡', '2022-04-13', '2022-05-31', '这是一个团体课卡', '2022-04-24 14:22:38', '300');
>>>>>>> e1a8a41 (sprint4)
-- ----------------------------
-- Table structure for t_coach
-- ----------------------------
DROP TABLE IF EXISTS `t_coach`;
CREATE TABLE `t_coach`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '教练姓名',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '性别',
  `age` int(11) NULL DEFAULT NULL COMMENT '年龄',
  `info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '个人信息',
  `area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '场地',
<<<<<<< HEAD
=======
  `cost` int(11),
>>>>>>> e1a8a41 (sprint4)
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_coach
-- ----------------------------
<<<<<<< HEAD
INSERT INTO `t_coach` VALUES (1, '教练1', '0', 24, '健身行业从业11年，专业心态，哲学讲师出身，康复技术业内知名，曾于各大俱乐部授课，并全国巡回培训。业内知名康复导师。培训弟子众多。本学院金牌，人气健身导师', '101');
INSERT INTO `t_coach` VALUES (2, '教练2', '1', 32, '健身行业从业21年，体育运动系专业出身，国家级健身指导员，培育出无数弟子，获得全国冠亚季军，很多弟子在健身行业，和健身培训行业，为知名导师，为国家健身产业做出巨大贡献', '102');
INSERT INTO `t_coach` VALUES (5, '教练3', '1', 33, '这是教练3，修改个人介绍', '101');
=======
INSERT INTO `t_coach` VALUES (1, '教练1', '0', 24, '健身行业从业11年，专业心态，哲学讲师出身，康复技术业内知名，曾于各大俱乐部授课，并全国巡回培训。业内知名康复导师。培训弟子众多。本学院金牌，人气健身导师', '101','100');
INSERT INTO `t_coach` VALUES (2, '教练2', '1', 32, '健身行业从业21年，体育运动系专业出身，国家级健身指导员，培育出无数弟子，获得全国冠亚季军，很多弟子在健身行业，和健身培训行业，为知名导师，为国家健身产业做出巨大贡献', '102','100');
INSERT INTO `t_coach` VALUES (5, '教练3', '1', 33, '这是教练3，修改个人介绍', '101','100');
>>>>>>> e1a8a41 (sprint4)

-- ----------------------------
-- Table structure for t_course
-- ----------------------------
DROP TABLE IF EXISTS `t_course`;
CREATE TABLE `t_course`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '课程名称',
  `info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '课程介绍',
  `day` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上课日期',
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上课时间',
  `coach` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上课教练',
  `area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '场地',
  `createdate` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
<<<<<<< HEAD
=======
   `cost` int(11),
>>>>>>> e1a8a41 (sprint4)
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_course
-- ----------------------------
<<<<<<< HEAD
INSERT INTO `t_course` VALUES (1, '动感单车', '这是动感单车的课程', '每天', '18:00:00', NULL, '104', '2022-04-27 16:16:17');
INSERT INTO `t_course` VALUES (2, '课程1', '这是课程1的简介', '每天', '16:00:00', NULL, '101', '2022-04-27 16:16:17');
INSERT INTO `t_course` VALUES (3, '课程2', '这是', '每天', '17:00:00', NULL, '102', '2022-04-27 16:16:17');
INSERT INTO `t_course` VALUES (4, '课程3', '这是课程3的简介,修改课程简介', '每天', '16:00:00', NULL, '102', '2022-04-27 16:52:22');
=======
INSERT INTO `t_course` VALUES (1, '动感单车', '这是动感单车的课程', '每天', '18:00:00', NULL, '104', '2022-04-27 16:16:17','100');
INSERT INTO `t_course` VALUES (2, '课程1', '这是课程1的简介', '每天', '16:00:00', NULL, '101', '2022-04-27 16:16:17','100');
INSERT INTO `t_course` VALUES (3, '课程2', '这是', '每天', '17:00:00', NULL, '102', '2022-04-27 16:16:17','100');
INSERT INTO `t_course` VALUES (4, '课程3', '这是课程3的简介,修改课程简介', '每天', '16:00:00', NULL, '102', '2022-04-27 16:52:22','100');
>>>>>>> e1a8a41 (sprint4)

-- ----------------------------
-- Table structure for t_dept
-- ----------------------------
DROP TABLE IF EXISTS `t_dept`;
CREATE TABLE `t_dept`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_dept
-- ----------------------------

-- ----------------------------
-- Table structure for t_dict
-- ----------------------------
DROP TABLE IF EXISTS `t_dict`;
CREATE TABLE `t_dict`  (
  `ID` varchar(65) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `TYPE` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '大项标识',
  `NAME` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '字典项分组名称',
  `STATUS` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '状态',
  `REMARK` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '备注',
  INDEX `idx_TYPE`(`TYPE`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_dict
-- ----------------------------
INSERT INTO `t_dict` VALUES ('1', 'area', '场地', '1', NULL);

-- ----------------------------
-- Table structure for t_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `t_dict_data`;
CREATE TABLE `t_dict_data`  (
  `ID` varchar(65) CHARACTER SET gbk COLLATE gbk_chinese_ci NOT NULL,
  `FLDKEY` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '字典项',
  `VALUE` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '翻译值',
  `DICT_TYPE` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '字典项所属组ID，对应sys_dict的type',
  `STATUS` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '状态',
  `REMARK` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '备注',
  `ORDERNUM` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '排序字段',
  `DICT_ID` varchar(65) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '字典项所属组ID，对应sys_dict的type',
  INDEX `FLDKEY`(`FLDKEY`, `DICT_TYPE`) USING BTREE,
  INDEX `idx_DICT_ID`(`DICT_ID`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_dict_data
-- ----------------------------
INSERT INTO `t_dict_data` VALUES ('1', '101', '游泳池', 'area', '1', NULL, '1', '1');
INSERT INTO `t_dict_data` VALUES ('2', '102', '健身室', 'area', '1', NULL, '2', '1');
INSERT INTO `t_dict_data` VALUES ('3', '103', '网球场', 'area', '1', NULL, '3', '1');
INSERT INTO `t_dict_data` VALUES ('4', '104', '运动大厅', 'area', '1', NULL, '4', '1');

-- ----------------------------
-- Table structure for t_fee
-- ----------------------------
DROP TABLE IF EXISTS `t_fee`;
CREATE TABLE `t_fee`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '交费类型 course coach card',
  `courseid` int(11) NULL DEFAULT NULL COMMENT '课程id',
  `coachid` int(11) NULL DEFAULT NULL COMMENT '私教id',
  `cardid` int(11) NULL DEFAULT NULL COMMENT '会员卡id',
  `userid` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `num` int(11) NULL DEFAULT NULL COMMENT '课程数',
  `fee` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '费用',
  `feetime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '交费日期',
  `startdate` timestamp(0) NULL DEFAULT NULL COMMENT '开始日期',
  `enddate` timestamp(0) NULL DEFAULT NULL COMMENT '截止日期',
<<<<<<< HEAD
=======
   `bookid` int(11) NULL DEFAULT NULL COMMENT '预约id',
   `materialid` int(11) NULL DEFAULT NULL COMMENT 'id',
>>>>>>> e1a8a41 (sprint4)
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_fee
-- ----------------------------
<<<<<<< HEAD
INSERT INTO `t_fee` VALUES (16, '月卡', NULL, NULL, 4, 12, NULL, '600', '2022-04-28 12:00:30', '2022-04-10 00:00:00', '2023-04-30 00:00:00');
INSERT INTO `t_fee` VALUES (17, '游泳卡', NULL, NULL, 5, 12, NULL, '1000', '2022-04-28 12:02:22', '2022-04-12 00:00:00', '2022-04-22 00:00:00');
INSERT INTO `t_fee` VALUES (21, '私教卡', NULL, NULL, 7, 12, NULL, '100', '2022-04-28 15:15:53', '2022-04-12 00:00:00', '2022-04-30 00:00:00');
INSERT INTO `t_fee` VALUES (22, '月卡', NULL, NULL, 4, 13, NULL, '600', '2022-04-28 15:43:30', '2022-04-10 00:00:00', '2023-04-30 00:00:00');
INSERT INTO `t_fee` VALUES (23, '团体课卡', NULL, NULL, 6, 13, NULL, '300', '2022-04-28 15:43:39', '2022-04-13 00:00:00', '2022-04-21 00:00:00');
INSERT INTO `t_fee` VALUES (24, '私教卡', NULL, NULL, 7, 13, NULL, '100', '2022-04-28 15:43:46', '2022-04-12 00:00:00', '2022-04-30 00:00:00');
INSERT INTO `t_fee` VALUES (25, '团体课卡', NULL, NULL, 6, 13, NULL, '300', '2022-04-28 15:50:23', '2022-04-13 00:00:00', '2022-04-21 00:00:00');
INSERT INTO `t_fee` VALUES (26, '月卡', NULL, NULL, 4, 10, NULL, '600', '2022-04-28 15:53:57', '2022-04-10 00:00:00', '2023-04-30 00:00:00');
INSERT INTO `t_fee` VALUES (27, '团体课卡', NULL, NULL, 6, 10, NULL, '300', '2022-04-28 16:00:50', '2022-04-13 00:00:00', '2022-05-31 00:00:00');
INSERT INTO `t_fee` VALUES (28, '月卡', NULL, NULL, 4, 14, NULL, '600', '2022-04-28 16:58:44', '2022-04-10 00:00:00', '2023-05-31 00:00:00');
INSERT INTO `t_fee` VALUES (29, '团体课卡', NULL, NULL, 6, 14, NULL, '300', '2022-04-28 16:58:52', '2022-04-13 00:00:00', '2022-05-31 00:00:00');
INSERT INTO `t_fee` VALUES (30, '私教卡', NULL, NULL, 7, 14, NULL, '100', '2022-04-28 16:59:00', '2022-04-12 00:00:00', '2022-05-31 00:00:00');
=======
INSERT INTO `t_fee` VALUES (16, '月卡', NULL, NULL, 4, 12, NULL, '600', '2022-04-28 12:00:30', '2022-04-10 00:00:00', '2023-04-30 00:00:00','1',NULL);

INSERT INTO `t_fee` VALUES (22, '月卡', NULL, NULL, 4, 13, NULL, '600', '2022-04-28 15:43:30', '2022-04-10 00:00:00', '2023-04-30 00:00:00','2',NULL);



INSERT INTO `t_fee` VALUES (26, '月卡', NULL, NULL, 4, 10, NULL, '600', '2022-04-28 15:53:57', '2022-04-10 00:00:00', '2023-04-30 00:00:00','3',NULL);

INSERT INTO `t_fee` VALUES (28, '月卡', NULL, NULL, 4, 14, NULL, '600', '2022-04-28 16:58:44', '2022-04-10 00:00:00', '2023-05-31 00:00:00','5',NULL);
>>>>>>> e1a8a41 (sprint4)

-- ----------------------------
-- Table structure for t_material
-- ----------------------------
DROP TABLE IF EXISTS `t_material`;
CREATE TABLE `t_material`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '器材名称',
  `num` int(11) NULL DEFAULT NULL COMMENT '数量',
  `info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '器材信息',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态',
  `createdate` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '录入日期',
<<<<<<< HEAD
=======
  `area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '场地',
  `cost` int(11) NULL DEFAULT NULL COMMENT '数量',
>>>>>>> e1a8a41 (sprint4)
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_material
-- ----------------------------
<<<<<<< HEAD
INSERT INTO `t_material` VALUES (1, '跑步机', NULL, '跑步机在健身中非常的常见，是我们室内跑步必不可少的一项运动器材，能够调节跑步的速度，在跑步的皮带上采用防滑皮带，对于我们室内运动非常的方便。并且通过跑步机还有一项优点就是能够控制自己的跑步频率，来养成自己的跑步习惯，因为在固定的速度下进行跑步时，能够有效的控制我们的跑步频率', '可用', '2022-04-10 20:15:50');
INSERT INTO `t_material` VALUES (2, '杠铃', NULL, '杠铃是我们非常常见的健身器材，是我们力量训练的辅助健身器材，有大杠铃和小杠铃，不同的杠铃有不同的作用，杠铃可以调节运动的强度和重量，在健身运动中非常的实用，并且应用也非常的广泛', '可用', '2022-04-10 20:15:50');
INSERT INTO `t_material` VALUES (3, '腹肌板', NULL, '腹肌板是做仰卧起坐辅助的健身器材，能够帮助我们更好的造成仰卧起坐的健身运动，我们在使用腹肌板进行健身运动时，能帮助我们将腿固定，这样能够让我们全身心投入到仰卧起坐中，腹肌板是每个健身房必不可少的健身器材，非常的实用', '可用', '2022-04-10 20:15:50');
INSERT INTO `t_material` VALUES (4, '动感单车', NULL, '动感单车是在音乐节奏下，按节奏进行骑车的一项健身运动，这样不仅能活跃心情，起到放松压力的效果，并且动感单车还能够起到减脂健身的作用，动感单车不仅仅在健身房中使用，现在很多家庭也都安装动感单车，非常受广大健身爱好者的欢迎', '可用', '2022-04-10 20:15:50');
INSERT INTO `t_material` VALUES (5, '器材1', NULL, '这是器材1的简介，修改', '正常', '2022-04-27 16:52:57');
=======
INSERT INTO `t_material` VALUES (1, '跑步机', NULL, '跑步机在健身中非常的常见，是我们室内跑步必不可少的一项运动器材，能够调节跑步的速度，在跑步的皮带上采用防滑皮带，对于我们室内运动非常的方便。并且通过跑步机还有一项优点就是能够控制自己的跑步频率，来养成自己的跑步习惯，因为在固定的速度下进行跑步时，能够有效的控制我们的跑步频率', '可用', '2022-04-10 20:15:50','104','100');
INSERT INTO `t_material` VALUES (2, '杠铃', NULL, '杠铃是我们非常常见的健身器材，是我们力量训练的辅助健身器材，有大杠铃和小杠铃，不同的杠铃有不同的作用，杠铃可以调节运动的强度和重量，在健身运动中非常的实用，并且应用也非常的广泛', '可用', '2022-04-10 20:15:50','104','100');
INSERT INTO `t_material` VALUES (3, '腹肌板', NULL, '腹肌板是做仰卧起坐辅助的健身器材，能够帮助我们更好的造成仰卧起坐的健身运动，我们在使用腹肌板进行健身运动时，能帮助我们将腿固定，这样能够让我们全身心投入到仰卧起坐中，腹肌板是每个健身房必不可少的健身器材，非常的实用', '可用', '2022-04-10 20:15:50','104','100');
INSERT INTO `t_material` VALUES (4, '动感单车', NULL, '动感单车是在音乐节奏下，按节奏进行骑车的一项健身运动，这样不仅能活跃心情，起到放松压力的效果，并且动感单车还能够起到减脂健身的作用，动感单车不仅仅在健身房中使用，现在很多家庭也都安装动感单车，非常受广大健身爱好者的欢迎', '可用', '2022-04-10 20:15:50','104','100');
INSERT INTO `t_material` VALUES (5, '器材1', NULL, '这是器材1的简介，修改', '正常', '2022-04-27 16:52:57','104','100');
>>>>>>> e1a8a41 (sprint4)

-- ----------------------------
-- Table structure for t_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu`  (
  `ID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `NAME` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单名称',
  `PID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父菜单ID',
  `ICON` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标',
  `URL` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '链接地址',
  `ORDERNUM` int(65) NULL DEFAULT NULL COMMENT '菜单顺序',
  `TYPE` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_menu
-- ----------------------------
INSERT INTO `t_menu` VALUES ('1', '用户管理', '-1', 'icon-guanli', 'userManager/list', 20, '1');
INSERT INTO `t_menu` VALUES ('2', '私教管理', '-1', 'icon-sijiao', 'coach/list', 2, '1');
INSERT INTO `t_menu` VALUES ('3', '课程管理', '-1', 'icon-kechengguanli', 'course/list', 3, '1');
INSERT INTO `t_menu` VALUES ('4', '器材管理', '-1', 'icon-qicaiguanli', 'material/list', 4, '1');
INSERT INTO `t_menu` VALUES ('5', '会员卡管理', '-1', 'icon-vip', 'card/list', 5, '1');
INSERT INTO `t_menu` VALUES ('6', '健身房统计', '-1', 'icon-shouru', 'fee/list2', 6, '1');

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role`  (
  `ID` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `NAME` varchar(64) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '角色名称'
) ENGINE = MyISAM CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES ('1', '管理员');
<<<<<<< HEAD
=======
INSERT INTO `t_role` VALUES ('0', '会员用户');
INSERT INTO `t_role` VALUES ('2', '普通用户');
>>>>>>> e1a8a41 (sprint4)

-- ----------------------------
-- Table structure for t_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_role_menu`;
CREATE TABLE `t_role_menu`  (
  `ROLE_ID` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `MENU_ID` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_role_menu
-- ----------------------------
INSERT INTO `t_role_menu` VALUES ('1', '1');
INSERT INTO `t_role_menu` VALUES ('1', '2');
INSERT INTO `t_role_menu` VALUES ('1', '3');
INSERT INTO `t_role_menu` VALUES ('1', '4');
INSERT INTO `t_role_menu` VALUES ('1', '5');
INSERT INTO `t_role_menu` VALUES ('1', '6');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `ACCOUNT` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '登录名',
  `PASSWORD` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '密码',
  `NAME` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT 'S',
  `MAIL` varchar(100) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '邮箱地址',
  `DEPT` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '001 河北 002 北电部',
  `SEX` varchar(6) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '性别，0：男，1：女',
<<<<<<< HEAD
=======
  `SAFEPASSWORD` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '安全密码',
   `ROLEID` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
>>>>>>> e1a8a41 (sprint4)
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `idx_ACCOUNT`(`ACCOUNT`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 15 CHARACTER SET = gbk COLLATE = gbk_chinese_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
<<<<<<< HEAD
INSERT INTO `t_user` VALUES (1, 'xlifeng', '96e79218965eb72c92a549dd5a330112', '邢丽峰', '', '001', '1');
INSERT INTO `t_user` VALUES (5, '管理员', '751cb3f4aa17c36186f4856c8982bf27', '王俊勇', '2838493849@qq.com', '', '0');
INSERT INTO `t_user` VALUES (6, '张三', '751cb3f4aa17c36186f4856c8982bf27', '张三', 'xlf0107@163.com', '', '0');
INSERT INTO `t_user` VALUES (7, '李四', '751cb3f4aa17c36186f4856c8982bf27', '李四', 'xlf0107@163.com', '', '0');
INSERT INTO `t_user` VALUES (10, 'lsx', 'e10adc3949ba59abbe56e057f20f883e', '李世鑫', '', '', '');
INSERT INTO `t_user` VALUES (11, '王五', 'd41d8cd98f00b204e9800998ecf8427e', '王五', 'xlf0107@163.com', '', '0');
INSERT INTO `t_user` VALUES (12, 'test1', 'e10adc3949ba59abbe56e057f20f883e', '测试账号1', '', '', '');
INSERT INTO `t_user` VALUES (13, 'test2', 'e10adc3949ba59abbe56e057f20f883e', '测试账号2', '', '', '');
INSERT INTO `t_user` VALUES (14, 'test3', 'e10adc3949ba59abbe56e057f20f883e', '测试账号3', 'xlf0107@153.com', '', '0');
=======
INSERT INTO `t_user` VALUES (1, 'xlifeng', '96e79218965eb72c92a549dd5a330112', '邢丽峰', '', '001', '1','111111','1');
INSERT INTO `t_user` VALUES (5, '管理员', '751cb3f4aa17c36186f4856c8982bf27', '王俊勇', '2838493849@qq.com', '', '0','111111','1');
INSERT INTO `t_user` VALUES (6, '张三', '751cb3f4aa17c36186f4856c8982bf27', '张三', 'xlf0107@163.com', '', '0','111111','1');
INSERT INTO `t_user` VALUES (7, '李四', '751cb3f4aa17c36186f4856c8982bf27', '李四', 'xlf0107@163.com', '', '0','111111','1');
INSERT INTO `t_user` VALUES (10, 'lsx', 'e10adc3949ba59abbe56e057f20f883e', '李世鑫', '', '', '','111111','1');
INSERT INTO `t_user` VALUES (11, '王五', 'd41d8cd98f00b204e9800998ecf8427e', '王五', 'xlf0107@163.com', '', '0','111111','1');
INSERT INTO `t_user` VALUES (12, 'test1', 'e10adc3949ba59abbe56e057f20f883e', '测试账号1', '', '', '','123456','1');
INSERT INTO `t_user` VALUES (13, 'test2', 'e10adc3949ba59abbe56e057f20f883e', '测试账号2', '', '', '','111111','1');
INSERT INTO `t_user` VALUES (14, 'test3', 'e10adc3949ba59abbe56e057f20f883e', '测试账号3', 'xlf0107@153.com', '', '0','111111','1');
>>>>>>> e1a8a41 (sprint4)

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
<<<<<<< HEAD
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role`  (
  `USER_ID` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `ROLE_ID` varchar(32) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
INSERT INTO `t_user_role` VALUES ('1', '1');
INSERT INTO `t_user_role` VALUES ('', '');
INSERT INTO `t_user_role` VALUES ('', '');
INSERT INTO `t_user_role` VALUES ('4', '1');
INSERT INTO `t_user_role` VALUES ('5', '');
INSERT INTO `t_user_role` VALUES ('6', '2');
INSERT INTO `t_user_role` VALUES ('7', '2');
INSERT INTO `t_user_role` VALUES ('10', '1');
INSERT INTO `t_user_role` VALUES ('11', '1');
INSERT INTO `t_user_role` VALUES ('12', '1');
INSERT INTO `t_user_role` VALUES ('13', '1');
INSERT INTO `t_user_role` VALUES ('14', '1');
=======
-----
-- Records of t_user_role

>>>>>>> e1a8a41 (sprint4)

-- ----------------------------
-- Table structure for t_user_token
-- ----------------------------
DROP TABLE IF EXISTS `t_user_token`;
CREATE TABLE `t_user_token`  (
  `userid` int(11) NOT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `expireTime` datetime(0) NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user_token
-- ----------------------------
INSERT INTO `t_user_token` VALUES (10, '9e55b92735346c73b5ab4124aa20afc0', '2022-04-29 02:25:28', '2022-04-28 14:25:28');
INSERT INTO `t_user_token` VALUES (12, '1a98993c3204c8c0bb237c8d46fdcf68', '2022-04-29 03:33:22', '2022-04-28 15:33:22');
INSERT INTO `t_user_token` VALUES (13, 'f7ce0c09836672019947201522f2ec07', '2022-04-29 03:43:14', '2022-04-28 15:43:14');
INSERT INTO `t_user_token` VALUES (14, '9365059031a963e1799e1ea68d041d88', '2022-04-29 05:01:16', '2022-04-28 17:01:16');

SET FOREIGN_KEY_CHECKS = 1;
