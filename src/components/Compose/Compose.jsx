import React from "react"

// Todo: load channel index from URL fragment or default
const channelIndex = 0

// Todo: load user or default settings from context
let user = null
if (localStorage.getItem ("userData")) {

	// User settings
	user = JSON.parse (localStorage.getItem ("userData"))
}
else {

	// defaults
	user = {
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

export default function Compose () {

	// Let React handle field input in realtime
	const [messageField, setMessageField] = React.useState ("")

	function submitForm (event) {

		event.preventDefault ()
		
		// Load existing message data from localStorage
		const data = JSON.parse (localStorage.getItem ("messageData"))
		// console.log("data", data)
		// Check if any message data exist in localStorage
		// if (localStorage.getItem ("messageData")) {

		// 	console.log("merging localStorage data with sample data",JSON.parse (localStorage.getItem ("messageData")), sample)
		// 	data = JSON.parse (localStorage.getItem ("messageData")).concat (sample)
		// }
		// else {

		// 	// Load some sample data
		// 	localStorage.setItem("messageData", JSON.stringify(sample))
		// }

		// let channelIndex = null
		let channelLastKey = null
		let zoneIndex = null
		let zoneLastKey = null
		let dateIndex = null
		let dateLastKey = null
		let messageLastKey = null

		for (let i = 0; i < data.length; i++) {
			// console.log(i,"comparing channels",data[i].channel, channel)
			// Find index of current channel, or potential key for new channel
			// if (data[i].channel === channel) {

			// 	channelIndex = i
			// }

			if (data[i].key > channelLastKey) {

				channelLastKey = data[i].key
			}
			console.log(i,"channellastkey", channelLastKey)
		}
		console.log("channelIndex", channelIndex)
		if (channelIndex != null) {
			// console.log("channel was found", channelIndex)
			// Find index of current time zone, or potential key for a new one
			for (let i = 0; i < data[channelIndex].zones.length; i++) {
				if (data[channelIndex].zones[i].zone === user.zone) {

					zoneIndex = i
				}

				if (data[channelIndex].zones[i].key > zoneLastKey) {

					zoneLastKey = data[channelIndex].zones[i].key
				}
			}
		}
		// else {
		// 	console.log("creating new channel",channelLastKey+1)
		// 	// Create new channel in object
		// 	data.push (
		// 		{
		// 		"key": ++channelLastKey,
		// 		"channel": channel,
		// 		"zones": []
		// 		}
		// 	)

		// 	channelIndex = data.length -1
		// }

		if (zoneIndex != null) {
			console.log("zone was found", zoneIndex)
			// Find index of current date, or potential key for new date
			for (let i = 0; i < data[channelIndex].zones[zoneIndex].dates.length; i++) {

				if (data[channelIndex].zones[zoneIndex].dates[i].date === new Date().toDateString()) {

					dateIndex = i
				}

				if (data[channelIndex].zones[zoneIndex].dates[i].key > dateLastKey) {

					dateLastKey = data[channelIndex].zones[zoneIndex].dates[i].key
				}
			}
		}
		else {
			console.log("adding new zone to data", zoneLastKey+1)
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
			// console.log("date was found", dateIndex)
			// Find key for new message
			for (let i = 0; i < data[channelIndex].zones[zoneIndex].dates[dateIndex].messages.length; i++) {

				if (data[channelIndex].zones[zoneIndex].dates[dateIndex].messages[i].key > messageLastKey) {

					messageLastKey = data[channelIndex].zones[zoneIndex].dates[dateIndex].messages[i].key
				}
			}
		}
		else {
			console.log("adding new date to data",dateLastKey+1)
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

		console.log("adding new message to data",messageLastKey+1)
		data[channelIndex].zones[zoneIndex].dates[dateIndex].messages.unshift (
			{
			"key": ++messageLastKey,
			"time": new Date().toJSON(),
			"lang": user.lang,
			"author": user.name,
			"body": messageField
			}
		)

		console.log("storing data in localstorage", data)
		localStorage.setItem("messageData", JSON.stringify(data))

		// Clear textarea
		setMessageField("")

		// Refresh MessagesByDate
		// setMessages("lol")
	}

	function updateMessageField(event) {
		setMessageField(event.target.value)
	}

	return (

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
				<form onSubmit={submitForm} className="accordion__content compose">
					<label htmlFor="message" className="invisible">Meldingstekst:</label>
					<textarea onChange={updateMessageField} value={messageField} name="message" id="message" placeholder="Hva tenker du på?" className="compose__textarea" />
					<div className="split">
						<div className="split__grow">0 / 250</div>
						<button className="split__shrink compose__submit">Send</button>
					</div>
				</form>
			</div>
		</div>

	)
}
