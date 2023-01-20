import { useState } from "react"

// Props:
// user={ user } state stringified object
// setMessages={ setMessages } state function
// messages={ messages } state stringified object
// channel={ channel } index numeral
// zone={ zone } index numeral

export default function Compose( props ) {

	// Let React handle form field input
	const [messageField, setMessageField] = useState( "" )
	function updateMessageField( event ) {
		setMessageField( event.target.value )
	}

	// Process submitted data
	function submitForm( event ) {

		event.preventDefault()

		let channelLastKey = null
		let zoneLastKey = null
		let dateIndex = null
		let dateLastKey = null
		let messageLastKey = null

		const data = JSON.parse( props.messages )
		const user = JSON.parse( props.user )

		for( let i = 0; i < data.length; i++ ) {

			if( data[i].key > channelLastKey ) {

				channelLastKey = data[i].key
			}
		}

		if( props.channel != null ) {

			// Find index of current time zone, or potential key for a new one
			for( let i = 0; i < data[props.channel].zones.length; i++ ) {

				if( data[props.channel].zones[i].zone === user.zone ) {
					props.zone = i
				}

				if( data[props.channel].zones[i].key > zoneLastKey ) {
					zoneLastKey = data[props.channel].zones[i].key
				}
			}
		}

		if( props.zone != null ) {

			// Find index of current date, or potential key for new date
			for( let i = 0; i < data[props.channel].zones[props.zone].dates.length; i++ ) {

				if( data[props.channel].zones[props.zone].dates[i].date === new Date().toDateString()) {

					dateIndex = i
				}

				if (data[props.channel].zones[props.zone].dates[i].key > dateLastKey) {

					dateLastKey = data[props.channel].zones[props.zone].dates[i].key
				}
			}
		}
		else {

			// Create new zone in object
			data[props.channel].zones.push (
				{
				"key": ++zoneLastKey,
				"zone": user.zone,
				"dates": []
				}
			)

			props.zone = data[props.channel].zones.length -1
		}

		if (dateIndex != null) {

			// Find key for new message
			for( let i = 0; i < data[props.channel].zones[props.zone].dates[dateIndex].messages.length; i++ ) {

				if( data[props.channel].zones[props.zone].dates[dateIndex].messages[i].key > messageLastKey ) {

					messageLastKey = data[props.channel].zones[props.zone].dates[dateIndex].messages[i].key
				}
			}
		}
		else {

			// Create new object for current date
			data[props.channel].zones[props.zone].dates.unshift (
				{
				"key": ++dateLastKey,
				"date": new Date().toDateString(),
				"messages": []
				}
			)

			dateIndex = 0
		}

		data[props.channel].zones[props.zone].dates[dateIndex].messages.unshift (
			{
			"key": ++messageLastKey,
			"time": new Date().toJSON(),
			"language": user.uiLanguage,
			"author": user.name,
			"body": messageField
			}
		)

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
