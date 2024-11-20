export interface internationalProduct {
  "id": string,
  "title": string,
  "price": number,
  "description": string,
  "category": {
    "id": number,
    "name": string,
    "image": string
  }
  images: string[]
}
