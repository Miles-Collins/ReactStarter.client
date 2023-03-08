export class Job {
  constructor(data = {}) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.description = data.description;
    this.hours = data.hours;
    this.title = data.jobTitle;
    this.rate = data.rate;
    this.img = "https://picsum.photos/200";
  }
}
