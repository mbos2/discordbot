import { fail, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event: any) => {
    const dailyChallenges = await prisma.challenge.findMany({
      where: {
        type: 'daily'
      }
    });

    const weeklyChallenges = await prisma.challenge.findMany({
      where: {
        type: 'weekly'
      }
    });

    return {
      challenges: {
        daily: dailyChallenges,
        weekly: weeklyChallenges
      }
    }
  }
};