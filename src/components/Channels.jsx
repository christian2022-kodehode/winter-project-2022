// Props:
// setChannel={ setChannel } state function
// channel={ channel } numeric state
// messages={ messages } stringified object state

// import channels from "../data/messages.json"

// const user = { zone: "Europe/Oslo" }

export default function Channels( props ) {

	const channels = JSON.parse( props.messages )

	function switchChannel( event ) {

		event.preventDefault()

		for( let i = 0; i < channels.length; i++ ) {
			if( channels[i].name === event.target.innerText ) {

				props.setChannel(i)
				break
			}
		}
		return false
	}

	const children = channels.map(
		( tag ) => {
			return(
				<a
				key={ tag.key }
				href={ "#" + tag.name }
				title={ tag.description }
				className={ tag.name === channels[props.channel].name ? "tag tag--active" : "tag" }
				onClick={ switchChannel }
				>
					{ tag.name }
				</a>
			)
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
