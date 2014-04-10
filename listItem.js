var ListItem = function (cookieTitle) {
  var self = this,
      contain = document.getElementById(cookieTitle),
      startButton = '',
      stopButton = '',
      resetButton = '',
      deleteButton = '',
      output = '',
      cookieName =  (cookieTitle !== undefined) ? cookieTitle : Math.floor(Math.random() *1000) + contain.firstChild.nextSibling.innerHTML,
      thisTimer = new TimerObject(contain.children[1].children[0]),
      thisDeleted = false;

    getButtons();
    
  startButton.addEventListener('click', function () {
    this.disabled = true;
    stopButton.disabled = false
    thisTimer.start();

    thisTimer.startTimeStamp = new Date().getTime();

  });

  stopButton.addEventListener('click', function () {
    startButton.disabled = false;
    stopButton.disabled = true
    thisTimer.stop();

    chrome.cookies.set({ url: "http://poop.com/", name: cookieName, storeId: "0", value: thisTimer.getTime() + '.' + '0.' + (thisTimer.startTimeStamp).toString() , expirationDate: (new Date().getTime()/1000) + 3600 }, function (cookie) {
    });

  });

  resetButton.addEventListener('click', function () {
    startButton.disabled = false;
    thisTimer.stop();
    thisTimer.resetTime();
    output.innerHTML = thisTimer.getTime();
  });

  deleteButton.addEventListener('click', function () {
    thisTimer.stop();

    chrome.cookies.remove({url: "http://poop.com/", name: cookieName, storeId: "0"}, function (deleted) {
      thisDeleted = true;
    });
  });


  window.addEventListener('blur', function () {
    if(!thisDeleted) {
      chrome.cookies.set({ url: "http://poop.com/", name: cookieName, storeId: "0", value: thisTimer.getTime() + '.' + '1.' + (thisTimer.startTimeStamp).toString() , expirationDate: (new Date().getTime()/1000) + 3600 },  function (ev) {})
    }
  })

  function getButtons () {
      var elem = contain.children[1];

    for (var i = 0; i < elem.children.length; i +=1) {


      if(elem.children[i].className === "startTimer") {

          startButton = elem.children[i];

      } else if (elem.children[i].className === "stopTimer") {
        stopButton = elem.children[i];

      } else if (elem.children[i].className === "resetTimer") {
        resetButton = elem.children[i];

      } else if (elem.children[i].className === "deleteTimer") {
        deleteButton = elem.children[i];

      } 
    } 
  }

  return thisTimer;
}

