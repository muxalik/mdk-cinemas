import { FC, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import ReactDatePicker from 'react-datepicker'
import { getYears } from '../../../utils/getYears'
import { ReactSVG } from 'react-svg'
import { calendarAlt, chevronDown } from '../../../assets'
import './styles.scss'

interface props {
  startDate?: Date
  onChange: (date: Date) => void
}

const DatePicker: FC<props> = ({ startDate, onChange }) => {
  const [open, setOpen] = useState(false)
  const years = getYears(2000)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <div className={`datapicker ${open ? 'datapicker--opened' : ''} `}>
      <ReactDatePicker
        showPopperArrow={false}
        placeholderText='Select Date'
        dateFormat='d MMM yyyy'
        popperPlacement='bottom-end'
        showIcon
        icon={<ReactSVG src={calendarAlt} className='calendar-icon' />}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className='header'>
            <button
              className='control-button'
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <ReactSVG src={chevronDown} className='chevron chevron-left' />
            </button>

            <div className='lists'>
              <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(+value)}
                className='list'
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[date.getMonth()]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
                className='list'
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              className='control-button'
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <ReactSVG src={chevronDown} className='chevron chevron-right' />
            </button>
          </div>
        )}
        selected={startDate}
        onChange={onChange}
        onCalendarOpen={() => setOpen(true)}
        onCalendarClose={() => setOpen(false)}
      />
    </div>
  )
}

export default DatePicker
