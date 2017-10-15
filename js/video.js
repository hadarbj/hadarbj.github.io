
function updateOnResize() {
  var desc = demoplayer.videojs.videoWidth() + 
             "x" + 
             demoplayer.videojs.videoHeight();
  var current = document.getElementsByClassName("active button");
  for (var i = 0; i < current.length; i++) {
    if(current[i].id != "auto")
      current[i].setAttribute("class","button");
  }
  var newactive = document.getElementsByName(desc);
  for (var j = 0; j < newactive.length; j++)
    newactive[j].setAttribute("class","active button");
}

function requestResolution() {
  document.getElementById("auto").setAttribute("class","button");
  for (var i = 0; i < qualityLevels.length; i++) {
      qualityLevels[i].enabled = (this.id == i);
  }
}

function requestAuto() {
  for (var i = 0; i < qualityLevels.length; i++) {
      qualityLevels[i].enabled = true;
  }
  document.getElementById("auto").setAttribute("class","active button");
}

function addButton(bid,qlevel,desc,css) {
      console.log("addButton");
      var btn = document.createElement("BUTTON");
      adaptive.appendChild(btn);
      btn.addEventListener("click", requestResolution);
      btn.innerHTML = desc;
      btn.setAttribute("id",bid);
      btn.setAttribute("class",css);
      btn.setAttribute("name",desc);
}

function changeOfResolution() {
  console.log("changeOfResolution",qualityLevels.length)
  for (var i = 0; i < qualityLevels.length; i++) {
    var btn = document.getElementById(i);
    var qlevel = qualityLevels[i];
    var desc = qlevel.width + "x" + qlevel.height;
    var css = "button";
    if (i == qualityLevels.selectedIndex)
        css = "requested button";
    if(btn) {
      if(btn.getAttribute("class") != "active button")
        btn.setAttribute("class",css);
    }
    else 
      addButton(i,qlevel,desc,css);
  }
}

function setProfile(profile) {
  var loop = document.getElementsByClassName("button").length - 1;
  for (var i = 0; i < loop; i++) {
    var btn = document.getElementById(i)
    if(btn)
      adaptive.removeChild(btn);
  }
  var file = document.getElementById("FileName").value;
  demoplayer.source(file, { sourceTypes: ['hls'], transformation: {streaming_profile: profile } });
}

var cld = cloudinary.Cloudinary.new({ cloud_name: 'hadar' });
  
var adaptive = document.getElementById("adaptive");
document.getElementById("demo-adaptive-player").addEventListener('resize',updateOnResize, false);
  
var demoplayer = cld.videoPlayer('demo-adaptive-player');
  
var qualityLevels = demoplayer.videojs.qualityLevels();
qualityLevels.on('change', changeOfResolution);
qualityLevels.on('addqualitylevel', function(event) { console.log(event.qualityLevel.width); });
  
demoplayer.source('hd_trim2',{ sourceTypes: ['hls'], 
                              transformation: {streaming_profile: 'hd' } });

function updateOnEvent(eventStr) {
  var eventsDiv = document.querySelector('#vid-events');
  var text = document.createTextNode(eventStr);
  var textDiv = document.createElement('div');
  textDiv.appendChild(text);
  eventsDiv.appendChild(textDiv);
  eventsDiv.scrollTop = eventsDiv.scrollHeight;
}

function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

function startTime()
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
        return (h + ":" + m + ":" + s);
}

var eventplayer = cld.videoPlayer('demo-event-player', { playedEventTimes: [3, 10] });

var eventTypes = ['play', 'pause', 'volumechange', 'mute', 'unmute', 'fullscreenchange',
      'seek', 'sourcechanged', 'timeplayed', 'percentsplayed', 'ended'];

eventTypes.forEach(function(eventType) {
      eventplayer.on(eventType, function(event) {
        var eventStr = startTime() + " " + eventType;
        if (event.eventData) {
          eventStr = eventStr + ": " + JSON.stringify(event.eventData)
        }
        updateOnEvent(eventStr);
      })
    });
  
var eventplayer = cld.videoPlayer('demo-events-player', { playedEventTimes: [3, 10] });
  
eventplayer.source('hd_trim2',{ sourceTypes: ['hls'], 
                              transformation: {streaming_profile: 'hd' } });
  
      var plistplayer = cld.videoPlayer('demo-playlist-player');
  
      plistplayer.source('game2',{ sourceTypes: ['hls'], 
                              transformation: {streaming_profile: 'hd' } });

      var recplayer = cld.videoPlayer('demo-recommendation-player', { autoShowRecommendations: true });
  
      recplayer.source('Homepage_2',{ sourceTypes: ['hls'], 
                              transformation: {streaming_profile: 'hd' } });


