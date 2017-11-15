require('jquery');

console.log('Welcome to Caufield Memorials!');

var headerHeight = $(".nav-header").height() + 40;
var height = $( window ).height() - headerHeight;

$(window).scroll(function() {    
  var scroll = $(window).scrollTop();

  if (scroll >= height) {
      $(".index .nav-header").removeClass("partial-fixed");
  } else {
  	$(".index .nav-header").addClass("partial-fixed");
  }
}); 

$(document).ready(function(){
	if ($(window).width() > 900) {
		$(".estimate section").css("min-height",height);
	}else {
		$("body").css("padding-top",headerHeight);
	}
	
	$(".step-2 .product-container").not(".default").hide();	
  $(".selection-container").click(function(){
    $(this).toggleClass('active');
    $(this).siblings().removeClass('active');
  });
  
  $(".bronze-plaque").click(function(){
    $('#free-estimate').addClass('bronze-plaque');
  });

  $(".selection-container").not(".bronze-plaque").click(function(){
    $('.add-portrait, .add-scene').show();
    $('#free-estimate').removeClass('bronze-plaque');
  });

  $(".step-1 .selection-container").click(function(){
 	
  	var product = $(this).children('div').attr("class");
    var productId = '#'+product;
  	var headerHeight = 221;

  	$(productId).show();
		$(productId).siblings("div").hide();

    // $('html, body').animate({
    //   scrollTop: $(product).offset().top - headerHeight
    // }, 500, function() {
    //   // Callback after  animation
    //   // Must change focus!
    //   // var $product = $(product);
    //   // $product.focus();
    //   // if ($product.is(":focus")) { // Checking if the target was focused
    //   //   return false;
    //   // } else {
    //   //   $product.attr('tabindex','-1'); // Adding tabindex for elements not focusable
    //   //   $product.focus(); // Set focus again
    //   // };
    // });

  });

  

  $(".selection-container").click(function(){

    var fuller = $(this).closest('section').next();
    var headerHeight = 161;

     $('html, body').animate({
      scrollTop: $(fuller).offset().top - headerHeight
    }, 500);


  });

  $('.process-item p').each(function(event){
    var max_length = 206;

    if($(this).html().length > max_length){

        var short_content   = $(this).html().substr(0,max_length);
        var long_content    = $(this).html().substr(max_length);

        $(this).html(short_content+
                '<a href="#" class="read_more">...<br>Read More</a>'+
                '<span class="more_text" style="display:none;">'+long_content+'</span>');

        $(this).find('a.read_more').click(function(event){ 
            event.preventDefault();
            $(this).hide();
            $(this).parents('.process-item').find('.more_text').show();
        }); 
    }   
  });

  // Set up an event listener for the contact form.
  $('form').submit(function(e) {

    e.preventDefault();

    // Serialize the form data.
    var formData = $('form').serialize();
    var formMessages = $('#form-messages');

    $.ajax({
      type: "POST",
      url: $('form').attr('action'),
      data: formData,
      success: function(){
        $('form').removeClass('error');
        $('form').addClass('success');
        $(formMessages).addClass('success');
        $(formMessages).removeClass('error');
        $('form button').text('Successfully Sent!');
        console.log('success');
      },
      error: function(){

        $('form').removeClass('success');
        $('form').addClass('error');
        $(formMessages).addClass('error');
        $(formMessages).removeClass('success');
        $(formMessages).text('Oops! An error occured and your message could not be sent.');
      
      }
    })

  });

});  



// $('form').on("submit", function (e) {
  
//   e.preventDefault();

//   // Initiate Variables With Form Content
//   var formData = $('form').serialize();

//   $.ajax({
//     type: "POST",
//     url: $('form').attr('action'),
//     data: formData
//     success : function(text){
//       if (text == "success"){
//           formSuccess();
//       } else {
//         formError();
//         submitMSG(false,text);
//       }
//     }
//   });

//   function formSuccess(){
//     $('form')[0].reset();
//     submitMSG(true, "Message Submitted!")
//   }

//   function formError(){
//     $('form').removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
//         $(this).removeClass();
//     });
//   }

//   function submitMSG(valid, msg){
//     if(valid){
//         var msgClasses = "h3 text-center tada animated text-success";
//     } else {
//         var msgClasses = "h3 text-center text-danger";
//     }
//     $("#form-messages").removeClass().addClass(msgClasses).text(msg);
//   }

// });

