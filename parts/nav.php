<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>
<nav class="navContent m-100 t-50 d-40 ld-20">
  <@ snippet tree @>
    <@ if @{ :pagelistCount } @>
    <ul class="subNav">
      <@ foreach in pagelist @>
        <@ if not @{ checkboxHideInMenu } @>
        <li class="@{:template}<@ if @{:current} @> active<@ end @>">
          <a href="@{url}">@{title}</a>
          <@ tree @>
        </li>
        <@ end @>
      <@ end @>
    </ul>
    <@ end @>
  <@ end @>

  <@ newPagelist { 
    type: 'children',
    excludeHidden: true 
  } @>
  <div class="mainNav">
    <@ with "/" @>
      <@ tree @>
    <@ end @>
  </div>
</nav>
