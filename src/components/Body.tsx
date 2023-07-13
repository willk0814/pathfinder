import React, { useEffect, useState } from 'react'

// import grid functions
import { generateGrid } from '../gridFunctions/generateGrid'
import { findDriver, boundaryDriver } from '../gridFunctions/gridFunctionDriver'

// import animation object
import { Animation } from '../animations/animation'

import ControlBar from './ControlBar'
import Gridbox from './Gridbox'
import "./Body.css"

export default function Body() {

    // wrap all grid related state vars in a single object
    const [gridState, setGridState] = useState({
        grid: [['']],
        gridMap: {},
        startingCoords: [] as number[],
        endingCoords: [] as number[],
        gridRows: 25,
        gridCols: 45,
        weighted: false
    })

    // running boolean to lock inputs when animations are being rendered
    const [renderingAnimations, setRenderingAnimations] = useState(false)

    const generateNewGrid = (weighted: boolean) => {
        const { tmpGrid, starting_coords, ending_coords, neighbor_map } = generateGrid(
            gridState.gridRows,
            gridState.gridCols,
            weighted
        );

        setGridState(prevGridState => ({
            ...prevGridState,
            grid: tmpGrid,
            gridMap: neighbor_map,
            startingCoords: starting_coords,
            endingCoords: ending_coords,
            weighted: weighted
        }));
    }

    // Find button handler
    const handleFind = (sortingAlgo: string) => {
        const sequence = findDriver(sortingAlgo, gridState)
        renderAnimationSequence(sequence)
    }

    // Generate boundary button handler
    const handleGenerateBoundary = (boundaryPattern: string) => {
        const { sequence, updatedGridMap, updatedStart, updatedEnd } = boundaryDriver
            (boundaryPattern, gridState)
        renderAnimationSequence(sequence)
        setGridState(prevGridState => ({
            ...prevGridState,
            startingCoords: updatedStart,
            endingCoords: updatedEnd,
            gridMap: updatedGridMap
        }))
    }


    // Animation loop sequence
    const renderAnimationSequence = (animation_sequence: Animation[]) => {
        setRenderingAnimations(true)
        const interval = setInterval(() => {
            if (animation_sequence.length === 0) {
                clearInterval(interval)
                setRenderingAnimations(false)
                return
            }

            // remove the leading element from animation_sequence
            const [animation, ...remainingSequence] = animation_sequence
            animation_sequence = remainingSequence
            handleAnimation(animation)
        }, 10)
    }

    // Update the grid
    const handleAnimation = (current_animation: Animation) => {
        const { row, col, status } = current_animation
        setGridState(prevGridState => {
            const updatedGrid = [...prevGridState.grid]
            updatedGrid[row][col] =
                (status === 'final_path' || status === 'boundary' ||
                    status === 'start' || status === 'goal' || status === 'w0') ?
                    (status) :
                    (updatedGrid[row][col].substring(0, 2).concat('_').concat(status));
            return {
                ...prevGridState,
                grid: updatedGrid
            }
        })
    }

    // generate a new grid on mount
    useEffect(() => {
        const { tmpGrid, starting_coords, ending_coords, neighbor_map } = generateGrid(
            gridState.gridRows,
            gridState.gridCols,
            false
        );

        setGridState(prevGridState => ({
            ...prevGridState,
            grid: tmpGrid,
            gridMap: neighbor_map,
            startingCoords: starting_coords,
            endingCoords: ending_coords
        }));
    }, []);

    return (
        <div className='bodyContainer'>
            <h1 className='titleStyle'>PathFinding Visualizer</h1>
            <ControlBar
                renderingAnimations={renderingAnimations}
                handleGenerateGrid={generateNewGrid}
                handleGenerateBoundary={handleGenerateBoundary}
                handleFind={handleFind}
                weighted={gridState.weighted} />

            <div className='gridBox'>
                {gridState.grid.map((row, rowIndex) => (
                    <div key={rowIndex} className='rowBox'>
                        {row.map((cell, colIndex) => (
                            <Gridbox key={rowIndex - colIndex} status={cell} />
                        ))}
                    </div>
                ))}
            </div>

        </div>
    )
}
