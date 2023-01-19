// This component is a wrapper for user sign-in and settings forms

import UserSettings from "./UserSettings"
import UserSignIn from "./UserSignIn"

export default function UserPanel( props ) {

	// Determine which form to display
	function displayContent() {

		if( props.user.signedIn ) {
			return(
				<UserSettings method={ props.method } user={ props.user } />
			)
		}
		else {
			return(
				<UserSignIn method={ props.method } user={ props.user } />
			)
		}
	}

	return(

		<div className="accordion accordion--primary accordion--top accordion--signin">
			<input type="checkbox" name="trigger-signin" id="trigger-signin" className="accordion__trigger" />

			<div className="accordion__container">{ displayContent() }</div>

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
