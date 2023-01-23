import MessageGroup from "./MessageGroup"

export default function MessageHistory( props ) {

	// Props:
	// messages={ messages } stringified object state
	// channel={ channel } numeric index state
	// zone={ zone } numeric index state

	const channelData = JSON.parse( props.messages )[props.channel]

	// Check if channel has any message groups (dates)
	let children = "Ingen meldinger har blitt sendt enda."
	if( channelData.zones[props.zone] && channelData.zones[props.zone].dates ) {

		children = channelData.zones[props.zone].dates.map(
			( date ) => {
				return <MessageGroup key={ date.key } date={ date } />
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
