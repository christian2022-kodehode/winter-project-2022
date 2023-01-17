import { useState, useEffect } from "react"

export default function Timer( props ) {

	// Take provided time and adjust for user's time zone
	const offsetTime = ( new Date().getTimezoneOffset() * 1000 * 60 ) + Date.parse( props.channel.time )

	// Format time into a human readable countdown string
	function getTimeRemaining(time = offsetTime) {
		const total = time - Date.parse( new Date() )
		const days		= Math.floor( ( total / 1000 / 60 / 60 / 24 ) % 365 ).toString().padStart( 3,0 )
		const hours		= Math.floor( ( total / 1000 / 60 / 60 ) % 24 ).toString().padStart( 2,0 )
		const minutes	= Math.floor( ( total / 1000 / 60 ) % 60 ).toString().padStart( 2,0 )
		const seconds	= Math.floor( ( total / 1000 ) % 60 ).toString().padStart( 2,0 )
		const formattedTime = `${days} : ${hours} : ${minutes} : ${seconds}`
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

	// Format target date into human readable string
	const dateOptions =
	{
	hour12: false,
	timeZone: "Europe/Oslo",
	weekday: "long",
	day: "numeric",
	month: "long",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit"
	}
	const target = new Date( offsetTime ).toLocaleTimeString( "no-NB", dateOptions )

	return(

		<div className="container">
			<div className="countdown__label">
				<h1 className="countdown__tag">{ props.channel.name }</h1>
				<div className="countdown__description">{ props.channel.description }</div>
			</div>
			<div className="countdown__time">
				<h2 className="countdown__now">-{ timer }</h2>
				<div className="countdown__target">{ target }</div>
			</div>
		</div>
	)
}
