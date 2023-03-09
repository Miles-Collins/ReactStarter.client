import { observer } from 'mobx-react-lite';
import React from 'react';
import { AppState } from "../AppState";
import { Job } from "../models/Job";
import { jobsService } from "../services/JobsService";
import { BindEditable } from "../utils/FormHandler";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

function JobForm() {
  let editable = {...AppState.activeJob || new Job({})}
 
  const bindEditable = BindEditable(editable)

  async function handleSubmit() {
    try {
      if(window.event) {
        window.event.preventDefault()
        logger.log("JobForm  editable:", editable);
        editable.id 
        ? await jobsService.edit(editable)
        : await jobsService.create(editable)
        if (editable.id) {
          Pop.success('Edited Job.')
        } else {
          Pop.success('Created Job.')
        }
        AppState.activeJob = null
      }
    }
    catch (error){
      logger.log('Handle Submit "JOBS" Error', error)
      Pop.error(error);
    }
  }

  return (

    <form onSubmit={handleSubmit} key={editable.id} className="">
      <div className="modal-body">

    <div>
    <label className="form-label" htmlFor="title">Company Name</label>
    <input className="form-control" required  type="text" name="company" id="company" defaultValue={editable.company} onChange={bindEditable} placeholder="Company Title..."/>
    </div>

    <div>
    <label className="form-label" htmlFor="title">Title</label>
    <input className="form-control" required  type="text" name="jobTitle" id="jobTitle" defaultValue={editable.title} onChange={bindEditable} placeholder="Job Title..."/>
    </div>

    <div>
    <label className="form-label" htmlFor="hours">Hours</label>
    <input className="form-control" id="hours" name="hours" defaultValue={editable.hours} onChange={bindEditable} type="number" placeholder="Hours..." />
    </div>

    <div>
    <label className="form-label" htmlFor="rate">Pay</label>
    <input className="form-control" id="rate" name="rate" defaultValue={editable.rate} onChange={bindEditable} type="number" placeholder="Pay Per Hour..."/>
    </div>

    <div>
    <label className="form-label" htmlFor="description">Description</label>
    <textarea className="form-control" id="description" name="description" defaultValue={editable.description} onChange={bindEditable} rows={3} placeholder="Job Description..."/>
    </div>

    <div className="modal-footer">
        <button type="submit" data-bs-dismiss="modal" className="btn btn-dark">
          Submit
        </button>
    </div>
      </div>
    </form>
  )

}
export default observer(JobForm)