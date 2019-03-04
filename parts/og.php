<?php
defined('AUTOMAD') or die('Direct access not permitted!');
require_once __DIR__ . '/../utils/helpers.php';
$data = getFlickrData($Automad);

$baseURL = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
$url = $baseURL . $_SERVER[REQUEST_URI];
$img = $baseURL . '/shared/ptp.jpg';
$title = "@{ sitename } | " .  "@{ title} ";
$description = "@{ textTeaser }";


$Page = $Automad->Context->get();
if ($Page->template === 'viz') {
  $img = $baseURL . '/shared/vizThumb.jpg';
} elseif ($Page->template === 'typo') {
  $img = $baseURL . '/shared/textoThumb.jpg';
}

if (!empty($data) && $_GET['mode'] === 'img') {
  $data = json_decode($data);
  $obj = array_filter(
    $data,
    function ($e) {
        return $e->id == $_GET['val'];
    }
  );

  // get first element in the array
  $obj = reset($obj);

  if (!empty($obj)) {
    $img = $obj->url_l;
    $title = "@{ sitename } | " .  $obj->title;
    // split description to array
    $arr = preg_split('/<[^>]*[^\/]>/i', $obj->description);
    // find index of "Ficha técinca"
    $i = array_search('Ficha técnica:', $arr);
    // next item in the array is the description
    $description = trim($arr[$i + 1]);
    $description = !empty($description) ? $description : "@{ textTeaser }";
  }
}
?>

<meta name="description" content="<?php echo $description; ?>" />
<meta name="twitter:card" value="summary">
<meta property="og:title" content="<?php echo $title;?>" />
<meta property="og:site_name" content="@{ sitename }">
<meta property="og:type" content="article" />
<meta property="og:url" content="<?php echo $url;?>" />
<meta property="og:image" content="<?php echo $img; ?>" />
<meta property="og:description" content="<?php echo $description; ?>" />
