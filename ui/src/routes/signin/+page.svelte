<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data: any;
    /** @type {import('./$types').ActionData} */
    export let form: any;
</script>
 
<svelte:head>
  <title>Login</title>
</svelte:head>
 
<h1>Login</h1>
 
<section>
  <form method="post">
    <div class="group">
      <label for="username">Username</label>
      <input type="username" name="username" id="username" required />
    </div>
 
    <div class="group">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" required />
    </div>
 
    <div class="submit-container">
      <button type="submit">Login</button>
    </div>
 
    {#if form?.error}
      <div class="notice error">
        {form.error}
      </div>
    {/if}
  </form>
</section>