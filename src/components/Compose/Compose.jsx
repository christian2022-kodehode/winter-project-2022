import React from "react"

const user = JSON.parse (localStorage.getItem ("userData"))
// placeholder values
const channel = "jul2023"

export default function Compose () {

	const [message, setMessage] = React.useState ("")

	function submitForm (event) {

		event.preventDefault ()

		let data = []
		let channelKey = null
		let dateKey = null
		let messageKey = null

		// Check if any message data exist in localStorage
		if (localStorage.getItem ("messageData")) {

			data = JSON.parse (localStorage.getItem ("messageData"))

			// Check if object for current channel exists
			for (let channelIndex = 0; channelIndex < data.length; channelIndex++) {
				if (data[channelIndex].channel === channel) channelKey = data[channelIndex].key
			}

			if (data[channelKey -1]) {

				// Check if object for current date exists
				for (let dateIndex = 0; dateIndex < data[channelKey -1].dates.length; dateIndex++) {
					if (data[channelKey -1].dates[dateIndex].date === new Date().toDateString()) dateKey = data[channelKey -1].dates[dateIndex].key
				}
			}
		}

		if (channelKey === null) {

			// Create new channel in object
			channelKey = data.length +1

			data.push (
				{
				"key": channelKey,
				"channel": channel,
				"zone": user.zone,
				"dates": []
				}
			)
		}

		if (dateKey === null) {

			dateKey = data[channelKey -1].dates.length +1

			// Create new object for current date
			data[channelKey -1].dates.push (
				{
				"key": dateKey,
				"date": new Date().toDateString(),
				"zone": user.zone,
				"messages": []
				}
			)
		}

		if (data[channelKey -1].dates[dateKey -1].messages.length > 0) {

			messageKey = data[channelKey -1].dates[dateKey -1].messages.length +1
		}
		else {

			messageKey = 1
		}

		data[channelKey -1].dates[dateKey -1].messages.push (
			{
			"key": messageKey,
			"time": new Date().toJSON(),
			"zone": user.zone,
			"lang": user.lang,
			"author": user.name,
			"body": message
			}
		)

		localStorage.setItem("messageData", JSON.stringify(data))

		// Clear textarea
		setMessage("")
	}

	function updateMessage(event) {
		setMessage(event.target.value)
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
					<textarea onChange={updateMessage} value={message} name="message" id="message" placeholder="Hva tenker du på?" className="compose__textarea" />
					<div className="split">
						<div className="split__grow">0 / 250</div>
						<button className="split__shrink compose__submit">Send</button>
					</div>
				</form>
			</div>
		</div>

	)
}
