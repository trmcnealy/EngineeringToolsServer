import * as React from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";


import "../css/Body.css"

//import "../node_modules/react-grid-layout/css/styles.css"
//import "../node_modules/react-resizable/css/styles.css"

export default class App extends React.Component {
    static displayName = App.name;

    render () {
        return (
            <Layout>
                <Route exact path="/" component={Home}/>
            </Layout>
        );
    }
}
