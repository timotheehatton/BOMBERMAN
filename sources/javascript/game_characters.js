import {exportMap, exportMapSize} from './game_map.js';

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
      speedBonus: 0,
      BombPower: 0,
      BombNumber: 0,
      healthNumber: that.lives,
      direction: this.startDirection,
    })

    if(that.name === 'player1')
    {
      const perso1 = document.querySelector('#' + playerStatus[0].name)
      perso1.style.left = playerStatus[0].x + 'px'
      perso1.style.top  = playerStatus[0].y + 'px'
    }
    else if(that.name === 'player2')
    {
      const perso2 = document.querySelector('#' + playerStatus[1].name)
      perso2.style.right = playerStatus[1].x + 'px'
      perso2.style.bottom  = playerStatus[1].y + 'px'

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
    window.addEventListener('keydown', function(e)
    {
      e.preventDefault()
      if (e.keyCode === that.key[0])
      {
        //up
        let persoDiv = document.querySelector('#' + that.name)
        let nextPos = playerStatus[0].y -1
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
      }
      else if (e.keyCode === that.key[1])
      {
        //right
        let persoDiv = document.querySelector('#' + that.name)
        let nextPos = playerStatus[0].x + 1
        if(nextPos <= exportMapSize )
        {
          if(exportMap[nextPos][playerStatus[0].y].empty)
          {
            playerStatus[0].x += 1
            persoDiv.style.left = playerStatus[0].x * 50 + 'px'
            playerStatus[0].direction = 'perso_right'
            that.updateDirection()
          }
        }
      }
      else if (e.keyCode === that.key[3])
      {
        //left
        let persoDiv = document.querySelector('#' + that.name)
        let nextPos = playerStatus[0].x - 1
        if(nextPos >= 0 )
        {
          if(exportMap[nextPos][playerStatus[0].y].empty)
          {
            playerStatus[0].x -= 1
            persoDiv.style.left = playerStatus[0].x * 50 + 'px'
            playerStatus[0].direction = 'perso_left'
            that.updateDirection()
          }
        }
      }
      else if (e.keyCode === that.key[2])
      {
        //down
        let persoDiv = document.querySelector('#' + that.name)
        let nextPos = playerStatus[0].y + 1
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
      }
    })
  }
}

const player1 = new Player(3, 0, 0, 'player1', 'perso_down')
player1.create()
player1.key = [38, 39, 40, 37, 32]
player1.movesPerso()

const player2 = new Player(3, 0, 0, 'player2', 'perso_up')
player2.create()
