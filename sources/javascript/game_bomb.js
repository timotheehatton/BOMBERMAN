import {exportMap, exportMapSize} from './game_map.js';
import playerStatus from './game_characters.js';

var bombStatus =  []

class Bomb {
  constructor(player, posX, posY, power)
  {
    this.bombRange = []
    this.bombBreak = []
    this.player = player
    this.posX = posX
    this.posY = posY
    this.posXNew = this.posX * 50
    this.posYNew = this.posY * 50
    this.power = power
    this.delay = 2000
    this.container = document.querySelector('.map')
  }

  setDiv()
  {
    let that = this
    let createDiv = document.createElement('div')
    createDiv.classList.add('map--bomb')
    createDiv.classList.add('map--bomb')
    createDiv.setAttribute('id', 'bomb'+ that.posXNew + that.posYNew)
    createDiv.style.left = that.posXNew + 'px'
    createDiv.style.top = that.posYNew + 'px'
    that.container.appendChild(createDiv)
  }

  setRange(posX, posY)
  {
    let that = this
    let createDiv = document.createElement('div')
    createDiv.style.left = posX * 50 + 'px'
    createDiv.style.top = posY * 50 + 'px'
    that.container.appendChild(createDiv)
    that.bombRange.push ({
      x : posX,
      y : posY,
    })

    setTimeout(function()
    {
      createDiv.classList.add('map--bomb-range')
      setTimeout(function()
      {
        createDiv.classList.remove('map--bomb-range')
      },200)
    },2000)
  }

  setbreakable(posX, posY)
  {
    let that = this
    that.bombBreak.push ({
      x : posX,
      y : posY,
    })
  }

  viewPossibilty()
  {
    let that = this
    let power = this.power
    that.bombRange = []
    for (let i = 1; i <= power; i++)
    {
      let newPosX = that.posX
      let newPosY = that.posY + i
      if(exportMap[that.posY][that.posX].x ===  exportMapSize - 1)// 2 pour l'ia
      {
        break
      }
      else if(exportMap[newPosY][newPosX].x ===  exportMapSize - 1)
      {
        that.setbreakable(newPosX, newPosY)
        break
      }
      else
      {
        if(exportMap[newPosY][newPosX].empty === true)
        {
          that.setRange(newPosX, newPosY)
        }
        else if (exportMap[newPosY][newPosX].breakable === false)
        {
          break
        }
        else
        {
          that.setbreakable(newPosX, newPosY)
          break
        }
      }
    }

    for (let i = 1; i <= power; i++)
    {
      let newPosX = that.posX
      let newPosY = that.posY - i
      if(exportMap[that.posY][that.posX].x ===  0)
      {
        break
      }
      else if(exportMap[newPosY][newPosX].x ===  0)
      {
        that.setbreakable(newPosX, newPosY)
        break
      }
      else
      {
        if(exportMap[newPosY][newPosX].empty === true)
        {
          that.setRange(newPosX, newPosY)
        }
        else if (exportMap[newPosY][newPosX].breakable === false)
        {
          break
        }
        else
        {
          that.setbreakable(newPosX, newPosY)
          break
        }
      }
    }

    for (let i = 1; i <= power; i++)
    {
      let newPosX = that.posX + i
      let newPosY = that.posY
      if(exportMap[that.posY][that.posX].y ===  exportMapSize - 1)
      {
        break
      }
      else if(exportMap[newPosY][newPosX].y ===  exportMapSize - 1)
      {
        that.setbreakable(newPosX, newPosY)
        break
      }
      else
      {
        if(exportMap[newPosY][newPosX].empty === true)
        {
          that.setRange(newPosX, newPosY)
        }
        else if (exportMap[newPosY][newPosX].breakable === false)
        {
          break
        }
        else
        {
          that.setbreakable(newPosX, newPosY)
          break
        }
      }
    }

    for (let i = 1; i <= power; i++)
    {
      let newPosX = that.posX - i
      let newPosY = that.posY
      if(exportMap[that.posY][that.posX].y ===  0)
      {
        break
      }
      else if(exportMap[newPosY][newPosX].y ===  0)
      {
        that.setbreakable(newPosX, newPosY)
        break
      }
      else
      {
        if(exportMap[newPosY][newPosX].empty === true)
        {
          that.setRange(newPosX, newPosY)
        }
        else if (exportMap[newPosY][newPosX].breakable === false)
        {
          break
        }
        else
        {
          that.setbreakable(newPosX, newPosY)
          break
        }
      }
    }
  }
  destroy()
  {
    let that = this
    for (let i = 0; i < that.bombBreak.length; i++) {
      let x = that.bombBreak[i].x
      let y = that.bombBreak[i].y
      if(exportMap[y][x].empty === false)
      {
        let breakDiv = document.querySelector('#block' + y + x )
        breakDiv.classList.remove('map--break')
        breakDiv.classList.remove('map--unbreak')
        exportMap[y][x].empty = true
        exportMap[y][x].break = null
        document.querySelector('#bomb'+ that.posXNew + that.posYNew).classList.add('map--explosion')
        setTimeout(function(){
          document.querySelector('#bomb'+ that.posXNew + that.posYNew).classList.remove('map--explosion')
          document.querySelector('#bomb'+ that.posXNew + that.posYNew).style.display = 'none'
        },200)
      }
      else if(exportMap[y][x].empty === true)
      {
        document.querySelector('#bomb'+ that.posXNew + that.posYNew).classList.add('map--explosion')
        setTimeout(function()
        {
          document.querySelector('#bomb'+ that.posXNew + that.posYNew).classList.remove('map--explosion')
          document.querySelector('#bomb'+ that.posXNew + that.posYNew).style.display = 'none'
        },200)
      }
      console.log(playerStatus[0].x);
      console.log(that.posX);
      if (playerStatus[0].x === that.posXNew && playerStatus[0].y === that.posYNew) {
        window.alert('You lost !')
        location.reload();
      }
    }
  }

  create()
  {
    let that = this
    that.setDiv()
    that.viewPossibilty()
    bombStatus.push({
      player: that.player,
      x: that.posX,
      y: that.posY,
      power: 2 * that.power,
      bombPosibility: that.bombRange,
      status: true,
    })
    setTimeout(function(){ that.destroy() }, that.delay);
  }
}

export default Bomb
