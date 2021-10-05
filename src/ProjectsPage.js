import React, { useState, useEffect, useDebugValue } from 'react';
import { useHistory, Link } from "react-router-dom";
import circleFilled from "@ingka/ssr-icon/paths/circle-filled"; //icon
import ActionList, { ActionListItem } from "@ingka/action-list";
import Projectsheader from './components/Projectsheader';
import ModalNewProject from "./components/ModalNewProject";
import ModalHfb from './components/ModalHfb';
import ModalProfile from './components/ModalProfile';
import {getData, getMonth, getYear} from "./functions/functions";
import { API_URL, API_GET_ALL_PROJECTS, API_GET_HFB } from './constants';
import Tabs, { Tab, TabPanel } from "@ingka/tabs";

import "./scss/style.scss";
import "./scss/projectspage.scss";

function initSetHfbId(){
  let hfb = localStorage.getItem("hfb");
    if(hfb !== null){
      return hfb;
    }
    return undefined;
}


const ProjectsPage = () => { 
  const [projects, setProjects] = useState([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showHsbModal, setShowHsbModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [hfbId, setHfbId] = useState(initSetHfbId());
  const [hfbData, setHfbData] = useState();
  const history = useHistory();

  useEffect(() => {
      getProjects(hfbId);
      getHfb(hfbId);
      if(hfbId === undefined || hfbId === null){
        setShowHsbModal(true);
      }
  }, []);

  const getProjects = (id) => {
    if(hfbId !== null || hfbId !== undefined) { 
      getData(`${API_URL}${API_GET_ALL_PROJECTS}${id}`)
      .then(response => response.json())
        .then(data => {
          if(data._embedded !== undefined) {
            console.log('Projects:', data);
            setProjects(data._embedded.projectList);
          } else {
            console.log("Error: Could not find HFB");
            setProjects([]);
          }
        }) 
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  //Get the whole HFB-object
  const getHfb = (id) => {
    if(hfbId !== null || hfbId !== undefined) { 
      getData(`${API_URL}${API_GET_HFB}${id}`)
      .then(response => response.json())
        .then(data => {
            console.log('HFB:', data);
            setHfbData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', 
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
  }

  //Add Project
  const addProject = (project) => {
    setProjects(oldArray => [...oldArray, project]);
  }

  //Open project modal
  const openNewProjectModal = () => {
    //console.log("Open New Project Modal");
    setShowNewProjectModal(true);
  } 

  //Close project modal
  const closeNewProjectModal = () => {
    //console.log("Close New Project Modal");
    setShowNewProjectModal(false);
  }

  //Open HSB modal
  const openHsbModal = () => {
    setShowHsbModal(true);
  } 

  //Close HSB modal
  const closeHsbModal = () => {
    setShowHsbModal(false);
  }

  //Set selected HSB
  const setSelectedHfb = (id) => {
    setHfbId(id);
    getHfb(id);
    getProjects(id);
  }

  //Go to budget page
  const openProject = (path) => {
    history.push(path);
  }

  //Open Profile Modal
  const openProfileModal = () => {
    setShowProfileModal(true);
  } 

  //Close Profile Modal
  const closeProfileModal = () => {
    setShowProfileModal(false);
  }



  //console.log("HFB Id: ", hfbId);

  let homeFurnishingBusinessId = hfbData === undefined ? "" : hfbData.homeFurnishingBusinessId;
  let homeFurnishingBusinessName = hfbData === undefined ? "" : hfbData.homeFurnishingBusinessNameLong
  if(String(homeFurnishingBusinessId).length === 1){
    homeFurnishingBusinessId = "0" + homeFurnishingBusinessId;
  }

  const tabs = [
    <Tab 
      key='tab-projects' 
      text={"Projects"} 
      tabPanelId="tab_projects" 
    />,
    <Tab 
      key='tab-total'
      text={"Total"} 
      active 
      tabPanelId="tab_total" 
    />,
  ];

  const projectsTabPanel = () => {
    return(
      <TabPanel key='tab-projects' tabPanelId="tab_projects">
        <Projectsheader newProject={openNewProjectModal} openHsbModal={openHsbModal} openProfileModal={openProfileModal} hfbId={homeFurnishingBusinessId} hfbName={homeFurnishingBusinessName}/>
          <ActionList>
            {projects.map(item => {
              return (
                <ActionListItem
                  onClick={() => openProject(`/budget/${item.projectId}`)}
                  inset
                  ssrIcon = {circleFilled}
                  label={item.projectName}
                  caption={getMonth(item.saleStartDate) +" "+ getYear(item.saleStartDate)}
                  key={item.projectId}
                />
              )
            })}
          </ActionList>
      </TabPanel>
    );
  }

  const totalTabPanel = () => {
    return(
      <TabPanel
        key='tab-total'
        tabPanelId="tab_total"
        title="Total"
        text="Lorem ipsum dolor..."
      />
    );
  }

  const tabPanels = [projectsTabPanel(), totalTabPanel()];

  return (
    <div className="page-projects">
      <div className="page-container budget">
        <div className="page-container__inner">
          <div className="page-container__main">
            <Tabs tabs={tabs} tabPanels={tabPanels} defaultActiveTab="tab_projects" />
          </div>
        </div>
      </div>

      <ModalNewProject isModalOpen={showNewProjectModal} closeModal={closeNewProjectModal} addProject={addProject} hfbId={hfbId} type={"new"} />
      <ModalHfb isModalOpen={showHsbModal} closeModal={closeHsbModal} setSelectedHfb={setSelectedHfb} />
      <ModalProfile isModalOpen={showProfileModal} closeModal={closeProfileModal} />
    </div>
  );
};

export default ProjectsPage;


//<h3 className="faked-link" onClick={setShowHsbModal}><a>{homeFurnishingBusinessId} - {homeFurnishingBusinessName}</a></h3>
