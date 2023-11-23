import { FC, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import ReactDatePicker from 'react-datepicker'
import { getYears } from '../../../utils/getYears'
import { ReactSVG } from 'react-svg'
import { calendarAlt, chevronDown } from '../../../assets'
import './styles.scss'
import Select from '../Select'

interface props {
  label?: string
  startDate?: Date
  onChange: (date: Date) => void
  placement?: 'bottom' | 'bottom-end' | 'bottom-start'
}

const DatePicker: FC<props> = ({ label, startDate, onChange, placement }) => {
  const [open, setOpen] = useState(false)
  const years = getYears(2000).map((year) => ({
    value: year,
    name: year.toString(),
  }))

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
  ].map((month) => ({
    value: month,
    name: month,
  }))

  return (
    <div className={`datapicker ${open ? 'datapicker--opened' : ''} `}>
      {label && <label className='label'>{label}</label>}
      <ReactDatePicker
        showPopperArrow={false}
        placeholderText='Select Date'
        dateFormat='d MMM yyyy'
        popperPlacement={placement || 'bottom'}
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
              <Select
                props={{ x: '-50%' }}
                placeholder='Year'
                id='year'
                variant='none'
                options={years}
                selected={date.getFullYear()}
                onChange={(option) => changeYear(+option.value)}
              />

              <Select
                props={{ x: '-50%' }}
                placeholder='Month'
                id='month'
                variant='none'
                options={months}
                selected={months[date.getMonth()].value}
                onChange={(option) =>
                  changeMonth(
                    months.findIndex((month) => {
                      return month.value === option.value
                    })
                  )
                }
              />
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
