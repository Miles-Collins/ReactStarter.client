export class House {
  constructor(data = {}) {
    this.id = data.id;
    this.bathrooms = data.bathrooms || 0;
    this.bedrooms = data.bedrooms || 0;
    this.createdAt = data.createdAt || new Date();
    this.description = data.description || "";
    this.houseImg = data.imgUrl;
    this.levels = data.levels || 0;
    this.price = data.price || 0;
    this.updatedAt = data.updatedAt || new Date();
    this.year = data.year || 0;
  }
}
