import { useState, useEffect } from "react"

export default function Timer (props) {

	function getTimeRemaining (time = props.channel.time) {
		const total = Date.parse(time) - Date.parse(new Date())
		const days		= Math.floor((total / 1000 / 60 / 60 / 24) % 365).toString().padStart(3,0)
		const hours		= Math.floor((total / 1000 / 60 / 60) % 24).toString().padStart(2,0)
		const minutes	= Math.floor((total / 1000 / 60) % 60).toString().padStart(2,0)
		const seconds	= Math.floor((total / 1000) % 60).toString().padStart(2,0)
		const formattedTime = `${days} : ${hours} : ${minutes} : ${seconds}`
		return formattedTime
	}

	const [ timer, setTimer ] = useState ( getTimeRemaining () );

	useEffect (
		() => {
			setInterval (() => setTimer ( getTimeRemaining () ), 1000 );
		}
	)

	const options = {
		timeZone: "Europe/Oslo",
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit"
	}

	const target = new Date(props.channel.time).toLocaleTimeString("no-NB", options)

	return (
		<div className="container">
			<div className="countdown__label">
				<h1 className="countdown__tag">{ props.channel.name }</h1>
				<div className="countdown__description">{ props.channel.description }</div>
			</div>
			<div className="countdown__time">
				<h2 className="countdown__now">{ timer }</h2>
				<div className="countdown__target">{ target }</div>
			</div>
		</div>
	)
}
