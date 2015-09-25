<script type="text/javascript">
  // get the video
  var video = document.querySelector('video');
  // use the whole window and a *named function*
  window.addEventListener('touchstart', function videoStart() {
    video.play();
    console.log('first touch');
    // remove from the window and call the function we are removing
    this.removeEventListener('touchstart', videoStart);
  });
</script>