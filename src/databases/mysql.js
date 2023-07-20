import mysql from "mysql2"
import dotenv from "dotenv/config"
export let connection;

export const createConnect = () => {
    return new Promise((resolve, reject) => {
        if (!connection) {
            connection = mysql.createConnection(
                {
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    database: process.env.DB_NAME,
                    password: process.env.DB_PASSWORD
                }
            )
            connection.connect((error) => {
                if (error) {
                    console.log("Error connect to database!");
                    return reject(error);
                }
                console.log("Connected to database!");
                return resolve(connection);
            })
        }
    })

}

export const getConnection = async () => {
    if (!connection) {
        await createConnect();
    }
    return connection;
}

export const initDataMysql = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
        console.log("process.env.DB_HOST", process.env.DB_HOST);
        console.log("process.env.DB_HOST", process.env.DB_USER);
        console.log("process.env.DB_HOST", process.env.DB_PASSWORD);
        connection.query(
            `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
            (error, results) => {
                connection.end();
                if (error) {
                    console.log(`Init mysql database ${process.env.DB_NAME} failed: ${error?.message || JSON.stringify(error)}`);
                    return reject(error);
                }
                console.log(`Init mysql database ${process.env.DB_NAME} successfully: ${JSON.stringify({ results })}`);
                return resolve();
            }
        );
    })
}

export const initTable = () => {
    return new Promise((resolve, reject) => {
        const mail_server = `
            CREATE TABLE IF NOT EXISTS mail_server (
                id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                server_name varchar(255) NOT NULL,
                description varchar(255) NOT NULL
            )`;

        const mail_sender=`
        CREATE TABLE IF NOT EXISTS mail_sender (
            id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            server_id INT(11) NOT NULL,
            FOREIGN KEY (server_id) REFERENCES mail_server(id)
        );`
        const permissions =`
        CREATE TABLE IF NOT EXISTS permissions (
            id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        );
          `;
        const users =`
        CREATE TABLE IF NOT EXISTS users (
            id INT(11) DEFAULT NULL AUTO_INCREMENT PRIMARY KEY,
            user_name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone INT(10) NOT NULL,
            permission_id INT(11) NOT NULL,
            FOREIGN KEY (permission_id) REFERENCES permissions(id)
        );
        `;
        
        const versions=`
        CREATE TABLE IF NOT EXISTS versions (
            id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            version_name varchar(255) NOT NULL,
            type_file varchar(255) NOT NULL,
            modified datetime NOT NULL,
            total_size int(11) NOT NULL,
            description varchar(255) NOT NULL
          )`

        connection.query(mail_server, (err, result) => {
            if (err) {
                console.log("Create table error", err);
                connection.end()
                return reject(err)
            }
            console.log("Table created successfully!");
            // connection.end()
            return resolve()
        })
        
        connection.query(mail_sender, (err, result) => {
            if (err) {
                console.log("Create table error", err);
                connection.end()
                return reject(err)
            }
            console.log("Table created successfully!");
            // connection.end()
            return resolve()
        })
        connection.query(permissions, (err, result) => {
            if (err) {
                console.log("Create table error", err);
                connection.end()
                return reject(err)
            }
            console.log("Table created successfully!");
            // connection.end()
            return resolve()
        })
        connection.query(users, (err, result) => {
            if (err) {
                console.log("Create table error", err);
                connection.end()
                return reject(err)
            }
            console.log("Table created successfully!");
            // connection.end()
            return resolve()
        })
        connection.query(versions, (err, result) => {
            if (err) {
                console.log("Create table error", err);
                connection.end()
                return reject(err)
            }
            console.log("Table created successfully!");
            // connection.end()
            return resolve()
        })
    })
}





// export default { getConnection, initDataMysql, initTable }