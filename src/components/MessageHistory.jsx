import MessageGroup from "./MessageGroup"

export default function MessageHistory( props ) {

	// Props:
	// messages={ messages } stringified object state
	// channel={ channel } numeric index state
	// zone={ zone } numeric index state

	let children = "Ingen meldinger har blitt sendt enda."

	const channelData = JSON.parse( props.messages )[props.channel]

	if( channelData.zones && channelData.zones[props.zone].dates ) {

		const dates = JSON.parse( props.messages )[props.channel].zones[props.zone].dates
		children = dates.map(
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
