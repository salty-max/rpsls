var app = {
  init: function() {
    $('.btn-collapse').html('<i class="fas fa-arrow-down"></i>');
    app.createButtons();
    $('.btn-collapse').on('click', app.collapse);
    $('.hands .btn').on('click', app.showPlayerHand);
  },

  collapse: function() {
    $toCollapse = $('.intro--content');
    if($toCollapse.hasClass('collapsed')) {
      $toCollapse.removeClass('collapsed');
      $(this).html('<i class="fas fa-arrow-down"></i>');
    }
    else {
      $toCollapse.addClass('collapsed');
      $(this).html('<i class="fas fa-arrow-up"></i>');
    }
    $toCollapse.slideToggle();
  },

  createButtons: function() {
    for(var hand in app.hands) {
      var btn = '<button class="btn" data-hand="'+ app.hands[hand] +'"><i class="fas fa-hand-'+ app.hands[hand] +'"></i> '+ app.hands[hand] +'</button>'
      console.log(btn);
      $('.hands').append(btn);
      $('.hands .btn').css('text-transform', 'capitalize');
    }
  },

  showPlayerHand: function() {
    for(var hand in app.hands) {
      var handIcon = '<i class="fas fa-hand-'+ app.hands[hand] +'"></i>'
      var $container = $('.player .hand-container');
      if(app.hands[hand] === $(this).data('hand'))
        $container.html(handIcon);
    }
  }
}

app.hands = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

$(app.init);
