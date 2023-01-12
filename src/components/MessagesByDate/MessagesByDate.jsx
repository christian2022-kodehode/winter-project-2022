import Message from "../Message/Message"
import React from "react"

export default function MessagesByDate (props) {

	const [messages, setMessages] = React.useState (props.date.messages)

	const children = messages.map((message) => {

		return <Message key={message.key} message={message} />
	})

	function submitForm (event) {
		console.log("hello world")
	}

	return (
	
		<div className="chat__grouping">
			<h3 className="chat__date">{props.date.date}</h3>
			{children}
		</div>
	)
}