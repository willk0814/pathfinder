// params: 
    // gridRows - the number of rows in the return grid
    // gridCols - the number of cols in the return grid
    // weighted - boolean, true if weighted
export function generateGrid(gridRows, gridCols, weighted){
    let tmpGrid = [];

    for (let i = 0; i < gridRows; i++) {
        let currentRow = [];
        for (let j = 0; j < gridCols; j++) {
            if (!weighted) {
                currentRow.push("w0");
            } else {
                currentRow.push(generateWeightedElement());
            }
        }
    tmpGrid.push(currentRow);
  }

  const { startRow, startCol } = generateStartCoordinates(gridRows, gridCols);
  const { endRow, endCol } = generateEndCoordinates(gridRows, gridCols);

  tmpGrid[startRow][startCol] = "start";
  tmpGrid[endRow][endCol] = "goal";

  const gridMap = generateMap(tmpGrid, weighted);

  return {
    tmpGrid: tmpGrid,
    starting_coords: [startRow, startCol],
    ending_coords: [endRow, endCol],
    neighbor_map: gridMap
  };
}

// generate starting node in the top right corner
function generateStartCoordinates(gridRows, gridCols){
    return {startRow: Math.floor(Math.random() * (gridRows * .30)), 
        startCol: Math.floor(Math.random() * (gridCols * .30))}
}

// generate ending coordinates in the bottom left corner
function generateEndCoordinates(gridRows, gridCols){
    return {endRow: Math.floor(Math.random() * (gridRows * .30)) + Math.floor(gridRows * .70), 
        endCol: Math.floor(Math.random() * (gridCols * .30)) + Math.floor(gridCols * .70)}
}

function generateWeightedElement(){
    const weight_values = ['w0', 'w0', 'w0', 'w1', 'w2', 'w3']
    return weight_values[Math.floor(Math.random() * 6)]
}

// params
    // grid - the existant grid that we are performing computations on
    // weighted - boolean, true if weighted
export function generateMap(grid, weighted){
    let neighbor_map = {}
    const { rows, cols } = {rows: grid.length, cols: grid[0].length};
    const weight_values = { 'w0': 0, 'w1': 5, 'w2': 10, 'w3': 15}
    
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            let connections = []
            // check cell above
            if (i > 0 && grid[i - 1][j] !== "boundary"){ 
                if (weighted){
                    connections.push([[i - 1, j], weight_values[grid[i - 1][j]]])
                } else {
                    connections.push([i - 1, j])
                }
            }
            // check cell to the right
            if (j < grid[i].length - 1 && grid[i][j + 1] !== "boundary") {
                if (weighted){
                    connections.push([[i, j + 1], weight_values[grid[i][j + 1]]])
                } else {
                    connections.push([i, j + 1])
                }
            }
            // check cell to the left
            if (j > 0 && grid[i][j - 1] !== "boundary") {
                if (weighted){
                    connections.push([[i, j - 1], weight_values[grid[i][j - 1]]])
                } else {
                    connections.push([i, j - 1])
                }
            }
            // check cell below
            if (i < grid.length - 1 && grid[i + 1][j] !== "boundary") {
                if (weighted){
                    connections.push([[i + 1, j], weight_values[grid[i + 1][j]]])
                } else {
                    connections.push([i + 1, j])
                }
            }
            neighbor_map[[i, j]] = connections;
        }
    }
    return neighbor_map
}