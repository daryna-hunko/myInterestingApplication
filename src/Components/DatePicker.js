import {useState} from 'react';
import styled from 'styled-components';
import SelectBuilder from './SelectBuilder.js';

const Div = styled.div`
  text-align: center;
  margin: 0 auto;
  padding: 25px 0;
  font-size: 24px;
  border-top: 1px solid #000;
`; 



function DatePicker(props) {
  let bday = (props.date.includes('-')) ? props.date.split('-') : props.date;
  const [controlledDays, setControlledDays] = useState(bday[2]),
        [controlledMonthes, setControlledMonthes] = useState(bday[1]),
        [controlledYears, setControlledYears] = useState(bday[0]);
  let Days = [];
  const Monthes = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  const Years = [];
  for (let i = 2020; i > 1900; i--) {
    Years.push(i);
  }
  for (let i = 1; i <= (daysInMonth(controlledMonthes, controlledYears) || 31); i++) {
    (i < 10) ? Days.push('0' + i) : Days.push(i);
  }
  let onDayChange = (e) => {
    setControlledDays(e.target.value);
    props.onChange(controlledYears + '-' + controlledMonthes + '-' + e.target.value);
  },
    onMonthChange = (e) => {
    setControlledMonthes(e.target.value);
    if (+controlledDays > daysInMonth (2, controlledYears)) {
      setControlledDays('');
      props.onChange('');
    } else {
      (controlledDays.length !== 0) ?
        props.onChange(controlledYears + '-' + e.target.value + '-' + controlledDays) 
        :
        props.onChange('');
    }
  },
    onYearChange = (e) => {
    setControlledYears(e.target.value);
    if (+controlledDays > daysInMonth (2, e.target.value)) {
      setControlledDays('');
      props.onChange('');
    } else {
      (controlledDays.length !== 0) ?
        props.onChange(e.target.value + '-' + controlledMonthes + '-' + controlledDays)
        :
        props.onChange('');
    }
  };


  return (
    <Div>
      <div>
        <SelectBuilder className='date-select' numbers={Days} onChange={onDayChange} />
        <SelectBuilder className='month-select' numbers={Monthes} onChange={onMonthChange} />
        <SelectBuilder className='year-select' numbers={Years} onChange={onYearChange} />
      </div>
    </Div>
  );
}

function daysInMonth (month = 1, year = 2020) { // Use 1 for January, 2 for February, etc.
  return +(new Date(year, month, 0).getDate());
}

  
export default DatePicker;