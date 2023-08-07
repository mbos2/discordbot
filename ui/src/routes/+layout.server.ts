import jwt from 'jsonwebtoken';
import dbService from '$lib/service/database.service';
import { redirect } from '@sveltejs/kit';

export const load = async (event: any) => {
    const jwtExpirationTime = Math.floor(Date.now() / 1000);
  
    const authTokenCookie = event.cookies.get('authToken');
    if(event.url.pathname !== '/signin') {
      try {
        if (authTokenCookie) {
          const tokenWithoutBearer = authTokenCookie.replace('Bearer ', '');
          const verifiedCookie = await jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET as string);
          const isSessionActive = await dbService.checkIfUserSessionIsActive(verifiedCookie, jwtExpirationTime);
          if (!isSessionActive) {
            event.cookies.delete('authToken');
            console.log('Session is not active')
            throw redirect(302, '/signin');
          }
          const loggedInUser = await dbService.getUserFromCookieData(verifiedCookie);
          return {
            user: loggedInUser
          }
        } else {
          console.log('Auth cookie not present')
          throw redirect(302, '/signin');
        }
      } catch (error) {
        throw redirect(302, '/signin');
      }
    } else if (event.url.pathname === '/signin') {
      if (authTokenCookie) {
        const tokenWithoutBearer = authTokenCookie.replace('Bearer ', '');
        const verifiedCookie = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET as string);
        const isSessionActive = await dbService.checkIfUserSessionIsActive(verifiedCookie, jwtExpirationTime);
        if (isSessionActive) {
          console.log('Session is active', isSessionActive)
          throw redirect(302, '/');
        } else {
          event.cookies.delete('authToken');
          throw redirect(308, '/signin');
        }
      } else {
        console.log('No auth cookie present')
      }
    }
};