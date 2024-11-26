document.getElementById('hamburger').addEventListener('click', function () {
    const menuBar = document.getElementById('menu-bar');
    menuBar.classList.toggle('active');
});
const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

// Function to get recipes
const fetchRecipes = async (query) => {
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        if (response.meals) {
            recipeContainer.innerHTML = response.meals.map(meal => `
                <div class="recipe">
                    <h2><u>${meal.strMeal}</u></h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p>${meal.strInstructions}</p>
                </div>
            `).join('');
        } else {
            recipeContainer.innerHTML = '<p>No recipes found</p>';
        }
    } catch (error) {
        console.error('Error fetching the recipes:', error);
        recipeContainer.innerHTML = '<p>Error fetching the recipes. Please try again later.</p>';
    }
};

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});
