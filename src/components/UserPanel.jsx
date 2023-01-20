// This component is a wrapper for user sign-in and settings forms

// Props:
// setUser={ setUser } state function
// user={ user } stringified object or negative bolean state
// setZone={ setZone } numeric index

import UserSettings from "./UserSettings"
import UserSignIn from "./UserSignIn"

export default function UserPanel( props ) {

	const user = props.user ? JSON.parse( props.user ) : { signedIn: false, name: "Logg inn" }
	// let user = { signedIn: false, name: "Logg inn" }
	// if( props.user ) {
	// 	user = JSON.parse( props.user )
	// } 

	// Determine which form to display
	function displayContent() {

		if( props.user ) {

			return(
				<UserSettings setUser={ props.setUser } user={ props.user } />
			)
		}
		else {
			return(
				<UserSignIn setUser={ props.setUser } />
			)
		}
	}

	return(

		<div className="accordion accordion--primary accordion--top accordion--signin">
			<input type="checkbox" name="trigger-signin" id="trigger-signin" className="accordion__trigger" />
			<div className="accordion__container">
				{ displayContent() }
			</div>
			<label htmlFor="trigger-signin" className="accordion__toggle accordion__header accordion__header--invert">
				{ user.name }
				<svg className="icon accordion__indicator">
					<title>Pil som indikerer utvidbart innhold</title>
					<use href="#symbol-singlechevron-down" />
				</svg>
			</label>
		</div>
	)
}
