import { useState } from "react"

//JSX Components
import UserPanel		from "./UserPanel"
import Channels			from "./Channels"
import Compose			from "./Compose"
import CountdownTimer	from "./CountdownTimer"

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

	const channel = JSON.parse( props.messages )[props.channel]

	// Take provided time and adjust for user's time zone
	const offsetTime = ( new Date().getTimezoneOffset() * 1000 * 60 ) + Date.parse( channel.time )

	// Format target date into human readable string
	const dateOptions =
	{
	hour12: false,
	timeZone: "Europe/Oslo",
	weekday: "long",
	day: "numeric",
	month: "long",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit"
	}
	const target = new Date( offsetTime ).toLocaleTimeString( "no-NB", dateOptions )

	const channelId = 3

	const [user, setUser] = useState( findSignedInUser() )

	return(

		<main className="countdown">

			<UserPanel method={ setUser } user={ user } />

			<div className="countdown__current">
				<div className="container">
					<div className="countdown__label">
						<h1 className="countdown__tag">{ channel.name }</h1>
						<div className="countdown__description">{ channel.description }</div>
					</div>
					<div className="countdown__time">
						<h2 className="countdown__now">
							-<CountdownTimer target={ offsetTime } />
						</h2>
						<div className="countdown__target">{ target }</div>
					</div>
				</div>

				<Channels />

			</div>

			{ user.signedIn && <Compose method={ props.method } messages={ props.messages } channel={ props.channel } zone={ props.zone } /> }

		</main>
	)
}
