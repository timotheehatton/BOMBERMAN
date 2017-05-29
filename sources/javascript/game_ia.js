import playerStatus from './game_characters.js';
import {exportMap, exportMapSize} from './game_map.js';
import Bomb from './game_bomb.js';

class Ia {
  constructor()
  {
    this.movePossibility = []
    this.moveIa = []
    this.indexMove = -1
  }
  viewPossibilty()
  {
    let that = this

    if(exportMap[playerStatus[1].x][playerStatus[1].y].y !== 0 )
    {
      //up
      if(exportMap[playerStatus[1].y - 1][playerStatus[1].x].empty === true )
      {
        that.movePossibility.push({
          x: exportMap[playerStatus[1].x][playerStatus[1].y - 1].x,
          y: exportMap[playerStatus[1].x][playerStatus[1].y - 1].y,
          breakable: false,
        })
      }
      if(exportMap[playerStatus[1].y - 1][playerStatus[1].x].breakable === true )
      {
        that.movePossibility.push({
          x: exportMap[playerStatus[1].x][playerStatus[1].y - 1].x,
          y: exportMap[playerStatus[1].x][playerStatus[1].y - 1].y,
          breakable: true,
        })
      }
    }
    else if(exportMap[playerStatus[1].x][playerStatus[1].y].y !== exportMapSize - 1 )
    {
      //down
      if(exportMap[playerStatus[1].y + 1][playerStatus[1].x].empty === true )
      {
        that.movePossibility.push({
          x: exportMap[playerStatus[1].x][playerStatus[1].y + 1].x,
          y: exportMap[playerStatus[1].x][playerStatus[1].y + 1].y,
          breakable: false,
        })
      }
      if(exportMap[playerStatus[1].y + 1][playerStatus[1].x].breakable === true )
      {
        that.movePossibility.push({
          x: exportMap[playerStatus[1].x][playerStatus[1].y + 1].x,
          y: exportMap[playerStatus[1].x][playerStatus[1].y + 1].y,
          breakable: true,
        })
      }
    }
    if(exportMap[playerStatus[1].x][playerStatus[1].y].x > 0)
    {
      //left
      if(exportMap[playerStatus[1].x - 1][playerStatus[1].y].empty === true )
      {
        that.movePossibility.push({
          x: exportMap[playerStatus[1].x - 1][playerStatus[1].y].x,
          y: exportMap[playerStatus[1].x - 1][playerStatus[1].y].y,
          breakable: false,
        })
      }
      if(exportMap[playerStatus[1].x - 1][playerStatus[1].y].breakable === true )
      {
        that.movePossibility.push({
          x: exportMap[playerStatus[1].x - 1][playerStatus[1].y].x,
          y: exportMap[playerStatus[1].x - 1][playerStatus[1].y].y,
          breakable: true,
        })
      }
    }
    else if(exportMap[playerStatus[1].x][playerStatus[1].y].x < exportMapSize - 1 )
    {
      //right
      if(exportMap[playerStatus[1].x + 1][playerStatus[1].y].empty === true )
      {
        that.movePossibility.push({
          x: exportMap[playerStatus[1].x + 1][playerStatus[1].y].x,
          y: exportMap[playerStatus[1].x + 1][playerStatus[1].y].y,
          breakable: false,
        })
      }
      if(exportMap[playerStatus[1].x + 1][playerStatus[1].y].breakable === true )
      {
        that.movePossibility.push({
          x: exportMap[playerStatus[1].x + 1][playerStatus[1].y].x,
          y: exportMap[playerStatus[1].x + 1][playerStatus[1].y].y,
          breakable: true,
        })
      }
    }
    that.nextMoves()
  }
  nextMoves()
  {
    let that = this
    let lenghtTab = that.movePossibility.length - 1
    this.nextPos = that.movePossibility[Math.round(lenghtTab*Math.random())]
    if(this.nextPos.breakable === false)
      that.movesPerso(this.nextPos.x, this.nextPos.y)
    else if(this.nextPos.breakable === true)
    {
      that.newBomb(this.nextPos.x, this.nextPos.y)
    }
  }
  newBomb(posX, posY)
  {
    let that = this
    let bombX = playerStatus[1].x
    let bombY = playerStatus[1].y
    const bomb = new Bomb(0, bombX, bombY, playerStatus[1].BombPower)
    bomb.create()
    if(that.moveIa.length >= 2)
      that.leavePerso(that.moveIa[that.moveIa.length - 2].x, that.moveIa[that.moveIa.length - 2].y)
    else
      that.leavePerso(that.moveIa[that.moveIa.length - 1].x, that.moveIa[that.moveIa.length - 1].y)
    setTimeout(function(){ that.movesPerso(posX, posY)}, 2500);
  }

  leavePerso(posX, posY)
  {
    let persoDiv = document.querySelector('#' + playerStatus[1].name)
    persoDiv.style.left = posX * 50 + 'px'
    persoDiv.style.top = posY * 50 + 'px'
  }
  movesPerso(posX, posY)
  {
    let that = this
    let persoDiv = document.querySelector('#' + playerStatus[1].name)
    playerStatus[1].y = posY
    playerStatus[1].x = posX
    persoDiv.style.left = posX * 50 + 'px'
    persoDiv.style.top = posY * 50 + 'px'
    that.movePossibility = []
    setTimeout(function(){ that.viewPossibilty() }, 1000);
    that.moveIa.push({
      x: posX,
      y: posY,
    })
  }
}
const theIa = new Ia()
theIa.viewPossibilty()
