export default function Signin () {
	return (


		<div className="accordion accordion--primary accordion--top accordion--signin">
			<input type="checkbox" name="trigger-signin" id="trigger-signin" className="accordion__trigger" />
			<div className="accordion__container">
				<form className="accordion__content">
					<div className="split">
						<input type="text" name="user" value="Anonym Brukersen" placeholder="Hvem er du?" className="split__grow" />
						<button className="split__shrink">Logg inn</button>
					</div>
				</form>
			</div>
			<label htmlFor="trigger-signin" className="accordion__toggle accordion__header accordion__header--invert">
				Anonym Brukersen
				<svg className="icon accordion__indicator">
					<title>Pil som indikerer utvidbart innhold</title>
					<use href="#symbol-singlechevron-down" />
				</svg>
			</label>
		</div>

	)
}