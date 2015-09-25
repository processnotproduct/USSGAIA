    <!-- BACKGROUND IMAGE FIX -->
  <script>
    function myFunction() {
    if ( $(window).width() > 768) {     
      document.getElementById("video-bg").setAttribute("data-background", "null");
    }
    else {
      document.getElementById("video-bg").setAttribute("data-background", "http://static.ussgaia.com/images/header.jpg");
    }
    }
    window.onload = myFunction;
  </script>