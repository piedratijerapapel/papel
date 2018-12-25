<?php 
defined('AUTOMAD') or die('Direct access not permitted!');

require_once 'utils/helpers.php';
$json = getFlickrData($Automad);

?>
<@ parts/head.php @>
  <nav id="filtersNav">
    <@ tree @>
  </nav>
  <div id="filtersContent"></div>

  <script>
    var flickrData = <?php echo $json; ?>;
  </script>
<@ parts/footer.php @>
