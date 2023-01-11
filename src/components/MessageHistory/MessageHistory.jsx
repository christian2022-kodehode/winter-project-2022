import MessagesByDate from "../MessagesByDate/MessagesByDate"
import sample from "../../data/jul2023.json"

//todo: combine sample json with localstorage messages
const dates = sample.concat(JSON.parse (localStorage.getItem ("messageData"))[0].dates)
console.log("dates", dates)
// console.log("localstorage",JSON.parse (localStorage.getItem ("messageData"))[0].dates)

export default function MessageHistory () {

	const children = dates.map((date) => {

		return <MessagesByDate key={date.key} date={date} />
	})

	return (

		<section className="chat">
			<h2>Meldinger:</h2>
			{children}
		</section>
	)
}
