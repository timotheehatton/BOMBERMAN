(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game_map = require('./game_map.js');

var _game_characters = require('./game_characters.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bombStatus = [];

var Bomb = function () {
  function Bomb(player, posX, posY, power) {
    _classCallCheck(this, Bomb);

    this.bombRange = [];
    this.bombBreak = [];
    this.player = player;
    this.posX = posX;
    this.posY = posY;
    this.posXNew = this.posX * 50;
    this.posYNew = this.posY * 50;
    this.power = power;
    this.delay = 2000;
    this.container = document.querySelector('.map');
  }

  _createClass(Bomb, [{
    key: 'setDiv',
    value: function setDiv() {
      var that = this;
      var createDiv = document.createElement('div');
      createDiv.classList.add('map--bomb');
      createDiv.classList.add('map--bomb');
      createDiv.setAttribute('id', 'bomb' + that.posXNew + that.posYNew);
      createDiv.style.left = that.posXNew + 'px';
      createDiv.style.top = that.posYNew + 'px';
      that.container.appendChild(createDiv);
    }
  }, {
    key: 'setRange',
    value: function setRange(posX, posY) {
      var that = this;
      var createDiv = document.createElement('div');
      createDiv.style.left = posX * 50 + 'px';
      createDiv.style.top = posY * 50 + 'px';
      that.container.appendChild(createDiv);
      that.bombRange.push({
        x: posX,
        y: posY
      });

      setTimeout(function () {
        createDiv.classList.add('map--bomb-range');
        setTimeout(function () {
          createDiv.classList.remove('map--bomb-range');
        }, 200);
      }, 2000);
    }
  }, {
    key: 'setbreakable',
    value: function setbreakable(posX, posY) {
      var that = this;
      that.bombBreak.push({
        x: posX,
        y: posY
      });
    }
  }, {
    key: 'viewPossibilty',
    value: function viewPossibilty() {
      var that = this;
      var power = this.power;
      that.bombRange = [];
      for (var i = 1; i <= power; i++) {
        var newPosX = that.posX;
        var newPosY = that.posY + i;
        if (_game_map.exportMap[that.posY][that.posX].x === _game_map.exportMapSize - 1) // 2 pour l'ia
          {
            break;
          } else if (_game_map.exportMap[newPosY][newPosX].x === _game_map.exportMapSize - 1) {
          that.setbreakable(newPosX, newPosY);
          break;
        } else {
          if (_game_map.exportMap[newPosY][newPosX].empty === true) {
            that.setRange(newPosX, newPosY);
          } else if (_game_map.exportMap[newPosY][newPosX].breakable === false) {
            break;
          } else {
            that.setbreakable(newPosX, newPosY);
            break;
          }
        }
      }

      for (var _i = 1; _i <= power; _i++) {
        var _newPosX = that.posX;
        var _newPosY = that.posY - _i;
        if (_game_map.exportMap[that.posY][that.posX].x === 0) {
          break;
        } else if (_game_map.exportMap[_newPosY][_newPosX].x === 0) {
          that.setbreakable(_newPosX, _newPosY);
          break;
        } else {
          if (_game_map.exportMap[_newPosY][_newPosX].empty === true) {
            that.setRange(_newPosX, _newPosY);
          } else if (_game_map.exportMap[_newPosY][_newPosX].breakable === false) {
            break;
          } else {
            that.setbreakable(_newPosX, _newPosY);
            break;
          }
        }
      }

      for (var _i2 = 1; _i2 <= power; _i2++) {
        var _newPosX2 = that.posX + _i2;
        var _newPosY2 = that.posY;
        if (_game_map.exportMap[that.posY][that.posX].y === _game_map.exportMapSize - 1) {
          break;
        } else if (_game_map.exportMap[_newPosY2][_newPosX2].y === _game_map.exportMapSize - 1) {
          that.setbreakable(_newPosX2, _newPosY2);
          break;
        } else {
          if (_game_map.exportMap[_newPosY2][_newPosX2].empty === true) {
            that.setRange(_newPosX2, _newPosY2);
          } else if (_game_map.exportMap[_newPosY2][_newPosX2].breakable === false) {
            break;
          } else {
            that.setbreakable(_newPosX2, _newPosY2);
            break;
          }
        }
      }

      for (var _i3 = 1; _i3 <= power; _i3++) {
        var _newPosX3 = that.posX - _i3;
        var _newPosY3 = that.posY;
        if (_game_map.exportMap[that.posY][that.posX].y === 0) {
          break;
        } else if (_game_map.exportMap[_newPosY3][_newPosX3].y === 0) {
          that.setbreakable(_newPosX3, _newPosY3);
          break;
        } else {
          if (_game_map.exportMap[_newPosY3][_newPosX3].empty === true) {
            that.setRange(_newPosX3, _newPosY3);
          } else if (_game_map.exportMap[_newPosY3][_newPosX3].breakable === false) {
            break;
          } else {
            that.setbreakable(_newPosX3, _newPosY3);
            break;
          }
        }
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var that = this;
      for (var i = 0; i < that.bombBreak.length; i++) {
        var x = that.bombBreak[i].x;
        var y = that.bombBreak[i].y;
        if (_game_map.exportMap[y][x].empty === false) {
          var breakDiv = document.querySelector('#block' + y + x);
          breakDiv.classList.remove('map--break');
          breakDiv.classList.remove('map--unbreak');
          _game_map.exportMap[y][x].empty = true;
          _game_map.exportMap[y][x].break = null;
          document.querySelector('#bomb' + that.posXNew + that.posYNew).classList.add('map--explosion');
          setTimeout(function () {
            document.querySelector('#bomb' + that.posXNew + that.posYNew).classList.remove('map--explosion');
            document.querySelector('#bomb' + that.posXNew + that.posYNew).style.display = 'none';
          }, 200);
        } else if (_game_map.exportMap[y][x].empty === true) {
          document.querySelector('#bomb' + that.posXNew + that.posYNew).classList.add('map--explosion');
          setTimeout(function () {
            document.querySelector('#bomb' + that.posXNew + that.posYNew).classList.remove('map--explosion');
            document.querySelector('#bomb' + that.posXNew + that.posYNew).style.display = 'none';
          }, 200);
        }
        console.log(_game_characters.playerStatus);
        console.log(_game_characters.playerStatus[0].x);
        console.log(that.posXNew);
        console.log(_game_characters.playerStatus[0].y);
        console.log(that.posYNew);
        if (_game_characters.playerStatus[0].x === that.posXNew && _game_characters.playerStatus[0].y === that.posYNew) {
          window.alert('You lost !');
          location.reload();
        }
      }
    }
  }, {
    key: 'create',
    value: function create() {
      var that = this;
      that.setDiv();
      that.viewPossibilty();
      bombStatus.push({
        player: that.player,
        x: that.posX,
        y: that.posY,
        power: 2 * that.power,
        bombPosibility: that.bombRange,
        status: true
      });
      setTimeout(function () {
        that.destroy();
      }, that.delay);
    }
  }]);

  return Bomb;
}();

exports.default = Bomb;

},{"./game_characters.js":2,"./game_map.js":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game_map = require('./game_map.js');

var _game_bomb = require('./game_bomb.js');

var _game_bomb2 = _interopRequireDefault(_game_bomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var playerStatus = [];

var Player = function () {
  function Player(lives, posX, posY, name, startDirection) {
    _classCallCheck(this, Player);

    this.lives = lives;
    this.startDirection = startDirection;
    this.posX = posX;
    this.posY = posY;
    this.status = startDirection;
    this.div = document.querySelector('.map');
    this.key = [];
    this.name = name;
    this.index = 0;
  }

  _createClass(Player, [{
    key: 'create',
    value: function create() {
      var that = this;
      var createDiv = document.createElement('div');
      createDiv.classList.add('map--perso');
      createDiv.classList.add('map--' + that.status);
      createDiv.setAttribute('id', that.name);
      that.div.appendChild(createDiv);
      playerStatus.push({
        name: that.name,
        x: that.posX,
        y: that.posY,
        BombPower: 2,
        BombNumber: 1,
        healthNumber: that.lives,
        direction: this.startDirection
      });

      if (that.name === 'player1') {
        var perso1 = document.querySelector('#' + playerStatus[0].name);
        perso1.style.left = playerStatus[0].x + 'px';
        perso1.style.top = playerStatus[0].y + 'px';
        that.index = 0;
      } else if (that.name === 'ia') {
        var perso2 = document.querySelector('#' + playerStatus[1].name);
        playerStatus[1].x = _game_map.exportMapSize - 1;
        playerStatus[1].y = _game_map.exportMapSize - 1;
        perso2.style.left = playerStatus[1].x * 50 + 'px';
        perso2.style.top = playerStatus[1].y * 50 + 'px';
        that.index = 1;
      }
    }
  }, {
    key: 'updateDirection',
    value: function updateDirection() {
      var that = this;
      var persoDiv = document.querySelector('#' + that.name);
      persoDiv.classList.remove('map--perso_down', 'map--perso_up', 'map--perso_right', 'map--perso_left');
      persoDiv.classList.add('map--' + playerStatus[0].direction);
    }
  }, {
    key: 'movesPerso',
    value: function movesPerso() {
      var that = this;
      var nextPos;
      var bombEngage = 0;
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === that.key[0]) {
          //up
          var persoDiv = document.querySelector('#' + that.name);
          nextPos = playerStatus[0].y - 1;
          if (nextPos >= 0) {
            if (_game_map.exportMap[nextPos][playerStatus[0].x].empty) {
              playerStatus[0].y -= 1;
              persoDiv.style.top = playerStatus[0].y * 50 + 'px';
              playerStatus[0].direction = 'perso_up';
              that.updateDirection();
            }
          }
          e.preventDefault();
        } else if (e.keyCode === that.key[1]) {
          //right
          var _persoDiv = document.querySelector('#' + that.name);
          nextPos = playerStatus[0].x + 1;
          if (nextPos <= _game_map.exportMapSize) {
            if (_game_map.exportMap[playerStatus[0].y][nextPos].empty) {
              playerStatus[0].x += 1;
              _persoDiv.style.left = playerStatus[0].x * 50 + 'px';
              playerStatus[0].direction = 'perso_right';
              that.updateDirection();
            }
          }
          e.preventDefault();
        } else if (e.keyCode === that.key[3]) {
          //left
          var _persoDiv2 = document.querySelector('#' + that.name);
          nextPos = playerStatus[0].x - 1;
          if (nextPos >= 0) {
            if (_game_map.exportMap[playerStatus[0].y][nextPos].empty) {
              playerStatus[0].x -= 1;
              _persoDiv2.style.left = playerStatus[0].x * 50 + 'px';
              playerStatus[0].direction = 'perso_left';
              that.updateDirection();
            }
          }
          e.preventDefault();
        } else if (e.keyCode === that.key[2]) {
          //down
          var _persoDiv3 = document.querySelector('#' + that.name);
          nextPos = playerStatus[0].y + 1;
          if (nextPos <= _game_map.exportMapSize) {
            if (_game_map.exportMap[nextPos][playerStatus[0].x].empty) {
              playerStatus[0].y += 1;
              _persoDiv3.style.top = playerStatus[0].y * 50 + 'px';
              playerStatus[0].direction = 'perso_down';
              that.updateDirection();
            }
          }
          e.preventDefault();
        } else if (e.keyCode === that.key[4]) {
          var bombX = playerStatus[0].x;
          var bombY = playerStatus[0].y;
          if (bombEngage < playerStatus[0].BombNumber) {
            var bomb = new _game_bomb2.default(0, bombX, bombY, playerStatus[0].BombPower);
            bomb.create();
            bombEngage++;
            setTimeout(function () {
              bombEngage--;
            }, 2000);
          }
          e.preventDefault();
        }

        if (_game_map.exportMap[playerStatus[0].y][playerStatus[0].x].bonus === 1) {
          playerStatus[0].BombNumber++;
          _game_map.exportMap[playerStatus[0].y][playerStatus[0].x].bonus = null;
          var bonus = document.querySelector('#block' + playerStatus[0].y + playerStatus[0].x);
          bonus.classList.remove('map--bonus-1');
          document.querySelector('.bonus--item--2--value').textContent = playerStatus[0].BombNumber;
        } else if (_game_map.exportMap[playerStatus[0].y][playerStatus[0].x].bonus === 2) {
          playerStatus[0].BombPower++;
          _game_map.exportMap[playerStatus[0].y][playerStatus[0].x].bonus = null;
          var _bonus = document.querySelector('#block' + playerStatus[0].y + playerStatus[0].x);
          _bonus.classList.remove('map--bonus-2');
          document.querySelector('.bonus--item--1--value').textContent = playerStatus[0].BombPower;
        }
      });
    }
  }]);

  return Player;
}();

exports.default = playerStatus;


var player1 = new Player(3, 0, 0, 'player1', 'perso_down');
player1.create();
player1.key = [38, 39, 40, 37, 32];
player1.movesPerso();

var player2 = new Player(3, 0, 0, 'ia', 'perso_up');
player2.create();

},{"./game_bomb.js":1,"./game_map.js":4}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game_characters = require('./game_characters.js');

var _game_characters2 = _interopRequireDefault(_game_characters);

var _game_map = require('./game_map.js');

var _game_bomb = require('./game_bomb.js');

var _game_bomb2 = _interopRequireDefault(_game_bomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ia = function () {
  function Ia() {
    _classCallCheck(this, Ia);

    this.movePossibility = [];
    this.moveIa = [];
    this.indexMove = -1;
  }

  _createClass(Ia, [{
    key: 'viewPossibilty',
    value: function viewPossibilty() {
      var that = this;

      if (_game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y].y !== 0) {
        //up
        if (_game_map.exportMap[_game_characters2.default[1].y - 1][_game_characters2.default[1].x].empty === true) {
          that.movePossibility.push({
            x: _game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y - 1].x,
            y: _game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y - 1].y,
            breakable: false
          });
        }
        if (_game_map.exportMap[_game_characters2.default[1].y - 1][_game_characters2.default[1].x].breakable === true) {
          that.movePossibility.push({
            x: _game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y - 1].x,
            y: _game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y - 1].y,
            breakable: true
          });
        }
      } else if (_game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y].y !== _game_map.exportMapSize - 1) {
        //down
        if (_game_map.exportMap[_game_characters2.default[1].y + 1][_game_characters2.default[1].x].empty === true) {
          that.movePossibility.push({
            x: _game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y + 1].x,
            y: _game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y + 1].y,
            breakable: false
          });
        }
        if (_game_map.exportMap[_game_characters2.default[1].y + 1][_game_characters2.default[1].x].breakable === true) {
          that.movePossibility.push({
            x: _game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y + 1].x,
            y: _game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y + 1].y,
            breakable: true
          });
        }
      }
      if (_game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y].x > 0) {
        //left
        if (_game_map.exportMap[_game_characters2.default[1].x - 1][_game_characters2.default[1].y].empty === true) {
          that.movePossibility.push({
            x: _game_map.exportMap[_game_characters2.default[1].x - 1][_game_characters2.default[1].y].x,
            y: _game_map.exportMap[_game_characters2.default[1].x - 1][_game_characters2.default[1].y].y,
            breakable: false
          });
        }
        if (_game_map.exportMap[_game_characters2.default[1].x - 1][_game_characters2.default[1].y].breakable === true) {
          that.movePossibility.push({
            x: _game_map.exportMap[_game_characters2.default[1].x - 1][_game_characters2.default[1].y].x,
            y: _game_map.exportMap[_game_characters2.default[1].x - 1][_game_characters2.default[1].y].y,
            breakable: true
          });
        }
      } else if (_game_map.exportMap[_game_characters2.default[1].x][_game_characters2.default[1].y].x < _game_map.exportMapSize - 1) {
        //right
        if (_game_map.exportMap[_game_characters2.default[1].x + 1][_game_characters2.default[1].y].empty === true) {
          that.movePossibility.push({
            x: _game_map.exportMap[_game_characters2.default[1].x + 1][_game_characters2.default[1].y].x,
            y: _game_map.exportMap[_game_characters2.default[1].x + 1][_game_characters2.default[1].y].y,
            breakable: false
          });
        }
        if (_game_map.exportMap[_game_characters2.default[1].x + 1][_game_characters2.default[1].y].breakable === true) {
          that.movePossibility.push({
            x: _game_map.exportMap[_game_characters2.default[1].x + 1][_game_characters2.default[1].y].x,
            y: _game_map.exportMap[_game_characters2.default[1].x + 1][_game_characters2.default[1].y].y,
            breakable: true
          });
        }
      }
      that.nextMoves();
    }
  }, {
    key: 'nextMoves',
    value: function nextMoves() {
      var that = this;
      var lenghtTab = that.movePossibility.length - 1;
      this.nextPos = that.movePossibility[Math.round(lenghtTab * Math.random())];
      if (this.nextPos.breakable === false) that.movesPerso(this.nextPos.x, this.nextPos.y);else if (this.nextPos.breakable === true) {
        that.newBomb(this.nextPos.x, this.nextPos.y);
      }
    }
  }, {
    key: 'newBomb',
    value: function newBomb(posX, posY) {
      var that = this;
      var bombX = _game_characters2.default[1].x;
      var bombY = _game_characters2.default[1].y;
      var bomb = new _game_bomb2.default(0, bombX, bombY, _game_characters2.default[1].BombPower);
      bomb.create();
      if (that.moveIa.length >= 2) that.leavePerso(that.moveIa[that.moveIa.length - 3].x, that.moveIa[that.moveIa.length - 3].y);else that.leavePerso(that.moveIa[that.moveIa.length - 1].x, that.moveIa[that.moveIa.length - 1].y);
      setTimeout(function () {
        that.movesPerso(posX, posY);
      }, 2500);
    }
  }, {
    key: 'leavePerso',
    value: function leavePerso(posX, posY) {
      var persoDiv = document.querySelector('#' + _game_characters2.default[1].name);
      persoDiv.style.left = posX * 50 + 'px';
      persoDiv.style.top = posY * 50 + 'px';
    }
  }, {
    key: 'movesPerso',
    value: function movesPerso(posX, posY) {
      var that = this;
      var persoDiv = document.querySelector('#' + _game_characters2.default[1].name);
      _game_characters2.default[1].y = posY;
      _game_characters2.default[1].x = posX;
      persoDiv.style.left = posX * 50 + 'px';
      persoDiv.style.top = posY * 50 + 'px';
      that.movePossibility = [];
      setTimeout(function () {
        that.viewPossibilty();
      }, 1000);
      that.moveIa.push({
        x: posX,
        y: posY
      });
    }
  }]);

  return Ia;
}();

var theIa = new Ia();
theIa.viewPossibilty();

},{"./game_bomb.js":1,"./game_characters.js":2,"./game_map.js":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
  function Map(size) {
    _classCallCheck(this, Map);

    this.size = size;
    this.container = document.querySelector('.map');
    this.gameMap = [];
  }

  _createClass(Map, [{
    key: 'createMap',
    value: function createMap() {
      var that = this;
      for (var i = 0; i < that.size; i++) {
        this.gameMap.push([]);
        for (var j = 0; j < that.size; j++) {
          this.gameMap[i].push({
            x: i,
            y: j,
            breakable: null,
            border: false,
            empty: true,
            bonus: null
          });
          var createDiv = document.createElement('div');
          createDiv.classList.add('map--block');
          createDiv.setAttribute('id', 'block' + i + j);
          that.container.appendChild(createDiv);
        }
      }
      that.setUnbreakable();
      that.setBreakable();
    }
  }, {
    key: 'setUnbreakable',
    value: function setUnbreakable() {
      var that = this;
      for (var i = 1; i < that.gameMap.length - 1; i += 2) {
        for (var j = 1; j < that.gameMap[i].length - 1; j += 2) {
          that.gameMap[i][j].breakable = false;
          that.gameMap[i][j].empty = false;
          var unbreakBlock = document.querySelector('#block' + i + j);
          unbreakBlock.classList.add('map--unbreak');
        }
      }
    }
  }, {
    key: 'setBreakable',
    value: function setBreakable() {
      var that = this;
      for (var i = 0; i < that.gameMap.length; i++) {
        for (var j = 0; j < that.gameMap[i].length; j++) {
          if (i === 0 && j === 0 || i === that.gameMap.length - 1 && j === that.gameMap.length - 1) {
            var spawnDiv = document.querySelector('#block' + i + j);
            spawnDiv.classList.add('map--spawn');
            that.gameMap[i][j].breakable = null;
          }
          if (i === 1 && j === 0 || i === 0 && j === 1 || i === that.gameMap.length - 2 && j === that.gameMap.length - 1 || i === that.gameMap.length - 1 && j === that.gameMap.length - 2) {
            that.gameMap[i][j].breakable = null;
          } else if (that.gameMap[i][j].breakable === null) {
            var rand = Math.random();
            if (rand < 0.6) {
              that.gameMap[i][j].breakable = true;
              that.gameMap[i][j].empty = false;
              var unbreakBlock = document.querySelector('#block' + i + j);
              unbreakBlock.classList.add('map--break');
            }
          }
        }
      }
    }
  }, {
    key: 'setBonus',
    value: function setBonus() {
      var that = this;
      for (var i = 0; i < that.gameMap.length - 1; i++) {
        for (var j = 0; j < that.gameMap[i].length - 1; j++) {
          if (that.gameMap[i][j].breakable === true || that.gameMap[i][j].empty === true) {
            var rand = Math.random();
            if (rand <= 0.03) {
              that.gameMap[i][j].bonus = 1;
              var bonus = document.querySelector('#block' + i + j);
              bonus.classList.add('map--bonus-1');
            } else if (rand <= 0.06) {
              that.gameMap[i][j].bonus = 2;
              var _bonus = document.querySelector('#block' + i + j);
              _bonus.classList.add('map--bonus-2');
            }
          }
        }
      }
    }
  }]);

  return Map;
}();

var createMap = new Map(15);
createMap.createMap();
createMap.setBonus();
var exportMap = createMap.gameMap;
var exportMapSize = createMap.size;
exports.exportMap = exportMap;
exports.exportMapSize = exportMapSize;

},{}],5:[function(require,module,exports){
"use strict";

var _game_map = require("./game_map.js");

var _game_map2 = _interopRequireDefault(_game_map);

var _game_characters = require("./game_characters.js");

var _game_characters2 = _interopRequireDefault(_game_characters);

var _game_bomb = require("./game_bomb.js");

var _game_bomb2 = _interopRequireDefault(_game_bomb);

var _game_ia = require("./game_ia.js");

var _game_ia2 = _interopRequireDefault(_game_ia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./game_bomb.js":1,"./game_characters.js":2,"./game_ia.js":3,"./game_map.js":4}]},{},[5])

//# sourceMappingURL=bundle.js.map
