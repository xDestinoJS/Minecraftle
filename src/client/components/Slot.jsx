let items = []

const response = await fetch("https://minecraft-api.vercel.app/api/items")
const allItems = await response.json()

const Slot = ({ item, handleSelected, handleHover, id }) => {
    let isNamespacedId = item.toLowerCase() == item
    let itemObject = allItems.find(x => x.name.toLowerCase() === item.toLowerCase())

    let src = (item || itemObject) ? `https://minecraft-api.vercel.app/images/items/${isNamespacedId ? item : itemObject.namespacedId}.png` : ""
  
    function handleClick() {
        handleSelected(item, id)
    }

    return (
      <div className="slot" onClick={handleClick} onMouseEnter={() => handleHover ? handleHover(id) : null} onMouseLeave={() => handleHover ? handleHover(null) : null}>
        {item ? <img src={src} onDragStart={() => {return false}}></img> : ""}
      </div>
    )
}

export default Slot;