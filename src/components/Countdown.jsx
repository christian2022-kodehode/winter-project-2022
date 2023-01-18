import { useContext } from "react"

//JSX Components
import Signin from "./Signin"
import Channels from "./Channels"
import Compose from "./Compose"
import Timer from "./Timer"

import User from "../contexts/User"
import channel from "../data/channels.json"

export default function Countdown( props ) {

	const channelId = 3

	const user = useContext(User)

	function displayCompose() {
		if( user.signedIn ) {
			return(
				<Compose method={ props.method } messages={ props.messages } channel={ props.channel } zone={ props.zone } />
			)
		}
	}

	return(

		<main className="countdown">

			<Signin />

			<div className="countdown__current">

				<Timer channel={ channel[channelId] } />

				<Channels />

			</div>

			{ displayCompose() }

		</main>
	)
}
