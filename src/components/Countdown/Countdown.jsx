import Signin from "../Signin/Signin"
import Channels from "../Channels/Channels"
import Compose from "../Compose/Compose"

export default function Countdown () {
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

		<Compose />

	</main>


	)
}