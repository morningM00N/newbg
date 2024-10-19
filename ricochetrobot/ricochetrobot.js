let robotSizeInTd = 0.70


let RIGHT = 0
let BOTTOM = 1
let LEFT = 2
let TOP = 3

let seed = 12;
function pseudo_rand() {
    seed = seed * 25214903917 + 11;
    seed = seed & 0x7fffffff
    return (seed >> 16) & 0x3fffffff;
}

function reDraw(){
    let cellSize = board.tiles[0][0].td.getBoundingClientRect().width
    colorList.forEach(element => {
        let btn = board.robots[element][0]
        let row = board.robots[element][1][0]
        let col = board.robots[element][1][1]
        btn.style.width = cellSize * robotSizeInTd + "px"
        btn.style.height = cellSize * robotSizeInTd + "px"

        btn.style.left = (board.tiles[row][col].td.getBoundingClientRect().left + cellSize * (1 - robotSizeInTd) / 2) + "px"
        btn.style.top = (board.tiles[row][col].td.getBoundingClientRect().top + cellSize * (1 - robotSizeInTd) / 2) + "px"
    });

    let removeDiv = document.getElementById("removeDiv")
    if (window.innerWidth>window.innerHeight){
        removeDiv.style.flexDirection="column"
    } else{
        removeDiv.style.flexDirection="row"
    }

}
window.addEventListener('resize', function() {
    reDraw()
  });
  
let originalBoard = []
for (let index = 0; index < 4; index++) {
    originalBoard.push([])
    originalBoard[index].push([])
    originalBoard[index].push([])
}

originalBoard[0][0].push([0, 5, RIGHT])
originalBoard[0][0].push([2, 2, RIGHT])
originalBoard[0][0].push([3, 4, RIGHT])
originalBoard[0][0].push([4, 2, RIGHT])
originalBoard[0][0].push([5, 4, RIGHT])
originalBoard[0][0].push([1, 3, BOTTOM])
originalBoard[0][0].push([3, 0, BOTTOM])
originalBoard[0][0].push([3, 2, BOTTOM])
originalBoard[0][0].push([3, 5, BOTTOM])
originalBoard[0][0].push([5, 4, BOTTOM])


originalBoard[1][0].push([0, 1, RIGHT])
originalBoard[1][0].push([1, 2, RIGHT])
originalBoard[1][0].push([3, 6, RIGHT])
originalBoard[1][0].push([4, 0, RIGHT])
originalBoard[1][0].push([6, 4, RIGHT])

originalBoard[1][0].push([0, 3, BOTTOM])
originalBoard[1][0].push([3, 6, BOTTOM])
originalBoard[1][0].push([4, 1, BOTTOM])
originalBoard[1][0].push([5, 4, BOTTOM])
originalBoard[1][0].push([6, 0, BOTTOM])

originalBoard[2][0].push([0, 1, RIGHT])
originalBoard[2][0].push([1, 4, RIGHT])
originalBoard[2][0].push([3, 0, RIGHT])
originalBoard[2][0].push([5, 4, RIGHT])
originalBoard[2][0].push([6, 3, RIGHT])

originalBoard[2][0].push([0, 4, BOTTOM])
originalBoard[2][0].push([3, 1, BOTTOM])
originalBoard[2][0].push([4, 5, BOTTOM])
originalBoard[2][0].push([5, 0, BOTTOM])
originalBoard[2][0].push([6, 3, BOTTOM])

originalBoard[3][0].push([0, 2, RIGHT])
originalBoard[3][0].push([1, 4, RIGHT])
originalBoard[3][0].push([2, 7, RIGHT])
originalBoard[3][0].push([4, 3, RIGHT])
originalBoard[3][0].push([5, 5, RIGHT])
originalBoard[3][0].push([6, 1, RIGHT])

originalBoard[3][0].push([1, 5, BOTTOM])
originalBoard[3][0].push([2, 7, BOTTOM])
originalBoard[3][0].push([3, 0, BOTTOM])
originalBoard[3][0].push([4, 3, BOTTOM])
originalBoard[3][0].push([4, 6, BOTTOM])
originalBoard[3][0].push([5, 1, BOTTOM])

function rotate(board, degree) {
    let ret = []
    board.forEach(e => {
        if (degree == 0) {
            ret.push([e[0], e[1], e[2]])
        }
        else if (degree == 90) {
            ret.push([e[1], 7 - e[0], e[2] + 1])
        } else if (degree == 180) {
            ret.push([7 - e[0], 7 - e[1], e[2] + 2])
        } else {
            console.assert(degree == 270)
            ret.push([7 - e[1], e[0], (e[2] + 3) % 4])
        }
    });
    return ret
}

function resizeCells() {
    const table = document.getElementById('boardTbl');
    const rows = table.rows.length; // 테이블의 행 수
    const cols = table.rows[0].cells.length; // 첫 번째 행의 열 수

    const tableWidth = table.clientWidth; // 테이블 너비
    const tableHeight = table.clientHeight; // 테이블 높이

    // 최소 행 또는 열 수에 따라 정사각형 셀의 크기 계산
    const cellSize = Math.min(tableWidth / cols, tableHeight / rows);

    // 각 셀의 너비와 높이를 설정
    for (let row of table.rows) {
        for (let cell of row.cells) {
            cell.style.width = cellSize + 'px';
            cell.style.height = cellSize + 'px';
        }
    }
}

// 페이지가 로드될 때와 창 크기가 변경될 때 셀 크기 조정

function moveRobot(color, direction) {
    console.log(color, direction)
    let curRow = board.robots[color][1][0]
    let curCol = board.robots[color][1][1]

    board.tiles[curRow][curCol].robot = false

    let dr = [0, 1, 0, -1]
    let dc = [1, 0, -1, 0]

    let targetRow = curRow
    let targetCol = curCol
    while (true) {
        let tmpRow = targetRow + dr[direction]
        let tmpCol = targetCol + dc[direction]
        if (tmpRow < 0 || tmpRow >= 16 || tmpCol < 0 || tmpCol >= 16) {
            break
        }
        if (board.tiles[targetRow][targetCol].existWall(direction) == true) {
            break
        }
        if (board.tiles[tmpRow][tmpCol].robot == true) {
            break
        }
        targetRow += dr[direction]
        targetCol += dc[direction]
    }

    let cellSize = board.tiles[0][0].td.getBoundingClientRect().width

    board.tiles[targetRow][targetCol].robot = true
    board.robots[color][0].style.left = (board.tiles[targetRow][targetCol].td.getBoundingClientRect().left + cellSize * (1 - robotSizeInTd) / 2) + "px"
    board.robots[color][0].style.top = (board.tiles[targetRow][targetCol].td.getBoundingClientRect().top + cellSize * (1 - robotSizeInTd) / 2) + "px"
    board.robots[color][1][0] = targetRow
    board.robots[color][1][1] = targetCol
}
function funcDraw() {
    let boardTbl = document.getElementById('boardTbl');
    for (let i = 0; i < 16; i++) {
        let tr = document.createElement('tr');
        boardTbl.appendChild(tr)
        for (let j = 0; j < 16; j++) {
            let td = document.createElement('td');
            td.id = "boardTile_" + i + "_" + j
            tr.appendChild(td)
        }
    }

    colorList.forEach(color => {

        let button = document.createElement('button')
        button.className = "round-button "+color+"-button"

        let tbl = document.getElementById("remote"+color)
        for (let i = 0; i < 3; i++) {
            let tr = document.createElement('tr');
            tbl.appendChild(tr)
            for (let j = 0; j < 3; j++) {
                let td = document.createElement('td');
                tr.appendChild(td)
                td.style.fontSize="3vmin"
                if (i==1 && j==1) td.appendChild(button)
                if (i==0 && j==1) {
                    td.innerHTML="▲"
                    //td.appendChild(buttontop)
                    td.onclick=function (){moveRobot(color,TOP)}
                }
                if (i==1 && j==0){
                    td.innerHTML="◀"
                    //td.appendChild(buttonleft)
                    td.onclick=function (){moveRobot(color,LEFT)}
                }
                if (i==1 && j==2){
                    td.innerHTML="▶"
                    //td.appendChild(buttonright)
                    td.onclick=function (){moveRobot(color,RIGHT)}
                }
                if (i==2 && j==1){
                    td.innerHTML="▼"
                    //td.appendChild(buttonbottom)
                    td.onclick=function (){moveRobot(color,BOTTOM)}
                }
                
            }
        }



    
    });

  

}


let wallStates = [0b0, 0b1000, 0b1100, 0b0100, 0b0110, 0b0010, 0b0011, 0b0001, 0b1001]

class Tile {
    constructor(row, col) {
        this.wall = [false, false]
        this.adjTiles = [null, null, null, null]
        this.wallState = 0
        this.row = row
        this.col = col
        this.td = document.getElementById("boardTile_" + row + "_" + col)
        this.robot = false
    }
    setWall(dir, value) {
        if (dir < 2) this.wall[dir] = value
        else {
            console.assert(this.adjTiles[dir] != null)
            this.adjTiles[dir].wall[(dir + 2) % 4] = value
        }
    }
    existWall(dir) {
        if (this.adjTiles[dir] == null) return true
        if (dir < 2) return this.wall[dir]
        return this.adjTiles[dir].existWall((dir + 2) % 4)
    }
    setBGImg() {
        while (this.td.firstChild){
            this.td.removeChild(this.td.firstChild)
        }
        for (let idx = 3; idx >= 0; idx--) {
            if (this.existWall(idx) == true) {
                let wallBtn = document.createElement("button")
                wallBtn.className = "wall-button rotate-" + (90 * (idx))
                wallBtn.style.backgroundImage = "url('img/wall" + (pseudo_rand() % 5) + ".png')"
                this.td.appendChild(wallBtn)
            }
        }
        this.td.style.backgroundImage = 'url("img/tilebg.png")'

    }
}

let colorList = ["red", "blue", "gray", "yellow", "green"]
class Board {
    constructor() {
        this.tiles = []
        for (let i = 0; i < 16; i++) {
            let arr = []
            this.tiles.push(arr)
            for (let j = 0; j < 16; j++) {
                arr.push(new Tile(i, j))
            }
        }
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let topTile = null
                let bottomTile = null
                let leftTile = null
                let rightTile = null
                if (i > 0) {
                    topTile = this.tiles[i - 1][j]
                }
                if (j > 0) {
                    leftTile = this.tiles[i][j - 1]
                }
                if (i < 15) {
                    bottomTile = this.tiles[i + 1][j]
                }
                if (j < 15) {
                    rightTile = this.tiles[i][j + 1]
                }
                this.tiles[i][j].adjTiles[TOP] = topTile
                this.tiles[i][j].adjTiles[BOTTOM] = bottomTile
                this.tiles[i][j].adjTiles[LEFT] = leftTile
                this.tiles[i][j].adjTiles[RIGHT] = rightTile
            }
        }
        this.robots = {}
        for (let row = 0; row < 16; row++) {
            for (let col = 0; col < 16; col++) {
                this.tiles[row][col].setBGImg()
            }
        }

    }
    init(numOfWall) {
        let cellSize = this.tiles[0][0].td.getBoundingClientRect().width
        colorList.forEach(element => {
            this.robots[element] = []
            let btn = document.createElement("button")
            btn.className = "round-button " + element + "-button robot"
            btn.style.width = cellSize * robotSizeInTd + "px"
            btn.style.height = cellSize * robotSizeInTd + "px"
            document.getElementById("mainBody").appendChild(btn)
            this.robots[element].push(btn)
            let row = pseudo_rand() % 16
            let col = pseudo_rand() % 16
            while (this.tiles[row][col].robot == true) {
                row = pseudo_rand() % 16
                col = pseudo_rand() % 16
            }
            this.tiles[row][col].robot = true
            this.robots[element].push([row, col])
            btn.style.left = (this.tiles[row][col].td.getBoundingClientRect().left + cellSize * (1 - robotSizeInTd) / 2) + "px"
            btn.style.top = (this.tiles[row][col].td.getBoundingClientRect().top + cellSize * (1 - robotSizeInTd) / 2) + "px"
        });
        this.setWall(numOfWall, true)
    }
    setWall(numOfWall, original) {
        if (original == true) {
            let used = [false, false, false, false]
            for (let i = 0; i < 4; i++) {
                let thisBoard = pseudo_rand() % 4
                while (used[thisBoard] == true) {
                    thisBoard = pseudo_rand() % 4
                }
                used[thisBoard] = true

                let rotatedBoard = rotate(originalBoard[thisBoard][0], 90 * i)
                let dr = 0
                let dc = 0
                if (i == 1 || i == 2) dc = 8
                if (i == 2 || i == 3) dr = 8
                rotatedBoard.forEach(e => {
                    this.tiles[e[0] + dr][e[1] + dc].setWall(e[2], true)
                });

            }
        } else {

            for (let i = 0; i < numOfWall; i++) {
                let row = pseudo_rand() % 16
                let col = pseudo_rand() % 16
                let dir = pseudo_rand() % 2
                while (
                    (col == 15 && dir == RIGHT) ||
                    (row == 15 && dir == BOTTOM) ||
                    this.tiles[row][col].existWall(dir) == true
                ) {
                    row = pseudo_rand() % 16
                    col = pseudo_rand() % 16
                    dir = pseudo_rand() % 2
                }
                this.tiles[row][col].setWall(dir, true)
            }
        }
        this.tiles[7][7].setWall(LEFT, true)
        this.tiles[7][7].setWall(TOP, true)
        this.tiles[7][8].setWall(RIGHT, true)
        this.tiles[7][8].setWall(TOP, true)

        this.tiles[8][7].setWall(LEFT, true)
        this.tiles[8][7].setWall(BOTTOM, true)
        this.tiles[8][8].setWall(RIGHT, true)
        this.tiles[8][8].setWall(BOTTOM, true)

        for (let row = 0; row < 16; row++) {
            for (let col = 0; col < 16; col++) {
                this.tiles[row][col].setBGImg()
            }
        }
    }
}
funcDraw()

seed=7

let board = new Board()
board.init(64)

reDraw()
