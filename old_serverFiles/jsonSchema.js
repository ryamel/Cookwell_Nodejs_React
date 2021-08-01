{
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'authorid',
      'title',
      'description',
      'mealType',
      'servings',
      'imgSrc',
      'cookTime',
      'ingredients',
      'ingrQty',
      'method'
    ],
    properties: {
      authorid: {
        bsonType: 'number',
        description: 'must be a number'
      },
      title: {
        bsonType: 'string',
        minLength: 10,
        maxLength: 60,
        description: 'character length must be between [ 10, 60 ]',
      },
      description: {
        bsonType: 'string',
        minLength: 80,
        maxLength: 500,
        description: 'character length must be between [ 80, 500 ]'
      },
      mealType: {
        bsonType: [
          'string'
        ],
        'enum': [
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
        ],
        description: 'must be an array of type string'
      },
      diet: {
        bsonType: [
          'string'
        ],
        'enum': [
          'Gluten Free',
          'Vegetarian',
          'Vegan',
          'Ketogenic',
          'Lactose Free',
          'Nut Free',
          'None'
        ],
        description: 'must be an array of type string'
      },
      cusine: {
        bsonType: [
          'string'
        ],
        'enum': [
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
        ],
        description: 'must be an array of type string'
      },
      servings: {
        bsonType: 'string',
        description: 'must be an array of type string'
      },
      imgSrc: {
        bsonType: 'string',
        description: 'must be a string'
      },
      cookTime: {
        bsonType: 'number',
        minimum: 0,
        description: 'must be a positive number'
      },
      ingredients: {
        bsonType: [
          'string'
        ],
        description: 'must be a array of type string'
      },
      method: {
        bsonType: [
          'string'
        ],
        description: 'must be a array of type string'
      }
    }
  }
}