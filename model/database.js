require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "localhost",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "oilaw",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = `
  DROP TABLE if exists requests; 
  DROP TABLE if exists users; 
  CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(100) not null, 
    last_name VARCHAR(100) not null, 
    email VARCHAR(50) not null, 
    tel_number INT not null, 
    contact_preference VARCHAR(100) not null, 
    PRIMARY KEY (id));

  
  CREATE TABLE requests (
    id INT NOT NULL AUTO_INCREMENT, 
    request TEXT not null,
    user_id INT not null,
    complete BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
 );

 DROP TABLE if exists Lawyers; 
 CREATE TABLE Lawyers (
	lawyer_name varchar(255) NOT NULL,
	ID INT(255) NOT NULL AUTO_INCREMENT,
  e_mail varchar(255) NOT NULL,
	lawyer_type varchar(255) NOT NULL,

	PRIMARY KEY (ID)
);
  
  `;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `users` was successful!");

    console.log("Closing...");
  });

  con.end();
});

//DROP TABLE if exists attorneys; 
  // CREATE TABLE attorneys(
  //   id INT NOT NULL AUTO_INCREMENT, 
  //   first_name VARCHAR(100) not null, 
  //   last_name VARCHAR(100) not null, 
  //   email VARCHAR(50) not null, 
  //   tel_number INT not null, 
  //   PRIMARY KEY (id),
  //   FOREIGN KEY (user_id));
