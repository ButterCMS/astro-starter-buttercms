import React, { useEffect } from "react"

const TestimonialSection = (props) => {

	useEffect(() => {
		import('tiny-slider').then(({ tns }) => {
			tns({
				container: '.testimonial-active',
				autoplay: true,
				autoplayTimeout: 5000,
				autoplayButtonOutput: false,
				mouseDrag: true,
				gutter: 0,
				nav: false,
				navPosition: "bottom",
				controls: true,
				controlsText: [
					'<i class="lni lni-chevron-left"></i>',
					'<i class="lni lni-chevron-right"></i>',
				],
				items: 1,
			});
		})
	}, [])

	return (
		<section id={props.fields.scroll_anchor_id} className="testimonial-section mt-100">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-xl-7 col-lg-9">
						<div className="testimonial-active-wrapper">

							<div className="section-title text-center">
								<h2 className="mb-20">{props.fields.headline}</h2>
							</div>

							<div className="testimonial-active">
								{props.fields.testimonial.map(testimonial => (
									<div key={testimonial.name} className="single-testimonial">
										<div className="quote">
											<i className="lni lni-quotation"></i>
										</div>
										<div className="content">
											<p>{testimonial.quote}</p>
										</div>
										<div className="info">
											<h6>{testimonial.name}</h6>
											<p>{testimonial.title}</p>
										</div>
									</div>
								))}
							</div>

						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TestimonialSection;