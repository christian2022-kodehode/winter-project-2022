import MessagesByDate from "../MessagesByDate/MessagesByDate"
import sample from "../../data/jul2023.json"

//todo: combine sample json with localstorage messages
const dates = sample

export default function MessageHistory () {

	const history = dates.map((date) => {

		return <MessagesByDate key={date.key} props={date} />
	})

	return (

		<section className="chat">
			<h2>Meldinger:</h2>
			{history}
		</section>
	)
}