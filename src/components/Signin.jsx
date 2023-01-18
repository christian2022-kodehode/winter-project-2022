import { useState, useContext } from "react"

// import User from "../contexts/User"

export default function Signin() {

	const [fieldUsername, setFieldUsername] = useState( "" )

	const defaultUser =
	{
	signedIn: false,
	name: "",
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

	const [userInfo, setUserInfo] = useState( defaultUser )

	// const [isSignedIn, setSignedIn] = useState( false )
	// let user = null //useContext(User)

	let userData = []

	if( localStorage.getItem( "userData" ) ) {
		userData = JSON.parse( localStorage.getItem( "userData" ) )
		console.log("imported userData from localstorage", userData)
	}

	// Look for stored settings of user with submitted name
	function findUserInfo( arr, property ) {
		for( let i = 0; i > arr.length; i++ ) {
			if( arr[i][property] === fieldUsername ) {
				
				// Return array index if match was found
				return i
			}
		}

		// Return false if nothing was found
		return false
	}

	// Since this app is based on localstorage, we end up doing silly things
	const signedInUser = findUserInfo( userData, "signedIn" )

	if( signedInUser ) {

		// setSignedIn( true )
		setUserInfo = userData[signedInUser]
		console.log("user does exist", signedInUser, userData)
	}
	else {

		console.log("user does not exist",signedInUser, userData)
	}

	// const [userInfo, setUserInfo] = useState( user )
	// const [displayname, setDisplayname] = useState( userInfo.signedIn ? userInfo.name : "Logg inn" )

	// Todo: useffect that updates context when localstorage changes?

	// if( localStorage.getItem( "userData" ) ) {
	// 	// Collect all stored userData
	// 	userData = JSON.parse( localStorage.getItem( "userData" ) )
	// }
	// else

	// const userIndex = findUserInfo( userData, name )

	function displayUserPanel() {
	
		if( userInfo.signedIn ) {

			return(

				<div className="accordion__content">

					<form onSubmit={ submitChangeSettings }>
						
						<h3>Innlogget som { userInfo.name }</h3>
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

				<form onSubmit={ submitSignin } className="accordion__content">
					<div className="split">
						<div className="split__grow">
							<label htmlFor="username" className="invisible">Brukernavn:</label>
							<input onChange={ updateFieldUsername } value={ fieldUsername } type="text" name="username" id="username" placeholder="Hvem er du?" />
						</div>
						<button className="split__shrink">Logg inn</button>
					</div>
				</form>
			)
		}
	}

	function submitSignOut( event ) {

		event.preventDefault()

		console.log("user in array",userData,signedInUser)
		console.log("user state", userInfo)
		userData[signedInUser].signedIn = false
		setUserInfo(userInfo.signedIn = false)
		localStorage.setItem( "userData", JSON.stringify( userData ) )
	}

	function submitChangeSettings( event ) {

		event.preventDefault()
	}

	function submitSignin( event ) {

		event.preventDefault()
		console.log("userData pre-push",userData)
		console.log("checking signedinuser", signedInUser)
		if( signedInUser ) {
			console.log("user was found, updating signedin value", userData[signedInUser])
			userData[signedInUser].signedIn = true
		} else {
			defaultUser.name = fieldUsername
			defaultUser.signedIn = true
			console.log("user not found, updating default user", defaultUser)
			userData.push( defaultUser )
		}
		console.log("updated userdata array", userData)

		// React is too stubborn
		const mutateProperty = userInfo
		mutateProperty.signedIn = true
		setUserInfo( mutateProperty )

		// Update localstorage user data
		localStorage.setItem( "userData", JSON.stringify( userData ) )

		console.log("is the user signed in?",userInfo)
		console.log("setting userdata", userInfo)
		console.log("localstorage userdata",JSON.parse(localStorage.getItem( "userData" )))
	}

	function updateFieldUsername( event ) {
		setFieldUsername( event.target.value )
	}

	return(

		<div className="accordion accordion--primary accordion--top accordion--signin">
			<input type="checkbox" name="trigger-signin" id="trigger-signin" className="accordion__trigger" />
			<div className="accordion__container">

			{ displayUserPanel() }

			</div>
			<label htmlFor="trigger-signin" className="accordion__toggle accordion__header accordion__header--invert">
				{ userInfo.signedIn ? userInfo.name : "Logg inn" }
				<svg className="icon accordion__indicator">
					<title>Pil som indikerer utvidbart innhold</title>
					<use href="#symbol-singlechevron-down" />
				</svg>
			</label>
		</div>
	)
}
