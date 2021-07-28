import React, { Component } from "react";
import './faq.sass';

const FAQ = () => {

	return (
		<div id="faqBody">
			<h2>Frequently Asked Questions</h2>

			<h4 className="faqTitle">My recipe is grayed out, or not showing up on Coolwell.co?</h4>
			<p className="faqExplain">We perform a quick review on submited recipes, see 'recipe submission guidelines'  The faded colour on the recipe card means it's pending review. Within 2 days it will either be approved, or you will recieve an email addressing any changes we feel are needed.</p>


			<h4 className="faqTitle">Who creates our recipes?</h4>
			<p className="faqExplain">A combination of our own team and many others who contribute recipes on their own behalf.</p>


			<h4 className="faqTitle">Can anyone post recipes?</h4>
			<p className="faqExplain">Yes! Anyone can <a href='https://cookwell.co/signup'>sign up</a> for an account. Only recipes go through a review process.</p>


			<h4 className="faqTitle">What are your recipe submission guidelines?</h4>
			<p className="faqExplain">
				All submissions are reviewed before being posted. Following these points will ensure they pass our review process.
				<span>Photos posted to Cookwell must be original or have express permission by the creator to be posted here. Any photos found to be copyright or stolen will be taken down without warning. If you suspect of any photos on our site which are stolen or may belong to you. Please message us through our contact page.</span>
				<span>Photos must of sufficient quality and are judged on resolution, focus, composure, white balance, and presentation.</span>
				<span>Registration is required to make posts.</span>
				<span>We reserve the right to remove posts at any time.</span>
				<span>Language of submissions at this time is english only. However, this may change in the future.</span>
			</p>

			<h4 className="faqTitle">Does my profile photo need to be of me?</h4>
			<p className="faqExplain">No! It can be anything you want. This is what people see attached to your creations and serves as a way to create brand recognition. It can be artwork, a logo, or just a photo of you and your dog.</p>

		</div>
	);
}


export default FAQ;