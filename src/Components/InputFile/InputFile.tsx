interface InputFile {
  name: string,
  JSX: any,
  setJSX: (value: any) => void,
  value: string | undefined,
  setValue: (value: string | undefined) => void,
  reset: () => void,
}

export const InputFile: React.FC<InputFile> = ({
  name, 
  JSX, 
  setJSX, 
  value, 
  setValue, 
  reset
}) => (
  <label className='form__label'>
    <p className='form__text'>{name}</p>
    <div className='form__file'>
      {JSX}
    </div>
    <input 
      type="file" 
      className='form__input-file' 
      accept=".png, .jpg"
      disabled={value ? true : false}
      onChange={(event) => {
        if (event.target.value) {
          const fileName = event.target.value.split('\\').pop();

          setValue(fileName)
          setJSX(<div className='form__file-selected'>
            <p className='form__file-upload'>{fileName}</p>
            <button className='form__file-delete' onClick={reset}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill='currentColor'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            </button>
          </div>)
        }
      }}
    ></input>
  </label>
)