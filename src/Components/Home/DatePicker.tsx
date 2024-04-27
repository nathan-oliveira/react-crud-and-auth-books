/* eslint-disable no-unused-expressions */
import React from 'react'
import './date-picker.scss'
import If from 'Components/Templates/Operator/If'

interface Props {
  title?: string
  dayNames?: string[]
  monthNames?: string[]
  showTitle?: boolean
  defaultValueInit?: Date
  defaultValueEnd?: Date
  minDate?: Date
  maxDate?: Date
  headerFormat?: string
  headerTextColor?: string
  colorScheme?: string
  isOpen?: boolean
  closeText?: string
  clearText?: string
  range?: boolean
  rangeMax?: number
  onClose?: () => void
  onChange?: (date: any) => void // Date | null | Array<Date> | Array<null>
  showFooter?: boolean
  showHeader?: boolean
  clickOutsideToClose?: () => void
}

const DAY_NAMES = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]
const OLD_YEAR = 1970
const MAX_YEAR = new Date().getFullYear() + 3

const DatePicker = ({
  isOpen: showCalendar,
  onClose,
  title,
  dayNames,
  headerFormat,
  showTitle = true,
  monthNames,
  defaultValueInit,
  defaultValueEnd,
  minDate = new Date(OLD_YEAR, 0, 1),
  maxDate = new Date(MAX_YEAR, 11, 31),
  colorScheme = '#208de4',
  headerTextColor = '#fff',
  closeText = 'Close',
  clearText = 'Clear',
  range = false,
  rangeMax = 30,
  onChange,
  showFooter = true,
  showHeader = true,
  clickOutsideToClose
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(showCalendar)
  const [calendar, setCalendar] = React.useState<Date[]>([])
  const [days] = React.useState<string[]>(
    dayNames?.length === 7 ? dayNames : DAY_NAMES
  )
  const [months] = React.useState<string[]>(
    monthNames?.length === 12 ? monthNames : MONTH_NAMES
  )
  const [month, setMonth] = React.useState<number>(0)
  const [year, setYear] = React.useState<number>(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    defaultValueInit || null
  )

  const [selectedDateEnd, setSelectedDateEnd] = React.useState<Date | null>(
    defaultValueEnd || null
  )

  const dbRef = React.useRef<HTMLDivElement>(null)
  const lbRef = React.useRef<HTMLDivElement>(null)
  const changeMonth = (inc: number) => {
    let curMonth = month + inc
    let curYear = year

    if (curMonth === 12) {
      curMonth = 0
      curYear++
    } else if (curMonth === -1) {
      curMonth = 11
      curYear--
    }

    setMonth(curMonth)
    setYear(curYear)
  }

  const selectDate = (day: Date) => {
    setMonth(day.getMonth())
    setYear(day.getFullYear())

    if (range) {
      if (selectedDate && (selectedDateEnd !== selectedDate)) {
        setSelectedDate(null)
        setSelectedDateEnd(null)
      } else {
        if (!selectedDate) setSelectedDate(day)
        if (selectedDate !== day) setSelectedDateEnd(day)
        onChange && onChange(
          [
            selectedDate ?? day, 
            !selectedDateEnd ? 
              (selectedDate ?? day) : 
              (selectedDateEnd !== day ? day : selectedDateEnd),
          ]
        )
      }
    } else {
      setSelectedDate(day)
      onChange && onChange(day)
    }
  };

  const getTextHeader = (value: Date | null) => {
    const backup = new Date()
    const dayName = days[value?.getDay() || backup.getDay()]
    const dateNum = value ? value.getDate() : backup.getDate()
    const date = dateNum < 10 ? `0${dateNum}` : dateNum.toString()
    const monthName = months[value?.getMonth() || backup.getMonth()]
    const monthNum =
      (value ? value.getMonth() : backup.getMonth()) + 1
    const monthWithZero = monthNum < 10 ? `0${monthNum}` : monthNum.toString()
    let result = headerFormat || 'DD, MM dd'

    result = result.replaceAll('D', '_D')
    result = result.replaceAll('M', '_M')
    result = result.replaceAll('d', '_d')
    result = result.replaceAll('m', '_m')

    result = result.replaceAll('_D_D', dayName)
    result = result.replaceAll('_D', dayName.substring(0, 3))
    result = result.replaceAll('_M_M', monthName)
    result = result.replaceAll('_M', monthName.substring(0, 3))
    result = result.replaceAll('_m_m', monthWithZero)
    result = result.replaceAll('_m', monthNum.toString())
    result = result.replaceAll('_d_d', date)
    result = result.replaceAll('_d', date.replace(/^0/, ''))
    return result;
  }

  const getHeader = () => {
    if (!selectedDate) return title ? title : 'Selecione...';
    const textDateStart = getTextHeader(selectedDate);
    const textDateEnd = getTextHeader(selectedDateEnd);
    if (range && textDateStart !== textDateEnd) {
      const monthAndDayStart = textDateStart.split(',')[1]
      const monthAndDayEnd  = textDateEnd.split(',')[1]
      const [monthDayStart, dayStart] = monthAndDayStart.trim().split(' ');
      const [monthDayEnd, dayEnd] = monthAndDayEnd.trim().split(' ');

      if (monthDayStart === monthDayEnd)
        return `${dayStart} á ${dayEnd} de ${monthDayStart}`;

      return `${dayStart} de ${monthDayStart} á ${dayEnd} \nde ${monthDayEnd}`
    } else {
      const monthAndDayStart = textDateStart.split(',')[1]
      const [monthDayStart, dayStart] = monthAndDayStart.trim().split(' ');
      return `${dayStart} de ${monthDayStart}`;
    }
  }

  const handleClear = () => {
    setSelectedDate(null)
    setSelectedDateEnd(null)

    if (range)
      onChange && onChange([null, null])
    else
      onChange && onChange(null)
  }

  const handleClose = () => {
    // setIsOpen(false)
    dbRef.current?.classList.add('date__picker__fadeOut')
    lbRef.current?.classList.add('date__picker__zoomOut')

    setTimeout(() => {
      setIsOpen(false)
      onClose && onClose()
      dbRef.current?.classList.remove('date__picker__fadeOut')
      lbRef.current?.classList.remove('date__picker__zoomOut')
    }, 300)
  }

  React.useEffect(() => {
    const firstDayThisMonth = new Date(year, month, 1).getDay()
    const temp = []

    for (let i = 0; i < 42; i++) {
      const date = new Date(year, month, i - firstDayThisMonth + 1)
      temp.push(date)
    }

    setCalendar(temp)
  }, [month, year])

  React.useEffect(() => {
    document.addEventListener('click', (event: MouseEvent) => {
      // console.log('clicked', event.target)
      if (
        dbRef.current?.contains(event.target as Node) &&
        !lbRef.current?.contains(event.target as Node)
      ) {
        event.stopPropagation()
        handleClose()
        clickOutsideToClose && clickOutsideToClose()
      }
    })
  }, [])

  React.useEffect(() => {
    if (defaultValueInit) {
      if (defaultValueInit.getTime() < minDate.getTime()) {
        setMonth(minDate.getMonth())
        setSelectedDate(minDate)
      } else {
        setMonth(defaultValueInit.getMonth())
      }
    }

    if (defaultValueEnd) {
      if (defaultValueEnd.getTime() < minDate.getTime()) {
        setMonth(minDate.getMonth())
        setSelectedDateEnd(minDate)
      } else {
        setMonth(defaultValueEnd.getMonth())
      }
    }
  }, [])

  React.useEffect(() => {
    setIsOpen(showCalendar)
  }, [showCalendar])

  if (!isOpen) {
    return null
  }

  return (
    <div className="date__picker">
      <div className="date__picker__darkbox" ref={dbRef}>
        <div className="date__picker__lightbox" ref={lbRef}>
          {showHeader && (
            <div
              className="date__picker__header"
              style={{
                backgroundColor: colorScheme,
                color: headerTextColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* {showTitle && (
                <h4 className="date__picker__title">{title || 'Select Date'}</h4>
              )} */}
              <span className="date__picker__monthName">{getHeader()}</span>
           
              <span className="date__picker__year">
                {selectedDate ? selectedDate.getFullYear() : year}
              </span>
            </div>
          )}

          <div className="date__picker__nav">
            <div className="date__picker__selector">
              <select
                onChange={(e) => setMonth(parseInt(e.target.value))}
                value={month}
              >
                {months.map((monthName, index) => (
                  <option key={index} value={index}>
                    {monthName}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setYear(parseInt(e.target.value))}
                value={year}
              >
                {Array(maxDate.getFullYear() - minDate.getFullYear() + 1)
                  .fill(0)
                  .map((_, index) => (
                    <option key={index} value={maxDate.getFullYear() - index}>
                      {maxDate.getFullYear() - index}
                    </option>
                  ))}
              </select>
            </div>
            <div className="date__picker__prevNext">
              <button
                disabled={
                  minDate.getFullYear() === year && minDate.getMonth() === month
                }
                className="date__picker__navButton"
                onClick={() => changeMonth(-1)}
              >
                <svg
                  width={24}
                  height={24}
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#888'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
              </button>
              <button
                disabled={
                  maxDate.getFullYear() === year && maxDate.getMonth() === month
                }
                className="date__picker__navButton"
                onClick={() => changeMonth(+1)}
              >
                <svg
                  width={24}
                  height={24}
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#888'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="date__picker__body">
            <div className="date__picker__days">
              {days.map((day) => (
                <div className="date__picker__day" key={day}>
                  {day.substring(0, 3)}
                </div>
              ))}
            </div>
            <div className="date__picker__calendar">
              {calendar.map((day, index) => (
                <div
                  className={[
                    'date__picker__date',
                    day.getMonth() === month ? 'date__picker__outside' : 'date__picker__inside'
                  ].join(' ')}
                  key={index}
                >
                  <If test={range}>
                    <button
                      style={{
                        backgroundColor:
                          ((selectedDate && selectedDate.getTime() <= day.getTime()) && (selectedDateEnd && selectedDateEnd.getTime() >= day.getTime()))
                            ? colorScheme
                            : '#fff',
                        color:
                          ((selectedDate && selectedDate.getTime() <= day.getTime()) && (selectedDateEnd && selectedDateEnd.getTime() >= day.getTime()))
                            ? '#fff'
                            : '#000'
                      }}
                      onClick={() => selectDate(day)}
                      disabled={
                        day.getTime() < minDate.getTime() ||
                        day.getTime() > maxDate.getTime()
                      }
                    >
                      {day.getDate()}
                    </button>
                  </If>
                  <If test={!range}>
                    <button
                      style={{
                        backgroundColor:
                          selectedDate?.getTime() === day.getTime()
                            ? colorScheme
                            : '#fff',
                        color:
                          selectedDate?.getTime() === day.getTime()
                            ? '#fff'
                            : '#000'
                      }}
                      onClick={() => selectDate(day)}
                      disabled={
                        day.getTime() < minDate.getTime() ||
                        day.getTime() > maxDate.getTime()
                      }
                    >
                      {day.getDate()}
                    </button>
                  </If>
                  
                </div>
              ))}
            </div>
          </div>

          {showFooter && (
            <div className="date__picker__footer">
              <button
                disabled={!selectedDate}
                onClick={handleClear}
                style={{ color: colorScheme }}
              >
                {clearText}
              </button>
              <button style={{ color: colorScheme }} onClick={handleClose}>
                {closeText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default React.memo(DatePicker)
