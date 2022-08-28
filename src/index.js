import { Client } from 'pg';

export const initConnection = () => {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_HOST,
  } = process.env;
  const client = new Client({
    user: POSTGRES_USER || 'postgres',
    host: POSTGRES_HOST || 'localhost',
    database: POSTGRES_DB || 'homework',
    password: POSTGRES_PASSWORD || 'pliuta96',
    port: POSTGRES_PORT || 5432,
  });

  return client;
};

export const createStructure = async () => {
  const client = initConnection();
  client.connect();

  await client.query(`CREATE TABLE users (id serial primary key not null,  name varchar(30) not null, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
  await client.query(`CREATE TABLE categories (id serial primary key not null, name varchar(30) not null)`);
  await client.query(`CREATE TABLE authors (id serial primary key not null, name varchar(30) not null)`);
  await client.query(`CREATE TABLE books (id serial primary key not null, title varchar(30) not null, userid integer not null,  authorid integer not null, categoryid integer not null, foreign key(userid) references users(id) ON DELETE CASCADE, foreign key(authorid) references authors(id) ON DELETE CASCADE,  foreign key(categoryid) references categories(id) ON DELETE CASCADE)`);
  await client.query(`CREATE TABLE descriptions (id serial primary key not null, description varchar(10000) not null,  bookid integer not null unique, foreign key(bookid) references books(id) ON DELETE CASCADE)`);
  await client.query(`CREATE TABLE reviews (id serial primary key not null,  message varchar(10000) not null, userid integer not null, bookid integer not null, foreign key(userid) references users(id) ON DELETE CASCADE, foreign key(bookid) references books(id) ON DELETE CASCADE)`);


  client.end();
};

export const createItems = async () => {
  const client = initConnection();
  client.connect();


  // Your code is here...

  client.end();
};

export const dropTables = async () => {
  const client = initConnection();
  client.connect();

  await client.query('DROP TABLE reviews;');
  await client.query('DROP TABLE descriptions;');
  await client.query('DROP TABLE books;');
  await client.query('DROP TABLE authors;');
  await client.query('DROP TABLE categories;');
  await client.query('DROP TABLE users;');

  client.end();
};
