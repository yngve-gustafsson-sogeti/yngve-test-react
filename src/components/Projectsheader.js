import React from "react";
import plusSmall from "@ingka/ssr-icon/paths/plus-small"; //icon
import person from "@ingka/ssr-icon/paths/person"; //icon
import home from "@ingka/ssr-icon/paths/home"; //icon
import Pill from "@ingka/pill";
import Header from "./Header";

import "../scss/projectsheader.scss";

const Projectsheader = (props) => {
    return (
        <Header>
            <div className="projectsheader">
                <div className="col-hsb">
                </div>
                <div className="col-toolbar">
                    <Pill ssrIcon={plusSmall} iconOnly={true} small={true} onClick={props.newProject} />
                    <Pill ssrIcon={person} iconOnly={true} small={true} onClick={props.openProfileModal} />
                    <Pill ssrIcon={home} iconOnly={false} label="HFB" small={true} onClick={props.openHsbModal} />
                </div>
            </div>
        </Header>
    );
}

export default Projectsheader;