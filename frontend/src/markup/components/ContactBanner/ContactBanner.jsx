import React from "react";

function AboutusBanner({ backgroundImage }) {
	return (
		<div>
			<section className="page-title contactbanner">
				<div className="auto-container">
					<h2>Contact us</h2>
					<ul className="page-breadcrumb">
						<li>
							<a href="index.html">home</a>
						</li>
						<li>About us</li>
					</ul>
				</div>
				<h1 data-parallax='{"x": 200}'>Car Repairing</h1>
			</section>
		</div>
	);
}

export default AboutusBanner;
