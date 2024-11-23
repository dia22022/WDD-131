import { recipes } from 'recipes.mjs';

function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}
function getRandomRecipe() {
    const randomIndex = getRandomNumber(recipes.length);
    return recipes[randomIndex];
}
function generateTagsHTML(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function generateRatingHTML(rating) {
    const stars = Array.from({ length: 5 }, (_, i) => 
        i < rating 
            ? `<span class="fa fa-star checked" aria-hidden="true"></span>` 
            : `<span class="fa fa-star" aria-hidden="true"></span>`
    );
    return `<div class="rating" aria-label="${rating} out of 5 stars">${stars.join('')}</div>`;
}
function generateRecipeHTML(recipe) {
    return `
        <article class="recipe">
            <h2>${recipe.name}</h2>
            <div class="ratings">
                ${generateRatingHTML(recipe.rating)}
            </div>
            <div class="tags">
                ${generateTagsHTML(recipe.tags)}
            </div>
            <p>${recipe.description}</p>
        </article>
    `;
}
function init() {
    const randomRecipe = getRandomRecipe();
    const recipeHTML = generateRecipeHTML(randomRecipe);
    document.getElementById('recipes').innerHTML = recipeHTML;
}

window.onload = init;

