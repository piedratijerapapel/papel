<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>
<@ head.php @>
    <nav id="filtersNav">
        <@ with @{:parent} @>
            <@ tree @>
                <@ end @>
    </nav>

    <@ if @{:template}='filterByImage' @>
        <div id="filtersContent" class="contentWrapper m-100 t-100 d-90 ld-90"></div>
        <@ else @>
            <div id="filtersContent" class="contentWrapper m-90 t-80 d-80 ld-80"></div>
            <@ end @>



                <@ footer.php @> 