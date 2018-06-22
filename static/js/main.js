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






