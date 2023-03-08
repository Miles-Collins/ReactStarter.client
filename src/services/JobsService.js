import { AppState } from "../AppState";
import { Job } from "../models/Job";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class JobsService {
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
