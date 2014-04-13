function TimerObject (output, name) {
  var self = this;
  this.seconds = 0;
  this.minutes = 0;
  this.hours = 0;
  this.startTimeStamp = 0;
  this.totalSeconds = 0;
  this.output = output;
  this.cookieName = name;

}

TimerObject.prototype.start = function () {
  this.newTimer = setTimeout(this.tick.bind(this), 1000);

}

TimerObject.prototype.stop = function () {
  clearTimeout(this.newTimer)
}

TimerObject.prototype.getTime = function () {
  var timeFrag = '';

  (this.hours < 10 ) ? timeFrag += '0' + this.hours : timeFrag += ':' + this.hours;
  (this.minutes < 10 ) ? timeFrag += ':0' + this.minutes : timeFrag += ':' + this.minutes;
  (this.seconds < 10 ) ? timeFrag += ':0' + this.seconds : timeFrag += ':' + this.seconds;

  return timeFrag;

}

TimerObject.prototype.setTime = function (timeString) {
  var splitTime = timeString.split(":");

  this.hours = parseInt(splitTime[0]);
  this.minutes = parseInt(splitTime[1]);
  this.seconds = parseInt(splitTime[2]);

}


TimerObject.prototype.resetTime = function () {
  this.hours = 0;
  this.minutes = 0;
  this.seconds = 0;
  clearTimeout(this.newTimer);
}


TimerObject.prototype.tick = function () {
  this.seconds += 1;
  this.totalSeconds +=1;
  this.displayTime(this.seconds);
  this.start();

}

TimerObject.prototype.displayTime = function ( seconds ) {

  if( seconds >= 60 ) {
    this.minutes += 1;
    this.seconds = 0; 

    if(this.minutes >= 60 ) {
      this.hours += 1;
      this.minutes = 0;
    }
  }

  this.output.innerHTML = this.getTime();
}
