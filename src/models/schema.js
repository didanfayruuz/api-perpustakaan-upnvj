const { pgTable, serial, varchar, integer } = require('drizzle-orm/pg-core');

// Tabel Users untuk Auth
const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
});

// Tabel Anggota
const anggotaTable = pgTable('anggota', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  nim: varchar('nim', { length: 20 }).notNull().unique(),
  umur: integer('umur').notNull(),
  jurusan: varchar('jurusan', { length: 100 }).notNull(),
});

module.exports = { usersTable, anggotaTable };  