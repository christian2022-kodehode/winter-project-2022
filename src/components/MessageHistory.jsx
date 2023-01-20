import MessageGroup from "./MessageGroup"

// Props:
// messages={ messages[channel].zones[zone] }

export default function MessageHistory( props ) {

	// Todo: create logic for determining if channel should be fragmented based on time zone
	// e.g. countdown to new years should be local to each time zone
	// countdown to a global event should not be fragmented
	const dates = JSON.parse( props.messages )[props.channel].zones[props.zone].dates
	let children = "Ingen meldinger har blitt sendt enda."
	children = dates.map(
		( date ) => {
			return <MessageGroup key={ date.key } date={ date } />
		}
	)

	return(

		<section className="chat">
			<h2>Meldinger:</h2>
			{ children }
		</section>
	)
}
