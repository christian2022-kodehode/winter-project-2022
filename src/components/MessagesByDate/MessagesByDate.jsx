import Message from "../Message/Message"

export default function MessagesByDate (props) {
console.log("MessagesByDate props", props.props)
	const messages = props.props.messages.map((message) => {

		return <Message key={message.key} message={message} />
	})

	return (
	
		<div className="chat__grouping">
			<h3 className="chat__date">{props.props.date}</h3>
			{messages}
		</div>
	)
}