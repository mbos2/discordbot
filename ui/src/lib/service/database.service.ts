import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const dbService = {
  checkIfUserSessionIsActive: async (decodedToken: any, currentTime: any): Promise<boolean> => {

    const session = await prisma.userSessions.findUnique({
      where: {
        tokenId: decodedToken.tokenId
      }
    });

    if (session) {
      console.log(currentTime, ' - ', session.expiresAt)
      if (currentTime > session.expiresAt) {
        return false;
      }
    }

    return true;
  },
  getUserFromCookieData: async (cookieData: any) => {
    const user = await prisma.user.findUnique({
      where: {
        id: cookieData.userId
      }
    });

    if (user) {
      return {
        username: user.username,
        role: user.role
      }
    }

    return undefined;
  }
}

export default dbService;