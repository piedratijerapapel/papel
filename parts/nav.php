<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>
<nav class="navContent m-100 t-50 d-40 ld-20">
  <@ snippet tree @>
    <@ if @{ :currentPath } @>
      <@ if @{ :pagelistCount } @>
        <ul class="subNav">
          <@ foreach in pagelist @>
            <@ if not @{ checkboxHideInMenu } @>
            <li<@ if @{ :current } @> class="active"<@ end @>>
              <a href="@{ url }">@{ title | stripTags }</a>
              <@ tree @>
            </li>
            <@ end @>
          <@ end @>
        </ul>
      <@ end @>
    <@ end @>
  <@ end @>

  <@ newPagelist { 
    type: 'children',
    excludeHidden: true 
  } @>
  <div class="mainNav">
    <# Change context to the homepage #>
    <@ with "/" @>
    <# Call recursive tree snippet #>
    <@ tree @><@ end @>
  </div>
</nav>
