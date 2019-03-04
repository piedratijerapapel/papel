<?php 
defined('AUTOMAD') or die('Direct access not permitted!');

require_once __DIR__ . '/../utils/helpers.php';
$json = getFlickrData($Automad);
?>
<!DOCTYPE html>
<html id="papel" lang="en">

<head>
  <script>var flickrData = <?php echo $json; ?></script>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>@{ sitename } | @{ title | def('404') }</title>
  <@ favicons.php @>
  <@ og.php @>
  <link href="/packages/ptp/papel/dist/main.css" rel="stylesheet">
  @{ itemsHeader }
</head>

<body>
  <header id="siteHeader" class="gridWrapper gridJustifySpaceBetween">
    <span id="menu"><span></span></span>

    <@if @{:template} !='papel' @>
    <a href="/" id="ptpLogoWrapper">
      <img id="ptpLogo" src="/shared/cuadratin.png" alt="PTP">
    </a>
    <@ end @>
    
    <div id="search">
      <input id="searchField" type="search" placeholder="Buscar">
      <ul class="autocompleteResults hidden"></ul>
      <button id="submit"></button>
    </div>
  </header>
  
  <@ nav.php @>
  
  <main class="template-@{ :template | sanitize } m-100 t-100 d-100 ld-100"> 