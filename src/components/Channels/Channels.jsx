export default function Channels () {
	return (

			<div className="accordion accordion--channels">
				<input type="checkbox" name="trigger-channels" id="trigger-channels" className="accordion__trigger" />
				<label htmlFor="trigger-channels" className="accordion__toggle">
					<p className="accordion__header">
						Vis alle nedtellinger
						<svg className="icon accordion__indicator">
							<title>Pil som indikerer utvidbart innhold</title>
							<use href="#symbol-singlechevron-down" />
						</svg>
					</p>
				</label>
				<div className="accordion__container">
					<div className="accordion__content countdown__channels">
						<a href="#jul2023" className="tag">jul2023</a>
						<a href="#dommedag" className="tag">dommedag</a>
						<a href="#valg2025" className="tag">valg2025</a>
						<a href="#2026" className="tag">2026</a>
					</div>
				</div>
			</div>

	)
}