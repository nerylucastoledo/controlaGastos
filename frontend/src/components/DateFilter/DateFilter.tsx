import SelectField from "../SelectField/SelectField";

import { monthsAndYears } from "../../utils/Date"

interface IProps {
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  setYear: React.Dispatch<React.SetStateAction<string>>;
}

export const DateFilter = ({ setMonth, setYear }: IProps) => {
  const { currentMonth, currentYear, months, years } = monthsAndYears()

  return (
    <div className="dashboard__container-select">
      <SelectField 
        label="Selecione o mês" 
        name="month"
        options={months}
        defaultValue={currentMonth}   
        onChange={({target}) => setMonth(target.value)}
      />
  
      <SelectField 
        label="Selecione o ano" 
        name="year"
        options={years}
        defaultValue={currentYear}
        onChange={({target}) => setYear(target.value)}
      />
    </div>
  )
}

export default DateFilter;