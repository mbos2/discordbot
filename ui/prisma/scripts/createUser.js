import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2';
import readline from 'readline';

const prisma = new PrismaClient();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const validRoles = ['admin', 'moderator']; // Valid role options

async function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function createUser() {
  try {
    const username = await prompt('Enter username: ');
    const selectedRole = await prompt(`Select role (${validRoles.join('/')}): `);

    if (!validRoles.includes(selectedRole)) {
      console.error('Invalid role selected');
      return;
    }

    const password = await prompt('Enter password: ');
    const hashedPassword = await argon2.hash(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        role: selectedRole,
        password: hashedPassword,
      },
    });

    console.log('New user created:', newUser.username);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

createUser();
