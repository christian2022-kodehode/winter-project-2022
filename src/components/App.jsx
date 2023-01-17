import { useState } from "react"

// JSX Components
import Countdown		from "./Countdown"
import MessageHistory	from "./MessageHistory"
import Jump				from "./Jump"
import SymbolLibrary	from "./SymbolLibrary"

// Inject some sample data if there are no messages in localstorage
import sample from "../data/messages.json"
if( !localStorage.getItem( "messageData" ) ) {
	localStorage.setItem( "messageData", JSON.stringify( sample ) )
}

// Todo: load active channel / timezone from URL fragment / usersettings, or default
const channelIndex = 0
const zoneIndex = 0

export default function App() {

	const [messages, setMessages]	= useState( localStorage.getItem ( "messageData" ) )
	const [channel, setChannel]		= useState( channelIndex )
	const [zone, setZone]			= useState( zoneIndex )

	return(

		<>
			<Countdown method={ setMessages } messages={ messages } channel={ channel } zone={ zone } />
			<MessageHistory messages={ messages } channel={ channel } zone={ zone } />
			<Jump />
			<SymbolLibrary />
		</>
	)
}
