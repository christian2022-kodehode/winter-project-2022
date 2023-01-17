import { useState } from "react"

export default function Compose( props ) {

	const [messageField, setMessageField] = useState( "" )

	function updateMessageField( event ) {

		setMessageField( event.target.value )
	}

	function submitForm( event ) {

		event.preventDefault()

		// Todo: load channel index from URL fragment or default
		const channelIndex = props.channel

		let channelLastKey = null
		let zoneIndex = props.zone
		let zoneLastKey = null
		let dateIndex = null
		let dateLastKey = null
		let messageLastKey = null

		// Todo: load user object from context or default
		let user = null
		if( localStorage.getItem( "userData" ) ) {

			// User settings
			user = JSON.parse( localStorage.getItem( "userData" ) )
		}
		else {

			// defaults
			user =
			{
			name: "Brukernavn",
			darkmode: false,
			zone: "cet",
			lang: "nb",
			displayMessageLang:
				[
				"nb",
				"en"
				],
			theme: "default"
			}
		}
		
		// Load existing message data from localStorage
		const data = JSON.parse( localStorage.getItem( "messageData" ) )

		for( let i = 0; i < data.length; i++ ) {

			if( data[i].key > channelLastKey ) {

				channelLastKey = data[i].key
			}
		}

		if( channelIndex != null ) {

			// Find index of current time zone, or potential key for a new one
			for( let i = 0; i < data[channelIndex].zones.length; i++ ) {

				if( data[channelIndex].zones[i].zone === user.zone ) {
					zoneIndex = i
				}

				if( data[channelIndex].zones[i].key > zoneLastKey ) {
					zoneLastKey = data[channelIndex].zones[i].key
				}
			}
		}

		if( zoneIndex != null ) {

			// Find index of current date, or potential key for new date
			for( let i = 0; i < data[channelIndex].zones[zoneIndex].dates.length; i++ ) {

				if( data[channelIndex].zones[zoneIndex].dates[i].date === new Date().toDateString()) {

					dateIndex = i
				}

				if (data[channelIndex].zones[zoneIndex].dates[i].key > dateLastKey) {

					dateLastKey = data[channelIndex].zones[zoneIndex].dates[i].key
				}
			}
		}
		else {

			// Create new zone in object
			data[channelIndex].zones.push (
				{
				"key": ++zoneLastKey,
				"zone": user.zone,
				"dates": []
				}
			)

			zoneIndex = data[channelIndex].zones.length -1
		}

		if (dateIndex != null) {

			// Find key for new message
			for( let i = 0; i < data[channelIndex].zones[zoneIndex].dates[dateIndex].messages.length; i++ ) {

				if( data[channelIndex].zones[zoneIndex].dates[dateIndex].messages[i].key > messageLastKey ) {

					messageLastKey = data[channelIndex].zones[zoneIndex].dates[dateIndex].messages[i].key
				}
			}
		}
		else {

			// Create new object for current date
			data[channelIndex].zones[zoneIndex].dates.unshift (
				{
				"key": ++dateLastKey,
				"date": new Date().toDateString(),
				"messages": []
				}
			)

			dateIndex = 0
		}

		data[channelIndex].zones[zoneIndex].dates[dateIndex].messages.unshift (
			{
			"key": ++messageLastKey,
			"time": new Date().toJSON(),
			"lang": user.lang,
			"author": user.name,
			"body": messageField
			}
		)

		localStorage.setItem( "messageData", JSON.stringify( data ) )

		// Clear textarea
		setMessageField( "" )

		// Refresh MessagesByDate
		props.method( JSON.stringify( data ) )
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
