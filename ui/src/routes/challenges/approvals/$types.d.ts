import type * as Kit from '@sveltejs/kit';
 
type RouteParams = {
  params: Params;
  parent: Load;
}
 
export type LoadEvent = Kit.Load<RouteParams>;