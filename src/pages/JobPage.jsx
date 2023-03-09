import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { AppState } from "../AppState";
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";
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
        <div className="row sticky-bottom">
          <div className="col-12 text-end">
          <button className="btn btn-dark" title="Create Job" data-bs-target="#jobModal" data-bs-toggle="modal">
            Create Job
          </button>
          </div>
        </div>

      {/* BOOTSTRAP MODAL */}
      <div className="modal fade" id="jobModal" tabIndex={-1} role="dialog" aria-labelledby="jobModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
              <div className="modal-header">
                      <h5 className="modal-title" id="modalTitleId">Job Form</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                  <div className="container-fluid">
                  <JobForm />
                  </div>
              </div>
            </div>
        </div>
      </div>

  )


}
export default observer(JobPage)