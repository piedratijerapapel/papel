<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>

<@ parts/head.php @>
  <!--p>@{ text | markdown }</p-->
  <div id="homeLogo"></div>
  <div class="viewOptions">
    <a class="filterIcon iconTags" href="/filtros"></a>
    <a class="filterIcon iconImg iconImgs" href="/filtros?filter=imgs"></a>
    <a class="filterIcon iconImg iconAbc" href="/filtros?filter=abc"></a>
  </div>
<@ parts/footer.php @>
