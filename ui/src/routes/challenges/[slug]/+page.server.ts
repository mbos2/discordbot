import challengeService from '$lib/service/challenge.service';

export async function load({ params, data }: any) {
  console.log(data)
    try {
      const challenge = await challengeService.getChallengeById(params.slug);
      return {
        challenge: challenge[0]
      }
    } catch (error) {
      return {
        error: "Failed to load challenge."
      };
    }
  
}