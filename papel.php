<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>

<@ parts/head.php @>
  <div id="homeWrapper" class="m-80 t-80 d-70 ld-60">
    <div id="homeLogo"></div>
    <nav class="viewOptions">
      <@ with '/filtros' @>
        <@ tree @>
      <@ end @>
    </nav>
    <h2 class="homeSubtitle">@{ textTeaser | markdown }</h2>
    <img class="homeContentLogo" src="/shared/logo-silu.png" alt="La silueta">
  </div>
<@ parts/footer.php @>
