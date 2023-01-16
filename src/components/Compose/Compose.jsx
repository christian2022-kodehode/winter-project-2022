import React from "react"

export default function Compose (props) {
console.log("compose props", props)

	function updateMessageField(event) {
		props.methods.setMessageField(event.target.value)
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
				<form onSubmit={props.methods.submitForm} className="accordion__content compose">
					<label htmlFor="message" className="invisible">Meldingstekst:</label>
					<textarea onChange={updateMessageField} value={props.values.messageField} name="message" id="message" placeholder="Hva tenker du på?" className="compose__textarea" />
					<div className="split">
						<div className="split__grow">0 / 250</div>
						<button className="split__shrink compose__submit">Send</button>
					</div>
				</form>
			</div>
		</div>

	)
}
