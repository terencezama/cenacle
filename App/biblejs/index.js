var underline = 'underline';

document.addEventListener('message', function (e) {
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
    }

  });

document.addEventListener('click',function(e){
    var target = e.target;
            
            var data = {};
            data.verse = target.dataset.verse;
            data.text= target.outerHTML;
            data.id = data.verse.split('.')[2];
            
            
            if (target.tagName.toLowerCase() == 'span') {
                if (target.classList.contains(underline)) {
                    target.classList.remove(underline);
                    data.action= "clear";
                } else {
                    target.classList.add(underline);
                    data.action= "underline";
                }
                window.postMessage(JSON.stringify(data));
            }
});
