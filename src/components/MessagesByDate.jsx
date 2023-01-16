import Message from "./Message"

export default function MessagesByDate (props) {

	const children = props.date.messages.map ((message) => {

		return <Message key={message.key} message={message} />
	})

	return (
	
		<div className="chat__grouping">
			<h3 className="chat__date">{props.date.date}</h3>
			{ children }
		</div>
	)
}
