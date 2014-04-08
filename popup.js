//// Globals ////
var total = 0;

/////////////////

var BWT = {
    addTaskButton : document.getElementById("addButton"),
    init: function () {

      this.bindEvents();
      this.getHistory();


    },

    bindEvents : function () {
      var self = this;

      // DOM Events
      self.addTaskButton.addEventListener('click', function () {
        self.addToDOM();
      });


    },

    addToDOM : function ( ID, existingTime, isRunning, existingTitle ) {
      var template = document.getElementById("listTemplate").innerHTML,
        tempLI = document.createElement('li'),
        mainUL =document.getElementById("ulNode"),
        frag = '',
        taskTitle = existingTitle || "New Task",
        time = existingTime || "0:00";

        tempLI.id = "li" + total;

        frag = template.replace(/\{\{name\}\}/, taskTitle)
                      .replace(/\{\{time\}\}/, time);

        tempLI.innerHTML = frag;
        mainUL.appendChild(tempLI);

        //create a new list item
        new ListItem('li' + total);
        total++;

  },

  getHistory: function (){
    var self = this;
   chrome.cookies.getAll({ url: "http://new.com" }, function (cookies) {
  
    for(var i = 0; i < cookies.length; i+=1) {
      var splitValue = cookies[i].value.split('.')


      if(splitValue[1] === "1") {
        var curTime = new Date().getTime(),
        elapsedTime = (curTime - splitValue[2]).toString(),
        time = elapsedTime.substring(0, elapsedTime.length - 3),
        date = new Date(null),
        test = date.toTimeString().substr(3, 5);

        date.setSeconds(time);


        self.addToDOM( cookies[i].storeId, test, splitValue[1], cookies[i].name);

      } else {

        self.addToDOM( cookies[i].storeId, splitValue[0], splitValue[1], cookies[i].name);
      }

    }

  })
}




}



BWT.init();

