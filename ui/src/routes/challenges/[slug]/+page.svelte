<script lang="ts">
  import {UserRoles} from '$lib/common/enums';
  import SvelteMarkdown from 'svelte-markdown'
  import TextLabel from '$lib/components/TextLabel.svelte';
  enum Size {
    small='small',
    medium='medium',
    large='large'
  }
  export let data: any;
  const {user, challenge} = data;
  console.log(challenge)
  const switchDifficultyColor = (difficulty: number) => {
    let color;
    switch (true) {
      case difficulty < 4:
        color = '#80d989';
        break;
      case difficulty >= 4 || difficulty < 7:
        color = '#d9d779';
        break;
      case difficulty >= 7 || difficulty < 7:
        color = '#d9806f';
        break;
    }

    return color;
  }
</script>

<div>
  {JSON.stringify(data.challenge)}
</div>
<section class="container">
  <h1>CHALLENGE</h1>
  <hr class="hr-fade"/>
</section>
<section class="container">
  <div class="title-container">
    <h2 style="text-align:center; font-size: 36px;">{challenge.title}</h2>
    {#if user.role === UserRoles.ADMIN}
      <a class="back-btn" href="{challenge.id}/edit">Edit</a>
    {/if}
  </div>
  <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top:16px;">
    <TextLabel
      text={challenge.type.toUpperCase()}
      color="#000"
      bgColor="#71d2d9"
      size="large"
      label="Type"
    />
    <TextLabel
      text={challenge.isPublished === 0 ? 'Not published' : 'Published'}
      color="#000"
      bgColor={challenge.isPublished === 0 ? '#71d2d9' : '#80d989'}
      size="large"
      label="Status"
    />
    <TextLabel
      text={challenge.difficulty + ' / 10'}
      color="#000"
      bgColor={switchDifficultyColor(challenge.difficulty)}
      size="large"
      label="Difficulty"
    />
  </div>
</section>
<section class="container">
  <section class="text-wrapper">
    <!-- <SvelteMarkdown source={challenge.data} /> -->
    <!-- {challenge.data.replace(/\n/g, "<br>").replace(/\s/g, "&nbsp;")} -->
    {@html challenge.data.replace(/\n/g, "<br>").replace(/\s/g, "&nbsp;")}

  </section>
</section>

<style>
 .container {
  width: 60%;
  margin: 0 auto;
 }

 .title-container {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
 }

 .text-wrapper {
  border: .2px solid black;
  padding: 8px;
  margin-top: 16px;
  border-radius: 16px;
  word-wrap: break-word;
 }
</style>