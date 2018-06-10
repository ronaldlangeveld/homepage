console.log("JS LOADED");

$( "#twitter-btn" ).hover(function() {
    $('.texttag').hide();
    $('#twitter-text').show();

  });

  $( "#github-btn" ).hover(function() {
    $('.texttag').hide();
    $('#github-text').show();
  });

  $( "#nomadlist-btn" ).hover(function() {
    $('.texttag').hide();
    $('#nomadlist-text').show();
  });

  $( "#telegram-btn" ).hover(function() {
    $('.texttag').hide();
    $('#telegram-text').show();
  });


  $( "#email-btn" ).hover(function() {
    $('.texttag').hide();
    $('#email-text').show();
  });

  $( ".texttag" ).hover(function() {
    $(this).hide();

  });


  $("#lightmode").click(function(){
    $('#bulmahero').removeClass('is-dark');
    $('#bulmahero').addClass('is-light');
    $("#lightmode").hide();
    $('#nightmode').show();
  })

  $("#nightmode").click(function(){
    $('#bulmahero').removeClass('is-light');
    $('#bulmahero').addClass('is-dark');
    $('#nightmode').hide();
    $('#lightmode').show();
  })