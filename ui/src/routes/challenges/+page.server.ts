import challengeService from '$lib/service/challenge.service';

/** @type {import('./$types').LayoutLoad} */

export async function load ({parent }: any) {
  console.log(await parent())
  const challenges = await challengeService.getAllChallenges();
  return challenges;
}
