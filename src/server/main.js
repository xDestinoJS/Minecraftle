import express from "express";
import ViteExpress from "vite-express";
import fetch from "node-fetch";
import { optimizeRecipe } from "../common/recipeOptimizer.js";
import inventory from "../common/inventory.js";

const app = express();

let allItems = []
let allRecipes = []

await fetch("https://minecraft-api.vercel.app/api/items")
  .then(response => response.json())
  .then(items => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (inventory.includes(item.namespacedId.toLowerCase())) {
        allItems.push(item)
      }
    }
  })

await fetch("https://minecraft-api.vercel.app/api/crafting-recipes")
  .then(response => response.json())
  .then(recipes => {
    for (let i = 0; i < recipes.length; i++) {
      const item = recipes[i];
      let ownedItems = true

      for (let i = 0; i < item.recipe.length; i++) {
        let itemInRecipe = item.recipe[i];

        if (itemInRecipe != null) {
          if (Array.isArray(itemInRecipe)) itemInRecipe = itemInRecipe[0]
          
          const foundItem = allItems.find(item => item.name === itemInRecipe)

          if (foundItem && !inventory.includes(foundItem.namespacedId.toLowerCase())) {
            ownedItems = false
            break
          } else if (!foundItem) {
            ownedItems = false
            break
          }
        }
      }

      if (ownedItems) {
        allRecipes.push(item)
      }
    }
  })
  .then(() => {
    for (let i = 0; i < allRecipes.length; i++) {
      const recipe = allRecipes[i].recipe;

      for (let j = 0; j < recipe.length; j++) {
        let itemInRecipe = recipe[j];
        
        if (Array.isArray(itemInRecipe)) {
          allRecipes[i].recipe[j] = itemInRecipe[0].toLowerCase()
        } else if (itemInRecipe == null) {
          allRecipes[i].recipe[j] = ""
        } 

        itemInRecipe = recipe[j]
        
        if (allRecipes[i].recipe[j] != "") {
          for (let z = 0; z < allItems.length; z++) {
            const item = allItems[z];
            
            if (itemInRecipe.toLowerCase() == item.name.toLowerCase()) {
              allRecipes[i].recipe[j] = item.namespacedId
            }
          }
        }
      }

      allRecipes[i].recipe = optimizeRecipe(allRecipes[i].recipe)
    } 
  })

app.get("/api/items", (req, res) => {
  res.json(allItems);
});

app.get("/api/recipes", (req, res) => {
  res.json(allRecipes)
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
