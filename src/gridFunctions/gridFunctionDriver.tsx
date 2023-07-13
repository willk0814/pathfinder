
import { Animation } from '../animations/animation'
import { generateMap } from './generateGrid'

// Import Pathfinding Algorithms
import BFS from './pathfindingAlgorithms/BFS'
import DFS from './pathfindingAlgorithms/DFS'
import Dijkstra from './pathfindingAlgorithms/Dijkstra'
import AStar from './pathfindingAlgorithms/AStar'

// Import Boundary Pattern Algorithms
import recursiveDivison from './boundaryPatterns/recursiveDivision'
import flappyBirdBoundaries from './boundaryPatterns/flappyBird'

export function findDriver(sortingAlgo: string, gridState: any) {
    if (sortingAlgo === 'BFS') {
        return BFS(gridState)
    } else if (sortingAlgo === 'DFS') {
        return DFS(gridState)
    } else if (sortingAlgo === 'Dijkstra') {
        return Dijkstra(gridState)
    } else if (sortingAlgo === 'AStar') {
        return AStar(gridState)
    }
}

// boundary Driver needs to construct animation sequence as well as a new gridState object
export function boundaryDriver(boundaryPattern: string, gridState: any) {
    // construct an animation and an updatedGrid based off the given pattern
    if (boundaryPattern === 'recursive_division_h') {
        const { animation_sequence, updatedGrid } = recursiveDivison(gridState, true)
        return generateBoundaryReturn(animation_sequence, updatedGrid, gridState)

    } else if (boundaryPattern === 'flappy_bird') {
        const { animation_sequence, updatedGrid } = flappyBirdBoundaries(gridState)
        return generateBoundaryReturn(animation_sequence, updatedGrid, gridState)

    } else if (boundaryPattern === 'recursive_division_v') {
        const { animation_sequence, updatedGrid } = recursiveDivison(gridState, false)
        return generateBoundaryReturn(animation_sequence, updatedGrid, gridState)

    } else {
        return {
            sequence: [],
            updatedGridMap: {},
            updatedStart: [],
            updatedEnd: []
        };
    }
}

// helper function to prepare all return values
function generateBoundaryReturn(sequence_suffix: Animation[], updatedGrid: string[][],
    gridState: any) {

    const { startingCoords, endingCoords, gridRows, gridCols } = gridState

    // generate the animation sequence prefeix - reassign starting & ending
    let sequence_prefix = []
    // starting & ending animations
    sequence_prefix.push(new Animation('w0', startingCoords[0], startingCoords[1]))
    sequence_prefix.push(new Animation('w0', endingCoords[0], endingCoords[1]))
    sequence_prefix.push(new Animation('start', 1, 1))
    sequence_prefix.push(new Animation('goal', gridRows - 2, gridCols - 2))
    // generate new gridState varirables

    const updatedStart = [1, 1]
    const updatedEnd = [gridRows - 2, gridCols - 2]

    // generate perimeter boundary
    for (let i = 0; i < gridRows; i++) {
        sequence_prefix.push(new Animation("boundary", i, 0));
        updatedGrid[i][0] = 'boundary'
        sequence_prefix.push(new Animation("boundary", i, gridCols - 1));
        updatedGrid[i][gridCols - 1] = 'boundary'
    }

    for (let i = 0; i < gridCols; i++) {
        sequence_prefix.push(new Animation("boundary", 0, i));
        updatedGrid[0][i] = 'boundary'
        sequence_prefix.push(new Animation("boundary", gridRows - 1, i));
        updatedGrid[gridRows - 1][i] = 'boundary'
    }

    // create complete animation
    const sequence = sequence_prefix.concat(sequence_suffix)

    // generate a new gridMap from the updatedGrid
    const updatedGridMap = generateMap(updatedGrid, false)

    return { sequence, updatedGridMap, updatedStart, updatedEnd }

}