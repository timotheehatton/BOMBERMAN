import {exportMap, exportMapSize} from './game_map.js';
import Bomb from './game_bomb.js';

var playerStatus = []

class Player
{
  constructor(lives, posX, posY, name, startDirection)
  {
    this.lives = lives
    this.startDirection = startDirection
    this.posX = posX
    this.posY = posY
    this.status = startDirection
    this.div = document.querySelector('.map')
    this.key = []
    this.name = name
    this.index = 0
  }

  create()
  {
    let that = this
    let createDiv = document.createElement('div')
    createDiv.classList.add('map--perso')
    createDiv.classList.add('map--' + that.status)
    createDiv.setAttribute('id', that.name)
    that.div.appendChild(createDiv)
    playerStatus.push({
      name: that.name,
      x: that.posX,
      y: that.posY,
      BombPower: 2,
      BombNumber: 1,
      healthNumber: that.lives,
      direction: this.startDirection,
    })

    if(that.name === 'player1')
    {
      const perso1 = document.querySelector('#' + playerStatus[0].name)
      perso1.style.left = playerStatus[0].x + 'px'
      perso1.style.top  = playerStatus[0].y + 'px'
      that.index = 0
    }
    else if(that.name === 'ia')
    {
      const perso2 = document.querySelector('#' + playerStatus[1].name)
      playerStatus[1].x = exportMapSize - 1
      playerStatus[1].y = exportMapSize - 1
      perso2.style.left = playerStatus[1].x * 50 + 'px'
      perso2.style.top  = playerStatus[1].y * 50 + 'px'
      that.index = 1
    }
  }
  updateDirection()
  {
    let that = this
    let persoDiv = document.querySelector('#' + that.name)
    persoDiv.classList.remove('map--perso_down', 'map--perso_up', 'map--perso_right',
    'map--perso_left')
    persoDiv.classList.add('map--' + playerStatus[0].direction)
  }

  movesPerso()
  {
    let that = this
    var nextPos
    let bombEngage = 0
    window.addEventListener('keydown', function(e)
    {
      if (e.keyCode === that.key[0])
      {
        //up
        let persoDiv = document.querySelector('#' + that.name)
        nextPos = playerStatus[0].y -1
        if(nextPos >= 0 )
        {
          if(exportMap[nextPos][playerStatus[0].x].empty)
          {
            playerStatus[0].y -= 1
            persoDiv.style.top = playerStatus[0].y * 50 + 'px'
            playerStatus[0].direction = 'perso_up'
            that.updateDirection()
          }
        }
        e.preventDefault()
      }
      else if (e.keyCode === that.key[1])
      {
        //right
        let persoDiv = document.querySelector('#' + that.name)
        nextPos = playerStatus[0].x + 1
        if(nextPos <= exportMapSize )
        {
          if(exportMap[playerStatus[0].y][nextPos].empty)
          {
            playerStatus[0].x += 1
            persoDiv.style.left = playerStatus[0].x * 50 + 'px'
            playerStatus[0].direction = 'perso_right'
            that.updateDirection()
          }
        }
        e.preventDefault()
      }
      else if (e.keyCode === that.key[3])
      {
        //left
        let persoDiv = document.querySelector('#' + that.name)
        nextPos = playerStatus[0].x - 1
        if(nextPos >= 0 )
        {
          if(exportMap[playerStatus[0].y][nextPos].empty)
          {
            playerStatus[0].x -= 1
            persoDiv.style.left = playerStatus[0].x * 50 + 'px'
            playerStatus[0].direction = 'perso_left'
            that.updateDirection()
          }
        }
        e.preventDefault()
      }
      else if (e.keyCode === that.key[2])
      {
        //down
        let persoDiv = document.querySelector('#' + that.name)
        nextPos = playerStatus[0].y + 1
        if(nextPos <= exportMapSize)
        {
          if(exportMap[nextPos][playerStatus[0].x].empty)
          {
            playerStatus[0].y += 1
            persoDiv.style.top = playerStatus[0].y * 50 + 'px'
            playerStatus[0].direction = 'perso_down'
            that.updateDirection()
          }
        }
        e.preventDefault()
      }
      else if (e.keyCode === that.key[4])
      {
        let bombX = playerStatus[0].x
        let bombY = playerStatus[0].y
        if (bombEngage < playerStatus[0].BombNumber) {
          const bomb = new Bomb(0, bombX, bombY, playerStatus[0].BombPower)
          bomb.create()
          bombEngage++
          setTimeout(function()
          {
            bombEngage--
          }, 2000)
        }
        e.preventDefault()
      }

      if (exportMap[playerStatus[0].y][playerStatus[0].x].bonus === 1)
      {
        playerStatus[0].BombNumber++
        exportMap[playerStatus[0].y][playerStatus[0].x].bonus = null
        let bonus = document.querySelector('#block'+ playerStatus[0].y + playerStatus[0].x)
        bonus.classList.remove('map--bonus-1')
        document.querySelector('.bonus--item--2--value').textContent = playerStatus[0].BombNumber
      }
      else if (exportMap[playerStatus[0].y][playerStatus[0].x].bonus === 2)
      {
        playerStatus[0].BombPower++
        exportMap[playerStatus[0].y][playerStatus[0].x].bonus = null
        let bonus = document.querySelector('#block'+ playerStatus[0].y + playerStatus[0].x)
        bonus.classList.remove('map--bonus-2')
        document.querySelector('.bonus--item--1--value').textContent = playerStatus[0].BombPower
      }
    })
  }
}
export default playerStatus

const player1 = new Player(3, 0, 0, 'player1', 'perso_down')
player1.create()
player1.key = [38, 39, 40, 37, 32]
player1.movesPerso()

const player2 = new Player(3, 0, 0, 'ia', 'perso_up')
player2.create()
