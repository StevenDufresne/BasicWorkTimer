var ListItem = function (domItem) {
  var contain = document.getElementById(domItem),
      startButton = '',
      stopButton = '',
      resetButton = '',
      deleteButton = '',
      output = '',
      cookieName =  Math.floor(Math.random() *1000) + contain.firstChild.nextSibling.innerHTML,
      thisTimer = new TimerObject(contain.children[1].children[0]);

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

    chrome.cookies.set({ url: "http://new.com", name: cookieName, storeId: cookieName, value: thisTimer.getTime() + '.' + '0.' + (thisTimer.startTimeStamp).toString() , expirationDate: (new Date().getTime()/1000) + 3600 },  function (ev) {})

  });

  resetButton.addEventListener('click', function () {
    startButton.disabled = false;
    thisTimer.stop();
    thisTimer.resetTime();
    output.innerHTML = thisTimer.getTime();
  });

  window.addEventListener('blur', function () {
       chrome.cookies.set({ url: "http://new.com", name: cookieName, storeId: cookieName, value: thisTimer.getTime() + '.' + '1.' + (thisTimer.startTimeStamp).toString() , expirationDate: (new Date().getTime()/1000) + 3600 },  function (ev) {})
   })

  function getButtons () {

    for (var i = 0; i < contain.children[1].children.length; i +=1) {

      if(contain.children[1].children[i].className === "startTimer") {

          startButton = contain.children[1].children[i];

      } else if (contain.children[1].children[i].className === "stopTimer") {
        stopButton = contain.children[1].children[i];

      } else if (contain.children[1].children[i].className === "resetTimer") {
        resetButton = contain.children[1].children[i];

      } else if (contain.children[1].children[i].className === "deleteTimer") {
        deleteButton = contain.children[1].children[i];

      } 
    } 
  }
}

