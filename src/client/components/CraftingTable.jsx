import { useState, useEffect } from "react";
import arrow from "../assets/arrow.png"

import Slot from './Slot.jsx'
import { optimizeRecipe } from "../../common/recipeOptimizer.js";
import { flattenMatrix } from "../../common/flattenMatrix.js";

const CraftingTable = ({ recipes, recipe, handleSelected, handleHover }) => {
    const [result, setResult] = useState("");
  
    function createMirror(matrix) {
        return flattenMatrix(
            [
                [matrix[2] || "", matrix[1] || "", matrix[0]] || "",
                [matrix[5] || "", matrix[4] || "", matrix[3]] || "",
                [matrix[8] || "", matrix[7] || "", matrix[6]] || "",
            ]
        )
    }

    useEffect(() => {
        function getResultFromArray() {
            let found = false
    
            const compare = (a, b) =>
                a.length === b.length &&
                a.every((element, index) => element === b[index]);

            for (let i = 0; i < recipes.length; i++) {
                const currentRecipe = recipes[i];

                if (compare(optimizeRecipe(currentRecipe.recipe), optimizeRecipe(recipe)) || compare(optimizeRecipe(currentRecipe.recipe), createMirror(optimizeRecipe(recipe)))) {
                    setResult(currentRecipe.item);
                    found = true
                    break;
                }
            }
            if (!found) {
                setResult("")
            }

            return found
        }

        getResultFromArray()
    }, [recipe]);
  
    return (
      <div className="crafting-area">
        <div className="crafting-table">
            {
                recipe.map((item, index) => (
                    <Slot key={index} item={item} handleSelected={handleSelected} handleHover={handleHover} id={index}/>
                ))
            }
        </div>
  
        <img className="arrow" src={arrow}></img>
  
        <Slot item={result}/>
      </div>
    );
};

export default CraftingTable;