import { AppState } from "../AppState";
import { Job } from "../models/Job";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class JobsService {
  async create(editable) {
    const res = await api.post("api/jobs", editable);
    logger.log("create  res:", res.data);
    AppState.jobs.push(new Job(res.data));
    logger.log("create  AppState.jobs:", AppState.jobs);
  }
  edit(editable) {
    throw new Error("Method not implemented.");
  }
  async removeJob(id) {
    const res = await api.delete(`api/jobs/${id}`);
    logger.log("removeJob  res:", res.data);
    AppState.jobs = AppState.jobs.filter((job) => job.id != id);
  }
  async getJobs() {
    const res = await api.get("api/jobs");
    logger.log("getJobs  res:", res.data);
    AppState.jobs = res.data.map((job) => new Job(job));
    logger.log("getJobs  AppState.jobs:", AppState.jobs);
  }
}

export const jobsService = new JobsService();
