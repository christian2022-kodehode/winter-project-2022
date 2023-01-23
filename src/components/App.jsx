import { useState }		from "react"

// JSX Components
import UserPanel		from "./UserPanel"
import Countdown		from "./Countdown"
import Channels			from "./Channels"
import Compose			from "./Compose"
import MessageHistory	from "./MessageHistory"
import Jump				from "./Jump"
import SymbolLibrary	from "./SymbolLibrary"

import sample			from "../data/messages.json"

export default function App() {

	// Inject some sample data if there are no messages in localstorage
	if( !localStorage.getItem( "messageData" ) ) {
		localStorage.setItem( "messageData", JSON.stringify( sample ) )
	}

	// Check if there are any user settings
	let userData = {}
	if( localStorage.getItem( "userData" ) ) {
		userData = JSON.parse( localStorage.getItem( "userData" ) )
	}
	// Todo: load active channel / timezone from URL fragment / usersettings, or default
	const channelIndex = 3
	const zoneIndex = 0

	// Check if user is signed in
	function findSignedInUser(arr) {
		for( let i = 0; i < arr.length; i++ ) {
			if( arr[i].signedIn === true ) {
				
				return JSON.stringify( arr[i] )
			}
		}

		return false
	}

	const [messages, setMessages]	= useState( localStorage.getItem( "messageData" ) )
	const [channel, setChannel]		= useState( channelIndex )
	const [zone, setZone]			= useState( zoneIndex )
	const [user, setUser]			= useState( findSignedInUser( userData ) )

	return(

		<>

			<main className="countdown">
				<UserPanel setUser={ setUser } user={ user } setZone={ setZone } />
				<div className="countdown__current">

					<Countdown messages={ messages } channel={ channel } zone={ zone } />
					<Channels setChannel={ setChannel } channel={ channel } messages={ messages } />

				</div>
				{ JSON.parse( user ).signedIn && <Compose user={ user } setMessages={ setMessages } messages={ messages } channel={ channel } /> }
			</main>
			<MessageHistory messages={ messages } channel={ channel } zone={ zone } />
			<Jump />
			<SymbolLibrary />

		</>
	)
}
