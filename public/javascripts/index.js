function handheldTemplate(temperature, timestamp, entity, site, station) {
  return '<div class="reading-title">Handheld Reading</div>' +
    '<div class="temperature">' +
      '<span>Temperature:</span>' +
      '<span> ' + temperature + 'ºC</span>' +
    '</div>' +
    '<div class="meta">' +
      '<span>Time:</span>' +
      '<span> ' + (new Date(timestamp * 1000)).toString() + '</span>' +
    '</div>' +
    '<div class="meta">' +
      '<span>Entity #:</span>' +
      '<span> ' + entity + '</span>' +
    '</div>' +
    '<div class="meta">' +
      '<span>Store #:</span>' +
      '<span> ' + site + '</span>' +
    '</div>' +
    '<div class="meta">' +
      '<span>Station #:</span>' +
      '<span> ' + station + '</span>' +
    '</div>';
}

function prependData(data) {
  var placeholder = document.getElementById('placeholder');
  if (placeholder !== null) {
    placeholder.parentNode.removeChild(placeholder);
  }

  var list = document.getElementById('handheld-list');
  var li = document.createElement('li');
  li.innerHTML = handheldTemplate(data.temperature, data.timestamp, data.entity, data.siteId, data.station);
  list.insertBefore(li, list.firstChild);
}

var socket = io();
socket.on('connect', function() {
  console.log('Socket connected');
});

socket.on('disconnect', function() {
  console.log('Socket disconnected');
});

socket.on('handheld_data', function(data) {
  console.log(data);
  prependData(data);
});