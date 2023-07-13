import { Animation } from "../../animations/animation";

// return animation sequence & an updated grid
export default function recursiveDivison(gridState, horizontal_start){
    let animation_sequence = []
    
    const { gridRows, gridCols } = gridState
    // create a deep copy of the grid to prevent unwanted updates
    const updatedGrid = gridState.grid.map(row => [...row]);
    let passage_grid = new Array(gridRows)
        .fill(false)
        .map(() => new Array(gridCols).fill(false))

    // define a helper function to return a random number
    function randomNum(min, max){
        return Math.floor(Math.random() * (max - min) + min)
    }

    // helper functions to make modifications to passage grid
    function addHPassage(row, col) {
        [col - 1, col, col + 1].forEach(c => passage_grid[row][c] = true);
    }

    function addVPassage(row, col) {
        [row - 1, row, row + 1].forEach(r => passage_grid[r][col] = true);
    }
      

    // helper function to draw a line dividing the given sextion of the grid
    function divide(rStart, rEnd, cStart, cEnd, horizontal, last_passage){
        if (rEnd - rStart < 4 || cEnd - cStart < 4){
            return
        }
        
        if (horizontal){
            // randomly select a barrier position != the last passage 
            let barrier_row = randomNum(rStart + 1, rEnd - 1)
            while (barrier_row === last_passage){
                barrier_row = randomNum(rStart + 1, rEnd - 1)
            }
            // generate and store a new random passage through the barrier
            const passage_col = randomNum(cStart + 1, cEnd - 1)
            addVPassage(barrier_row, passage_col)
            
            // animations & grid updates to implement barrier & passage
            for (let i = cStart; i < cEnd; i++){
                // confirm that this isnt the passage or part of another passage
                if (i !== passage_col && !passage_grid[barrier_row][i]){
                    animation_sequence.push(new Animation('boundary', barrier_row, i))
                    updatedGrid[barrier_row][i] = 'boundary'
                }
            }
            // recursively divide above and below the previously drawn horizontal barrier
            divide(rStart, barrier_row, cStart, cEnd, false, passage_col)
            divide(barrier_row + 1, rEnd, cStart, cEnd, false, passage_col)
        } else {
            // randomly select a barrier != to the last passage 
            let barrier_col = randomNum(cStart + 1, cEnd - 1)
            while (barrier_col === last_passage){
                barrier_col = randomNum(cStart + 1, cEnd - 1)
            }
            // generate and store a new random passage throughh the barrier
            const passage_row = randomNum(rStart + 1, rEnd - 1)
            addHPassage(passage_row, barrier_col)

            // animations & grid updates to implement barrier & passage
            for (let i = rStart; i < rEnd; i++){
                if (i !== passage_row && !passage_grid[i][barrier_col]){
                    animation_sequence.push(new Animation('boundary', i, barrier_col))
                    updatedGrid[i][barrier_col] = 'boundary'
                }
            }
            // recursively divide left and right of the previously drawn barrier
            divide(rStart, rEnd, cStart, barrier_col, true, passage_row)
            divide(rStart, rEnd, barrier_col + 1, cEnd, true, passage_row)
        }
    }

    divide(1, gridRows - 1, 1, gridCols - 1, horizontal_start === true, 0)
    return {animation_sequence, updatedGrid}
}