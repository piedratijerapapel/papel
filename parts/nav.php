<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>
<nav class="topNav gridWrapper gridJustifySpaceBetween m-50 t-60 d-70 ld-80">
  <@ snippet tree @>
    <# Only show children/siblings in current path #>
    <@ if @{ :currentPath } @>
      <# Only create new list in case the current context has children #>
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

  <# Create new pagelist including all children adapting to the current context. #>
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

  <div id="search">
    <input id="searchField" type="text" placeholder="Buscar">
    <button id="submit"></button>
  </div>
</nav>
