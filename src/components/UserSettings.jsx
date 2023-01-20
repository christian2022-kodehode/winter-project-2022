// This file is a work in progress

// Props:
// setUser={ props.setUser } state function
// user={ props.user } stringified object state

import { useState } from "react"

export default function UserSettings( props ) {

	const username = JSON.parse( props.user ).name
	const userData = JSON.parse( localStorage.getItem( "userData" ) )

	function submitChangeSettings( event ) {

		event.preventDefault()

		// Some magic will happen here
	}

	function submitSignOut( event ) {

		event.preventDefault()

		for( let i = 0; i < userData.length; i++ ) {
			if( userData[i].name === username ) {
				
				userData[i].signedIn = false
			}
		}

		localStorage.setItem( "userData", JSON.stringify( userData ) )
		props.setUser(false)
	}

	return(

		<div className="accordion__content">

			<form onSubmit={ submitChangeSettings }>
				
				<h3>{ username }</h3>
				<label htmlFor="darkmode" >Mørk modus</label>
				<select name="darkmode" id="darkmode" defaultValue={"auto"}>
					<option value="auto">Automatisk</option>
					<option value="always">Alltid</option>
					<option value="never">Aldrig</option>
				</select>

				<label htmlFor="timezone" >Tidssone</label>
				<select name="timezone" id="timezone" defaultValue={"Europe/Oslo"}>
					<option value="UTC">UTC</option>
					<option value="Europe/Oslo">Oslo</option>
				</select>

				<button>Lagre innstillinger</button>

			</form>

			{/* <ul>
				<li>username: { user.name }</li>
				<li>Dark mode: { user.darkmode }</li>
				<li>Timezone: { user.zone }</li>
				<li>Locale: { user.locale }</li>
				<li>UI Language: { user.uiLanguage }</li>
				<li>Show chat in languages: { user.chatLanguages }</li>
				<li>Theme: { user.theme }</li>
				<li>Active Channel: { user.activeChannel }</li>
			</ul> */}

			<form onSubmit={ submitSignOut }>
				<button>Logg ut</button>
			</form>

		</div>
	)
}
