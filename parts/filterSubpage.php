<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>
<@ head.php @>
  <nav id="filtersNav">
    <@ with @{:parent} @>
      <@ tree @>
    <@ end @>
  </nav>
  
  <div id="filtersContent"></div>
<@ footer.php @>
