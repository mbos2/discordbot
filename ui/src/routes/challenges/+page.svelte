<script>
  export let data;
  const {challenges} = data;
  import ChallengesPreview from '$lib/components/ChallengesPreview.svelte';
</script>

<section>
  <section class="header">
    <section>
      <h1 style="text-align: center;">CHALLENGES</h1>
      <hr class="center-ball">
    </section>
  </section>
  <section class="container">
    <a href="/challenges/create" class="create-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" version="1.0" y="0" x="0">
        <path id="path837" style="stroke-width:1pt;" d="m23.518 23.955v-14.301c0-2.0002 0.547-3.6257 1.641-4.8761 1.094-1.2816 2.657-1.9224 4.689-1.9224 2.031 0 3.594 0.6408 4.688 1.9224 1.126 1.2504 1.688 2.8759 1.688 4.8765v14.301h14.114c2.063 0 3.689 0.563 4.876 1.688 1.22 1.095 1.829 2.642 1.829 4.642 0 2.032-0.609 3.611-1.829 4.736-1.187 1.126-2.813 1.688-4.876 1.688h-14.114v14.254c0 2.032-0.562 3.673-1.688 4.924-1.125 1.25-2.688 1.875-4.688 1.875-2.001 0-3.564-0.625-4.689-1.875-1.094-1.251-1.641-2.892-1.641-4.924v-14.254h-14.114c-2.0006 0-3.6261-0.609-4.8764-1.828-1.2191-1.251-1.8287-2.782-1.8287-4.596 0-2 0.5939-3.547 1.7818-4.642 1.2191-1.125 2.8602-1.688 4.9233-1.688h14.114z"/>
    </svg>
    </a>
  </section>
  <section class="container">
    <ChallengesPreview challenges={challenges.daily}/>
  </section>
</section>

<style>
  h1 {
    font-size: 60px;
    font-weight: 900;
  }
  hr {
    border: 0;
    height: 2px;
    width: 60%;
    position: relative;
    margin-bottom: 30px;
  }
  hr.center-ball {
    background: #059862;
  }

  .header {
    padding: 1rem;
  }

  .container {
    width: 60%;
    margin: 0 auto;
    padding: 16px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap:32px;
  }

  .create-button {
    display: block;
    height: 60px;
    width: 60px;
    padding: 5px;
    background-color: #1d2a35;
    border-style: solid;
    border-width: 6px;
    border-color: #1d2a35;
    border-radius: 100%;
    box-shadow: 1px 1px 3px grey;
    color: white;
    transition: 0.2s;
  }

  .create-button:hover {
    transform: scale(1.2);
    background-color: #04AA6D;
  }

  .create-button svg path {
    fill: white;
  }
</style>