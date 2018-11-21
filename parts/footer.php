<?php defined('AUTOMAD') or die('Direct access not permitted!'); ?>

  </main>
	<footer class="footer m-100 t-100 d-100 ld-100">
    <nav class="footerNav">
      <ul>
        <li><a href="/dashboard">Login</a></li>
        <li>
          <span class="ptpCopyright">@{ :now | dateFormat('Y') } @{ sitename }</span>
        </li>
      </ul>
    </nav>
		<# Add optional footer items. #>
		@{ itemsFooter }
			
  </footer>
  <script src="/packages/ptp/papel/dist/polymaps.min.js"></script>
	<script src="/packages/ptp/papel/dist/main.js"></script>
</body>
</html>