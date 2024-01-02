import { useEffect, useState } from "react";
import "./App.css";
import CraftingTable from "./components/CraftingTable.jsx";
import Slot from "./components/Slot.jsx";
import inventory from "../common/inventory.js";
import Block from "./components/Block.jsx";

const response = await fetch("/api/recipes");
const recipes = await response.json();

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [recipe, setRecipe] = useState(["", "", "", "", "", "", "", "", ""])
  const [isDragPlacing, setIsDragPlacing] = useState(false)

  const [isMouseDown, setIsMouseDown] = useState(false)

  const handleMouseMove = (event) => setPosition({ x: event.clientX, y: event.clientY });
  const handleMouseDown = (status) => setIsMouseDown(status);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', () => handleMouseDown(true));
    document.addEventListener('mouseup', () => handleMouseDown(false));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', () => handleMouseDown(true));
      document.removeEventListener('mouseup', () => handleMouseDown(false));
    };
  }, []);

  function handleSelected(item, id) {
    const updatedRecipe = [...recipe];
  
    if (item === selected && !id) {
      setSelected("");
    } else {
      updatedRecipe[id] = selected;
      setSelected(item);
      setRecipe(updatedRecipe);
    }
  }  

  useEffect(() => {
    const updatedRecipe = [...recipe];

    if (selected && hovered != null && updatedRecipe[hovered] == "" && isMouseDown) {
      updatedRecipe[hovered] = selected
      setRecipe(updatedRecipe)

      setIsDragPlacing(true)
    }

    if (!isMouseDown && isDragPlacing) {
      setSelected("")
      setIsDragPlacing(false)
    }
  }, [recipe, position, isMouseDown, isDragPlacing]);

  return (
    <div className="App">
      <div className="main-content">
        <CraftingTable recipes={recipes} recipe={recipe} handleSelected={handleSelected} handleHover={(id) => {setHovered(id)}}/>
        <Block position={position} item={selected}/>
        
        <div className="inventory">
          {
            inventory.map((item, index) => (
              <Slot key={index} item={item} handleSelected={handleSelected}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
