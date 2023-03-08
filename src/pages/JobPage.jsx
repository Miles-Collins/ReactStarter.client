import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { AppState } from "../AppState";
import JobCard from "../components/JobCard";
import { jobsService } from "../services/JobsService";
import Pop from "../utils/Pop";

function JobPage() {

  async function getJobs() {
    try {
      await jobsService.getJobs()
    }
    catch (error){
      Pop.error(error);
    }
  }

  let jobs = (AppState.jobs.map(job => {
    return (
      <div className="col-6 col-md-3 my-3" key={job.id}>
        <JobCard job={job} />
      </div>
    )
  }))

  useEffect(() => {
    getJobs()
  }, [])
  return (

    <div className="JobPage">
      <div className="container-fluid">
        <div className="row">
            {jobs}
          </div>
        </div>
      </div>
  )

}
export default observer(JobPage)