const grid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]


// logic for parsing the grid and rendering it to the screen
for (let line = 0; line < grid.length; line++){
    var blockline = document.createElement('div')
    blockline.id = "blockline" + line
    blockline.className = "blockline row"
    document.getElementById('sudokuBoard').appendChild(blockline)
    for (let val=0; val<9 ; val++){
        // console.log(grid[line][val])
        var block = document.createElement('div')
        block.className = "block col"
        if (grid[line][val] === 0){
            block.innerText = ''
        } else {
            block.innerText = grid[line][val]
        }
        document.getElementById(`blockline${line}`).appendChild(block)
    }
}




let solvedBoard = grid

// functino for checking whether a number fits in the cell or not
const possible = (y,x,n) => {
    for(let i=0; i<9; i++){
        if (solvedBoard[y][i] == n){
            return false
        }
    }
    for(let i=0; i<9; i++){
        if (solvedBoard[i][x] == n){
            return false
        }
    }
    //fixed this in the code but still not solving
    x0 = Math.floor(x/3) * 3
    y0 = Math.floor(y/3) * 3
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if (solvedBoard[y0+i][x0+j] == n){
                return false
            }
        }
    }
    return true
}


//function for recursively solving the sudoku,
// this needs to be fixed
function solve(){
    for(let y=0;y<9;y++){
        for(let x=0;x<9;x++){
            if (solvedBoard[y][x] == 0){
                for(let n=0;n<10;n++){
                    if(possible(y,x,n)){
                        solvedBoard[y][x] = n
                        if(solve()){
                            return true
                        }
                        solvedBoard[y][x] = 0
                    }
                }
                return false
            }
        }
    }
    return true
}


//function call to solve the sudoku
//and then render the sudoku on the screen

let waspressed = false 
errorMessageHandler = document.getElementById('errmsg')
function solvepuzzle(){
    if(!waspressed){
    solve()

    for (let line = 0; line < grid.length; line++){
        var blockline = document.createElement('div')
        blockline.id = "blocklinesolved" + line
        blockline.className = "blockline row"
        document.getElementById('solvedBoard').appendChild(blockline)
        for (let val=0; val<9 ; val++){
            // console.log(grid[line][val])
            var block = document.createElement('div')
            block.className = "block col"
            if (solvedBoard[line][val] === 0){
                block.innerText = ''
            } else {
                block.innerText = grid[line][val]
            }
            document.getElementById(`blocklinesolved${line}`).appendChild(block)
        }
    }
    }
    if(waspressed){
        errorMessageHandler.innerText = "The sudoku has already been solved"
    }
    waspressed = true
}