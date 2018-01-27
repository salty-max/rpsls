var app = {

  init: function() {
    $('.btn--collapse').html('<i class="fas fa-arrow-down"></i>');
    $('.btn--start').on('click', app.changeScene);
  },

  changeScene: function() {
    var $name = $('#username').val();
    $('.player .name').html($name);
    app.bo = Number($('input[type="radio"]:checked').val());
    $('.menu').slideUp(function() {
      $('.game--screen').slideDown();
      app.createButtons();
      app.start();
    });
  },

  start: function() {
    app.turn = 0;
    app.playerScore = 0;
    app.cpuScore = 0;
    app.$buttons = $('.hands .btn');
    app.$buttons.on('click', app.turnManager);
    app.checkEndGame();
    $('.btn--replay').on('click', app.resetGame);
  },

  collapse: function() {
    var $toCollapse = $('.intro--content');
    if($toCollapse.hasClass('collapsed')) {
      $toCollapse.removeClass('collapsed');
      $(this).html('<i class="fas fa-arrow-down"></i>');
      $toCollapse.slideUp();
    }
    else {
      $toCollapse.addClass('collapsed');
      $(this).html('<i class="fas fa-arrow-up"></i>');
      $toCollapse.slideDown();
    }
  },

  createButtons: function() {
    $('.hands').empty();
    for(var hand in app.hands) {
      var btn = '<button class="btn" data-hand="'+ app.hands[hand] +'"><i class="fas fa-hand-'+ app.hands[hand] +'"></i> '+ app.hands[hand] +'</button>';
      console.log(btn);
      $('.hands').append(btn);
      $('.hands .btn').css('text-transform', 'capitalize');
    }
  },

  createIcon: function(side, index) {
    var icon = '<i class="hand-icon '+ side +'-icon fas fa-hand-'+ app.hands[index] +'" data-hand="'+ app.hands[index] +'"></i>';
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

  resetScore: function() {
    $('.score').empty();
  },

  checkEndGame: function() {
    var update = setInterval(function() {
      if(app.turn === app.bo) {
        console.log('end');
        if(app.playerScore > app.cpuScore) {
          app.win();
          clearInterval(update);
          app.showEndScreen();
        }
        else {
          app.lose();
          clearInterval(update);
          app.showEndScreen();
        }
      }
      else {
        if(app.bo === 3) {
          if(app.playerScore === 2) {
            app.win();
            clearInterval(update);
            app.showEndScreen();
          }
          else if(app.cpuScore === 2) {
            app.lose();
            clearInterval(update);
            app.showEndScreen();
          }
        }
        if(app.bo === 5) {
          if(app.playerScore === 3) {
            app.win();
            clearInterval(update);
            app.showEndScreen();
          }
          else if(app.cpuScore === 3) {
            app.lose();
            clearInterval(update);
            app.showEndScreen();
          }
        }
        if(app.bo === 7) {
          if(app.playerScore === 4) {
            app.win();
            clearInterval(update);
            app.showEndScreen();
          }
          else if(app.cpuScore === 4) {
            app.lose();
            clearInterval(update);
            app.showEndScreen();
          }
        }
      }
    }, 300);
  },

  showEndScreen: function() {
    $('.hands').slideUp(function() {
      $('.end').slideDown();
      $('.end').css('display', 'flex');
    });
  },

  resetScreen: function() {
    $('.end').hide();
    $('.hands').fadeIn('slow');
    $('.hands').css('display', 'flex');
  },

  win: function() {
    $('.end').removeClass('end--danger');
    $('.end').addClass('end--success');
    $('.end--text').text('WEAAATOOON !');
  },

  lose: function() {
    $('.end').removeClass('end--success');
    $('.end').addClass('end--danger');
    $('.end--text').text('Bazinga !');
  },

  resetGame: function() {
    app.resetScore();
    app.resetScreen();
    $('.game--screen').slideUp(function() {
      $('.menu').slideDown();
      $('.hand-container').empty();
    });
    app.init();
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
$($('.btn--collapse').on('click', app.collapse));
