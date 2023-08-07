import { fail, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event: any) => {
    const formData = Object.fromEntries(await event.request.formData());
    // Verify that we have an email and a password
    if (!formData.username || !formData.password) {
      return fail(400, {
        error: 'Missing email or password'
      });
    }

    const { username, password } = formData as { username: string; password: string };
    // Get user from db
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    try {
      // Check if user is there and if active
      if (user && user.isActive) {
        // If user is there, validate entered password
        const isPasswordValid = await argon2.verify(user.password, password);
        if (isPasswordValid) {
          const jwtSecret = process.env.JWT_SECRET as string;
          const jtwExpirationTime = Math.floor(Date.now() / 1000) + (60 * 60 * 4); // 4 hours expiration time
          const newTokenUUID = uuidv4();
          // If all 3 checks are valid, create jwt token and a cookie
          const jtwToken = await jwt.sign({
            tokenId: newTokenUUID,
            userId: user.id
          }, 
          jwtSecret, 
          {
            expiresIn: jtwExpirationTime
          });

          event.cookies.set(
            'authToken',
            `Bearer ${jtwToken}`,
            {
              httpOnly: true,
              path: '/',
              secure: true,
              sameSite: 'strict',
              maxAge: 4 * 60 * 60
            }
          )

          // If token is created, create a session in database
          const session = await prisma.userSessions.create({
            data: {
              tokenId: newTokenUUID,
              userId: user.id,
              createdAt: Math.floor(Date.now() / 1000),
              expiresAt: jtwExpirationTime
            }
          }).catch(err => {
            throw err;
          })

          return redirect(308, '/');
        } else {
          return fail(400, {
            error: 'Wrong username or password'
          });
        }
      } else {
        return fail(400, {
          error: 'Wrong username or password'
        });
      }
    } catch (error) {
      
    }
  }
};