/* eslint-disable no-unused-expressions */
import React from 'react'
import './date-picker.scss'
import If from 'Components/Templates/Operator/If'
import Input from 'Components/Templates/Form/Input'
import { formatDateBR, formatDateTimeBR } from 'Helpers'

interface Props {
  title?: string
  dayNames?: string[]
  monthNames?: string[]
  showTitle?: boolean
  error?: boolean
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
  selectText?: string
  valueSelectedInput?: string | string[]
  range?: boolean
  rangeMax?: number
  hours?: boolean
  onClose?: () => void
  onChange?: (date: any) => void // Date | null | Array<Date> | Array<null>
  showFooter?: boolean
  showHeader?: boolean
  clickOutsideToClose?: () => void,
}

enum TextHours {
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECONDS = 'seconds'
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
  isOpen: showCalendar = false,
  valueSelectedInput,
  onClose,
  title,
  dayNames,
  headerFormat,
  showTitle = true,
  error = false,
  monthNames,
  defaultValueInit,
  defaultValueEnd,
  minDate = new Date(OLD_YEAR, 0, 1),
  maxDate = new Date(MAX_YEAR, 11, 31),
  colorScheme = '#208de4',
  headerTextColor = '#fff',
  closeText = 'Fechar',
  clearText = 'Limpar',
  selectText = 'Selecionar',
  range = false,
  rangeMax = 30,
  hours = false,
  onChange,
  showFooter = true,
  showHeader = true,
  clickOutsideToClose,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(showCalendar)
  const [calendar, setCalendar] = React.useState<Date[]>([])
  const [days] = React.useState<string[]>(
    dayNames?.length === 7 ? dayNames : DAY_NAMES
  )
  const [months] = React.useState<string[]>(
    monthNames?.length === 12 ? monthNames : MONTH_NAMES
  )
  const startHoursDefault = ['00', '00', '00'];
  const endHoursDefault = ['23', '59', '59'];
  const [hourStart, setHourStart] = React.useState(startHoursDefault);
  const [hourEnd, setHourEnd] = React.useState(endHoursDefault);
  const [month, setMonth] = React.useState<number>(0)
  const [year, setYear] = React.useState<number>(new Date().getFullYear())
  const [emitValue, setEmitValue] = React.useState<any>(range ? [null, null] : null)
  const [valueToInput, setValueToInput] = React.useState<any>('');
  // valueSelectedInput

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

  const resetRangeDates = () => {
    setSelectedDate(null);
    setSelectedDateEnd(null);
  }

  const selectDate = (day: Date) => {
    setMonth(day.getMonth())
    setYear(day.getFullYear())

    if (range) {
      if (selectedDate && (selectedDateEnd !== selectedDate)) {
        resetRangeDates()
        return;
      }

      const dateStart = selectedDate ?? day;
      const dateEnd = !selectedDateEnd ? (selectedDate ?? day) : (selectedDateEnd !== day ? day : selectedDateEnd);
      
      const dayStart = dateStart.getDate();
      const monthStart = dateStart.getMonth();
      const yearStart = dateStart.getFullYear();
      const dayEnd = dateEnd.getDate();
      const monthEnd = dateEnd.getMonth();
      const yearEnd = dateEnd.getFullYear();

      if ((yearStart > yearEnd) || (monthStart > monthEnd) || (monthStart === monthEnd && dateStart > dateEnd)) {
        resetRangeDates()
        return;
      }

      const rangeDateOne = dayEnd >= dayStart ? dayStart : dayEnd;
      const rangeDateTwo = dayEnd >= dayStart ? dayEnd : dayStart;

      if ((rangeDateTwo - rangeDateOne) >= rangeMax) return;
      if (!selectedDate) setSelectedDate(day)
      if (selectedDate !== day) setSelectedDateEnd(day)

      onChange && setEmitValue([dateStart, dateEnd])
    } else {
      setSelectedDate(day)
      onChange && setEmitValue(day)
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

  const setHoursToInput = () => {
    if (!range) {
      const hourStartEmit = emitValue;
      hourStartEmit.setHours(Number(hourStart[0]))
      setEmitValue(hourStartEmit)
      return;
    }

    if (emitValue[0] || emitValue[1]) {
      const hourStartToEmit = new Date(emitValue[0]);
      
      hourStartToEmit.setHours(Number(hourStart[0] ?? startHoursDefault[0]));
      hourStartToEmit.setMinutes(Number(hourStart[1] ?? startHoursDefault[1]));
      hourStartToEmit.setSeconds(Number(hourStart[2] ?? startHoursDefault[2]));

      const hourEndToEmit = new Date(emitValue[1]);
      hourEndToEmit.setHours(Number(hourEnd[0] ?? endHoursDefault[0]));
      hourEndToEmit.setMinutes(Number(hourEnd[1] ?? endHoursDefault[1]));
      hourEndToEmit.setSeconds(Number(hourEnd[2] ?? endHoursDefault[2]));

      onChange && setEmitValue([hourStartToEmit, hourEndToEmit]);
    }
  }

  React.useEffect(() => {
    if (hours) setHoursToInput();
  }, [hourStart, hourEnd, selectedDate, selectedDateEnd]);

  const handleClear = () => {
    setSelectedDate(null)
    setSelectedDateEnd(null)
    setHourStart(startHoursDefault)
    setHourEnd(endHoursDefault)

    if (range) {
      onChange && setEmitValue([null, null])
      onChange && onChange([null, null]);
      setValueInput(null)
    } else {
      onChange && setEmitValue(null)
      onChange && onChange(null);
      setValueInput(null)
    }
  }

  const handleClose = () => {
    dbRef.current?.classList.add('date__picker__fadeOut')
    lbRef.current?.classList.add('date__picker__zoomOut')

    setTimeout(() => {
      setIsOpen(false)
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
  }, [showCalendar]);

  const formatUTCDateToBR = (date: string) => {
    if (hours) {
      return formatDateTimeBR(date);
    } else {
      return formatDateBR(date);
    }
  }

  const setValueInput = React.useCallback((value: any) => {
    const valueIsNull = !value || (Array.isArray(value) && (!value[0] || !value[1]));
  
    if (valueIsNull) {
      setValueToInput('');
      return;
    }

    if (range) {
      const newDates = value.map((date: string) => formatUTCDateToBR(date));
      setValueToInput(`${newDates[0]} ~ ${newDates[1]}`);
    } else {
      const newDate = formatUTCDateToBR(value);
      setValueToInput(newDate);
    }
  }, []);

  React.useEffect(() => {
    setValueInput(valueSelectedInput);
  }, [valueSelectedInput, setValueInput])

  const transformValorToHours = (value: string, valueMax: string) => {
    const valueIsNumber = /^\d+$/.test(value.trim());
    if (!valueIsNumber && value.trim() !== '') return '00';
    if (Number(value) > Number(valueMax)) return valueMax;
    if (Number(value) < 0) return '00';
    return value.trim();
  }

  const onChangeHours = (
    value: string, 
    type: string, 
    oldValue: Array<string>,
    callback: Function,
  ) => {
    const newHours = [...oldValue];

    if (type === TextHours.HOURS)
      newHours[0] = transformValorToHours(value, '23')

    if (type === TextHours.MINUTES)
      newHours[1] = transformValorToHours(value, '59')

    if (type === TextHours.SECONDS)
      newHours[2] = transformValorToHours(value, '59')

    callback(newHours)
  }

  const submit = () => {
    if (!onChange) return;
    onChange(emitValue);
    handleClose();
  };

  return (
    <div className="date__picker">
      <Input
        type="date-picker"
        label={title}
        readOnly={true}
        value={valueToInput}
        onClick={() => setIsOpen(true)}
        clearDatePicker={handleClear}
      />

      <If test={isOpen}>
        <div className="date__picker__content">
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

              {(hours && selectedDate) && (
                <div className="date__picker__hours">
                  <div className="date__picker__hours__start">
                    <input 
                      placeholder="00" 
                      maxLength={2} 
                      onChange={(e) => onChangeHours(
                        e.target.value, 
                        TextHours.HOURS, 
                        hourStart,
                        (newHours: any) => setHourStart(newHours)
                      )}
                      value={hourStart[0]}
                    />
                    <span>:</span>
                    <input 
                      placeholder="00" 
                      maxLength={2} 
                      onChange={(e) => onChangeHours(
                        e.target.value, 
                        TextHours.MINUTES, 
                        hourStart,
                        (newHours: any) => setHourStart(newHours)
                      )}
                      value={hourStart[1]}
                    />
                    <span>:</span>
                    <input 
                      placeholder="00" 
                      maxLength={2} 
                      onChange={(e) => onChangeHours(
                        e.target.value, 
                        TextHours.SECONDS, 
                        hourStart,
                        (newHours: any) => setHourStart(newHours)
                      )}
                      value={hourStart[2]}
                    />
                  </div>

                  {range && (
                    <>
                      <span>até</span>
                      <div className="date__picker__hours__end">
                        <input 
                          placeholder="00" 
                          maxLength={2} 
                          onChange={(e) => onChangeHours(
                            e.target.value, 
                            TextHours.HOURS, 
                            hourEnd,
                            (newHours: any) => setHourEnd(newHours)
                          )}
                          value={hourEnd[0]}
                        />
                        <span>:</span>
                        <input 
                          placeholder="00" 
                          maxLength={2} 
                          onChange={(e) => onChangeHours(
                            e.target.value, 
                            TextHours.MINUTES, 
                            hourEnd,
                            (newHours: any) => setHourEnd(newHours)
                          )}
                          value={hourEnd[1]}
                        />
                        <span>:</span>
                        <input 
                          placeholder="00" 
                          maxLength={2} 
                          onChange={(e) => onChangeHours(
                            e.target.value, 
                            TextHours.SECONDS, 
                            hourEnd,
                            (newHours: any) => setHourEnd(newHours)
                          )}
                          value={hourEnd[2]}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {showFooter && (
                <div className="date__picker__footer">
                  <button className="date__picker__footer_action__close" onClick={handleClose}>
                    {closeText}
                  </button>

                  <div className="date__picker__footer_action">
                    <button
                      disabled={!selectedDate}
                      onClick={handleClear}
                      style={{ color: colorScheme }}
                      className="date__picker__footer_action__clean"
                    >
                      {clearText}
                    </button>

                    <button
                      disabled={!selectedDate}
                      className="date__picker__footer_action__select"
                      style={{ background: colorScheme }}
                      onClick={() => submit()}
                    >
                      {selectText}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </If>
    </div>
  )
}
export default React.memo(DatePicker)
