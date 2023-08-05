import { redirect } from '@sveltejs/kit';
export const load = async (event: any) => {
  const authTokenCookie = event.cookies.get('authToken');
  
  if(event.url.pathname === '/signin') {
    if(authTokenCookie) {
      throw redirect(302, '/')
    }
  } else if (event.url.pathname === '/') {
    if(!authTokenCookie) {
      throw redirect(302, '/signin')
    }
  }
};