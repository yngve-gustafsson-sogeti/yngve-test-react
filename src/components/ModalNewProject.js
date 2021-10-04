import React, { useState, useEffect } from "react";
import Modal, { Prompt, ModalFooter, ModalHeader } from "@ingka/modal";
import Button from "@ingka/button";
import FormField from '@ingka/form-field';
import InputField from '@ingka/input-field';
import Checkbox from '@ingka/checkbox';
//import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import DatePicker from "react-datepicker";
//import sv from 'date-fns/locale/sv';
//registerLocale('sv', sv);
import { format } from 'date-fns';
import { postData, getData, putData } from "../functions/functions";
import { API_URL } from "../constants";

import "../scss/modalnewproject.scss";

//Props | isModalOpen=true/false | closeModal = Function to close | addProject = Function to add new project

const ModalNewProject = (props) => {
    const [projectId, setProjectId] = useState(props.projectId);
    const [projectName, setProjectName] = useState("");
    const [projectDate, setProjectDate] = useState(new Date());
    const [budget, setBudget] = useState("");
    const [runningRange, setRunningRange] = useState(false);
    const [isProjectNameValid, setIsProjectNameValid] = useState(true);
    const [project, setProject] = useState();
    //const [isValid, setIsValid] = useState(true);

    useEffect(() => {
      //debugger;
      if(props.type === "update") {
        getData(`${API_URL}//content-planning-projects/projects/${projectId}`)
        .then(response => response.json())
        .then(data => {
            setProject(data);
            setProjectName(data.projectName);
            setRunningRange(data.runningRange);
            setBudget(data.estimatedBudget);
            
            var d = new Date(`${data.saleStartDate}T03:30:00`);
            setProjectDate(d); //'1995-12-17T03:24:00'
        })
        .catch((error) => {
          console.error('Error getting project: ', error);
        });
      }
    }, []);


    const save = () => {
      if(props.type === "new") {
        saveNew();
      } else if (props.type === "update") {
        update();
      } else {
        console.log("Error: could not save or update project. No selection is defined");
        props.closeModal();
      } 
    }

    const update  = () => {
      let projectData = {
        projectName: projectName,
        saleStartDate: format(projectDate, "yyyy-MM-dd"),
        runningRange: runningRange,
        estimatedBudget: budget
      };

      putData(`${API_URL}/content-planning-projects/projects/${projectId}`, projectData)
        .then(data => {
          console.log("Update return: ", data); // JSON data parsed by `data.json()` call
          props.addProject(data);
          props.closeModal();
          //setProjectName("");
          //setBudget("");
          //setRunningRange(false);
        });

    }

    const saveNew = () => {
      if(projectName === ""){
        setIsProjectNameValid(false);
      } else {
        let projectData = {
          projectName: projectName, 
          saleStartDate: format(projectDate, "yyyy-MM-dd"), 
          runningRange: runningRange, 
          estimatedBudget: budget,
          homeFurnishingBusiness: {
            homeFurnishingBusinessId: props.hfbId
          }
        };

        console.log("Save: ", projectData);

        postData(`${API_URL}/content-planning-projects/projects`, projectData)
        .then(data => {
          console.log("Post return: ", data); // JSON data parsed by `data.json()` call
          props.addProject(data);
          props.closeModal();
          setProjectName("");
          setBudget("");
          setRunningRange(false);
        });
      }
    }

    //const [startDate, setStartDate] = useState(new Date());

    return (
        <Modal
          visible={props.isModalOpen} // Opens / Closes modal
          escapable={true} // the modal view can't be dismissed without interacting with modal content
          handleCloseBtn={props.closeModal} // on Internal close request
          className="modalnewproject"
        >
          <Prompt
            title={props.type === "new" ? "New Project": "Edit Project"}
            footer={
              <ModalFooter compact={true}>
                <Button text="Save" type="primary" onClick={save} />
                <Button text="Cancel" type="secondary" onClick={props.closeModal} />
              </ModalFooter>
            }
          >
            <FormField
              valid={isProjectNameValid}
              shouldValidate={true}
              className="projectname"
              validation={{
                  msg: 'Project name can not be empty',
                  id: 'emptyProjectName'
              }}
              >
              <InputField 
                  label="Project name"
                  id="projectname"
                  type="text" 
                  value={projectName}
                  onChange={(e) => { setProjectName(e.target.value); }}
              />
            </FormField>

            <div className="datepicker">
              <label>Start date</label>
              <DatePicker dateFormat="yyyy-MM-dd" selected={projectDate} onChange={(date) => setProjectDate(date)} />
            </div>

            {/* <FormField
              valid={true}
              shouldValidate={false} 
              validation={{
                  msg: 'Validation - Some validation message',
                  id: 'some-error-id'
              }}
              >
                <InputField 
                    label="Date"
                    id="projectdate"
                    type="text"
                    //class="projectdate" 
                    value={projectDate}
                    onChange={(e) => { setProjectDate(e.target.value); }}
                />
            </FormField> */}

            <FormField
              valid={true}
              shouldValidate={false} 
              validation={{
                  msg: 'Validation - Some validation message',
                  id: 'some-error-id'
              }}
              >
                <InputField 
                    label="Estimated budget"
                    id="budget"
                    type="text"
                    //className="budget" 
                    value={budget}
                    onChange={(e) => { setBudget(e.target.value); }}
                />
              </FormField>

                <Checkbox 
                    label="Running range"
                    checked={runningRange}
                    onChange={(e) => { setRunningRange(e.target.checked)}} />
          </Prompt>
        </Modal>
    );
}
export default ModalNewProject;