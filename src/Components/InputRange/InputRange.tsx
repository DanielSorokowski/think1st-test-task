import { calculatePercentage } from "../../utils/utils"

interface InputRange {
  min: number,
  max: number,
  value: string,
  setValue: (value: string) => void,
}

export const InputRange: React.FC<InputRange> = ({
  min,
  max, 
  value, 
  setValue
}) => (
  <label className='form__label form__label--range'>
    <p className='form__text'>Age</p>
    <div className='form__range'>
      <span>{min}</span>
      <span>{max}</span>
    </div>
    <input 
      className="form__input-range" 
      type="range" 
      min="8" 
      max="100"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
    <div 
      className='form__range-current' 
      style={{
        transform: `translateX(calc(${calculatePercentage(Number(value), min, max)}% - 45px))`
      }}
    >
      <span className='form__range-current-value'>{value}</span>
    </div>
  </label>  
)