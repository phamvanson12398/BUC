import mysql from "mysql2/promise"
import dotenv from "dotenv/config"
export let connection;

export const createConnect = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
    });

    try {
      await connection.connect();
      // console.log("Connected to database!");
    } catch (error) {
      console.log("Error connecting to database");
      
    }
  }

  return connection;
};

export const getConnection = async () => {
    if (!connection) {
        await createConnect();
    }
    return connection;
}

export const initDataMysql = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );

    connection.end();
    console.log(`Init mysql database ${process.env.DB_NAME} successfully`);
  } catch (error) {
    console.error(`Init mysql database ${process.env.DB_NAME} failed:`, error);
    throw error;
  }
};

          const createMailServerTable = async (connection) => {
            try {
              const mailServerQuery = `
                CREATE TABLE IF NOT EXISTS mail_server (
                  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                  server_name varchar(255) NOT NULL,
                  description varchar(255) NOT NULL
                )
              `;
          
              await connection.execute(mailServerQuery);
          
              // console.log("Table mail_server created successfully!");
            } catch (error) {
              console.log("Error creating mail_server table");
            
            }
          };
          
          const createMailSenderTable = async (connection) => {
            try {
              const mailSenderQuery = `
                CREATE TABLE IF NOT EXISTS mail_sender (
                  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                  name VARCHAR(255) NOT NULL,
                  server_id INT(11) NOT NULL,
                  FOREIGN KEY (server_id) REFERENCES mail_server(id)
                )
              `;
          
              await connection.execute(mailSenderQuery);
          
              // console.log("Table mail_sender created successfully!");
            } catch (error) {
              console.log("Error creating mail_sender table");
             
            }
          };
          const createPermissionsTable = async (connection) => {
            try {
              const permissionsQuery = `
                CREATE TABLE IF NOT EXISTS permissions (
                  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                  name VARCHAR(255) NOT NULL,
                  description TEXT NOT NULL
                )
              `;
          
              await connection.execute(permissionsQuery);
          
              // console.log("Table permissions created successfully!");
            } catch (error) {
              console.error("Error creating permissions table");
              
            }
          };
          const createUsersTable = async (connection) => {
            try {
              const usersQuery = `
                CREATE TABLE IF NOT EXISTS users (
                  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                  user_name VARCHAR(255) NOT NULL,
                  password VARCHAR(255) NOT NULL,
                  email VARCHAR(255) NOT NULL,
                  phone INT(10) NOT NULL,
                  permission_id INT(11),
                  FOREIGN KEY (permission_id) REFERENCES permissions(id)
                )
              `;
          
              await connection.execute(usersQuery);
          
              // console.log("Table users created successfully!");
            } catch (error) {
              console.error("Error creating users table");
             
            }
          };
          const createVersionsTable = async (connection) => {
            try {
              const versionsQuery = `
                CREATE TABLE IF NOT EXISTS versions (
                  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                  version_name varchar(255) NOT NULL,
                  type_file varchar(255) NOT NULL,
                  modified datetime NOT NULL,
                  total_size int(11) NOT NULL,
                  description varchar(255) NOT NULL
                )
              `;
          
              await connection.execute(versionsQuery);
          
              // console.log("Table versions created successfully!");
            } catch (error) {
              console.error("Error creating versions table");
              
            }
          };
       
        export const initTables = async () => {
          try {
            await createMailServerTable(connection);
            await createMailSenderTable(connection);
            await createPermissionsTable(connection);
            await createUsersTable(connection);
            await createVersionsTable(connection);
          } catch (error) {
            console.log("Error initializing tables");
            
          }
        }


