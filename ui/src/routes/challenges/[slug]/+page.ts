import challengeService from '$lib/service/challenge.service';

export async function load({ params }: any) {
  console.log(params)
    try {
      const challenge = await challengeService.getChallengeById(params.slug);
      return {
        challenge: challenge
      }
    } catch (error) {
      return {
        error: "Failed to load challenge."
      };
    }
  
}