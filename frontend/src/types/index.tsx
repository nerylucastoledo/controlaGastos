export interface Card {
  name: string;
  color: string
  username: string;
}

export interface Category {
  name: string;
  username: string;
}

export interface People {
  name: string;
  username: string;
}

export interface Bill {
  username: string;
  people: string;
  card: string;
  value: string;
  category: string;
  date: string
}

export interface IData {
  salary: string;
  billList: Bill[];
  cardList: Card[];
  peopleList: People[];
  categoryList: Category[];
}