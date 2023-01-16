//JSX Components
import Signin from "./Signin"
import Channels from "./Channels"
import Compose from "./Compose"

export default function Countdown (props) {
	return (

		<main className="countdown">

			<Signin />

			<div className="countdown__current">
				<div className="container">
					<div className="countdown__label">
						<h1 className="countdown__tag">2024</h1>
						<div className="countdown__description">Godt nytt år!</div>
					</div>
					<div className="countdown__time">
						<h2 className="countdown__now">-000 : 00 : 00 : 00.000</h2>
						<div className="countdown__target">1. Januar 2024 - kl. 00:00 CET</div>
					</div>
				</div>

				<Channels />

			</div>

			<Compose method={props.method} messages={props.messages} channel={props.channel} zone={props.zone} />

		</main>

	)
}
