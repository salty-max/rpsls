var app = {
  init: function() {
    $('.btn-collapse').html('<i class="fas fa-arrow-down"></i>');
    $('.btn-collapse').on('click', app.collapse);
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
  }
}

app.hands = ['rock', 'paper', 'scissors', 'lizard', 'spoke'];

$(app.init);
