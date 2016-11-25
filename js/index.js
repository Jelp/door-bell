// @josuebasurto
$('#door').click(function(){
  var name = prompt('¿Quién es?');
  ga('set', 'userId', name);
  if(name != null && name != "" && name != " "){
    alert('Hola ' + name + ' déjame ver quien te puede abrir la puerta...');
    sendSlack(name + ' esta tocando la puerta... ', "general", "Doorbell");
    messageOK = 'Ya le notificamos a alguien, espera un momento.'
    alert(messageOK);
    $( "#door").unbind( "click" );
  }
  ga('send', 'event', 'General', 'Knock Knock', name);
});

function sendSlack(message, channel, username){
  var payload='payload={"channel": "' + channel + '", "username": "' + username + '", "text": "' + message + ' :punch: :door:", "icon_emoji": ":door:"}'
  // Get slack link in: https://jelp.slack.com/apps/manage/custom-integrations
  // > Incoming Webhooks
  var url='https://hooks.slack.com/services/' // Incoming Webhook
  succeed=false;
  var jqxhr = $.post( url, payload)
  .done(function() {
    console.log('Succeed...');
    succeed = true;
  })
  .fail(function(e) {
    console.log('Error...' + e);
    succeed=false;
  })
  .always(function() {
    console.log('Knock knock');
  });

  jqxhr.always();
  return succeed;
}
