import challengeService from '$lib/service/challenge.service';

/** @type {import('./$types').PageLoad} */

export async function load (event: any) {
  const challenges = await challengeService.getAllChallenges();
  return challenges;
}
