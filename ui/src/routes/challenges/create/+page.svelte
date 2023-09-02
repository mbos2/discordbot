<script lang="ts">
  import Markdown from 'svelte-exmarkdown';
  import Tab, {Label} from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  let active = 'Edit';
  export let title: any;
  export let md: any;
</script>

<section>
  <section class="header">
    <div style="display: flex; justify-content: center;">
      <a class="back-btn" href="/challenges">
        <span>◁</span><span>BACK</span>
      </a>
    </div>
    <section>
      <h1 style="text-align: center;">CREATE</h1>
      <hr class="center-ball">
    </section>
  </section>
</section>

<section class="container">
  <TabBar tabs={['Edit', 'Preview']} let:tab bind:active>
    <Tab {tab}>
      <Label>{tab}</Label>
    </Tab>
  </TabBar>

  {#if active === 'Edit'}
  <h4 class="md-link">
    <a href="https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-" target="_blank">
      ALLOWED DISCORD MARKDOWN
    </a>
  </h4>
    <form style="width: 100%;">
      <input class="title" type="text" bind:value={title} placeholder="Title" />
      <textarea placeholder="Challenge data . . ." bind:value={md}></textarea>
    </form>
  {:else}
    <Markdown md={title} />
    <Markdown {md} />
  {/if}
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

  textarea {
    width: 100%;
    height: 500px;
    padding: 16px;
    border-radius: 8px;
    margin-top: 16px;
  }

  .md-link a {
    color: #000;
  }

  .title {
    width: 100%;
    border: 1px solid #000;
    border-radius: 8px;
    padding: 16px;
    height: 60px;
    font-size: 26px;
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

  </style>