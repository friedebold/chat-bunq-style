import { rainbowColors } from "./apis/constants"


const RainbowBackground: React.FC = () => {
  return (
    <div className='rainbow-background' >
      {
        rainbowColors.map((color, index) => {
          return <div
            className='rainbow-tile'
            style={{ backgroundColor: color }}
            key={index} />
        })
      }
    </div>
  )
}

export default RainbowBackground