import { useState } from "react"

export default function Signin () {

	const [username, setUsername] = useState ("")
	const [displayname, setDisplayname] = useState ("Logg inn")

	let user = null

	if (localStorage.getItem ("userData")) {

		user = JSON.parse (localStorage.getItem ("userData"))
		// setDisplayname(user.name)
	}


	// Placeholder data
	const userData = {
		name: username,
		darkmode: false,
		zone: "cet",
		lang: "nb",
		displayMessageLang:
			[
			"nb",
			"en"
			],
		theme: "default"
	}

	function submitForm (event) {
		event.preventDefault ()
		localStorage.setItem ("userData", JSON.stringify (userData))
		console.log("userData", JSON.parse (localStorage.getItem ("userData")))
		setDisplayname(userData.name)
	}

	function updateUsername (event) {
		setUsername(event.target.value)
	}

	return (

		<div className="accordion accordion--primary accordion--top accordion--signin">
			<input type="checkbox" name="trigger-signin" id="trigger-signin" className="accordion__trigger" />
			<div className="accordion__container">
				<form onSubmit={submitForm} className="accordion__content">
					<div className="split">
						<div className="split__grow">
							<label htmlFor="username" className="invisible">Brukernavn:</label>
							<input onChange={updateUsername} value={username} type="text" name="username" id="username" placeholder="Hvem er du?" />
						</div>
						<button className="split__shrink">Logg inn</button>
					</div>
				</form>
			</div>
			<label htmlFor="trigger-signin" className="accordion__toggle accordion__header accordion__header--invert">
				{displayname}
				<svg className="icon accordion__indicator">
					<title>Pil som indikerer utvidbart innhold</title>
					<use href="#symbol-singlechevron-down" />
				</svg>
			</label>
		</div>

	)
}
