import playerStatus from './game_characters.js';
import {exportMap, exportMapSize} from './game_map.js';
import Bomb from './game_bomb.js';

class Ia {
  constructor()
  {
    this.movePossibility = [
      this.empty = [],
      this.breaks = [],
    ]
  }
  viewPossibilty(posX, posY)
  {
    //up
    let that = this

    if(exportMap[posY][posX].y > 0 )
    {
      //up
      if(exportMap[posY - 1][posX].empty === true )
      {
        that.movePossibility[0].push({
          x: exportMap[posY - 1][posX].x,
          y: exportMap[posY - 1][posX].y,
        })
      }
      if(exportMap[posY - 1][posX].breakable === true )
      {
        that.movePossibility[1].push({
          x: exportMap[posY - 1][posX].x,
          y: exportMap[posY - 1][posX].y,
        })
      }
    }
    if (exportMap[posY][posX].y < 13 )
    {
      //down
      if(exportMap[posY + 1][posX].empty === true )
      {
        that.movePossibility[0].push({
          x: exportMap[posY + 1][posX].x,
          y: exportMap[posY + 1][posX].y,
        })
      }
      if(exportMap[posY + 1][posX].breakable === true )
      {
        that.movePossibility[1].push({
          x: exportMap[posY + 1][posX].x,
          y: exportMap[posY + 1][posX].y,
        })
      }
    }
    if (exportMap[posY][posX].x < 13 )
    {
      //left
      if(exportMap[posY][posX + 1].empty === true )
      {
        that.movePossibility[0].push({
          x: exportMap[posY][posX + 1].x,
          y: exportMap[posY][posX + 1].y,
        })
      }
      if(exportMap[posY][posX + 1].breakable === true )
      {
        that.movePossibility[1].push({
          x: exportMap[posY][posX + 1].x,
          y: exportMap[posY][posX + 1].y,
        })
      }
    }
    if (exportMap[posY][posX].x > 0 )
    {
      //right
      if(exportMap[posY][posX - 1].empty === true )
      {
        that.movePossibility[0].push({
          x: exportMap[posY][posX - 1].x,
          y: exportMap[posY][posX - 1].y,
        })
      }
      if(exportMap[posY][posX - 1].breakable === true )
      {
        that.movePossibility[1].push({
          x: exportMap[posY][posX - 1].x,
          y: exportMap[posY][posX - 1].y,
        })
      }
    }      console.log(that.movePossibility)
    that.nextMoves()
  }
  nextMoves()
  {
    let that = this
    let lenghtTabF = that.movePossibility.length -1
    var firstRand = Math.round(Math.random()*lenghtTabF)
    if(this.nextPosX = that.movePossibility[firstRand][0] === undefined)
    {
      that.nextMoves()
    }
    else
    {
      let lenghtTab = that.movePossibility[firstRand].length - 1
      let secondRand = Math.round(Math.random()*lenghtTab)
      let newPosX = that.movePossibility[firstRand][secondRand].x
      let newPosY = that.movePossibility[firstRand][secondRand].y
      if([firstRand] > 0 )
      {

      }
      else
      {
        that.movesPerso(newPosX, newPosY)
      }
    }
  }
  movesPerso(posX, posY)
  {
    let that = this
    let persoDiv = document.querySelector('#' + playerStatus[1].name)
    playerStatus[1].y = posY
    playerStatus[1].x = posX
    persoDiv.style.left = posX * 50 + 'px'
    persoDiv.style.top = posY * 50 + 'px'
    that.movePossibility[0] = []
    that.movePossibility[1] = []
    that.viewPossibilty(playerStatus[1].y, playerStatus[1].x)
  }
}
const theIa = new Ia()
theIa.viewPossibilty(playerStatus[1].y, playerStatus[1].x)
