import { Animation } from '../../animations/animation'

export default function flappyBirdBoundaries(gridState){
    let animation_sequence = []
    
    const { gridRows, gridCols } = gridState
    const updatedGrid = gridState.grid.map(row => [...row]);

    // generate inner boundaries - draw vertical lines 
    for (let i = 3; i < gridCols - 2; i += 2){
        const door = Math.floor(Math.random() * (gridRows - 3)) + 2;
        for (let j = 0; j < gridRows; j++){
            if (j === door) {
                continue
            }
            animation_sequence.push(new Animation('boundary', j, i))
            updatedGrid[j][i] = 'boundary'
        }
    }

    return {animation_sequence, updatedGrid}
}