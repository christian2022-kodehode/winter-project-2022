import Message from "./Message"

export default function MessagesByDate (props) {

	const children = props.date.messages.map ((message) => {

		return <Message key={message.key} message={message} />
	})

	const options = {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}

	const date = new Date(props.date.date).toLocaleDateString("no-NB", options)

	return (
	
		<div className="chat__grouping">
			<h3 className="chat__date">{ date }</h3>
			{ children }
		</div>
	)
}
