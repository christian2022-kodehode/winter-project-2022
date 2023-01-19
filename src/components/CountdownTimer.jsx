import { useState, useEffect } from "react"

export default function CountdownTimer( props ) {

	// Format time into a human readable countdown string
	function getTimeRemaining( time = props.target ) {
		const total = time - Date.parse( new Date() )
		const days		= Math.floor( ( total / 1000 / 60 / 60 / 24 ) % 365 ).toString().padStart( 3,0 )
		const hours		= Math.floor( ( total / 1000 / 60 / 60 ) % 24 ).toString().padStart( 2,0 )
		const minutes	= Math.floor( ( total / 1000 / 60 ) % 60 ).toString().padStart( 2,0 )
		const seconds	= Math.floor( ( total / 1000 ) % 60 ).toString().padStart( 2,0 )
		const formattedTime = `-${days} : ${hours} : ${minutes} : ${seconds}`
		return formattedTime
	}

	const [timer, setTimer] = useState( getTimeRemaining() )

	// Refresh timer every second
	useEffect(
		() => {
			setInterval( () => setTimer( getTimeRemaining() ), 1000 )
			// todo: make timer stop at 0, and trigger end message
		}
	)

	return( timer )
}
