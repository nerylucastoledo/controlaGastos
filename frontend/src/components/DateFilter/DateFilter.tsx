import { SelectField } from "../SelectField/SelectField";

import { monthsAndYears } from "../../utils/Date"

interface IProps {
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  currentMonth: string;
  currentYear: string;
}

export const DateFilter = ({ setMonth, setYear, currentMonth, currentYear }: IProps) => {
  const { months, years } = monthsAndYears()

  return (
    <div className="dashboard__container-content-select">
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