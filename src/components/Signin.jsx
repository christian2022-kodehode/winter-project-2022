import { useState } from "react"

export default function Signin( props ) {

	const [fieldUsername, setFieldUsername] = useState( "" )
	function updateFieldUsername( event ) {
		setFieldUsername( event.target.value )
	}

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

		let userData = []

		// Collect all users stored in localstorage
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
			props.method( userData[userIndex] )

		}
		else {

			// User does not exist, apply default settings
			defaultUser.name = fieldUsername
			userData.push( defaultUser )
			props.method( defaultUser )
		}

		// Update localstorage user data
		localStorage.setItem( "userData", JSON.stringify( userData ) )
		setFieldUsername( "" )
	}


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

	function displayUserPanel() {
	
		if( props.user.signedIn ) {

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
		else {

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
	}

	return(

		<div className="accordion accordion--primary accordion--top accordion--signin">
			<input type="checkbox" name="trigger-signin" id="trigger-signin" className="accordion__trigger" />
			<div className="accordion__container">

			{ displayUserPanel() }

			</div>
			<label htmlFor="trigger-signin" className="accordion__toggle accordion__header accordion__header--invert">
				{ props.user.signedIn ? props.user.name : "Logg inn" }
				<svg className="icon accordion__indicator">
					<title>Pil som indikerer utvidbart innhold</title>
					<use href="#symbol-singlechevron-down" />
				</svg>
			</label>
		</div>
	)
}
