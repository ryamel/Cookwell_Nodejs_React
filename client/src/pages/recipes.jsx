import React from "react";
import BrowseCard from '../components/browseCard';
import './recipes.sass';

const Featured = () => (
	<div className='recipe-grid-container'>

		<BrowseCard imgSrc='test' description='dsf' authorName='tst' title='dsfdfs' recipeLink='./' />
		<BrowseCard imgSrc='test' description='dsf' authorName='tst' title='dsfdfs' recipeLink='./' />
		<BrowseCard imgSrc='test' description='dsf' authorName='tst' title='dsfdfs' recipeLink='./' />
		<BrowseCard imgSrc='test' description='dsf' authorName='tst' title='dsfdfs' recipeLink='./' />
		<BrowseCard imgSrc='test' description='dsf' authorName='tst' title='dsfdfs' recipeLink='./' />
		<BrowseCard imgSrc='test' description='dsf' authorName='tst' title='dsfdfs' recipeLink='./' />

	</div>
);


export default Featured;


