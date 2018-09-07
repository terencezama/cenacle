

if (window.Element && !Element.prototype.closest) {
      Element.prototype.closest =
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
          do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) { };
          } while ((i < 0) && (el = el.parentElement));
          return el;
        };
    }
    var underline = 'underline';

    document.addEventListener('message', function (e) {
      messageReceived(e);
    });
    document.addEventListener('click', function (e) {
      clickAction(e);

      // alert('nice');
    });
    // window.addEventListener('message', function (e) {
    //     messageReceived(e);
    // });

    function messageReceived(e) {
      var data = JSON.parse(e.data);
      //data work with actions
      // window.postMessage(data);
      switch (data.action) {
        case "font-change": {
          var delta = parseInt(data.delta);
          document.body.style.fontSize = (parseFloat(document.body.style.fontSize) + delta) + "px";
          break;
        }
        case "clear-underline": {
          var underlines = document.getElementsByClassName("underline")
          while (underlines[0]) {
            underlines[0].classList.remove('underline');
          }
          break;
        }
        case "highlight": {
          var verses = data.verses;
          var underlines = document.getElementsByClassName("underline")
          while (underlines[0]) {
            underlines[0].classList.add('highlight');
            underlines[0].classList.remove('underline');
          }
          break;
        }
        case "unhighlight": {
          var highlights = data.highlights;
          highlights.forEach(element => {
            var verseId = element.verse;
            var h_element = document.querySelectorAll("[data-verse='" + verseId + "']")[0];
            h_element.classList.remove('highlight');

          });

          break;
        }
      }
    }
    function clickAction(e) {
      var target = e.target;
      var div = null;
      if (target.tagName.toLowerCase() == 'div') {
        div = target;
      } else {
        div = target.closest("div");
      }

      if (div) {
        var data = {};
        data.verse = div.dataset.verse;
        data.text = div.outerHTML;
        data.id = data.verse.split('.')[2];
        if (div.classList.contains(underline)) {
          div.classList.remove(underline);
          data.action = "clear";
        } else {
          div.classList.add(underline);
          if (div.classList.contains("highlight")) {
            data.highlighted = true;
          }
          data.action = "underline";
        }
        window.postMessage(JSON.stringify(data));
      }
    }
