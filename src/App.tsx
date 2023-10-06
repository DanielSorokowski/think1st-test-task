import { useEffect, useState } from 'react';
import './App.scss';
import { getHolidays } from './api/api';
import { convertToDateObject, getSundayDatesInYear } from './utils/utils';
import { Holiday, Observance } from './types/types';
import { InputText } from './Components/InputText/InputText';
import { InputRange } from './Components/InputRange/InputRange';
import { InputFile } from './Components/InputFile/InputFile';
import { InputDate } from './Components/InputDate/InputDate';
import { InputEmail } from './Components/InputEmail/InputEmail';

const App = () => {
  const [holidays, setHolidays] = useState<Holiday[]>()
  const [sundays, setSundays] = useState<string[]>([]);

  const [blockedDays, setBlockedDays] = useState<Date[]>()
  const [observances, setObcervances] = useState<Observance[]>()

  const [isDateSelected, setIsDateSelected] = useState(false)
  const [selectedObservance, setSelectedObservance] = useState<string>()
  const [inputFileJSX, setInputFileJSX] = useState(<p className='form__file-text'>Upload a file</p>)

  //form data
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('18')
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [time, setTime] = useState('');

  const isFormCorrect = firstName && lastName && email && age && photo && selectedDate && time

  useEffect(() => {
    getHolidays().then(data => setHolidays(data))

    const sundays = getSundayDatesInYear(2023);
    setSundays(sundays);
  }, [])

  useEffect(() => {
    if(holidays) {
      const blocked = holidays.filter(day => day.type === "NATIONAL_HOLIDAY").map(day => day.date)
      const observances = holidays.filter(day => day.type === "OBSERVANCE").map(day => ({
        date: convertToDateObject(day.date),
        holidayName: day.name
      }))

      const blockedDays = [
        ...blocked,
        ...sundays
      ].map(day => convertToDateObject(day))

      setBlockedDays(blockedDays)
      setObcervances(observances)
    }
  }, [holidays])

  useEffect(() => {
    if (observances && selectedDate) {
      const observance = observances.find(
        (obs) => obs.date.getTime() === selectedDate.getTime()
      );
  
      if (observance) {
        setSelectedObservance(`It is Polish ${observance.holidayName}`)
      }
    }
  }, [selectedDate]);

  const handlePickerChange = (date: Date) => {
    setSelectedDate(date)
    setIsDateSelected(true)
  }

  const handleResetFile = () => {
    setPhoto(undefined)
    setInputFileJSX(<p className='form__file-text'>Upload a file</p>)
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      age,
      photo,
      selectedDate,
      time
    };

    fetch('http://letsworkout.pl/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Submitted successfully:', data);
      })
      .catch(error => {
        console.error('Error with submitting:', error);
      });
  }

  return (
    <div className="app">
      <form className='form' onSubmit={handleSubmit}>
        <h2 className="form__title">
          Personal Info
        </h2>

        <InputText callback={setFirstName} name='First Name'></InputText>
        <InputText callback={setLastName} name='Last Name'></InputText>
        <InputEmail callback={setEmail} name='Email Address' value={email}></InputEmail>

        <InputRange 
          min={8} 
          max={100} 
          value={age} 
          setValue={setAge}
        ></InputRange>

        <InputFile 
          name="Photo" 
          value={photo} 
          setValue={setPhoto} 
          JSX={inputFileJSX} 
          setJSX={setInputFileJSX} 
          reset={handleResetFile}
        ></InputFile>

        <h2 className="form__title">
          Your workout
        </h2>

        <InputDate 
          selectedDate={selectedDate} 
          handlePickerChange={handlePickerChange} 
          blockedDays={blockedDays} 
          selectedObservance={selectedObservance} 
          isDateSelected={isDateSelected} 
          time={time} setTime={setTime}
        ></InputDate>

        <button className='form__button' disabled={isFormCorrect ? false : true}>Send Aplication</button>
      </form>
    </div>
  );
}

export default App;
