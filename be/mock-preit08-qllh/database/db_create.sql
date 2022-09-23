DROP SCHEMA IF EXISTS `mock_project`;
CREATE SCHEMA `mock_project`;
USE `mock_project`;

-- single
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `dob` DATE NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_code` VARCHAR(45) NOT NULL,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `permission_code` VARCHAR(45) NOT NULL,
  `permission_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45)NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `voucher` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` VARCHAR(45) NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `class` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `room` VARCHAR(45) NOT NULL,
  `status` VARCHAR(255) NOT NULL,
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
  `url` VARCHAR(255) NOT NULL,
  `type` VARCHAR(45) NOT NULL,  
  `created_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
	CONSTRAINT `fk_class`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`));


CREATE TABLE `guest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(45) NOT NULL,
  `dob` DATE NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` INT NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `employee_id` INT );

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
  `progress_grade` VARCHAR(45) NOT NULL,
  `test1_grade` VARCHAR(45) NOT NULL,
  `test2_grade` VARCHAR(45) NOT NULL,
  `test3_grade` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`student_id`, `class_id`),
    CONSTRAINT `fk_class_student`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`),
    CONSTRAINT `fk_student_class`
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
  `student_phone` INT NOT NULL,
  `student_email` VARCHAR(45) NOT NULL,
  `class_id` INT NOT NULL,
  PRIMARY KEY (`voucher_id`, `employee_id`),
    CONSTRAINT `fk_payment_voucher`
    FOREIGN KEY (`voucher_id`)
    REFERENCES `mock_project`.`voucher` (`id`),
    CONSTRAINT `fk_employee_payment_voucher`
    FOREIGN KEY (`employee_id`)
    REFERENCES `mock_project`.`user` (`id`),
    CONSTRAINT `fk_class_payment_voucher`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`));
 
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
DROP SCHEMA IF EXISTS `mock_project`;
CREATE SCHEMA `mock_project`;
USE `mock_project`;

-- single
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `dob` DATE NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_code` VARCHAR(45) NOT NULL,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `permission_code` VARCHAR(45) NOT NULL,
  `permission_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45)NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `voucher` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amount` VARCHAR(45) NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  `created_date` DATETIME NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `class` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `room` VARCHAR(45) NOT NULL,
  `status` VARCHAR(255) NOT NULL,
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
  `url` VARCHAR(255) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `created_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
	CONSTRAINT `fk_class`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`));


CREATE TABLE `guest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(45) NOT NULL,
  `dob` DATE NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` INT NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `employee_id` INT );

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
  `progress_grade` VARCHAR(45) NOT NULL,
  `test1_grade` VARCHAR(45) NOT NULL,
  `test2_grade` VARCHAR(45) NOT NULL,
  `test3_grade` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`student_id`, `class_id`),
    CONSTRAINT `fk_class_student`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`),
    CONSTRAINT `fk_student_class`
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
  `student_phone` INT NOT NULL,
  `student_email` VARCHAR(45) NOT NULL,
  `class_id` INT NOT NULL,
  PRIMARY KEY (`voucher_id`, `employee_id`),
    CONSTRAINT `fk_payment_voucher`
    FOREIGN KEY (`voucher_id`)
    REFERENCES `mock_project`.`voucher` (`id`),
    CONSTRAINT `fk_employee_payment_voucher`
    FOREIGN KEY (`employee_id`)
    REFERENCES `mock_project`.`user` (`id`),
    CONSTRAINT `fk_class_payment_voucher`
    FOREIGN KEY (`class_id`)
    REFERENCES `mock_project`.`class` (`id`));

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
