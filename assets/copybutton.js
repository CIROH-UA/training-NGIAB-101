/* Clipboard --------------------------*/

function changeTooltipMessage(element, msg) {
    var tooltipOriginalTitle=element.getAttribute('data-bs-original-title');
    element.setAttribute('data-bs-original-title', msg);
    $(element).tooltip('show');
    element.setAttribute('data-bs-original-title', tooltipOriginalTitle);
  }

  if(ClipboardJS.isSupported()) {
    $(document).ready(function() {
      var copyButton = "<button";
      var button_end = "><i class='fa fa-copy'></i> Copy </button>";
      var tags = [
        "type='button'",
        "class='btn btn-primary btn-copy-ex'",
        "type = 'submit'",
        "title='Copy to clipboard'",
        "aria-label='Copy to clipboard'",
        "data-toggle='tooltip'",
        "data-placement='right auto'",
        "data-trigger='hover'",
        "data-clipboard-copy",
        "style='background-color:rgb(133, 129, 133); right: 20px; bottom: 10px; position: absolute'"
      ]
      $("div.sourceCode").addClass("hasCopyButton");

      copyButton += tags.join(" ") + button_end;

      // Insert copy buttons:
      $(copyButton).prependTo(".hasCopyButton");

      // Initialize tooltips:
      $('.btn-copy-ex').tooltip({container: 'body'});

      // Initialize clipboard:
      var clipboardBtnCopies = new ClipboardJS('[data-clipboard-copy]', {
        text: function(trigger) {
          var parent = trigger.parentNode;
          var target = parent.querySelector("code");
          // return trigger.parentNode.textContent.replace(/\n#>[^\n]*/g, "");
          return target.textContent.replace(/\n#>[^\n]*/g, "");
        }
      });

      clipboardBtnCopies.on('success', function(e) {
        changeTooltipMessage(e.trigger, 'Copied!');
        e.clearSelection();
      });

      clipboardBtnCopies.on('error', function() {
        changeTooltipMessage(e.trigger,'Press Ctrl+C or Command+C to copy');
      });
    });
  }