import PropTypes from "prop-types"
import React from 'react';
import { AppState } from "../AppState";
import { Job } from "../models/Job";
import { jobsService } from "../services/JobsService";
import Pop from "../utils/Pop";
import './Styles/JobCard.scss'

/**@param {{job:Job}} props */
export default function JobCard({job}) {

  async function remove() {
    try {
      const yes = await Pop.confirm(`Do you want to delete the ${job.title}`)
      if(!yes) {return}
      await jobsService.removeJob(job.id)
    }
    catch (error){
      Pop.error(error);
    }
  }

function setActive() {
  AppState.activeJob = job
}

let title = `Remove ${job.title}`

  return (

    <div onClick={setActive} className="col-12 job-card">
      <div className="row p-2">
        <div className="col-10">
          <h4>{job.company}</h4>
          <h5>{job.title}</h5>
        </div>
        <div className="col-2 text-end">
          <button onClick={remove} className="selectable" title={title}>✖️</button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <img className="job-Card" src={job.img} alt="" srcSet="" />
        </div>
      </div>
      <div className="row p-2">
        <div className="col-12">
          <p>Description: {job.description}</p>
        </div>
        <div className="col-12">
          <p>Pay rate: ${job.rate}/Hr.</p>
          <p>Hours: {job.hours} Hours</p>
        </div>
      </div>
    </div>
    
  )

}

JobCard.propTypes = {
  job: PropTypes.instanceOf(Job)
}