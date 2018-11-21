<?php
require_once 'utils/Flickr.php';
require_once 'utils/helpers.php';

defined('AUTOMAD') or die('Direct access not permitted!');
$Page = $Automad->Context->get();

$file = __DIR__ . '/_data/cacheflickr.json';
$cached = file_get_contents($file);

if (empty($cached)) {
  $apiKey = $Page->Shared->data['flickr_api_key'];
  $apiSecret = $Page->Shared->data['flickr_api_secret'];
  $flickr = new Flickr($apiKey, $apiSecret);

  $logedIn = $flickr->requestOauthToken();

  if ($logedIn) {
    $imgs = getAllImages($flickr, array(), 200, 1);
    $json = json_encode($imgs);
    $cached .= $imgs;
    file_put_contents($file, $json);
  }
} else {
  $json = $cached;
}
?>

<@ parts/head.php @>
  <nav id="filtersNav">
    <a href="/filtros" class="filterIcon iconTags"></a>
    <a href="/filtros?filter=imgs" class="filterIcon iconImg iconImgs"></a>
    <a href="/filtros?filter=abc" class="filterIcon iconImg iconAbc"></a>
  </nav>
  <div id="filtersContent"></div>

  <script>
    var flickrData = <?php echo $json; ?>;
  </script>
<@ parts/footer.php @>
