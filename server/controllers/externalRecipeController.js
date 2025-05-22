const axios = require('axios');

exports.getExternalRecipeById = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information`,
            {
                params: {
                    apiKey: process.env.SPOONACULAR_API_KEY,
                    includeNutrition: true,
                },
            }
        );

        const recipe = response.data;

        const simplified = {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            ingredients: recipe.extendedIngredients?.map(i => `${i.original}`) || [],
            instructions: recipe.analyzedInstructions?.[0]?.steps.map(s => s.step) || [],
            dietaryTags: [
                ...(recipe.vegetarian ? ['Vegetarian'] : []),
                ...(recipe.vegan ? ['Vegan'] : []),
                ...(recipe.glutenFree ? ['Gluten-Free'] : []),
                ...(recipe.dairyFree ? ['Dairy-Free'] : []),
                ...(recipe.veryHealthy ? ['Healthy'] : []),
            ],
            nutrients: {
                imperial: recipe.nutrition?.nutrients?.map(n => ({
                    name: n.name,
                    amount: n.amount,
                    unit: n.unit,
                })) || [],
            },
        };

        res.json(simplified);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch external recipe', error: err.message });
    }
};
