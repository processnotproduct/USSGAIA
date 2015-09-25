<script type="text/javascript">
      (function() {

          $(function() {
              // apply your matchHeight on DOM ready (they will be automatically re-applied on load or resize)

              // get test settings
              var byRow = $('body').hasClass('test-rows');

              // apply matchHeight to each Design Feature item
              $('.feature-parent').each(function() {
                  $(this).find('.feature-child').matchHeight({
                      byRow: byRow
                  });
              });

              // apply matchHeight to each Habitat Tab item
              $('.h-tab-habitats').each(function() {
                  $(this).find('.h-pane-habitats').matchHeight({
                      byRow: byRow
                  });
              });

              // apply matchHeight to each Habitat Tab item
              $('.h-tab-platforms').each(function() {
                  $(this).find('.h-pane-platforms').matchHeight({
                      byRow: byRow
                  });
              });

              // apply matchHeight to each Habitat Tab item
              $('.h-tab-beyond').each(function() {
                  $(this).find('.h-pane-beyond').matchHeight({
                      byRow: byRow
                  });
              });

              // example of update callbacks (uncomment to test)
              $.fn.matchHeight._beforeUpdate = function(event, groups) {
                  //var eventType = event ? event.type + ' event, ' : '';
                  //console.log("beforeUpdate, " + eventType + groups.length + " groups");
              }

              $.fn.matchHeight._afterUpdate = function(event, groups) {
                  //var eventType = event ? event.type + ' event, ' : '';
                  //console.log("afterUpdate, " + eventType + groups.length + " groups");
              }
          });

      })();
    </script>