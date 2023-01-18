import channels from "../data/messages.json"

const user = { zone: "Europe/Oslo" }

export default function Channels() {

	const children = channels.map(
		( channel ) => {
			if( channel.zone === "local"
			|| channel.zone === user.zone
			|| channel.zone === "UTC" ) {
				return(
					<a
					key={ channel.key }
					href={ "#" + channel.name }
					title={ channel.description }
					className="tag" >
						{ channel.name }
					</a>
				)
			}
		}
	)

	return(

		<div className="accordion accordion--channels">
			<input type="checkbox" name="trigger-channels" id="trigger-channels" className="accordion__trigger" />
			<label htmlFor="trigger-channels" className="accordion__toggle">
				<p className="accordion__header">
					Vis alle nedtellinger
					<svg className="icon accordion__indicator">
						<title>Pil som indikerer utvidbart innhold</title>
						<use href="#symbol-singlechevron-down" />
					</svg>
				</p>
			</label>
			<div className="accordion__container">
				<div className="accordion__content countdown__channels">
					{ children }
				</div>
			</div>
		</div>
	)
}
