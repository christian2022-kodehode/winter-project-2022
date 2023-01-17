export default function Message( props ) {

	// Format message timestamp into human-readable string
	const options = {
		timeZone: "Europe/Oslo",
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	}
	const time = new Date( props.message.time ).toLocaleTimeString( "no-NB", options )

	return (

		<div className="message">
			<p className="message__text">{ props.message.body }</p>
			<div className="message__byline">
				<p className="message__timestamp">{ time }</p>
				<p className="message__author">{ props.message.author }</p>
			</div>
		</div>
	)
}
