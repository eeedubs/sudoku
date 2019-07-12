function sudoku(puzzle) {
  let getNewPuzzle = () => {
    return JSON.parse(JSON.stringify(puzzle))
  }

  let minCalc = (axis) => {
    if (axis >= 6){
      return 6
    } else if (axis >= 3){
      return 3
    }
    return 0
  }
  
  let threeGridValues = (row, col, puz) => {
    let rowMin = minCalc(row)
    let colMin = minCalc(col)
    let firstRow = [puz[rowMin][colMin], puz[rowMin][colMin + 1], puz[rowMin][colMin + 2]]
    let secondRow = [puz[rowMin + 1][colMin], puz[rowMin + 1][colMin + 1], puz[rowMin + 1][colMin + 2]]
    let thirdRow = [puz[rowMin + 2][colMin], puz[rowMin + 2][colMin + 1], puz[rowMin + 2][colMin + 2]]
    let grid = [firstRow, secondRow, thirdRow]
    return grid.concat.apply([], grid).filter(a => a > 0).sort((a, b) => { return a - b })
  }
  
  
  //   returns the values on the same horizontal line greater than 0
  let getX = (row, puz) => {
    return JSON.parse(JSON.stringify(puz))[row].sort((a, b) => { return a - b }).filter(a => a > 0);
  }
  
  //   returns the values on the same vertical line greater than 0
  let getY = (col, puz) => {
    return JSON.parse(JSON.stringify(puz)).map((row) => { return row[col] }).sort((a, b) => { return a - b }).filter(a => a > 0)
  }

  let crossValues = (x, y, puz) => {
    return getX(x, puz).concat(getY(y, puz)).filter(a => a > 0).sort((a, b) => { return a - b })
  }

  let remainingGridNumbers = (gridNums, crossVals) => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(val => !gridNums.includes(val) && !crossVals.includes(val));
  }

  let runGrid = (puz) => {
    for (let x = 0; x < puz.length; x++){
      for (let y = 0; y < puz.length; y++){
        if (getNewPuzzle()[x][y] === 0){
          let minRow = minCalc(x), minCol = minCalc(y);
          let gridNums = threeGridValues(minRow, minCol, puz)
          let crossVals = crossValues(x, y, puz)
          let potentialNumbers = remainingGridNumbers(gridNums, crossVals);
          if (potentialNumbers.length === 1){
            puz[x][y] = potentialNumbers[0];
          }
        }
      }
    }
    for (let z = 0; z < puz.length; z++){
      if (puz[z].includes(0)){
        return runGrid(puz) 
      }
    }
    return puz;
  }

  return runGrid(getNewPuzzle())
}

let puzzle = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]];

console.log(sudoku(puzzle))