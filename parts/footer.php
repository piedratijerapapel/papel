<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>

  </main>
	<footer class="footer m-100 t-100 d-100 ld-100">
    <nav class="footerNav">
      <ul class="gridWrapper gridJustifySpaceBetween">
        <li><a href="/dashboard">Login</a></li>
        <li>
          <span class="ptpCopyright">@{ :now | dateFormat('Y') } @{ sitename }</span>
        </li>
      </ul>
    </nav>		
  </footer>
  <script src="/packages/ptp/papel/dist/polymaps.min.js"></script>
	<script src="/packages/ptp/papel/dist/main.js"></script>
</body>
</html>