import { json } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export function POST({ cookies }: any) {
  cookies.delete('authToken');

  return redirect(302, '/signin')
}