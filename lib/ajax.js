function ajaxGet(URL, func) {
  req = null;
  if (window.XMLHttpRequest) { req = new XMLHttpRequest(); }
  else if (window.ActiveXObject) { req = new ActiveXObject("Microsoft.XMLHTTP"); }
  if (req == null) { return; } // Failed to create the request

  req.onreadystatechange = function() {
    switch(req.readyState) {
      case 0:  break; // Uninitialized
      case 1:  break; // Loading
      case 2:  break; // Loaded
      case 3:  break; // Interactive
      case 4:  func(req.responseText); break; // Done!
      default: break;
    }
  }

  req.open('GET', URL, true);
  req.send(null);
}