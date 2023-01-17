//JSX Components
import Signin from "./Signin"
import Channels from "./Channels"
import Compose from "./Compose"
import Timer from "./Timer"

import channel from "../data/channels.json"
const channelId = 3

export default function Countdown( props ) {
	return(

		<main className="countdown">

			<Signin />

			<div className="countdown__current">

				<Timer channel={ channel[channelId] } />

				<Channels />

			</div>

			<Compose method={ props.method } messages={ props.messages } channel={ props.channel } zone={ props.zone } />

		</main>
	)
}
