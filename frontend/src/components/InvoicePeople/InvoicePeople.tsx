import "./InvoicePeople.scss"

interface IProps {
  peoples: string[];
  peopleSelected: string;
  setPeopleSelected: React.Dispatch<React.SetStateAction<string>>;
}

const InvoicePeople = ({ peoples, peopleSelected, setPeopleSelected }: IProps) => {
  return (
    <div className="invoice__container-names">
      <button 
        className={peopleSelected === "Eu" ? "active" : ""}
        onClick={() => setPeopleSelected("Eu")}
      >
        Eu
      </button>
      
      {peoples?.length ? peoples.map(people => (
        <button 
          key={people} 
          className={people === peopleSelected ? "active" : ""}
          onClick={() => setPeopleSelected(people)}
          data-testid="people"
        >
          {people}
        </button>
      )) : null}
    </div>
  )
}

export default InvoicePeople
