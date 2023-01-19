import { useState, useContext } from "react"
import channel from "../data/channels.json"

//JSX Components
import Signin from "./Signin"
import Channels from "./Channels"
import Compose from "./Compose"
import Timer from "./Timer"

let userData = {}
if( localStorage.getItem( "userData" ) ) {
	userData = JSON.parse( localStorage.getItem( "userData" ) )
}

function findSignedInUser() {
	for( let i = 0; i < userData.length; i++ ) {
		if( userData[i].signedIn === true ) {
			
			return userData[i]
		}
	}

	return false
}


export default function Countdown( props ) {

	const channelId = 3

	const [user, setUser] = useState( findSignedInUser() )

	return(

		<main className="countdown">

			<Signin method={ setUser } user={ user } />

			<div className="countdown__current">

				<Timer channel={ channel[channelId] } />

				<Channels />

			</div>

			{ user.signedIn && <Compose method={ props.method } messages={ props.messages } channel={ props.channel } zone={ props.zone } /> }

		</main>
	)
}
