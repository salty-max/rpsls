var app = {
  init: function() {
    app.bo = 3;
    app.turn = 0;
    app.playerScore = 0;
    app.cpuScore = 0;
    $('.btn-collapse').html('<i class="fas fa-arrow-down"></i>');
    app.createButtons();
    $('.btn-collapse').on('click', app.collapse);
    app.$buttons = $('.hands .btn');
    app.$buttons.on('click', app.turnManager);
    app.checkEndGame();
  },

  collapse: function() {
    var $toCollapse = $('.intro--content');
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
      var btn = '<button class="btn" data-hand="'+ app.hands[hand] +'"><i class="fas fa-hand-'+ app.hands[hand] +'"></i> '+ app.hands[hand] +'</button>';
      console.log(btn);
      $('.hands').append(btn);
      $('.hands .btn').css('text-transform', 'capitalize');
    }
  },

  createIcon: function(side, index) {
    var icon = '<i class="'+ side +'-icon fas fa-hand-'+ app.hands[index] +'" data-hand="'+ app.hands[index] +'"></i>';
    $('.'+ side +' .hand-container').html(icon);
  },

  playerPick: function(btn) {
    for(var hand in app.hands) {
      if(app.hands[hand] === btn.data('hand'))
        app.createIcon('player', hand);
    }
  },

  cpuPick: function() {
    var rand = Math.floor(Math.random() * app.hands.length);
    app.createIcon('sheldor', rand);
  },

  turnManager: function() {
    app.playerPick($(this));
    setTimeout(app.cpuPick, 1000);
    setTimeout(function() {
      app.turnResult();
    }, 1000);
    console.log(app.turn);
  },

  turnResult: function() {
    var $playerHand = $('.player-icon').data('hand');
    var $cpuHand = $('.sheldor-icon').data('hand');
    if($playerHand === $cpuHand) {
      console.log('tied');
    }
    else {
      if(app.checkRules($playerHand, $cpuHand)) {
        app.updateScore('player');
        app.playerScore++;
      }
      else {
        app.updateScore('sheldor');
        app.cpuScore++;
      }
      app.turn++;
    }
  },

  updateScore: function(side) {
    var star = '<i class="fas fa-star"></i>';
    var $container = $('.'+ side +'-score');
    $container.append(star);
    console.log(side + ' wins !');
  },

  checkEndGame: function() {
    var update = setInterval(function() {
      if(app.turn === app.bo) {
        if(app.playerScore > app.cpuScore) {
          app.win();
          clearInterval(update);
        }
        else {
          app.lose();
          clearInterval(update);
        }
      }
    }, 100);
  },

  win: function() {
    alert('You win !');
  },

  lose: function() {
    alert('Bazinga !');
  },

  checkRules: function(pHand, cpuHand) {
    switch(pHand) {
    case 'rock':
      if(cpuHand === 'lizard' || cpuHand === 'scissors') {
        return true;
        break;
      }
      else {
        return false;
        break;
      }

    case 'paper':
      if(cpuHand === 'rock' || cpuHand === 'spock') {
        return true;
        break;
      }
      else {
        return false;
        break;
      }

    case 'scissors':
      if(cpuHand === 'paper' || cpuHand === 'lizard') {
        return true;
        break;
      }
      else {
        return false;
        break;
      }

    case 'lizard':
      if(cpuHand === 'paper' || cpuHand === 'spock') {
        return true;
        break;
      }
      else {
        return false;
        break;
      }

    case 'spock':
      if(cpuHand === 'scissors' || cpuHand === 'rock') {
        return true;
        break;
      }
      else {
        return false;
        break;
      }
    }
  }
};

app.hands = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

$(app.init);
