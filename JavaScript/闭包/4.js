// body {
//     font-family: Helvetica, Arial, sans-serif;
//     font-size: 12px;
//   }
  
//   h1 {
//     font-size: 1.5em;
//   }
  
//   h2 {
//     font-size: 1.2em;
//   }
  
  function makeSizer(size) {
    return function() {
      document.body.style.fontSize = size + 'px';
    };
  }
  
  var size12 = makeSizer(12);
  var size14 = makeSizer(14);
  var size16 = makeSizer(16);
  