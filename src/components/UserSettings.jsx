import { useState } from "react"

// This file is a work in progress

export default function UserSettings( props ) {
	function submitChangeSettings( event ) {

		event.preventDefault()
	}

	function submitSignOut( event ) {

		event.preventDefault()

		let userData = null

		if( localStorage.getItem( "userData" ) ) {
			userData = JSON.parse( localStorage.getItem( "userData" ) )
		}

		for( let i = 0; i < userData.length; i++ ) {
			if( userData[i].name === props.user.name ) {
				
				userData[i].signedIn = false
			}
		}

		props.method({})

		localStorage.setItem( "userData", JSON.stringify( userData ) )
	}

	return(

		<div className="accordion__content">

			<form onSubmit={ submitChangeSettings }>
				
				<h3>Innlogget som { props.user.name }</h3>
				<label htmlFor="darkmode" >
					Mørk modus
					<input type="checkbox" name="darkmode" id="darkmode" />
				</label>

				<label htmlFor="timezone" >Tidssone</label>
				<select name="timezone" id="timezone" defaultValue={"Europe/Oslo"}>
					<option value="UTC">UTC</option>
					<option value="Europe/Oslo">Oslo</option>
				</select>

				<button>OK</button>

			</form>

			{/* <ul>
				<li>Username: { user.name }</li>
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
