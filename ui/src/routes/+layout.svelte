<script lang="ts">
  import { page } from '$app/stores';
  import { onDestroy } from 'svelte';
  export let data;
  let route: any = null;
  const unsubscribe = page.subscribe(($page) => {
    route = $page.route.id;
  });
  async function logout() {
		await fetch('/logout', {
      method: 'POST'
    });
	}

  onDestroy(() => {
    unsubscribe();
  });
</script>

<section class="logged">
  {#if route !== '/signin'}
  <div>
    <a class="back-btn" href="/">
      <span>HOME</span>
    </a>
  </div>
  {/if}
  {#if data.user}
    <div class="logdata">
      <span>Logged in as: <strong>{data.user?.username} ({data.user?.role})</strong></span>
      <button on:click={logout}>Logout</button>
    </div>
  {/if}
</section>
<slot></slot>

<style>
  .logged {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .logged .logdata {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .logged span {
    font-size: 20px;
  }

  .logged button {
    background: #1d2a35;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    gap: 16px;
  }

  .logged button:hover {
    cursor: pointer;
  }

  .back-btn {
    background: #1d2a35;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    gap: 16px;
  }
</style>