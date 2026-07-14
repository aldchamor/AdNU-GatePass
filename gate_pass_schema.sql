-- ============================================================
-- GATE-PASS Sticker Application Form
-- ============================================================

CREATE DATABASE IF NOT EXISTS gate_pass_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE gate_pass_db;

-- Drop tables in dependency order (children before parents)
DROP TABLE IF EXISTS APPLICATION;
DROP TABLE IF EXISTS STUDENT;
DROP TABLE IF EXISTS EMPLOYEE;
DROP TABLE IF EXISTS CONCESSIONAIRE;
DROP TABLE IF EXISTS AFFILIATE;
DROP TABLE IF EXISTS VEHICLE;
DROP TABLE IF EXISTS STICKER;
DROP TABLE IF EXISTS ACCOUNT;
DROP TABLE IF EXISTS DRIVER;
DROP TABLE IF EXISTS APPLICANT;

-- ============================================================
-- APPLICANT
-- ============================================================
CREATE TABLE APPLICANT (
    Applicant_ID          INT AUTO_INCREMENT PRIMARY KEY,
    Applicant_First_Name  VARCHAR(255) NOT NULL,
    Applicant_Middle_Name VARCHAR(255) NULL,
    Applicant_Last_Name   VARCHAR(255) NOT NULL,
    Applicant_Contact_No  VARCHAR(11)  NOT NULL,
    Applicant_Address     VARCHAR(255) NOT NULL,
    CONSTRAINT chk_applicant_contact
        CHECK (Applicant_Contact_No REGEXP '^09[0-9]{9}$')
);

-- ============================================================
-- DRIVER
-- ============================================================
CREATE TABLE DRIVER (
    Driver_ID          INT AUTO_INCREMENT PRIMARY KEY,
    Driver_First_Name  VARCHAR(255) NOT NULL,
    Driver_Middle_Name VARCHAR(255) NULL,
    Driver_Last_Name   VARCHAR(255) NOT NULL,
    Driver_License_No  VARCHAR(255) NOT NULL
);

-- ============================================================
-- ACCOUNT
-- ============================================================
CREATE TABLE ACCOUNT (
    Account_ID            INT AUTO_INCREMENT PRIMARY KEY,
    Account_Email_Address VARCHAR(255) NOT NULL,
    Account_Password      VARCHAR(255) NOT NULL COMMENT 'Stored as a hash, never plaintext',
    CONSTRAINT uq_account_email UNIQUE (Account_Email_Address)
);

-- ============================================================
-- STICKER
-- ============================================================
CREATE TABLE STICKER (
    Sticker_ID    INT AUTO_INCREMENT PRIMARY KEY,
    Sticker_Color VARCHAR(255) NOT NULL
);

-- ============================================================
-- VEHICLE  (1:1 with STICKER)
-- ============================================================
CREATE TABLE VEHICLE (
    Vehicle_ID         INT AUTO_INCREMENT PRIMARY KEY,
    Sticker_ID         INT NOT NULL,
    Vehicle_Type       VARCHAR(255) NOT NULL,
    Vehicle_Plate_No   VARCHAR(7)   NOT NULL,
    Vehicle_Year_Model YEAR         NOT NULL,
    Vehicle_Color      VARCHAR(255) NOT NULL,
    CONSTRAINT uq_vehicle_plate UNIQUE (Vehicle_Plate_No),
    CONSTRAINT uq_vehicle_sticker UNIQUE (Sticker_ID),
    CONSTRAINT fk_vehicle_sticker
        FOREIGN KEY (Sticker_ID) REFERENCES STICKER (Sticker_ID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ============================================================
-- AFFILIATE (superclass)
-- ============================================================
CREATE TABLE AFFILIATE (
    Affiliate_ID          INT AUTO_INCREMENT PRIMARY KEY,
    Affiliate_Type        ENUM('S', 'E', 'C') NOT NULL
        COMMENT 'S = Student, E = Employee, C = Concessionaire',
    Affiliate_First_Name  VARCHAR(255) NOT NULL,
    Affiliate_Middle_Name VARCHAR(255) NULL,
    Affiliate_Last_Name   VARCHAR(255) NOT NULL
);

-- ============================================================
-- STUDENT (subtype of AFFILIATE)
-- ============================================================
CREATE TABLE STUDENT (
    Student_ID               INT PRIMARY KEY,
    Student_Email_Address    VARCHAR(255) NOT NULL,
    Student_ID_No            VARCHAR(255) NOT NULL,
    Student_Academic_Program VARCHAR(255) NOT NULL,
    Student_Year_Level       VARCHAR(255) NOT NULL,
    CONSTRAINT uq_student_email UNIQUE (Student_Email_Address),
    CONSTRAINT uq_student_idno UNIQUE (Student_ID_No),
    CONSTRAINT fk_student_affiliate
        FOREIGN KEY (Student_ID) REFERENCES AFFILIATE (Affiliate_ID)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ============================================================
-- EMPLOYEE (subtype of AFFILIATE)
-- ============================================================
CREATE TABLE EMPLOYEE (
    Employee_ID             INT PRIMARY KEY,
    Employee_Email_Address  VARCHAR(255) NOT NULL,
    Employee_Unit_Office    VARCHAR(255) NOT NULL,
    Employee_ID_No          VARCHAR(255) NOT NULL,
    CONSTRAINT uq_employee_email UNIQUE (Employee_Email_Address),
    CONSTRAINT uq_employee_idno UNIQUE (Employee_ID_No),
    CONSTRAINT fk_employee_affiliate
        FOREIGN KEY (Employee_ID) REFERENCES AFFILIATE (Affiliate_ID)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ============================================================
-- CONCESSIONAIRE (subtype of AFFILIATE)
-- ============================================================
CREATE TABLE CONCESSIONAIRE (
    Concessionaire_ID   INT PRIMARY KEY,
    Concessionaire_Name VARCHAR(255) NOT NULL,
    CONSTRAINT fk_concessionaire_affiliate
        FOREIGN KEY (Concessionaire_ID) REFERENCES AFFILIATE (Affiliate_ID)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ============================================================
-- APPLICATION (central transaction entity)
-- ============================================================
CREATE TABLE APPLICATION (
    Application_ID   INT AUTO_INCREMENT PRIMARY KEY,
    Applicant_ID     INT  NOT NULL,
    Driver_ID        INT  NOT NULL,
    Account_ID       INT  NOT NULL,
    Affiliate_ID     INT  NOT NULL,
    Vehicle_ID       INT  NOT NULL,
    Application_Date DATE NOT NULL,
    Application_Time TIME NOT NULL,
    CONSTRAINT fk_application_applicant
        FOREIGN KEY (Applicant_ID) REFERENCES APPLICANT (Applicant_ID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_application_driver
        FOREIGN KEY (Driver_ID) REFERENCES DRIVER (Driver_ID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_application_account
        FOREIGN KEY (Account_ID) REFERENCES ACCOUNT (Account_ID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_application_affiliate
        FOREIGN KEY (Affiliate_ID) REFERENCES AFFILIATE (Affiliate_ID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_application_vehicle
        FOREIGN KEY (Vehicle_ID) REFERENCES VEHICLE (Vehicle_ID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ============================================================
-- Helpful indexes on FK columns (MySQL auto-indexes FKs,
-- these are explicit for clarity / query planning)
-- ============================================================
CREATE INDEX idx_application_applicant ON APPLICATION (Applicant_ID);
CREATE INDEX idx_application_driver    ON APPLICATION (Driver_ID);
CREATE INDEX idx_application_account   ON APPLICATION (Account_ID);
CREATE INDEX idx_application_affiliate ON APPLICATION (Affiliate_ID);
CREATE INDEX idx_application_vehicle   ON APPLICATION (Vehicle_ID);
