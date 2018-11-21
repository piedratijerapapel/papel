<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>
<!DOCTYPE html>
<html lang="en">
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

<body class="papel gridWrapper gridJustifySpaceBetween @{ :template | sanitize }">
  <div id="siteBanner" class="m-50 t-40 d-30 ld-20">
    <a href="/" class="ptpLogo">
    <@ with @{ logo | def('/shared/*logo*') } @>
      <img 
        src="<@ with @{ :file } { height: @{ logoHeight | def (150) } } @>@{ :fileResized }<@ end @>" 
        srcset="<@ with @{ :file } { height: @{ logoHeight | def (150) | *2 } } @>@{ :fileResized } 2x<@ end @>"
        alt="@{ :basename }"
      >
    <@ else @>@{ sitename }<@ end @>
    </a>
    <h3 class="siteSubtitle">@{sitesubtitle}</h3>
  </div>
<@ nav.php @>
  <main class="contentWrapper m-50 t-60 d-70 ld-80">