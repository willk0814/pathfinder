import { Animation } from "../../animations/animation";

export default function BFS(gridState) {

    const {grid, gridMap, startingCoords, endingCoords} = gridState

    // construct a visited array
    const { rows, cols } = { rows: grid.length, cols: grid[0].length }
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    let res = []
    let queue = [[startingCoords]]

    while (queue.length > 0) {
        for (let i = 0; i < queue.length; i++) {
            let current_path = queue.shift()
            let current_node = current_path[current_path.length - 1]
            
            // Check to see if we have reached the goal node
            if (current_node[0] === endingCoords[0] && current_node[1] === endingCoords[1]) {
                return renderFinalSequence(res, current_path, endingCoords)
            }

            // Confirm we are not overwriting the starting node
            if (!(current_node[0] === startingCoords[0] && current_node[1] === startingCoords[1])) {
                res.push(new Animation("visited", current_node[0], current_node[1]));
            }

            // Store all the current moves
            let neighbors = gridMap[current_node];
            // Generate a new path 
            for (let j = 0; j < neighbors.length; j++) {
                // define neighbor coordinates
                const [neighbor_row, neighbor_col] = neighbors[j]
                // confirm that the neighbor hasn't been visited
                if (!visited[neighbor_row][neighbor_col]) {
                    // add a new path to the queue which ends with the neighbor
                    let new_path = [...current_path, neighbors[j]];
                    queue.push(new_path);
                    visited[neighbor_row][neighbor_col] = true; // mark neighbor as visited
                }
            }
        }
    }
    return res;
}

// Helper function to render the final animation sequence
function renderFinalSequence(res, final_path, endingCoords){
    for (let i = 0; i < final_path.length - 1; i++) {
        res.push(new Animation("final_path", final_path[i][0], final_path[i][1]));
    }
    res.push(new Animation('final_path', endingCoords[0], endingCoords[1]))
    return res
}
