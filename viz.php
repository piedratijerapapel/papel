<?php 
defined('AUTOMAD') or die('Direct access not permitted!');

$_ = DIRECTORY_SEPARATOR;
$path = '.' . $_ . 'maps';
// Get list of folders inside /maps path.
// Each represents an image
$list = array_diff(scandir('./maps'), array('..', '.'));
$thumbs = array();

foreach ($list as $name) {
  $base = $path . $_ . $name;
  if (is_dir($base) && is_dir($base . $_ . '0')) {
    $levels = array_diff(scandir($base), array('..', '.'));

    $thumbs[$name] = array(
      'url' => $_ . 'maps' . $_ . $name . $_ . '0' . $_ . '0' . $_ . '0.png',
      'zoom' => end($levels)
    );
  }
}
?>

<@ parts/head.php @>
  <div class="contentWrapper gridWrapper">
    <ul class="thumbs m-90 t-20 d-20 ld-30">
    <?php foreach ($thumbs as $name => $arr): ?>
      <li class="thumb" data-name="<?php echo $name; ?>" data-zoom="<?php echo $arr['zoom'] ?>"><img src="<?php echo $arr['url'] ?>" /></li>
    <?php endforeach; ?>
    </ul>
    <div id="map" class="m-90 t-80 d-80 ld-65"></div>
  </div>
<@ parts/footer.php @> 