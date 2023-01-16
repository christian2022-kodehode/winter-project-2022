import React from "react"
import Countdown from "./components/Countdown/Countdown"
import MessageHistory from "./components/MessageHistory/MessageHistory"
import Jump from "./components/Jump/Jump"
import SymbolLibrary from "./components/SymbolLibrary/SymbolLibrary"
import submitForm from "./logic/submitForm"

export default function App() {

	const [messageGroup, setMessageGroup] = React.useState ()
 	const [messageField, setMessageField] = React.useState ("")

	// const composeMethods = {
	// 	"submitForm": submitForm,
	// 	"messageField":
	// 		{
	// 		"method": setMessageField,
	// 		"variable": messageField
	// 		},
	// 	"messageGroup":
	// 		{
	// 		"method": setMessageGroup,
	// 		"variable": messageGroup
	// 		}
	// }

	return (
		<>
			<Countdown methods={
			
				{
				"submitForm": submitForm,
				"messageField":
					{
					"method": setMessageField,
					"variable": messageField
					},
				"messageGroup":
					{
					"method": setMessageGroup,
					"variable": messageGroup
					}
				}
			
			} />
			<MessageHistory methods={
			
				{
				"method": setMessageGroup,
				"variable": messageGroup
				}
			
			} />
			<Jump />
			<SymbolLibrary />
		</>
	);
}
