(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game_map = require('./game_map.js');

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
        speedBonus: 0,
        BombPower: 0,
        BombNumber: 0,
        healthNumber: that.lives,
        direction: this.startDirection
      });

      if (that.name === 'player1') {
        var perso1 = document.querySelector('#' + playerStatus[0].name);
        perso1.style.left = playerStatus[0].x + 'px';
        perso1.style.top = playerStatus[0].y + 'px';
      } else if (that.name === 'player2') {
        var perso2 = document.querySelector('#' + playerStatus[1].name);
        perso2.style.right = playerStatus[1].x + 'px';
        perso2.style.bottom = playerStatus[1].y + 'px';
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
      window.addEventListener('keydown', function (e) {
        e.preventDefault();
        if (e.keyCode === that.key[0]) {
          //up
          var persoDiv = document.querySelector('#' + that.name);
          var nextPos = playerStatus[0].y - 1;
          if (nextPos >= 0) {
            if (_game_map.exportMap[nextPos][playerStatus[0].x].empty) {
              playerStatus[0].y -= 1;
              persoDiv.style.top = playerStatus[0].y * 50 + 'px';
              playerStatus[0].direction = 'perso_up';
              that.updateDirection();
            }
          }
        } else if (e.keyCode === that.key[1]) {
          //right
          var _persoDiv = document.querySelector('#' + that.name);
          var _nextPos = playerStatus[0].x + 1;
          if (_nextPos <= _game_map.exportMapSize) {
            if (_game_map.exportMap[_nextPos][playerStatus[0].y].empty) {
              playerStatus[0].x += 1;
              _persoDiv.style.left = playerStatus[0].x * 50 + 'px';
              playerStatus[0].direction = 'perso_right';
              that.updateDirection();
            }
          }
        } else if (e.keyCode === that.key[3]) {
          //left
          var _persoDiv2 = document.querySelector('#' + that.name);
          var _nextPos2 = playerStatus[0].x - 1;
          if (_nextPos2 >= 0) {
            if (_game_map.exportMap[_nextPos2][playerStatus[0].y].empty) {
              playerStatus[0].x -= 1;
              _persoDiv2.style.left = playerStatus[0].x * 50 + 'px';
              playerStatus[0].direction = 'perso_left';
              that.updateDirection();
            }
          }
        } else if (e.keyCode === that.key[2]) {
          //down
          var _persoDiv3 = document.querySelector('#' + that.name);
          var _nextPos3 = playerStatus[0].y + 1;
          if (_nextPos3 <= _game_map.exportMapSize) {
            if (_game_map.exportMap[_nextPos3][playerStatus[0].x].empty) {
              playerStatus[0].y += 1;
              _persoDiv3.style.top = playerStatus[0].y * 50 + 'px';
              playerStatus[0].direction = 'perso_down';
              that.updateDirection();
            }
          }
        }
      });
    }
  }]);

  return Player;
}();

var player1 = new Player(3, 0, 0, 'player1', 'perso_down');
player1.create();
player1.key = [38, 39, 40, 37, 32];
player1.movesPerso();

var player2 = new Player(3, 0, 0, 'player2', 'perso_up');
player2.create();

},{"./game_map.js":2}],2:[function(require,module,exports){
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
            if (rand < 0.1) //0.6
              {
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
  }]);

  return Map;
}();

var createMap = new Map(15);
createMap.createMap();
var exportMap = createMap.gameMap;
var exportMapSize = createMap.size;
exports.exportMap = exportMap;
exports.exportMapSize = exportMapSize;

},{}],3:[function(require,module,exports){
"use strict";

var _game_map = require("./game_map.js");

var _game_map2 = _interopRequireDefault(_game_map);

var _game_characters = require("./game_characters.js");

var _game_characters2 = _interopRequireDefault(_game_characters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./game_characters.js":1,"./game_map.js":2}]},{},[3])

//# sourceMappingURL=bundle.js.map
