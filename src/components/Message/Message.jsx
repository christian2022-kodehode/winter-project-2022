export default function Message (props) {
	return (

		<div className="message">
			<p className="message__text">{props.message.body}</p>
			<div className="message__byline">
				<p className="message__timestamp">{props.message.time}</p>
				<p className="message__author">{props.message.author}</p>
			</div>
		</div>

	)
}