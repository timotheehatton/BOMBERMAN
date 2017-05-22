class Map
{
  constructor(size)
  {
    this.size = size
    this.container = document.querySelector('.map')
    this.gameMap = []
  }

  setUnbreakable()
  {
    let that = this
    for (let i = 1; i < that.gameMap.length - 1; i += 2)
    {
      for (let j = 1; j < that.gameMap[i].length - 1; j += 2)
      {
        that.gameMap[i][j].breakable = false;
        that.gameMap[i][j].empty = false
        let unbreakBlock = document.querySelector('#block'+ i + j)
        unbreakBlock.classList.add('map--unbreak')
      }
    }
  }

  setBreakable()
  {
    let that = this
    for (let i = 0; i < that.gameMap.length; i ++)
    {
      for (let j = 0; j < that.gameMap[i].length; j ++)
      {
        if
        ( (i === 0 && j === 0) ||
          (i === that.gameMap.length - 1 && j === that.gameMap.length - 1) )
        {
          let spawnDiv = document.querySelector('#block'+ i + j)
          spawnDiv.classList.add('map--spawn')
          that.gameMap[i][j].breakable = null
        }
        if
        ( (i === 1 && j === 0) ||
          (i === 0 && j === 1) ||
          (i === that.gameMap.length - 2 && j === that.gameMap.length - 1) ||
          (i === that.gameMap.length - 1 && j === that.gameMap.length - 2) )
        {
          that.gameMap[i][j].breakable = null
        }
        else if (that.gameMap[i][j].breakable === null)
        {
          let rand = Math.random()
          if(rand < 0.1)//0.6
          {
            that.gameMap[i][j].breakable = true
            that.gameMap[i][j].empty = false
            let unbreakBlock = document.querySelector('#block'+ i + j)
            unbreakBlock.classList.add('map--break')
          }
        }
      }
    }
  }


  createMap()
  {
    let that = this
    for (var i = 0; i < that.size; i++)
    {
      this.gameMap.push([])
      for (var j = 0; j < that.size; j++)
      {
        this.gameMap[i].push({
          x: i,
          y: j,
          breakable: null,
          border: false,
          empty: true,
          bonus: null,
        })
        let createDiv = document.createElement('div')
        createDiv.classList.add('map--block')
        createDiv.setAttribute('id', 'block'+ i + j)
        that.container.appendChild(createDiv)
      }
    }
    that.setUnbreakable()
    that.setBreakable()
  }
}

const createMap = new Map(15)
createMap.createMap()
var exportMap = createMap.gameMap
var exportMapSize = createMap.size
export {exportMap, exportMapSize}
