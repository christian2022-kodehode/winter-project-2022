import { createContext } from "react";

let user = null
if( localStorage.getItem( "userData" ) ) {

	// User settings
	user = JSON.parse( localStorage.getItem( "userData" ) )
}
else {

	// Default settings
	user =
	{
	signedIn: false,
	name: "Anonymous",
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
}

const userContext = createContext(user)

export default userContext
