interface InputTime {
  time: string,
  setTime: (value: string) => void,
  value: string,
}

export const InputTime: React.FC<InputTime> = ({
  time, 
  setTime, 
  value
}) => (
  <label className={`form__label-radio ${time === value && 'form__label-radio--selected'}`}>
    <p>{value}</p>
    <input 
      type='radio'
      name="time" 
      className='form__input-radio'
      value={value}
      onChange={(event) => {setTime(event.target.value)}}
    ></input>
  </label>
)