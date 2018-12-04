<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>
<!DOCTYPE html>
<html id="papel" lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>@{ sitename } | @{ title | def('404') }</title>
	<@ favicons.php @>
	<link href="/packages/ptp/papel/dist/main.css" rel="stylesheet">
  @{ itemsHeader }
  <script>
    const flickrApiKey='@{ flickr_api_key }';
    const flickrUserId='@{ flickr_user_id }';
  </script>
</head>

<body>
  <@if @{checkbox_home} @>
  <@ else @>
  <header id="siteHeader" class="gridWrapper gridJustifySpaceBetween">
    <span id="menu"><span></span></span>
    <div id="search">
      <input id="searchField" type="text" placeholder="Buscar">
      <button id="submit"></button>
    </div>
  </header>
  <a href="/" id="ptpLogoWrapper">
    <img id="ptpLogo" src="/shared/logo.png" alt="">
  </a>
  <@ nav.php @>
  <@ end @>
  <main class="@{ :template | sanitize } contentWrapper m-100 t-100 d-100 ld-100">
