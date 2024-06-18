export interface ICard {
  _id?: string;
  name: string;
  color: string;
}

export interface Card extends ICard {
  username: string;
}

export interface Category {
  _id: string;
  name: string;
  username: string;
}

export interface People {
  _id: string;
  name: string;
  username: string;
}

export interface Bill {
  _id: string;
  username: string;
  people: string;
  card: string;
  value: string;
  category: string;
  date: string;
  item: string;
}

export interface IData {
  _id: string;
  salary: string;
  billList: Bill[];
  cardList: Card[];
  peopleList: People[];
  categoryList: Category[];
}