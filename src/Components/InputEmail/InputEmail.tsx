import { useState } from "react";

interface InputEmail {
  callback: (value: string) => void ,
  name: string,
  value: string,
}

export const InputEmail: React.FC<InputEmail> = ({
  callback, 
  name, 
  value
}) => {
  const [isWarring, setIsWarring] = useState(false);

  const handleEmailChange = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(value)) {
      callback(value)
      setIsWarring(false)
    } else {
      callback('')
      setIsWarring(true)
    }
  }

  return (
    <label className='form__label'>
      <p className='form__text'>{name}</p>
      <input className={`form__input ${isWarring && 'form__input--warring'}`} onChange={(event) => handleEmailChange(event.target.value)}></input>
      {isWarring && (
        <div className="form__input-warring">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1C7.41775 1 5.87104 1.46919 4.55544 2.34824C3.23985 3.22729 2.21447 4.47672 1.60897 5.93853C1.00347 7.40034 0.84504 9.00887 1.15372 10.5607C1.4624 12.1126 2.22433 13.538 3.34315 14.6569C4.46197 15.7757 5.88743 16.5376 7.43928 16.8463C8.99113 17.155 10.5997 16.9965 12.0615 16.391C13.5233 15.7855 14.7727 14.7602 15.6518 13.4446C16.5308 12.129 17 10.5822 17 9C17 6.87827 16.1571 4.84344 14.6569 3.34315C13.1566 1.84285 11.1217 1 9 1ZM8.00667 5C8.00667 4.73478 8.11203 4.48043 8.29956 4.29289C8.4871 4.10536 8.74145 4 9.00667 4C9.27189 4 9.52624 4.10536 9.71378 4.29289C9.90131 4.48043 10.0067 4.73478 10.0067 5V9.59333C10.0067 9.72465 9.9808 9.85469 9.93055 9.97602C9.88029 10.0973 9.80664 10.2076 9.71378 10.3004C9.62092 10.3933 9.51068 10.467 9.38935 10.5172C9.26803 10.5675 9.13799 10.5933 9.00667 10.5933C8.87535 10.5933 8.74531 10.5675 8.62399 10.5172C8.50266 10.467 8.39242 10.3933 8.29956 10.3004C8.2067 10.2076 8.13305 10.0973 8.08279 9.97602C8.03254 9.85469 8.00667 9.72465 8.00667 9.59333V5ZM9 14C8.77321 14 8.55152 13.9327 8.36295 13.8068C8.17438 13.6808 8.02741 13.5017 7.94062 13.2921C7.85383 13.0826 7.83113 12.8521 7.87537 12.6296C7.91961 12.4072 8.02882 12.2029 8.18919 12.0425C8.34955 11.8822 8.55387 11.7729 8.7763 11.7287C8.99873 11.6845 9.22929 11.7072 9.43881 11.794C9.64834 11.8807 9.82743 12.0277 9.95342 12.2163C10.0794 12.4048 10.1467 12.6265 10.1467 12.8533C10.1467 13.1574 10.0259 13.4491 9.81082 13.6641C9.59578 13.8792 9.30412 14 9 14Z" fill="#ED4545"/>
          </svg>
          <p>Please use correct formatting. <br></br> Example: address@email.com</p>
        </div>
      )}
    </label>
  )
}