<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data: any;
    /** @type {import('./$types').ActionData} */
    export let form: any;
</script>
 
<svelte:head>
  <title>W3Schools Bot - Sign In</title>
</svelte:head>
 
<section class="container centered">
  <div class="card">
  <img src="logo.svg" alt="" width="120" style="margin: 0 auto;"/>
  <h1 style="text-align: center;">Discord Bot UI</h1>
  <h2 style="text-align: center;">Sign In</h2>
    <form method="post">
      <div class="group">
        <label for="username"></label>
        <input type="text" placeholder="Username" name="username">
      </div>
      <div class="group">
        <label for="username"></label>
        <input type="password" placeholder="Password" name="password">
      </div>
      <div class="submit-container buttons">
        <button type="submit" class="login-button">Login</button>
      </div>
      {#if form?.error}
        <div class="notice error" style="width: fit-content; margin: 0 auto; text-align: center; border-radius: 5px; border-bottom: 4px solid #eb4034;">
          {form.error}
        </div>
      {/if}
    </form>
  </div>
</section>

<style>

  h1 {
    margin-top: 16px;
    font-size: 30px;
  }

  form {
    margin-top: 16px;
  }
  .container {
    width: 60%;
    margin: 0 auto;
    margin-top: 200px;
  }

  .container.centered {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .card {
    width: 300px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    border-top: 4px solid #04AA6D;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #ccc;
  color: #333;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.login-button {
  padding: 10px 20px;
  background-color: #04AA6D;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 480px) {
  .card {
    width: 100%;
    max-width: 300px;
  }
}

</style>