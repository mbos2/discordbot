<section class="container">
  <div class="heading">
    <h1 style="text-align: center;">
      <img src="logo.svg" alt="" width="50" style="display: inline"/>
      Discord Bot UI
    </h1>
  </div>
  <hr class="center-ball">
  <div class="card-container">
    <a href="/challenges" class="wrapper">
      <div class="card">
        <h1>
          <span class="enclosed">Challenges</span>
          <img src="programmer.svg" alt="" width="100" style=""/>
        </h1>
      </div>
    </a>
  </div>
</section>

<style>
  hr {
    border: 0;
    height: 2px;
    width: 100%;
    position: relative;
    margin-bottom: 30px;
  }
  hr.center-ball {
    background: #059862;
  }

  .container {
    width: 60%;
    margin: 0 auto;
    border-radius: 25px;
    min-height: 600px;
    margin-top: 50px;
    display: grid;
    place-items: start;
    padding: 1rem;
  }

  .heading {
    padding: 16px; 
    display: flex; 
    justify-content: space-around;
    width: 100%;
  }

  .card-container {
    padding: 2rem;
    display: flex;
    gap: 5rem;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .wrapper {
  position: relative;
  perspective: 40em;
  display: grid;
  transform-style: preserve-3d;
}

.card {
  grid-area: 1 / 1;
  height: 200px;
  width: 400px;
  transform: translateX(10px) rotateY(25deg) rotateX(10deg);
  background: #059862;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  color: #000;
  text-transform: uppercase;
  font-size: 60px;
  font-weight: 900;
  backface-visibility: hidden;
  box-shadow: 0 10px 30px -3px rgba(0,0,0,.1);
}

h1 {
  font-size: 60px;
  font-weight: 900;
}

.card .enclosed {
  background: #1d2a35;
  line-height: 1;
  color: #FFF4A3;
  padding: 15px;
  display: inline-block;
  transform: translate(-1px, 1px) scale(0.75);
  transform-origin: right center;
}

.wrapper:before {
  --bw: 5px;
  grid-area: 1 / 1;
  content: '';
  backface-visibility: hidden;
  height: 100%;
  width: 100%;
  margin-top: calc(-1 * var(--bw));
  margin-left: calc(-1 * var(--bw));
  background: transparent;
  transform: translateX(-60px) rotateY(-30deg) rotateX(15deg) scale(1.03);
  pointer-events: none;
  border: var(--bw) solid #1d2a35;
  box-sizing: content-box;
}

.wrapper:hover > div,
.wrapper:hover:before {
  transform: none;
}

.wrapper > div,
.wrapper:before {
  will-change: transform;
  transition: .3s transform cubic-bezier(.25,.46,.45,1);
}

</style>