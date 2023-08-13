<script lang="ts">
  export let data;
  console.log(data)
</script>

<section>
  <section class="header">
    <div style="display: flex; justify-content: center;}">
      <a class="back-btn" href="/challenges">
        <span>◁</span><span>BACK</span>
      </a>
    </div>
    <section>
      <h1 style="text-align: center;">APPROVALS</h1>
      <hr class="center-ball">
    </section>
  </section>
</section>

<section class="container">

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

  </style>