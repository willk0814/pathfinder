import React, { useState, useEffect } from 'react'
import { start } from 'repl'

interface GridboxProps {
    status: string
}

export default function Gridbox({ status }: GridboxProps) {
    const [color, setColor] = useState('')
    const [animation, setAnimation] = useState('')

    // reassign the gridBox color anytime that the status changes
    useEffect(() => {
        if (status === 'w0') {
            setColor('#88B7B5')
        } else if (status === 'start') {
            setColor('#940A9E')
        } else if (status === 'goal' || status === 'final_path') {
            setColor('#109E0A')
        } else if (status === 'visited') {
            setColor('#b59da4')
        } else if (status === 'boundary') {
            setColor('#000')
        } else if (status === "w1") {
            setColor("#668A88");
        } else if (status === "w2") {
            setColor("#445C5B");
        } else if (status === "w3") {
            setColor("#334545");
        } else if (status === "w0_visited") {
            setColor("#b59da4");
        } else if (status === "w1_visited") {
            setColor("#8E9496");
        } else if (status === "w2_visited") {
            setColor("#7D7D80");
        } else if (status === 'w3_visited') {
            setColor('#7D7D80s')
        }

        setAnimation('shrink')
        setTimeout(() => {
            setAnimation('grow');
        }, 150);
    }, [status])


    return (
        <div className={`gridBoxContainer ${animation}`} style={{ backgroundColor: `${color}` }}>

        </div>
    )
}
