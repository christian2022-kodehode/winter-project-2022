import { useState } from "react"

// Props:
// user={ user } state stringified object
// setMessages={ setMessages } state function
// messages={ messages } state stringified object
// channel={ channel } index numeral

export default function Compose( props ) {

	// Let React handle form field input
	const [messageField, setMessageField] = useState( "" )
	function updateMessageField( event ) {
		setMessageField( event.target.value )
	}

	// Process submitted channel
	function submitForm( event ) {

		event.preventDefault()

		// Parse object props
		const user = JSON.parse( props.user )
		const data = JSON.parse( props.messages )
		const channel = data[props.channel]


		// 1. Determine timezone
		// Some channels are split based on the timezone of target time
		let zoneLastKey = 0
		let zoneIndex = null
		let zoneName = channel.zone

		// Check if channel splits into local timezones
		if( channel.zone === "local" ) {

			zoneName = user.zone
		}

		// Find index of timezone, and last timezone key 
		for( let i = 0; i < channel.zones.length; i++ ) {

			// Check if index exists matching current timezone
			if( channel.zones[i].zone === zoneName ) {
				zoneIndex = i
			}

			// Check if key for current timezone is highest so far
			if( channel.zones[i].key > zoneLastKey ) {
				zoneLastKey = channel.zones[i].key
			}
		}

		// Create timezone entry if missing
		if( zoneIndex === null) {

			channel.zones.push (
				{
				"key": ++zoneLastKey,
				"zone": zoneName,
				"dates": []
				}
			)

			// Since timezone is added at end of array, we can predict its index
			zoneIndex = channel.zones.length -1
		}


		// 2. Determine date
		// Messages are grouped by array items for date posted
		const dateName = new Date().toDateString()
		let dateIndex = null
		let dateLastKey = 0
		
		if( channel.zones[zoneIndex].dates ) {
			for( let i = 0; i < channel.zones[zoneIndex].dates.length; i++ ) {

				// Check if index exists matching current date
				if( channel.zones[zoneIndex].dates[i].date === dateName) {

					dateIndex = i
				}

				// Check if key for current date is highest so far
				if (channel.zones[zoneIndex].dates[i].key > dateLastKey) {

					dateLastKey = channel.zones[zoneIndex].dates[i].key
				}
			}
		}

		// Create date entry if it does not exist
		if( dateIndex === null ) {

			channel.zones[zoneIndex].dates.unshift (
				{
				"key": ++dateLastKey,
				"date": dateName,
				"messages": []
				}
			)

			// Since date is added at start of array, we can predict its index
			dateIndex = 0
		}


		// 3. create new message
		// We'll need to check existing messages to prevent duplicate key use
		let messageLastKey = 0
		if ( channel.zones[zoneIndex].dates[dateIndex].messages.length > 0 ) {

			// Find key for new message
			for( let i = 0; i < channel.zones[zoneIndex].dates[dateIndex].messages.length; i++ ) {

				if( channel.zones[zoneIndex].dates[dateIndex].messages[i].key > messageLastKey ) {

					messageLastKey = channel.zones[zoneIndex].dates[dateIndex].messages[i].key
				}
			}
		}

		channel.zones[zoneIndex].dates[dateIndex].messages.unshift (
			{
			"key": ++messageLastKey,
			"time": new Date().toJSON(),
			"language": user.uiLanguage,
			"author": user.name,
			"body": messageField
			}
		)


		// 4. Update stored data and refresh React state
		// Update and store messages array
		data[props.channel] = channel
		localStorage.setItem( "messageData", JSON.stringify( data ) )

		// Clear textarea
		setMessageField( "" )

		// Refresh MessagesByDate
		props.setMessages( JSON.stringify( data ) )

		// Todo: close compose accordion
	}

	return(

		<div className="accordion accordion--primary accordion--fixed accordion--bottom accordion--compose">
			<input type="checkbox" name="trigger-compose" id="trigger-compose" className="accordion__trigger" />
			<label htmlFor="trigger-compose" className="accordion__toggle">
				<h2 className="accordion__header">
					Skrive en melding?
					<svg className="icon accordion__indicator">
						<title>Pil som indikerer utvidbart innhold</title>
						<use href="#symbol-singlechevron-up" />
					</svg>
				</h2>
			</label>
			<div className="accordion__container">
				<form onSubmit={ submitForm } className="accordion__content compose">
					<label htmlFor="message" className="invisible">Meldingstekst:</label>
					<textarea onChange={ updateMessageField } value={ messageField } name="message" id="message" placeholder="Hva tenker du på?" className="compose__textarea" />
					<div className="split">
						<div className="split__grow">{ messageField.length } / 250</div>
						<button className="split__shrink compose__submit">Send</button>
					</div>
				</form>
			</div>
		</div>
	)
}
