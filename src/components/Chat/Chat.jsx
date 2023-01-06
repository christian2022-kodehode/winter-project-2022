import Message from "../Message/Message"
import sample from "../../data/sample-messages.json"

const messages = sample[0].messages
console.log(messages)
export default function Chat () {
	const messageSelection = messages.map((message) => {
		console.log("returning", message.key)
		return <Message key={message.key} message={message} />
	})
	return (

	<section className="chat">

		<div className="chat__history">
			<p className="chat__grouping">14. Januar 2023</p>
			{messageSelection}

		</div>

	</section>

	)
}