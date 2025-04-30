const recipes = [
    {
        name: "Paneer Butter Masala",
        ingredients: ["paneer", "butter", "tomato", "cream"],
        type: "Lunch",
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-butter-masala-recipe-2.jpg"
    },
    {
        name: "Aloo Paratha",
        ingredients: ["potato", "wheat flour", "ghee"],
        type: "Breakfast",
        image: "https://pipingpotcurry.com/wp-content/uploads/2022/11/Aloo-Paratha-Piping-Pot-Curry.jpg"
    },
    {
        name: "Vegetable Pulao",
        ingredients: ["rice", "carrot", "peas", "beans"],
        type: "Lunch",
        image: "https://www.indianveggiedelight.com/wp-content/uploads/2019/07/veg-pulao-featured.jpg"
    },
    {
        name: "Poha",
        ingredients: ["flattened rice", "mustard", "turmeric", "onion"],
        type: "Breakfast",
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/01/poha.jpg"
    },
    {
        name: "Palak Paneer",
        ingredients: ["spinach", "paneer", "garlic", "cream"],
        type: "Dinner",
        image: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/palak-paneer-3-500x375.jpg"
    }
];

const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

displayRecipes(recipes);

searchInput.addEventListener("input", filterRecipes);
typeFilter.addEventListener("change", filterRecipes);

function filterRecipes() {
    const searchTerm = searchInput.value.toLowerCase().split(",").map(i => i.trim());
    const selectedType = typeFilter.value;

    const filtered = recipes.filter(recipe => {
        const matchesType = selectedType === "" || recipe.type === selectedType;
        const matchesIngredients = searchTerm.every(term =>
            recipe.ingredients.join(" ").toLowerCase().includes(term)
        );
        return matchesType && matchesIngredients;
    });

    displayRecipes(filtered);
}

function displayRecipes(recipesArray) {
    recipeContainer.innerHTML = "";

    if (recipesArray.length === 0) {
        recipeContainer.innerHTML = `<p class="text-center text-muted">No veg recipes found. Try different ingredients or type.</p>`;
        return;
    }

    recipesArray.forEach(recipe => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${recipe.image}" 
                     class="card-img-top img-fluid" 
                     style="height: 220px; width: 100%; object-fit: cover;" 
                     alt="${recipe.name}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.name}</h5>
                    <p class="card-text"><strong>Type:</strong> ${recipe.type}</p>
                    <p class="card-text"><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
                </div>
            </div>
        `;

        recipeContainer.appendChild(col);
    });
}
