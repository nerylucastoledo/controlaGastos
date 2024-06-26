import { Bill } from "../types";

export const mockWith3Data: Bill[] = [
  {
    "_id": "1",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "Eu",
    "category": "lazer",
    "value": "R$ 100,00",
    "item": "Item teste 1",
    "card": "Card 1"
  },
  {
    "_id": "2",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "Eu",
    "category": "lazer",
    "value": "R$ 200,00",
    "item": "Item teste 2",
    "card": "Card 2"
  },
  {
    "_id": "3",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "Eu",
    "category": "vestuario",
    "value": "R$ 61,90",
    "item": "Item teste 3",
    "card": "Card 3"
  }
]

export const mockWithDataToStatistic: Bill[] = [
  {
    "_id": "1",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "Eu",
    "category": "lazer",
    "value": "R$ 100,00",
    "item": "Item teste 1",
    "card": "Card 1"
  },
  {
    "_id": "2",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "Eu",
    "category": "lazer",
    "value": "R$ 200,00",
    "item": "Item teste 2",
    "card": "Card 2"
  },
  {
    "_id": "3",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "Eu",
    "category": "vestuario",
    "value": "R$ 61,90",
    "item": "Item teste 3",
    "card": "Card 3"
  },
  {
    "_id": "4",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "Eu",
    "category": "vestuario",
    "value": "R$ 100,00",
    "item": "Item teste 4",
    "card": "Card 4"
  }
]

export const mockWithDataToStatisticWhithoutEu: Bill[] = [
  {
    "_id": "1",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "People 1",
    "category": "lazer",
    "value": "R$ 100,00",
    "item": "Item teste 1",
    "card": "Card 1"
  },
  {
    "_id": "2",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "People 1",
    "category": "lazer",
    "value": "R$ 200,00",
    "item": "Item teste 2",
    "card": "Card 2"
  },
]

export const mockWithDataToInvoiceItem: Bill[] = [
  {
    "_id": "1",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "Eu",
    "category": "lazer",
    "value": "R$ 100,00",
    "item": "Item teste 1",
    "card": "Card 2"
  },
  {
    "_id": "2",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "Eu",
    "category": "lazer",
    "value": "R$ 200,00",
    "item": "Item teste 2",
    "card": "Card 1"
  },
  {
    "_id": "3",
    "username": "testeusername",
    "date": "Junho2024",
    "people": "People 1",
    "category": "vestuario",
    "value": "R$ 61,90",
    "item": "Item teste 3",
    "card": "Card 2"
  },
]

export const mockCardsToCardsComponent = [
  {
    "_id": "1",
    "username": "usernamelucas",
    "name": "card1",
    "color": "#d54848"
  },
  {
    "_id": "2",
    "username": "usernamelucas",
    "name": "card2",
    "color": "#962db4"
  },
  {
    "_id": "3",
    "username": "usernamelucas",
    "name": "card3",
    "color": "#d01616"
  }
]

export const mockBillToCardsComponent = [
  {
    "_id": "1",
    "username": "usernamelucas",
    "date": "Junho2024",
    "people": "People 1",
    "category": "vestuario",
    "value": "R$ 61,90",
    "item": "Item 1",
    "card": "card1"
  },
  {
    "_id": "2",
    "username": "usernamelucas",
    "date": "Junho2024",
    "people": "People 1",
    "category": "lazer",
    "value": "R$ 800,00",
    "item": "Item 2",
    "card": "card1"
  },
  {
    "_id": "3",
    "username": "usernamelucas",
    "date": "Junho2024",
    "people": "Eu",
    "category": "lazer",
    "value": "R$ 1.000,00",
    "item": "Item 3",
    "card": "card2"
  }
]