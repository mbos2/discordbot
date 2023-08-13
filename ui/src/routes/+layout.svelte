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

<style global>
  :global(*) {
    font-family: 'Open Sans', sans-serif;
  }
  :global(h1) {
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 60px;
    font-weight: 900;
    text-align: center;
  }
  :global(section) {
    margin-top: 16px;
    margin-bottom: 16px;
  }

    :global(hr) {
      border: 0;
      height: 2px;
      width: 100%;
      position: relative;
      margin-bottom: 30px;
    }
    :global(hr.center-ball) {
      background: #059862;
    }

  :global(.hr-fade) {
    border: 0;
    height: 3px;
    margin:18px 0;
    position:relative;
    background: -moz-linear-gradient(left, rgba(5, 152, 98,0) 0%, rgba(5, 152, 98,0) 10%, rgba(5, 152, 98,0.65) 50%, rgba(5, 152, 98,0) 90%, rgba(5, 152, 98,0) 100%); /* FF3.6+ */
    background: -webkit-linear-gradient(left, rgba(5, 152, 98,0) 0%,rgba(5, 152, 98,0) 10%,rgba(5, 152, 98,0.65) 50%,rgba(5, 152, 98,0) 90%,rgba(5, 152, 98,0) 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(left, rgba(5, 152, 98,0) 0%,rgba(5, 152, 98,0) 10%,rgba(5, 152, 98,0.65) 50%,rgba(5, 152, 98,0) 90%,rgba(5, 152, 98,0) 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(left, rgba(5, 152, 98,0) 0%,rgba(5, 152, 98,0) 10%,rgba(5, 152, 98,0.65) 50%,rgba(5, 152, 98,0) 90%,rgba(5, 152, 98,0) 100%); /* IE10+ */
    background: linear-gradient(left, rgba(5, 152, 98,0) 0%,rgba(5, 152, 98,0) 10%,rgba(5, 152, 98,0.65) 50%,rgba(5, 152, 98,0) 90%,rgba(5, 152, 98,0) 100%); /* W3C */
  }

  :global(.hr-fade):before {
    content: "";
    display: block;
    border-top: solid 1px #fff;
    width: 100%;
    height: 1px;
    position: absolute;
    top: 50%;
    z-index: 1;
  }
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

  :global(.back-btn) {
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