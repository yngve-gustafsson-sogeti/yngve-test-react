import React, { useState, useEffect } from "react";
import Modal, { Prompt, ModalFooter, ModalHeader } from "@ingka/modal";
import Button from "@ingka/button";
import getData from "../functions/functions";
import { API_URL } from "../constants";

import "../scss/modalhsb.scss";

const ModalHsb = (props) => {
    const [allHfbs, setAllHfbs] = useState([]);

    const getHfbs = (projectId) => {
        getData(`${API_URL}/content-planning-projects/homefurnishingbusinesses/`)
        .then(response => response.json())
          .then(data => {
            console.log('Success: HFB data:', data._embedded);
            setAllHfbs(data._embedded.homeFurnishingBusinessList);
          }) 
          .catch((error) => {
            console.error('Error:', error);
            return null;
          });
    }

    useEffect(() => {
        getHfbs();
    }, []);

    const doNumberFormatting = (n) => {
        if(String(n).length === 1){
            return "0" + String(n);
        }
        return n;
    }

    const selectHfb = (hfbId) => {
        console.log("HfbId: ", hfbId);
        localStorage.setItem("hfb", hfbId);
        props.setSelectedHfb(hfbId);
        props.closeModal();
    }

    return (
        <Modal
            visible={props.isModalOpen} // Opens / Closes modal
            escapable={true} // the modal view can't be dismissed without interacting with modal content
            handleCloseBtn={props.closeModal} // on Internal close request
            className="modalhsb"
        >
            <Prompt
                title="Select HFB"
                footer={
                    <ModalFooter compact={true}>
                    <Button text="Cancel" type="secondary" onClick={props.closeModal} />
                    </ModalFooter>
                }
            >

            <ul className="hsb-list">
                {allHfbs.map(item => {
                    return (
                        <li className="hsb-list__item faked-link" 
                        data-id={item.homeFurnishingBusinessId}
                        key={"hfb-"+item.homeFurnishingBusinessId}
                        onClick={(e) => {selectHfb(e.target.getAttribute("data-id"))}}>
                            {doNumberFormatting(item.homeFurnishingBusinessId)} - {item.homeFurnishingBusinessNameLong}
                        </li>
                    )
                })}
            </ul>
          </Prompt>
        </Modal>
    );
}
export default ModalHsb;