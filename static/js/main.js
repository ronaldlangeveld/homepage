console.log("JS LOADED");


    // AJAX CALL SETTINGS
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }

  var csrftoken = getCookie('csrftoken');


  function csrfSafeMethod(method) {
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }

  $.ajaxSetup({
      beforeSend: function (xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
      }
  });

  function ajaxCall(url, data, callback) {
      var request = $.ajax({
          type: "POST",
          url: url,
          dataType: "json",
          data: data
      });
      request.done(function (result) {
          if (typeof callback !== 'undefined') {
              callback(result);
          }
      });
  }

  function validateEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
  }




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


// FEEDBACK Form
$('#feedbackpopup').addClass('animated fadeInUp');
var feedback = document.getElementById('feedbackpopup');

// Get the button that opens the modal
var feedbackbtn = document.getElementById("sendusfeedbackBTN");

// When the user clicks the button, open the modal
feedbackbtn.onclick = function() {
    feedback.style.display = "block";
    $("#sendusfeedbackBTN").hide();
};

$("#feedback-close").click(function(){
    $("#feedbackpopup").hide();
    $("#sendusfeedbackBTN").show();
});

$("#sendMessage").click(function() {
    var name = $('#contactName').val();
    var memail = $('#contactEmail').val().toLowerCase();
    var message = $('#contactMessage').val();
    $("#sendMessage").addClass("is-loading");
    console.log(name, memail, message);
    $('#sendMessage').prop('disabled', true);
    if (validateEmail(memail) && name && message){
        $("#loader").show();
        ajaxCall('/feedback',
            {'name': name, 'email': memail, 'message': message},
            function(data){
            var succ = data.ok;
            if(succ == 'ok'){
                $("#feedbackpopup").hide();
                $("#sendMessage").removeClass("is-loading");
                alert("Thank You for contacting us. We will get back to you shortly.");
                $('#contactName, #contactEmail, #contactMessage').val('');
                $('#sendMessage').prop('disabled', false);
            }
            if(succ == 'no'){
                alert("Sorry, can't connect to the server right now, our Tech engineers are working on it");
                $("#sendMessage").removeClass("is-loading");

            }
        }
        );
    }
    else{
        $('#sendMessage').prop('disabled', false);
        alert("Please make sure all fields are complete.");
        $("#sendMessage").removeClass("is-loading");
    }
});

  





  var visitdays;
var labels
  if($("#travel").length > 0){
    $.get( "/api/travel", function( data ) {

       var labels = data.Travels.map(function(a) { 
          console.log(a.countrycode);
          return a.country;

        });

        var visitdays = data.Travels.map(function(a) { 
          console.log(a.days);
          return a.days;

        });

        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Days in each country',
                    data: visitdays,
                    // backgroundColor: [
                    //     'rgba(255, 99, 132, 0.2)',
                    //     'rgba(54, 162, 235, 0.2)',
                    //     'rgba(255, 206, 86, 0.2)',
                    //     'rgba(75, 192, 192, 0.2)',
                    //     'rgba(153, 102, 255, 0.2)',
                    //     'rgba(255, 159, 64, 0.2)'
                    // ],
                    // borderColor: [
                    //     'rgba(255,99,132,1)',
                    //     'rgba(54, 162, 235, 1)',
                    //     'rgba(255, 206, 86, 1)',
                    //     'rgba(75, 192, 192, 1)',
                    //     'rgba(153, 102, 255, 1)',
                    //     'rgba(255, 159, 64, 1)'
                    // ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

    });

  };

  //  var travedata = $.get( "/api/travel", function( data ) {

  //   return data;
  //  });

  //  console.log(travedata);

  //      var labels = travedata.Travels.map(function(a) { 
  //         console.log(a.countrycode);
  //         return a.countrycode;
  //      });






