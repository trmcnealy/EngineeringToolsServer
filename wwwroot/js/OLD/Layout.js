import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";

import {MyFirstGrid} from "./Dashboard";


export class Layout extends Component {
    static displayName = Layout.name;

    render () {
        return (
            <div id="app" className="app">
                <NavMenu/>
                <MyFirstGrid/>
            </div>
        );
    }
}
