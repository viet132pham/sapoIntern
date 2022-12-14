DROP SCHEMA IF EXISTS `mock_project`;
CREATE SCHEMA `mock_project`;
USE `mock_project`;

-- single
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(255),
  `dob` DATE ,
  `status` VARCHAR(45),
  `email` VARCHAR(45) ,
  `phone` VARCHAR(45) ,
  `address` VARCHAR(255) ,
  PRIMARY KEY (`id`));
  
CREATE TABLE `role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_code` VARCHAR(45) UNIQUE NOT NULL,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `permission_code` VARCHAR(45) UNIQUE NOT NULL,
  `permission_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) UNIQUE NOT NULL,
  `amount` BIGINT NOT NULL,
  `number_grade` INT NOT NULL,
  `number_session` INT NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) UNIQUE NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `voucher` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` VARCHAR(45) NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `class` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) UNIQUE NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `room` VARCHAR(45) NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  `progress` INT NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `timeslot` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(45) NOT NULL,
  `time` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `document` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `class_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `instruction` VARCHAR(255) NOT NULL,
  `deadline` DATE,
  PRIMARY KEY (`id`));

CREATE TABLE `guest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(45) NOT NULL,
  `dob` DATE NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `employee_id` INT,
  PRIMARY KEY (`id`),
    CONSTRAINT `fk_employee`
    FOREIGN KEY (`employee_id`)
    REFERENCES `user` (`id`));
  
-- mapped  
CREATE TABLE `teacher_class` (
  `teacher_id` INT NOT NULL ,
  `class_id` INT NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`teacher_id`, `class_id`),
    CONSTRAINT `fk_class_teacher`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`),
    CONSTRAINT `fk_teacher_class`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `mock_project`.`user` (`id`));
  
-- mapped  
CREATE TABLE `student_class` (
  `student_id` INT NOT NULL,
  `class_id` INT NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`student_id`, `class_id`),
    CONSTRAINT `fk_class_student`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`),
    CONSTRAINT `fk_student_class`
    FOREIGN KEY (`student_id`)
    REFERENCES `mock_project`.`user` (`id`));

CREATE TABLE `student_grade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `class_id` INT NOT NULL,
  `grade_id` INT NOT NULL,
  `grade_point` INT NOT NULL,
  PRIMARY KEY (`id`),
    CONSTRAINT `fk_class_student_grade`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`),
    CONSTRAINT `fk_student_grade`
    FOREIGN KEY (`student_id`)
    REFERENCES `mock_project`.`user` (`id`));

-- mapped  
CREATE TABLE `user_role` (
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
    CONSTRAINT `fk_user_role`
    FOREIGN KEY (`user_id`)
    REFERENCES `mock_project`.`user` (`id`),
    CONSTRAINT `fk_role_user`
    FOREIGN KEY (`role_id`)
    REFERENCES `mock_project`.`role` (`id`));

CREATE TABLE `role_permission` (
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
    CONSTRAINT `fk_role_permission`
    FOREIGN KEY (`role_id`)
    REFERENCES `mock_project`.`role` (`id`),
    CONSTRAINT `fk_permission_role`
    FOREIGN KEY (`permission_id`)
    REFERENCES `mock_project`.`permission` (`id`));

CREATE TABLE `class_course` (
  `class_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  PRIMARY KEY (`class_id`, `course_id`),
    CONSTRAINT `fk_class_course`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`),
    CONSTRAINT `fk_course_class`
    FOREIGN KEY (`course_id`)
    REFERENCES `mock_project`.`course` (`id`));

CREATE TABLE `class_department` (
  `class_id` INT NOT NULL,
  `department_id` INT NOT NULL,
  PRIMARY KEY (`class_id`, `department_id`),
    CONSTRAINT `fk_class_department`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`),
    CONSTRAINT `fk_department_class`
    FOREIGN KEY (`department_id`)
    REFERENCES `mock_project`.`department` (`id`));

CREATE TABLE `payment_voucher` (
  `voucher_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `student_name` VARCHAR(45) NOT NULL,
  `student_phone` VARCHAR(15) NOT NULL,
  `student_email` VARCHAR(100) NOT NULL,
  `course_id` INT NOT NULL,
  PRIMARY KEY (`voucher_id`, `employee_id`),
    CONSTRAINT `fk_payment_voucher`
    FOREIGN KEY (`voucher_id`)
    REFERENCES `mock_project`.`voucher` (`id`),
    CONSTRAINT `fk_employee_payment_voucher`
    FOREIGN KEY (`employee_id`)
    REFERENCES `mock_project`.`user` (`id`));
 
CREATE TABLE `receipt_voucher` (
  `voucher_id` INT NOT NULL,
  `admin_id` INT NOT NULL,
  `department_id` INT NOT NULL,
  PRIMARY KEY (`voucher_id`, `admin_id`),
    CONSTRAINT `fk_receipt_voucher`
    FOREIGN KEY (`voucher_id`)
    REFERENCES `mock_project`.`voucher` (`id`),
    CONSTRAINT `fk_admin_receipt_voucher`
    FOREIGN KEY (`admin_id`)
    REFERENCES `mock_project`.`user` (`id`),
    CONSTRAINT `fk_department_receipt_voucher`
    FOREIGN KEY (`department_id`)
    REFERENCES `mock_project`.`department` (`id`));

CREATE TABLE `class_timeslot` (
  `class_id` INT NOT NULL,
  `timeslot_id` INT NOT NULL,
  PRIMARY KEY (`class_id`, `timeslot_id`),
    CONSTRAINT `fk_class_timeslot`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`),
    CONSTRAINT `fk_timeslot_class`
    FOREIGN KEY (`timeslot_id`)
    REFERENCES `mock_project`.`timeslot` (`id`));

CREATE TABLE `submission` (
  `student_id` INT NOT NULL,
  `document_id` INT NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `created_date` DATETIME NOT NULL,
  PRIMARY KEY (`student_id`, `document_id`),
    CONSTRAINT `fk_student_document`
    FOREIGN KEY (`student_id`)
    REFERENCES `mock_project`.`user` (`id`),
    CONSTRAINT `fk_document_student`
    FOREIGN KEY (`document_id`)
    REFERENCES `mock_project`.`document` (`id`));

INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test1', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-01-01','Nguy???n V??n H???c', 'ACTIVE', 'nvhoc@gmail.com', '0987654321', 'H?? N???i');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test2', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-02-02','L?? Th??? ????o', 'ACTIVE', 'ltdao@gmail.com', '0987654321', 'H?? N???i');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test3', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-03-03','C?? Th??? B??nh', 'ACTIVE', 'ctbinh@gmail.com', '0987654321', 'H??? Ch?? Minh');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test4', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-04-04','Tr???n V??n Kh??nh', 'INACTIVE', 'tvkhanh@gmail.com', '0987654321', 'H???i Ph??ng');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test5', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-05-05','Nguy???n Khanh V??n', 'ACTIVE', 'nkvan@gmail.com', '0123456789', 'Qu???ng Ninh');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test6', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-06-06','L?? Tu???n', 'ACTIVE', 'ltuan@gmail.com', '0123456789', 'C???n Th??');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test7', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-07-07','Nguy???n Th??? Ch??nh', 'ACTIVE', 'ntchinh@gmail.com', '0258369147', 'H??? Ch?? Minh');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test8', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-08-08','Ph???m Tu???n Vi???t', 'ACTIVE', 'ptviet@gmail.com', '0258369147', 'Qu???ng Ninh');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test9', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-09-09','Ng?? Duy Kh??nh', 'ACTIVE', 'ndkhanh@gmail.com', '0258369147', 'B???c Giang');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test10', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2001-10-10','Nguy???n V??n Tu???n', 'ACTIVE', 'nvtuan@gmail.com', '0258369147', 'B???c Ninh');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test11', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2001-11-11','L?? Kim Li??n', 'ACTIVE', 'lklien@gmail.com', '0258369147', 'L??o Cai');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test12', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2002-12-06','????? V??n Nam', 'ACTIVE', 'dvnam@gmail.com', '0123456789', 'H???i Ph??ng');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test13', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-11-25','Xu??n Quang', 'ACTIVE', 'xquang@gmail.com', '0263177404', 'Ninh Thu???n');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test14', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1998-02-15','Khang Nam', 'ACTIVE', 'knam@gmail.com', '0292163852', 'Qu???ng B??nh');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test15', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-08-09','Ng???c Cao', 'ACTIVE', 'ngcao@gmail.com', '0727467944', 'H?? N???i');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test16', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1997-10-19','Trang Linh', 'ACTIVE', 'trlinh@gmail.com', '033962499', 'H???i Ph??ng');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test17', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-04-14','Nh?? Di???p', 'ACTIVE', 'han.du@hotmail.com', '0566395029', 'H??? Ch?? Minh');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test18', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-08-13','B??ch Uy??n', 'ACTIVE', 'svuong@hua.info.vn', '01690962342', 'V??nh Long');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test19', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1996-07-07','Tr??m San', 'ACTIVE', 'ogiao@hotmail.com', '0308828918', 'L???ng S??n');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test20', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-01-28','Dung Qu???nh', 'ACTIVE', 'lu.thu@gmail.com', '0508838373', '???? N???ng');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test21', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-03-30','H??? Thanh T??m', 'ACTIVE', 'ophi@gmail.com', '0960325861', 'H???i Ph??ng');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test22', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1998-02-05','L?? Danh H??ng', 'ACTIVE', 'nu76@uong.com', '0710457082', 'V??ng T??u');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test23', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1997-10-19','L?? Ng??n Uy??n', 'ACTIVE', 'chinh.thach@yahoo.com', '0941261941', 'C???n Th??');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test24', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-09-20','L??u Ki??n', 'ACTIVE', 'thuan33@thi.org.vn', '0322893370', 'B??nh D????ng');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test25', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-07-20','Tr???n Gia ?????i', 'ACTIVE', 'phi.khau@cup.com', '0540520785', 'Long An');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test26', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-08-10','Nguy???n Xu??n Chi???n', 'ACTIVE', 'quyet.le@phuong.int.vn', '0319152068', 'L??m ?????ng');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test27', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1998-06-18','Ph???m Thu Huy???n', 'ACTIVE', 'athi@thao.biz.vn', '0851999567', 'B??nh D????ng');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test28', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-05-17','Ch??u Ng???c H??ng', 'ACTIVE', 'omoc@trang.vn', '0301744840', 'H??a B??nh');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test29', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-04-30','L?? Ng???c H??n', 'ACTIVE', 'bi.thuc@gmail.com', '0781855551', 'B???n Tre');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test30', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1998-07-19','????? Ng???c H??ng', 'ACTIVE', 'zle@khu.edu.vn', '0751770110', 'V??nh Long');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test31', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-11-17','????? Th??? Ng???c Trinh', 'ACTIVE', 'luong.di@mach.biz.vn', '0276397595', '?????k L???k');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test32', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1997-12-01','B??nh H???ng', 'ACTIVE', 'kim.chuong@gmail.com', '0269730809', 'H??? Ch?? Minh');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test33', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2001-09-01','?????i H??a', 'ACTIVE', 'dao36@dang.info.vn', '(0123)409-9856', 'H??? Ch?? Minh');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test34', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1997-10-02','Dung H???ng', 'ACTIVE', 'luat28@hotmail.com', '0601915542', 'Kh??nh H??a');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test35', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-10-13','Kim Ti???n D??ng', 'ACTIVE', 'diem.hy@yahoo.com', '0555496035', 'Gia Lai');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test36', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-09-11','Chu Th??? Minh', 'ACTIVE', 'truc31@duong.mil.vn', '0272873913', 'Ninh Thu???n');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test37', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-07-22','Nguy???n V??n L??m', 'ACTIVE', 'nham.khoa@gmail.com', '0604938677', 'Ph?? Th???');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test38', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2001-08-31','Ng?? Thanh Thu???n', 'ACTIVE', 'ngo.thuan@la.info', '0560919171', 'H???i D????ng');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test39', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1998-03-12','Phi Thanh Duy??n', 'ACTIVE', 'ugiang@hotmail.com', '0990962342', 'H?? N???i');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test40', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1997-03-18','Ho??ng Th??? Nga', 'ACTIVE', 'thuan.diem@hotmail.com', '0273710819', 'Qu???ng Nam');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test41', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1996-03-19','Nguy???n Th??? Giang', 'ACTIVE', 'cung.vi@chiem.com', '0529261633', 'An Giang');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test42', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2001-08-27','????o Kh????ng Duy', 'ACTIVE', 'jdao@yahoo.com', '0876153216', 'Qu???ng Nam');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test43', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '2000-04-25','B???ch C???t Tr??n', 'ACTIVE', 'tran83@don.edu.vn', '0214560452', 'H?? N???i');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test44', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1999-01-22','Tr???n B???o T??m', 'ACTIVE', 'tam11@yahoo.com', '0125378633', 'C???n Th??');
INSERT INTO `user` (`username`, `password`, `dob`, `full_name`, `status`, `email`, `phone`, `address`) VALUES ('test45', '$2a$10$dPXi6GAhG3mH7p3PrxaBSOYyOtIIPkmp5rwGDXhjvV/R.d7192oOa', '1997-08-21','D????ng Thu Th???o', 'ACTIVE', 'ty45@bo.info', '0688877893', 'H???i Ph??ng');


INSERT INTO `role` (`role_code`, `role_name`) VALUES ('ADMIN', 'Ch??? trung t??m');
INSERT INTO `role` (`role_code`, `role_name`) VALUES ('EMPLOYEE', 'Nh??n vi??n');
INSERT INTO `role` (`role_code`, `role_name`) VALUES ('TEACHER', 'Gi???ng vi??n');
INSERT INTO `role` (`role_code`, `role_name`) VALUES ('STUDENT', 'H???c vi??n');

INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('GUEST_READ', 'GUEST_READ');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('GUEST_POST', 'GUEST_POST');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('GUEST_PUT', 'GUEST_PUT');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('GUEST_DELETE', 'GUEST_DELETE');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('USER_READ', 'USER_READ');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('USER_POST', 'USER_POST');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('USER_PUT', 'USER_PUT');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('USER_DELETE', 'USER_DELETE');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('ROLE_READ', 'ROLE_READ');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('ROLE_POST', 'ROLE_POST');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('ROLE_PUT', 'ROLE_PUT');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('ROLE_DELETE', 'ROLE_DELETE');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('PERMISSION_READ', 'PERMISSION_READ');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('PERMISSION_POST', 'PERMISSION_POST');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('PERMISSION_PUT', 'PERMISSION_PUT');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('PERMISSION_DELETE', 'PERMISSION_DELETE');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('COURSE_READ', 'COURSE_READ');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('COURSE_POST', 'COURSE_POST');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('COURSE_PUT', 'COURSE_PUT');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('COURSE_DELETE', 'COURSE_DELETE');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('CLASS_READ', 'CLASS_READ');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('CLASS_POST', 'CLASS_POST');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('CLASS_PUT', 'CLASS_PUT');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('CLASS_DELETE', 'CLASS_DELETE');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('DEPARTMENT_READ', 'DEPARTMENT_READ');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('DEPARTMENT_POST', 'DEPARTMENT_POST');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('DEPARTMENT_PUT', 'DEPARTMENT_PUT');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('DEPARTMENT_DELETE', 'DEPARTMENT_DELETE');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('VOUCHER_READ', 'VOUCHER_READ');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('VOUCHER_POST', 'VOUCHER_POST');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('VOUCHER_PUT', 'VOUCHER_PUT');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('VOUCHER_DELETE', 'VOUCHER_DELETE');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('DOCUMENT_READ', 'DOCUMENT_READ');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('DOCUMENT_POST', 'DOCUMENT_POST');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('DOCUMENT_PUT', 'DOCUMENT_PUT');
INSERT INTO `permission` (`permission_code`, `permission_name`) VALUES ('DOCUMENT_DELETE', 'DOCUMENT_DELETE');

INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '1');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '2');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '3');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '4');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '5');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '6');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '7');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '8');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '9');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '10');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '11');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '12');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '13');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '14');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '15');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '16');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '17');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '18');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '19');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '20');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '21');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '22');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '23');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '24');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '25');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '26');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '27');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '28');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '29');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '30');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '31');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '32');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '33');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '34');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '35');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('1', '36');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('2', '1');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('2', '2');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('2', '3');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('2', '17');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('2', '21');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('2', '25');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('2', '29');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('2', '30');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('2', '31');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('3', '5');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('3', '17');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('3', '21');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('3', '23');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('3', '25');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('3', '33');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('3', '34');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('3', '35');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('3', '36');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('4', '5');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('4', '17');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('4', '21');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('4', '23');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('4', '25');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('4', '33');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('4', '34');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('4', '35');
INSERT INTO `role_permission` (`role_id`, `permission_id`) VALUES ('4', '36');

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('1', '1');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('1', '2');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('1', '3');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('1', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('2', '2');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('3', '2');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('4', '3');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('5', '3');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('6', '3');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('7', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('8', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('9', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('10', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('11', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('12', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('13', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('14', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('15', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('16', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('17', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('18', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('19', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('20', '3');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('21', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('22', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('23', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('24', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('25', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('26', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('27', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('28', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('29', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('30', '3');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('31', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('32', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('33', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('34', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('35', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('36', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('37', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('38', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('39', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('40', '3');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('41', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('42', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('43', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('44', '4');
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('45', '4');

INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? hai', '07:30 - 09:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? hai', '10:00 - 12:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? hai', '14:00 - 16:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? hai', '16:30 - 18:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? hai', '19:30 - 21:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? ba', '07:30 - 09:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? ba', '10:00 - 12:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? ba', '14:00 - 16:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? ba', '16:30 - 18:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? ba', '19:30 - 21:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? t??', '07:30 - 09:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? t??', '10:00 - 12:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? t??', '14:00 - 16:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? t??', '16:30 - 18:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? t??', '19:30 - 21:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? n??m', '07:30 - 09:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? n??m', '10:00 - 12:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? n??m', '14:00 - 16:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? n??m', '16:30 - 18:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? n??m', '19:30 - 21:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? s??u', '07:30 - 09:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? s??u', '10:00 - 12:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? s??u', '14:00 - 16:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? s??u', '16:30 - 18:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? s??u', '19:30 - 21:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? b???y', '07:30 - 09:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? b???y', '10:00 - 12:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? b???y', '14:00 - 16:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? b???y', '16:30 - 18:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Th??? b???y', '19:30 - 21:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Ch??? nh???t', '07:30 - 09:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Ch??? nh???t', '10:00 - 12:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Ch??? nh???t', '14:00 - 16:00');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Ch??? nh???t', '16:30 - 18:30');
INSERT INTO `timeslot` (`date`, `time`) VALUES ('Ch??? nh???t', '19:30 - 21:30');

INSERT INTO `course` (`name`, `amount`, `number_grade`, `number_session`) VALUES ('Kh??a h???c IETLS band 6.0', '9990000', '4', '12');
INSERT INTO `course` (`name`, `amount`, `number_grade`, `number_session`) VALUES ('Kh??a h???c IETLS band 6.5', '9990000', '4', '12');
INSERT INTO `course` (`name`, `amount`, `number_grade`, `number_session`) VALUES ('Kh??a h???c IETLS band 7.0', '11990000', '5', '15');
INSERT INTO `course` (`name`, `amount`, `number_grade`, `number_session`) VALUES ('Kh??a h???c IETLS band 7.5', '11990000', '5', '15');
INSERT INTO `course` (`name`, `amount`, `number_grade`, `number_session`) VALUES ('Kh??a h???c IELTS Beginner', '8000000', '3', '10');

INSERT INTO `department` (`name`, `address`, `phone`) VALUES ('HN1', 'S??? 10 T??? Quang B???u, H?? N???i', '0987654321');
INSERT INTO `department` (`name`, `address`, `phone`) VALUES ('HN2', 'S??? 240 ?????i C???n, H?? N???i', '0566113366');
INSERT INTO `department` (`name`, `address`, `phone`) VALUES ('HCM1', 'S??? 8 ng?? 80 Minh Khai, TP.HCM', '0998787878');
INSERT INTO `department` (`name`, `address`, `phone`) VALUES ('DN1', 'S??? 101 Ph?????c H??ng, ???? N???ng', '0899061626');

INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K01', 'L???p IELTS band 6.0 kh??a 1', '101', 'FINISHED', '12', '2022-05-19', '2022-07-02');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K01', 'L???p IELTS band 6.5 kh??a 1', '102', 'FINISHED', '12', '2022-05-19', '2022-07-02');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K01', 'L???p IELTS band 7.0 kh??a 1', '101', 'FINISHED', '15', '2022-05-10', '2022-07-10');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K01', 'L???p IELTS band 7.5 kh??a 1', '102', 'FINISHED', '15', '2022-05-10', '2022-07-10');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK01', 'L???p IELTS Beginner kh??a 1', '101', 'FINISHED', '8', '2022-05-18', '2022-06-16');

INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K02', 'L???p IELTS band 6.0 kh??a 2', '101', 'FINISHED', '12', '2022-06-09', '2022-07-22');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K02', 'L???p IELTS band 6.5 kh??a 2', '102', 'FINISHED', '12', '2022-06-09', '2022-07-22');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K02', 'L???p IELTS band 7.0 kh??a 2', '101', 'FINISHED', '15', '2022-06-10', '2022-08-08');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K02', 'L???p IELTS band 7.5 kh??a 2', '102', 'FINISHED', '15', '2022-06-10', '2022-08-08');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK02', 'L???p IELTS Beginner kh??a 2', '101', 'FINISHED', '8', '2022-06-08', '2022-07-06');

INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K03', 'L???p IELTS band 6.0 kh??a 3', '101', 'FINISHED', '12', '2022-06-29', '2022-08-14');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K03', 'L???p IELTS band 6.5 kh??a 3', '102', 'FINISHED', '12', '2022-06-29', '2022-08-14');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K03', 'L???p IELTS band 7.0 kh??a 3', '101', 'FINISHED', '15', '2022-06-30', '2022-08-28');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K03', 'L???p IELTS band 7.5 kh??a 3', '102', 'FINISHED', '15', '2022-06-30', '2022-08-28');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK03', 'L???p IELTS Beginner kh??a 3', '101', 'FINISHED', '8', '2022-06-28', '2022-07-26');

INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K04', 'L???p IELTS band 6.0 kh??a 4', '101', 'FINISHED', '12', '2022-07-19', '2022-09-05');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K04', 'L???p IELTS band 6.5 kh??a 4', '102', 'FINISHED', '12', '2022-07-19', '2022-09-05');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K04', 'L???p IELTS band 7.0 kh??a 4', '101', 'STUDYING', '13', '2022-07-20', '2022-09-18');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K04', 'L???p IELTS band 7.5 kh??a 4', '102', 'STUDYING', '13', '2022-07-20', '2022-09-18');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK04', 'L???p IELTS Beginner kh??a 4', '101', 'FINISHED', '8', '2022-07-18', '2022-08-16');

-- mo them 1 chi nhanh
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K05', 'L???p IELTS band 6.0 kh??a 5', '101', 'STUDYING', '10', '2022-08-09', '2022-09-25');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K05', 'L???p IELTS band 6.5 kh??a 5', '102', 'STUDYING', '10', '2022-08-09', '2022-09-25');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K05', 'L???p IELTS band 7.0 kh??a 5', '101', 'STUDYING', '10', '2022-08-10', '2022-10-08');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K05', 'L???p IELTS band 7.5 kh??a 5', '102', 'STUDYING', '10', '2022-08-10', '2022-10-08');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK05', 'L???p IELTS Beginner kh??a 5', '101', 'FINISHED', '8', '2022-08-08', '2022-09-06');

INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K06', 'L???p IELTS band 6.0 kh??a 6', '101', 'STUDYING', '10', '2022-08-09', '2022-09-25');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K06', 'L???p IELTS band 6.5 kh??a 6', '102', 'STUDYING', '10', '2022-08-09', '2022-09-25');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K06', 'L???p IELTS band 7.0 kh??a 6', '101', 'STUDYING', '10', '2022-08-10', '2022-10-08');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K06', 'L???p IELTS band 7.5 kh??a 6', '102', 'STUDYING', '10', '2022-08-10', '2022-10-08');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK06', 'L???p IELTS Beginner kh??a 6', '101', 'FINISHED', '8', '2022-08-08', '2022-09-06');

-- mo them 1 chi nhanh nua
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K07', 'L???p IELTS band 6.0 kh??a 7', '101', 'STUDYING', '2', '2022-09-09', '2022-10-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K07', 'L???p IELTS band 6.5 kh??a 7', '102', 'STUDYING', '2', '2022-09-09', '2022-10-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K07', 'L???p IELTS band 7.0 kh??a 7', '101', 'STUDYING', '2', '2022-09-10', '2022-11-07');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K07', 'L???p IELTS band 7.5 kh??a 7', '102', 'STUDYING', '2', '2022-09-10', '2022-11-07');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK07', 'L???p IELTS Beginner kh??a 7', '101', 'STUDYING', '2', '2022-09-08', '2022-10-06');

INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K08', 'L???p IELTS band 6.0 kh??a 8', '101', 'STUDYING', '2', '2022-09-09', '2022-10-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K08', 'L???p IELTS band 6.5 kh??a 8', '102', 'STUDYING', '2', '2022-09-09', '2022-10-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K08', 'L???p IELTS band 7.0 kh??a 8', '101', 'STUDYING', '2', '2022-09-10', '2022-11-07');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K08', 'L???p IELTS band 7.5 kh??a 8', '102', 'STUDYING', '2', '2022-09-10', '2022-11-07');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK08', 'L???p IELTS Beginner kh??a 8', '101', 'STUDYING', '2', '2022-09-08', '2022-10-06');

INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K09', 'L???p IELTS band 6.0 kh??a 9', '101', 'STUDYING', '2', '2022-09-09', '2022-10-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K09', 'L???p IELTS band 6.5 kh??a 9', '102', 'STUDYING', '2', '2022-09-09', '2022-10-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K09', 'L???p IELTS band 7.0 kh??a 9', '101', 'STUDYING', '2', '2022-09-10', '2022-11-07');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K09', 'L???p IELTS band 7.5 kh??a 9', '102', 'STUDYING', '2', '2022-09-10', '2022-11-07');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK09', 'L???p IELTS Beginner kh??a 9', '101', 'STUDYING', '2', '2022-09-08', '2022-10-06');

-- mo them 1 chi nhanh nua
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K10', 'L???p IELTS band 6.0 kh??a 10', '101', 'WAITING', '0', '2022-09-29', '2022-11-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K10', 'L???p IELTS band 6.5 kh??a 10', '102', 'WAITING', '0', '2022-09-29', '2022-11-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K10', 'L???p IELTS band 7.0 kh??a 10', '101', 'WAITING', '0', '2022-09-30', '2022-11-27');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K10', 'L???p IELTS band 7.5 kh??a 10', '102', 'WAITING', '0', '2022-09-30', '2022-11-27');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK10', 'L???p IELTS Beginner kh??a 10', '101', 'WAITING', '0', '2022-09-28', '2022-10-26');

INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K11', 'L???p IELTS band 6.0 kh??a 11', '101', 'WAITING', '0', '2022-09-29', '2022-11-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K11', 'L???p IELTS band 6.5 kh??a 11', '102', 'WAITING', '0', '2022-09-29', '2022-11-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K11', 'L???p IELTS band 7.0 kh??a 11', '101', 'WAITING', '0', '2022-09-30', '2022-11-27');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K11', 'L???p IELTS band 7.5 kh??a 11', '102', 'WAITING', '0', '2022-09-30', '2022-11-27');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK11', 'L???p IELTS Beginner kh??a 11', '101', 'WAITING', '0', '2022-09-28', '2022-10-26');

INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K12', 'L???p IELTS band 6.0 kh??a 12', '101', 'WAITING', '0', '2022-09-29', '2022-11-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K12', 'L???p IELTS band 6.5 kh??a 12', '102', 'WAITING', '0', '2022-09-29', '2022-11-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K12', 'L???p IELTS band 7.0 kh??a 12', '101', 'WAITING', '0', '2022-09-30', '2022-11-27');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K12', 'L???p IELTS band 7.5 kh??a 12', '102', 'WAITING', '0', '2022-09-30', '2022-11-27');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK12', 'L???p IELTS Beginner kh??a 12', '101', 'WAITING', '0', '2022-09-28', '2022-10-26');

INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('60K13', 'L???p IELTS band 6.0 kh??a 13', '101', 'WAITING', '0', '2022-09-29', '2022-11-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('65K13', 'L???p IELTS band 6.5 kh??a 13', '102', 'WAITING', '0', '2022-09-29', '2022-11-15');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('70K13', 'L???p IELTS band 7.0 kh??a 13', '101', 'WAITING', '0', '2022-09-30', '2022-11-27');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('75K13', 'L???p IELTS band 7.5 kh??a 13', '102', 'WAITING', '0', '2022-09-30', '2022-11-27');
INSERT INTO `class` (`code`, `name`, `room`, `status`, `progress`, `start_date`, `end_date`) VALUES ('BGK13', 'L???p IELTS Beginner kh??a 13', '101', 'WAITING', '0', '2022-09-28', '2022-10-26');

INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('1', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('2', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('3', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('4', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('5', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('6', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('7', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('8', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('9', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('10', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('11', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('12', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('13', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('14', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('15', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('16', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('17', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('18', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('19', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('20', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('21', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('22', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('23', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('24', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('25', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('26', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('27', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('28', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('29', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('30', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('31', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('32', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('33', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('34', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('35', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('36', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('37', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('38', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('39', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('40', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('41', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('42', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('43', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('44', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('45', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('46', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('47', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('48', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('49', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('50', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('51', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('52', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('53', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('54', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('55', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('56', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('57', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('58', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('59', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('60', '5');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('61', '1');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('62', '2');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('63', '3');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('64', '4');
INSERT INTO `class_course` (`class_id`, `course_id`) VALUES ('65', '5');

INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('1', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('2', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('3', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('4', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('5', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('6', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('7', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('8', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('9', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('10', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('11', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('12', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('13', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('14', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('15', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('16', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('17', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('18', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('19', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('20', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('21', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('22', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('23', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('24', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('25', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('26', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('27', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('28', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('29', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('30', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('31', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('32', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('33', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('34', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('35', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('36', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('37', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('38', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('39', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('40', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('41', '3');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('42', '3');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('43', '3');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('44', '3');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('45', '3');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('46', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('47', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('48', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('49', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('50', '1');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('51', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('52', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('53', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('54', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('55', '2');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('56', '3');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('57', '3');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('58', '3');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('59', '3');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('60', '3');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('61', '4');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('62', '4');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('63', '4');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('64', '4');
INSERT INTO `class_department` (`class_id`, `department_id`) VALUES ('65', '4');

INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('1', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('1', '21');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('2', '8');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('2', '22');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('3', '12');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('3', '26');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('4', '13');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('4', '27');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('5', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('5', '16');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('6', '19');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('6', '33');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('7', '20');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('7', '34');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('8', '23');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('8', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('9', '24');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('9', '3');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('10', '28');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('10', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('11', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('11', '21');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('12', '8');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('12', '22');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('13', '12');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('13', '26');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('14', '13');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('14', '27');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('15', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('15', '16');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('16', '19');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('16', '33');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('17', '20');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('17', '34');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('18', '23');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('18', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('19', '24');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('19', '3');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('20', '28');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('20', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('21', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('21', '21');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('22', '8');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('22', '22');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('23', '12');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('23', '26');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('24', '13');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('24', '27');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('25', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('25', '16');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('26', '19');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('26', '33');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('27', '20');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('27', '34');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('28', '23');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('28', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('29', '24');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('29', '3');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('30', '28');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('30', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('31', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('31', '21');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('32', '8');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('32', '22');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('33', '12');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('33', '26');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('34', '13');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('34', '27');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('35', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('35', '16');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('36', '19');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('36', '33');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('37', '20');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('37', '34');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('38', '23');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('38', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('39', '24');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('39', '3');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('40', '28');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('40', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('41', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('41', '21');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('42', '8');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('42', '22');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('43', '12');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('43', '26');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('44', '13');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('44', '27');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('45', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('45', '16');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('46', '19');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('46', '33');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('47', '20');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('47', '34');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('48', '23');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('48', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('49', '24');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('49', '3');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('50', '28');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('50', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('51', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('51', '21');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('52', '8');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('52', '22');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('53', '12');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('53', '26');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('54', '13');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('54', '27');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('55', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('55', '16');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('56', '19');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('56', '33');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('57', '20');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('57', '34');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('58', '23');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('58', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('59', '24');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('59', '3');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('60', '28');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('60', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('61', '7');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('61', '21');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('62', '8');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('62', '22');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('63', '12');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('63', '26');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('64', '13');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('64', '27');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('65', '2');
INSERT INTO `class_timeslot` (`class_id`, `timeslot_id`) VALUES ('65', '16');

INSERT INTO `document` (`class_id`, `url`, `name`, `type`, `instruction`, `deadline`) VALUES ('1', 'google.com', 'B??i t???p 1', 'HW','C??? l??n em nh?? 1', '2022-08-22');
INSERT INTO `document` (`class_id`, `url`, `name`, `type`, `instruction`, `deadline`) VALUES ('1', 'google.com', 'B??i t???p 2', 'HW','C??? l??n em nh?? 2', '2022-08-23');
INSERT INTO `document` (`class_id`, `url`, `name`, `type`, `instruction`) VALUES ('1', 'google.com', 'T??i li???u 1', 'DOC','C??? l??n em nh?? 3');
INSERT INTO `document` (`class_id`, `url`, `name`, `type`, `instruction`) VALUES ('1', 'google.com', 'T??i li???u 2', 'DOC','C??? l??n em nh?? 4');
INSERT INTO `document` (`class_id`, `url`, `name`, `type`, `instruction`, `deadline`) VALUES ('5', 'google.com', 'B??i t???p 3', 'HW','C??? l??n em nh?? 5', '2023-01-01');
INSERT INTO `document` (`class_id`, `url`, `name`, `type`, `instruction`) VALUES ('5', 'google.com', 'T??i li???u 3', 'DOC','C??? l??n em nh?? 6');

INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('7', '1', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('8', '1', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('9', '1', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('41', '1', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('42', '1', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('7', '7', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('8', '7', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('9', '7', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('41', '7', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('42', '7', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('7', '13', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('8', '13', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('9', '13', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('41', '13', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('42', '13', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('10', '4', 'FINISHED');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('11', '45', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('12', '45', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('13', '45', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('14', '45', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('15', '45', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('16', '45', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('17', '45', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('18', '45', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('19', '45', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('21', '45', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('22', '41', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('23', '41', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('24', '41', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('25', '41', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('26', '41', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('27', '42', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('28', '42', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('29', '42', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('31', '42', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('32', '42', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('33', '43', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('34', '43', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('35', '43', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('36', '43', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('37', '43', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('38', '43', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('39', '44', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('41', '44', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('42', '44', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('43', '44', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('44', '44', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('45', '44', 'STUDYING');
INSERT INTO `student_class` (`student_id`, `class_id`, `status`) VALUES ('7', '44', 'STUDYING');

INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('4', '1', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('4', '2', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '3', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '4', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('6', '5', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('4', '6', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('4', '7', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '8', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '9', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('6', '10', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('4', '11', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('4', '12', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '13', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '14', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('6', '15', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '16', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '17', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '18', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '19', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('6', '20', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '21', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '22', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '23', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '24', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('6', '25', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '26', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '27', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '28', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '29', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('6', '30', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '31', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '32', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '33', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '34', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('6', '35', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '36', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '37', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '38', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('5', '39', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('6', '40', 'FINISHED');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '41', 'TEACHING');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('20', '42', 'TEACHING');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('30', '43', 'TEACHING');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('30', '44', 'TEACHING');
INSERT INTO `teacher_class` (`teacher_id`, `class_id`, `status`) VALUES ('40', '45', 'TEACHING');

INSERT INTO `guest` (`full_name`, `dob`, `email`, `phone`, `address`) VALUES ('Kh??ch 1', '2000-01-01', '1234@gmail.com', '0147258369', 'HN');
INSERT INTO `guest` (`full_name`, `dob`, `email`, `phone`, `address`) VALUES ('Kh??ch 3', '2000-01-01', '1234@gmail.com', '0147258369', 'HN');
INSERT INTO `guest` (`full_name`, `dob`, `email`, `phone`, `address`, `employee_id`) VALUES ('Kh??ch 2', '2000-02-02', '1234@gmail.com', '0147852369', 'HCM', '1');
INSERT INTO `guest` (`full_name`, `dob`, `email`, `phone`, `address`, `employee_id`) VALUES ('Kh??ch 4', '2000-02-02', '1234@gmail.com', '0147852369', 'TB', '1');
INSERT INTO `guest` (`full_name`, `dob`, `email`, `phone`, `address`, `employee_id`) VALUES ('Kh??ch 5', '2000-02-02', '1234@gmail.com', '0147852369', 'HP', '2');
