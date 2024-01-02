const Block = ({ position, item }) => {
    let itemName = item ? item.toLowerCase().split(" ").join("_") : ""
    let src = item ? `https://minecraft-api.vercel.app/images/items/${itemName}.png` : ""
  
    return (
      <div className="invisible-slot" style={{
        position: 'fixed',
        top: `${position.y-25}px`,
        left: `${position.x-25}px`,
      }}>
        {item ? <img src={src}></img> : ""}
      </div>
    )
}
  
export default Block;