<script>
  export let data;
  const {challenges, user} = data;
  import ChallengesPreview from '$lib/components/ChallengesPreview.svelte';
  import Tab, {Label} from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  let active = 'Daily';
</script>

<section>
  <section class="header">
    <section>
      <h1 style="text-align: center;">CHALLENGES</h1>
      <hr class="center-ball">
    </section>
  </section>
  <section class="container" style="flex-direction: row-reverse;">
    {#if user?.role === 'admin'}
    <a href="/challenges/approvals" class="approval-button">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg4995" viewBox="0 0 90.000001 90.000001">
        <defs id="defs4997"/>
        <g transform="translate(-126.42857,-401.64792)" id="layer1">
          <path id="path5651-5-2-2-2" d="m 171.42857,401.64792 a 45,45 0 0 0 -45,45 45,45 0 0 0 45,45 45,45 0 0 0 45,-45 45,45 0 0 0 -45,-45 z m 5.1113,17.2559 a 27.74422,27.74422 0 0 1 27.7441,27.7441 27.74422,27.74422 0 0 1 -27.7441,27.7442 27.74422,27.74422 0 0 1 -12.4531,-3.002 c 0.4957,-1.1696 0.7714,-2.4583 0.7714,-3.8125 l 0,-9.7343 c 0,-3.3706 -1.6965,-6.3299 -4.2851,-8.0762 a 11.681776,16.062443 0 0 0 1.3633,-7.5 11.681776,16.062443 0 0 0 -6.0664,-14.082 27.74422,27.74422 0 0 1 20.6699,-9.2813 z m -26.2852,10.2207 a 8.7613318,13.141997 0 0 1 8.7617,13.1426 8.7613318,13.141997 0 0 1 -1.0664,6.2598 c -0.8945,-0.2687 -1.8436,-0.418 -2.8281,-0.418 l -9.7344,0 c -0.9872,0 -1.9374,0.1472 -2.8339,0.418 a 8.7613318,13.141997 0 0 1 -1.0606,-6.2598 8.7613318,13.141997 0 0 1 8.7617,-13.1426 z m 16.9981,10.2227 -0.8926,2 5.0586,2.2578 -5.1016,2.5429 0.9766,1.961 7.1797,-3.5801 a 1.0952759,1.0952759 0 0 0 -0.043,-1.9785 l -7.1777,-3.2031 z m 18.7773,0.7304 a 3.6505543,3.6505543 0 0 0 -3.6504,3.6504 3.6505543,3.6505543 0 0 0 3.6504,3.6504 3.6505543,3.6505543 0 0 0 3.6504,-3.6504 3.6505543,3.6505543 0 0 0 -3.6504,-3.6504 z m -39.6699,10.9512 7.7891,0 c 3.6403,0 6.6716,2.4773 7.5332,5.8418 l -12.8868,0 0,1.459 13.1172,0 c 0,0.1617 0.023,0.3217 0.023,0.4863 l 0,3.1641 -13.1426,0 0,1.4609 13.1426,0 0,3.1641 c 0,0.164 0,0.3254 -0.023,0.4863 l -13.1172,0 0,1.4609 12.8868,0 c -0.8616,3.3643 -3.8929,5.8399 -7.5332,5.8399 l -7.7891,0 c -4.3145,0 -7.7871,-3.4729 -7.7871,-7.7871 l 0,-7.7891 c 0,-4.3143 3.4726,-7.7871 7.7871,-7.7871 z m 23.1738,4.4629 -1.8535,1.168 c 0,0 3.7145,6.0058 10.3184,6.0058 6.6039,0 10.3183,-6.0058 10.3183,-6.0058 l -1.8535,-1.168 c 0,0 -3.2149,4.9844 -8.4648,4.9844 -5.2499,0 -8.4649,-4.9844 -8.4649,-4.9844 z" style="fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
        </g>
      </svg>
    </a>
    {/if}
    <a href="/challenges/create" class="create-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" version="1.0" y="0" x="0">
        <path id="path837" style="stroke-width:1pt;" d="m23.518 23.955v-14.301c0-2.0002 0.547-3.6257 1.641-4.8761 1.094-1.2816 2.657-1.9224 4.689-1.9224 2.031 0 3.594 0.6408 4.688 1.9224 1.126 1.2504 1.688 2.8759 1.688 4.8765v14.301h14.114c2.063 0 3.689 0.563 4.876 1.688 1.22 1.095 1.829 2.642 1.829 4.642 0 2.032-0.609 3.611-1.829 4.736-1.187 1.126-2.813 1.688-4.876 1.688h-14.114v14.254c0 2.032-0.562 3.673-1.688 4.924-1.125 1.25-2.688 1.875-4.688 1.875-2.001 0-3.564-0.625-4.689-1.875-1.094-1.251-1.641-2.892-1.641-4.924v-14.254h-14.114c-2.0006 0-3.6261-0.609-4.8764-1.828-1.2191-1.251-1.8287-2.782-1.8287-4.596 0-2 0.5939-3.547 1.7818-4.642 1.2191-1.125 2.8602-1.688 4.9233-1.688h14.114z"/>
    </svg>
    </a>
  </section>
  
  <section class="container">
    <TabBar tabs={['Daily', 'Weekly']} let:tab bind:active>
      <Tab {tab} minWidth>
        <Label>{tab}</Label>
      </Tab>
    </TabBar>

    {#if active === 'Daily'}
      <ChallengesPreview challenges={challenges.daily}/>
    {:else} 
      <ChallengesPreview challenges={challenges.weekly}/>
    {/if}
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
    border-color: #04AA6D;
  }

  .approval-button {
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

  .approval-button:hover {
    transform: scale(1.2);
    background-color: #04AA6D;
    border-color: #04AA6D;
  }


  .create-button svg path, .approval-button svg path  {
    fill: white;
  }

  :global(.mdc-tab-scroller__scroll-content) {
    justify-content: center;
  }
</style>