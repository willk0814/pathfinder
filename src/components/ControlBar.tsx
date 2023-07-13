import React, { useState } from 'react'

import InfoWidget from './InfoWidget';

interface ControlBarProps {
    renderingAnimations: boolean,
    handleGenerateGrid: (weighted: boolean) => void,
    handleGenerateBoundary: (boundaryPattern: string) => void
    handleFind: (sortingAlgo: string) => void;
    weighted: boolean
}

export default function ControlBar({
    renderingAnimations,
    handleGenerateGrid,
    handleGenerateBoundary,
    handleFind,
    weighted }: ControlBarProps) {

    // state vars to store return objects of key inputs
    const [sortingAlgo, setSortingAlgo] = useState('')
    const [boundaryPattern, setBoundaryPattern] = useState('')

    // state var to store Info status
    const [infoStatus, setInfoStatus] = useState('unweighted')

    // handle change to grid
    const handleSetGrid = (weighted: boolean) => {
        if (weighted) {
            setInfoStatus('weighted')
            handleGenerateGrid(true)
            setSortingAlgo('')
        } else {
            setInfoStatus('unweighted')
            handleGenerateGrid(false)
            setSortingAlgo('')
        }
    }

    // handle chhange to boundary pattern
    const handleBoundaryPatternChange = (boundaryPattern: string) => {
        if (boundaryPattern !== 'flappyBird') {
            setInfoStatus(boundaryPattern)
        }
        setBoundaryPattern(boundaryPattern)
    }

    // handle change to sorting algo
    const handleSortingAlgoChange = (sortingAlgo: string) => {
        setInfoStatus(sortingAlgo)
        setSortingAlgo(sortingAlgo)
    }

    return (
        <div className='controlBarContainer'>
            {/* Generate New Grid Controls */}
            <div className='inputContainer'>
                <label
                    className='inputLabel'>Generate a new grid:</label>
                <button
                    className='renderButton'
                    disabled={renderingAnimations}
                    onClick={() => handleSetGrid(true)}
                    style={{ background: weighted ? '#88B7B5' : '' }}>
                    {renderingAnimations ? 'RENDERING' : 'Weighted Grid'}
                </button>
                <button
                    className='renderButton'
                    disabled={renderingAnimations}
                    onClick={() => handleSetGrid(false)}
                    style={{ background: !weighted ? '#88B7B5' : '' }}>
                    {renderingAnimations ? 'RENDERING' : 'Unweighted Grid'}
                </button>
            </div>

            {/* Select Boundary Pattern */}
            <div className='inputContainer'>
                <label
                    htmlFor='boundaryDropdown'
                    className='inputLabel'>Maze Pattern:</label>
                <select
                    className='input'
                    id='boundaryDropdown'
                    disabled={weighted}
                    onChange={(e) => handleBoundaryPatternChange(e.target.value)}>
                    <option value=''>Select Maze Pattern</option>
                    <option value='recursive_division_h'>Horizontal Division</option>
                    <option value='recursive_division_v'>Vertical Division</option>
                    <option value='flappy_bird'
                        disabled={false}>Flappy Bird</option>
                </select>
                {/* Render Boundary Button */}
                <button
                    className='renderButton'
                    disabled={boundaryPattern === '' || renderingAnimations || weighted}
                    onClick={() => handleGenerateBoundary(boundaryPattern)}>
                    {renderingAnimations ? 'RENDERING' : 'Display Boundaries'}
                </button>
            </div>


            {/* Select Algorithm */}
            <div className='inputContainer'>
                <label
                    htmlFor='algoDropdown'
                    className='inputLabel'>Algorithm:</label>
                <select
                    className='input'
                    id='algoDropdown'
                    onChange={(e) => handleSortingAlgoChange(e.target.value)}>
                    <option value=''>Select Algorithm</option>
                    <option value='BFS' disabled={weighted}>BFS</option>
                    <option value='DFS' disabled={weighted}>DFS</option>
                    <option value='Dijkstra' disabled={!weighted}>Dijkstra</option>
                    <option value='AStar' disabled={!weighted}>A*</option>
                </select>
                {/* Render Path Visualization */}
                <button
                    className='renderButton'
                    disabled={sortingAlgo === '' || renderingAnimations}
                    onClick={() => handleFind(sortingAlgo)}>
                    {renderingAnimations ? 'RENDERING ' : 'Find Path'}</button>
            </div>

            {/* divider div */}
            <div className='divider'></div>

            <InfoWidget status={infoStatus} />

        </div>
    )
}
