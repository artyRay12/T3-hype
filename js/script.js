$(window).load = main();

function showMobileMenu() {
  $('.menu_icon').toggleClass('menu_open');
}

function checkInputFields() {
  let button = $('#cardFormButton');
  let firstName = $('#cardInputName').val();
  let secondName = $('#cardInputSecondName').val();
  let thirdName = $('#cardInputThirdName').val();
  let textArea = $('#cardTextarea').val();

  if ((firstName) && (secondName) && (thirdName) && (textArea)) {
    button.prop('disabled', false);
  } else {
    button.prop('disabled', true);
  }
}


function sendCardForm() {
  let firstName = $('#cardInputName').val();
  let secondName = $('#cardInputSecondName').val();
  let thirdName = $('#cardInputThirdName').val();
  let textArea = $('#cardTextarea').val();
  var data = {'name': firstName,
              'secondName': secondName,
              'thirdName': thirdName,
              'message': textArea};
  $('#congratilationText').text(textArea);
  
  var form = JSON.stringify(data);


    
  $.ajax({
    url: '/php/main.php',
    type: 'POST',
    cache: false,
    data: form,
    contentType: 'application/json; charset=utf-8',
    success: function() {
      document.getElementById("cardBlock").innerHTML = document.getElementById("afterSend").innerHTML;
    },
    error: function(xhr, status, textError) { 
      console.log('Error ' + xhr.responseText + ' - ' + status + ' - ' + textError);
    } 
  })
}

function setStiky() {
  let nav = $('#navigation');

  if ($(window).scrollTop() >= 40) {
    nav.addClass('navigation_fix');

    if ($(window).width() < 572) {
      nav.css('padding', '10px 30px');
    } else {
      nav.css('padding', '10px 80px');
    }
  } else {
    nav.removeClass('navigation_fix');

    if ($(window).width() < 572) {
      nav.css('padding', '30px 30px 10px');
    } else {
      nav.css('padding', '30px 80px 10px');
    }
    
  }  
}



function main() {
  
  $('.menu_icon').on('click', function() {
    showMobileMenu();
  });
  
  $('#cardFormButton').on('click', function() {
    sendCardForm();
  });

  $(window).resize(function () {
    setStiky()
    if ($(window).width() < 992) {
     $('.owl-carousel').addClass('owl-hidden');
    } else {
      $('.owl-carousel').removeClass('owl-hidden');
    }
  });

  $(window).scroll(function() {
    setStiky();
  });

  $('.owl-carousel').owlCarousel({
    loop:true,
    nav : true,
    autoplay : false,
    items:1,
    navText: ["<img src='images/left_arrow.png'>", "<img src='images/right_arrow.png'>"]
  });

  $('#aboutWatchButton').on('click', function() {
    $.smoothScroll({
      scrollTarget: $('#aboutWatch')
    });
  });

  $('#packageButton').on('click', function() {
    $.smoothScroll({
      scrollTarget: $('#packages')
    });
  });
}