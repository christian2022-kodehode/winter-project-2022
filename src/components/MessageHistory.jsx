// import { useState }			from "react"
import MessagesByDate		from "./MessagesByDate"
// import MessageGroupState	from "../contexts/MessageGroupState"



export default function MessageHistory (props) {


	// Todo: create logic for determining if channel should be fragmented based on time zone
	// e.g. countdown to new years should be local to each time zone
	// countdown to a global event should not be fragmented

	// Load channel message groups (dates) from localStorage
	// const dates = JSON.parse (localStorage.getItem ("messageData"))[channelIndex].zones[zoneIndex].dates
	// setMessages(dates)

	const children = JSON.parse (props.messages)[props.channel].zones[props.zone].dates.map ((date) => {

		return <MessagesByDate key={date.key} date={date} />
	})

	return (

		<section className="chat">
			<h2>Meldinger:</h2>
			{ children }
		</section>
	)
}
