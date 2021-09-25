
// NOTE: if updating entries. You must also update the models enum property in Nodejs

const cuisine = [
					'American',
					'Asian',
					'Caribbean',
					'Chinese',
					'French',
					'German',
					'Greek',
					'Hawaiian',
					'Korean',
					'Mediterranean',
					'Mexican',
					'Thai',
					'Indonesian',
					'Indian',
					'Italian',
					'Soul Food',
					'Spanish',
					'Western'
				];

const mealTypes = [
					'Breakfest & Brunch',
					'Soups & Stews',
					'Sauces',
					'Sandwiches',
					'Main Dishes',
					'Desserts',
					'Drinks',
					'Snacks & Appetizers',
					'Salads & Side Dishes',
					'Baking'
				];

const dietOptions = [
					'Gluten Free',
					'Vegetarian',
					'Vegan',
					'Ketogenic',
					'Dairy Free',
					'Nut Free'
				];




const units = [
				'none',
				'teaspoon (tsp)',
				'tablespoon (Tbsp)',
				'cup(s)',
				'fluid ounce (floz)',
				'ounce (oz)',
				'pound (lb)',
				'small',
				'medium',
				'large',
				'millilitre (ml)',
				'litre (L)',
				'milligram (mg)',
				'gram (g)',
				'killogram (kg)',
				'centimeter (cm)',
				'inch (in)',
				'dash',
				'pinch',
				'gal',
				'fluid pint (fl pt)',
				'fluid quart (fl qt)',
				'gill'
			];




const unitDisplay = {
	'none': '',
	'teaspoon (tsp)': 'tsp',
	'tablespoon (Tbsp)': 'Tbsp',
	'cup(s)': 'cup(s)',
	'fluid ounce (floz)': 'floz',
	'ounce (oz)': 'oz',
	'pound (lb)': 'lb',
	'small': 'small',
	'medium': 'medium',
	'large': 'large',
	'millilitre (ml)': 'ml',
	'litre (L)': 'L',
	'milligram (mg)': 'mg',
	'gram (g)': 'grams',
	'killogram (kg)': 'kg',
	'centimeter (cm)': 'cm',
	'inch (in)': 'in',
	'dash': 'dash',
	'pinch': 'pinch',
	'gal': 'gal',
	'fluid pint (fl pt)': 'fl pt',
	'fluid quart (fl qt)': 'fl qt',
	'gill': 'gill'
};






export { mealTypes, dietOptions, cuisine, units, unitDisplay };

