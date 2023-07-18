import React, { useState, useEffect } from 'react'
import Gridbox from './Gridbox'

interface InfoWidgetProps {
    status: string
}

export default function InfoWidget({ status }: InfoWidgetProps) {

    const [returnContainer, setReturnContainer] = useState<JSX.Element | null>(null)

    useEffect(() => {
        if (status === 'weighted') {
            setReturnContainer(
                <div id='infoText' className='infoBox'>
                    <p className='infoText'>
                        Elements in a weighted grid can have different costs
                    </p>
                    <div
                        style={{ display: 'flex', flexDirection: 'row' }}>
                        <Gridbox status='w0' />
                        <p className='infoText'>0</p>
                        <Gridbox status='w1' />
                        <p className='infoText'>5</p>
                        <Gridbox status='w2' />
                        <p className='infoText'>10</p>
                        <Gridbox status='w3' />
                        <p className='infoText'>15</p>
                    </div>
                </div>)
        } else if (status === 'unweighted') {
            setReturnContainer(
                <div id='infoText' className='infoBox'>
                    <p className='infoText'>
                        Elements in an unweighted grid all have the same cost
                    </p>
                    <div
                        style={{ display: 'flex', flexDirection: 'row' }}>
                        <Gridbox status='w0' />
                        <p className='infoText'>0</p>
                    </div>

                </div>)
        } else if (status === 'recursive_division_h' || status === 'recursive_division_v') {
            setReturnContainer(
                <div id='infoText' className='infoBox'>
                    <p className='infoText'>Recursive division works by repeatedly, randomly dividing the grid, each time leaving a passage </p>
                </div>)
        } else if (status === 'BFS') {
            setReturnContainer(
                <div id='infoText' className='infoBox'>
                    <p className='infoText'>BFS is unweighted and undirected and guarantees the shortest path</p>
                </div>)
        } else if (status === 'DFS') {
            setReturnContainer(
                <div id='infoText' className='infoBox'>
                    <p className='infoText'>DFS is unweighted and undirected and does not guarantee the shortest path</p>
                </div>)
        } else if (status === 'Dijkstra') {
            setReturnContainer(
                <div id='infoText' className='infoBox'>
                    <p className='infoText'>Dijikstra is weighted and undirected and guarantees the shortest path</p>
                </div>)
        } else if (status === 'AStar') {
            setReturnContainer(
                <div id='infoText' className='infoBox'>
                    <p className='infoText'>A* is weigthed & unweighted, is directed, and does not guarantee the shortest path</p>
                </div>)
        }

    }, [status])

    return (
        <div className='infoContainer'>
            <label htmlFor='infoText' className='infoLabel'>Key info...</label>
            {returnContainer}
        </div>
    )
}
