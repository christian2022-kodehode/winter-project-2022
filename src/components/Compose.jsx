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

	// Process submitted channel
	function submitForm( event ) {

		event.preventDefault()

		// let channelLastKey = null // unsure if needed

		// Parse object props
		const user = JSON.parse( props.user )
		const data = JSON.parse( props.messages )
		const channel = data[props.channel]

		// Unsre if key of last channel is needed
		// for( let i = 0; i < channel.length; i++ ) {

		// 	if( channel[i].key > channelLastKey ) {

		// 		channelLastKey = channel[i].key
		// 	}
		// }
		// console.log("channel",channel)
		


		// console.log("checking channel.zones",channel.zones)
		// const channelIndex = props.channel
		let zoneLastKey = 0
		let zoneIndex = null
		let zoneName = channel.zone

		// Check if this channel is split into user-specific time zones
		if( channel.zone === "local" ) {

			zoneName = user.zone
		}

		// Find highest message key and index of user time zone
		for( let i = 0; i < channel.zones.length; i++ ) {

			if( channel.zones[i].zone === zoneName ) {
				zoneIndex = i
			}

			if( channel.zones[i].key > zoneLastKey ) {
				zoneLastKey = channel.zones[i].key
			}
		}

		// Create zone entry if it does not exist
		if( zoneIndex === null) {

			channel.zones.push (
				{
				"key": ++zoneLastKey,
				"zone": zoneName,
				"dates": []
				}
			)

			// Since zone is added at end of array, we can predict its index
			zoneIndex = channel.zones.length -1
		}
		// }
		// else {

		// 	// Create new zone array
		// 	channel.zones =
		// 	[
		// 	{
		// 	"key": 1,
		// 	"zone": user.zone,
		// 	"dates": []
		// 	}
		// 	]

		// 	zoneIndex = 0 // channel.zones.length -1
		// }

		// console.log("checking channel.zones[zoneIndex]",channel.zones[zoneIndex])
		const dateName = new Date().toDateString()
		let dateIndex = null
		let dateLastKey = 0
		
		// Check if dates array exists for this time zone
		if( channel.zones[zoneIndex].dates ) {

			// Find index of current date, or potential key for new date
			for( let i = 0; i < channel.zones[zoneIndex].dates.length; i++ ) {

				if( channel.zones[zoneIndex].dates[i].date === dateName) {

					dateIndex = i
				}

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
		// else {

		// 	// Create new object for current date
		// 	channel.zones[zoneIndex].dates =
		// 	[
		// 	{
		// 	"key": 1,
		// 	"date": new Date().toDateString(),
		// 	"messages": []
		// 	}
		// 	]

		// 	// dateIndex = 0
		// }

		// console.log("checking channel.zones[zoneIndex].dates[dateIndex].messages",channel.zones[zoneIndex].dates[dateIndex].messages)
		let messageLastKey = 0
		if ( channel.zones[zoneIndex].dates[dateIndex].messages.length > 0 ) {

			// Find key for new message
			for( let i = 0; i < channel.zones[zoneIndex].dates[dateIndex].messages.length; i++ ) {

				if( channel.zones[zoneIndex].dates[dateIndex].messages[i].key > messageLastKey ) {

					messageLastKey = channel.zones[zoneIndex].dates[dateIndex].messages[i].key
				}
			}
		}
		// console.log("key before", messageLastKey)
		channel.zones[zoneIndex].dates[dateIndex].messages.unshift (
			{
			"key": ++messageLastKey,
			"time": new Date().toJSON(),
			"language": user.uiLanguage,
			"author": user.name,
			"body": messageField
			}
		)
		// console.log("key after", messageLastKey)

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
