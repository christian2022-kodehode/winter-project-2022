import MessagesByDate from "./MessagesByDate"

export default function MessageHistory( props ) {

	// Todo: create logic for determining if channel should be fragmented based on time zone
	// e.g. countdown to new years should be local to each time zone
	// countdown to a global event should not be fragmented

	const channel = JSON.parse( props.messages )[props.channel]
	let zone = null
	let children = "Ingen meldinger har blitt sendt enda."

	if ( channel.zones
	&& channel.zones[props.zone]
	&& channel.zones[props.zone].dates
	&& channel.zones[props.zone].dates.length > 0 ) {

		children = zone.dates.map(
			( date ) => {
				return <MessagesByDate key={date.key} date={date} />
			}
		)
	}

	return(

		<section className="chat">
			<h2>Meldinger:</h2>
			{ children }
		</section>
	)
}
