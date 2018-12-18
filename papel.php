<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>

<@ parts/head.php @>
  <div id="homeWrapper" class="m-80 t-80 d-70 ld-60">
    <div id="homeLogo"></div>
    <div class="viewOptions">
      <a class="homeTerm" href="/filtros?filter=imgs">imagen.</a>
      <a class="homeTerm" href="/filtros">palabra.</a>
      <a class="homeTerm" href="/filtros?filter=abc">índice.</a>
    </div>
    <h2 class="homeSubtitle">@{ textTeaser | markdown }</h2>
    <img class="homeContentLogo" src="/shared/logo-silu.png" alt="La silueta">
  </div>
<@ parts/footer.php @>
