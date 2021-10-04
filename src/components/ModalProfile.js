import React from "react";
import Modal, { Prompt, ModalFooter } from "@ingka/modal";
import Button from "@ingka/button";
import gear from "@ingka/ssr-icon/paths/gear"; //icon
import logout from "@ingka/ssr-icon/paths/arrow-left-to-base"; //icon
import SSRIcon from "@ingka/ssr-icon";

import "../scss/modalprofile.scss";

const ModalProfile = (props) => {

    return (
        <Modal
            visible={props.isModalOpen} // Opens / Closes modal
            escapable={true} // the modal view can't be dismissed without interacting with modal content
            handleCloseBtn={props.closeModal} // on Internal close request
            className="modalprofile"
        >
            <Prompt
                title="Profile"
                footer={
                    <ModalFooter compact={true}>
                    <Button text="Close" type="secondary" onClick={props.closeModal} />
                    </ModalFooter>
                }
            >

            <ul className="profile-list">    
                <li className="profile-list__item faked-link" key="settings" onClick={(e) => {console.log("Settings")}}>
                    <button className="profile-list__button"><SSRIcon paths={gear} /> Settings</button>
                </li>
                <li className="profile-list__item faked-link" key="logout" onClick={(e) => {console.log("Log out")}}>
                    <button className="profile-list__button"><SSRIcon paths={logout} /> Log out</button> 
                </li>
            </ul>
          </Prompt>
        </Modal>
    );
}
export default ModalProfile;