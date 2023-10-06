interface InputText {
  callback: (value: string) => void ,
  name: string,
}

export const InputText: React.FC<InputText> = ({callback, name}) => (
  <label className='form__label'>
    <p className='form__text'>{name}</p>
    <input className='form__input' onChange={(event) => callback(event.target.value)}></input>
  </label>
)