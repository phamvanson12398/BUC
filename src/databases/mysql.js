import mysql from "mysql2/promise";
import dotenv from "dotenv/config";
import bcrypt from "bcrypt"
import userController from "../controllers/userController";
import { checkUser, checkinitUser } from "../models/myLibrary";
let connection;
export const createConnect = async () => {
    if (!connection) {
        try {
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD
            });
        } catch (error) {
            console.log("Error connecting to the database:", error);
        }
    }
    return connection;
};

export const getConnection = async () => {
    if (!connection) {
        await createConnect();
    }
    return connection;
};

export const initDataMysql = async () => {
    try {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
      
  
      await connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
      );
  
  
   
    } catch (error) {
      console.log(`Init mysql database ${process.env.DB_NAME} failed: ${error?.message || JSON.stringify(error)}`);
    }
  };
export const initTable = async () => {
    try {
       
        const mail_server = `
            CREATE TABLE IF NOT EXISTS mail_server(
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                server_name VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL
            )`;

        const mail_sender = `
            CREATE TABLE IF NOT EXISTS mail_sender(
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                server_id INT(11) NOT NULL,
                FOREIGN KEY (server_id) REFERENCES mail_server(id) ON DELETE CASCADE
            )`;

        const permissions = `
            CREATE TABLE IF NOT EXISTS permissions (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL
            )`;

        const users = `
            CREATE TABLE IF NOT EXISTS users (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                user_name VARCHAR(255) NOT NULL unique,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL unique,
                phone INT(10) NOT NULL,
                permission_id INT(11) NOT NULL,
                FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
            )`;
        const devices =`
            CREATE TABLE IF NOT EXISTS devices (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                device_name VARCHAR(255)
                )
            `   
        const versions = `
            CREATE TABLE IF NOT EXISTS versions (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                version_name VARCHAR(255) NOT NULL,
                type_file VARCHAR(255) NOT NULL,
                modified DATETIME NOT NULL,
                total_size INT(11) NOT NULL,
                description VARCHAR(255) NOT NULL,
                device_id INT(11) NOT NULL ,
                FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
            )`;
        
        const whiteList = `
        CREATE TABLE IF NOT EXISTS whiteLists (
            id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            reftoken VARCHAR(255)  NOT NULL,
            acctoken VARCHAR(255)  NOT NULL,
            user_id INT(11) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
        
        const file = `
        CREATE TABLE IF NOT EXISTS files (
            id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255)  NOT NULL,
            type_file VARCHAR(255) NOT NULL,
            content TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            path VARCHAR(255) NOT NULL,
            version_id INT(11) NOT NULL,
            FOREIGN KEY (version_id) REFERENCES versions(id) ON DELETE CASCADE
        )
        `;
        const blackList =`
        CREATE TABLE IF NOT EXISTS blacklist (
            id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255)  NOT NULL
        )
        ` 
        const pass =  await  userController.hashPassword(process.env.PASS)
        const initPermission = `INSERT INTO permissions (name,description) VALUES('supperhhadmin','lamhhh het')`;
        const initAccount = `
        INSERT INTO users (user_name,password,email,phone,permission_id) VALUES ('${process.env.USERBUC}','${pass}','${process.env.EMAIL}','${process.env.PHONE}','${process.env.PERMISSION_ID}')
        `
        await connection.query(mail_server);
        await connection.query(mail_sender);
        await connection.query(permissions);
        await connection.query(users);
        await connection.query(devices);
        await connection.query(versions);
        await connection.query(whiteList);
        await connection.query(file);
        await connection.query(blackList);
        const acc = await checkinitUser(process.env.USERBUC);
        if(acc.length === 0){
            await connection.query(initPermission);
            await connection.query(initAccount);
        }
       
        console.log("Tables created successfully!");
    } catch (error) {
        console.log("Error creating tables:", error);
       
    }
};
