<script lang="ts">
  enum Size {
    small='small',
    medium='medium',
    large='large'
  }
  export let text: any, bgColor: any, color: any, size: string, label: string = '';
  let paddingY: any;
  let paddingX: any;
  let textColor: '#000';
  let backgroundColor: "#fff";

  switch (size) {
    case Size.small:
      paddingY = 4;
      paddingX = 12;
      break;
    case Size.medium:
      paddingY = 6;
      paddingX = 18;
      break;
    case Size.large:
      paddingY = 8;
      paddingX = 24;
      break;
    default:
      paddingY = 6;
      paddingX = 18;
      break;
  }

  if (color) {
    textColor = color;
  }

  if (bgColor) {
    backgroundColor = bgColor;
  }
</script>

<div>
  {#if label}
    <h4 class="h">{label}</h4>
  {/if}
  <section style="--paddingX:{paddingX}px; --paddingY:{paddingY}px; --color:{textColor}; --bgcolor:{backgroundColor}">
    {text}
  </section>
</div>

<style>
  section {
    border: 2px solid black;
    border-radius: 25px;
    padding-top: var(--paddingY);
    padding-bottom: var(--paddingY);
    padding-left: var(--paddingX);
    padding-right: var(--paddingX);
    background-color: var(--bgcolor);
    color: var(--color);
    width: fit-content;
    font-weight: 600;
  }

  .h {
    margin-left: 5px;
    position: relative;
    top: 10px;
  }
</style>