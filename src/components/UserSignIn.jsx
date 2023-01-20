// This component displays and processes user sign-in form
// Props:
// setUser={ props.setUser } state function

import { useState } from "react"

export default function UserSignIn( props ) {

	// Let React manage field input
	const [fieldUsername, setFieldUsername] = useState( "" )
	function updateFieldUsername( event ) {
		setFieldUsername( event.target.value )
	}

	// Process submitted value
	function submitSignIn( event ) {

		event.preventDefault()

		// Prepare default user settings
		const defaultUser =
		{
		signedIn: true,
		name: null,
		darkmode: null,
		zone: "Europe/Oslo",
		locale: "no-NB",
		uiLanguage: "no-NB",
		chatLanguages:
			[
			"no-NB",
			"en-US"
			],
		theme: "default",
		activeChannel: "2024"
		}

		// Collect all users stored in localstorage
		let userData = []
		if( localStorage.getItem( "userData" ) ) {
			userData = JSON.parse( localStorage.getItem( "userData" ) )
		}

		// Look for index of stored user matching provided name
		let userIndex = null
		for( let i = 0; i < userData.length; i++ ) {

			if( userData[i].name === fieldUsername ) {

				userIndex = i
				break
			}
		}

		if( userIndex != null ) {

			// User already exists, update status and load settings
			userData[userIndex].signedIn = true
			props.setUser( JSON.stringify( userData[userIndex] ) )

		}
		else {

			// User does not exist, apply default settings
			defaultUser.name = fieldUsername
			userData.push( defaultUser )
			props.setUser( JSON.stringify( defaultUser ) )
		}

		// Update localstorage user data
		localStorage.setItem( "userData", JSON.stringify( userData ) )
		
		// Clear input field value
		setFieldUsername( "" )
	}

	// Output form markup
	return(

		<form onSubmit={ submitSignIn } className="accordion__content">
			<div className="split">
				<div className="split__grow">
					<label htmlFor="username" className="invisible">Brukernavn:</label>
					<input onChange={ updateFieldUsername } value={ fieldUsername } type="text" name="username" id="username" placeholder="Hvem er du?" />
				</div>
				<button className="split__shrink" disabled={ fieldUsername.length < 3 }>Logg inn</button>
			</div>
		</form>
	)
}
