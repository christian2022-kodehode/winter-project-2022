import MessagesByDate from "../MessagesByDate/MessagesByDate"
import sample from "../../data/messages.json"

// Inject some sample data if there are no messages in localstorage
if (!localStorage.getItem ("messageData")) {

	localStorage.setItem("messageData", JSON.stringify(sample))
}

// Todo: load active channel / timezone from URL fragment / usersettings, or default
const channelIndex = 0
const zoneIndex = 0

// Todo: create logic for determining if channel should be fragmented based on time zone
// e.g. countdown to new years should be local to each time zone
// countdown to a global event should not be fragmented

// Load channel message groups (dates) from localStorage
const dates = JSON.parse (localStorage.getItem ("messageData"))[channelIndex].zones[zoneIndex].dates

export default function MessageHistory (props) {

	const children = dates.map ((date) => {

		return <MessagesByDate key={date.key} date={date} methods={props.methods} />
	})

	return (

		<section className="chat">
			<h2>Meldinger:</h2>
			{children}
		</section>
	)
}
