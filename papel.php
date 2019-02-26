<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>

<@ parts/head.php @>
    <div id="homeWrapper" class="contentWrapper m-90 t-80 d-70 ld-60">
        <div id="homeLogo"></div>
        <nav class="viewOptions">
            <@ with '/filtros' @>
                <@ tree @>
                    <@ end @>
        </nav>
        <h2 class="homeSubtitle">@{ textTeaser | markdown }</h2>
        <div class="logosWrapper">
            <img class="homeContentLogo" src="/shared/logos pata.jpg" alt="Logos">
        </div>

    </div>
    <@ parts/footer.php @> 