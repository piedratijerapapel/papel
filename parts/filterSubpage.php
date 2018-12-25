<?php 
defined('AUTOMAD') or die('Direct access not permitted!');

require_once __DIR__ . '/../utils/helpers.php';
$json = getFlickrData($Automad);

?>
<@ head.php @>
  <nav id="filtersNav">
    <@ with @{:parent} @>
      <@ tree @>
    <@ end @>
  </nav>
  
  <div id="filtersContent"></div>

  <script>
    var flickrData = <?php echo $json; ?>;
  </script>
<@ footer.php @>
