const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10');

async function createUser(email, password) {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({ data: { email, password: hashed } });
  return user;
}

async function login(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('INVALID_CREDENTIALS');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('INVALID_CREDENTIALS');

  const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '1h' });
  return { token, user };
}

module.exports = { createUser, login };
