import challengeService from '$lib/service/challenge.service';

/** @type {import('./$types').LoadEvent } */
export async function load ({params, data, parent}: any) {
  const p = await parent();
  console.log(p)
  console.log(data)
  const approvals = await challengeService.getAllApprovals();
  console.log(approvals)
  return {approvals: approvals};
}
