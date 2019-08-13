import React from "react"
import { Route, Switch } from "react-router-dom";

import Route1 from "./routes/route-1"
import Route2 from "./routes/route-2"

export default props => {
    return (
        <React.Fragment>

            <Switch>
                <header>
                    <h1>Test route component</h1>
                </header>
                <Route path="/route-1/" component={Route1} />
                <Route path="/route-2" component={Route2} />
            </Switch>
        </React.Fragment>
    )
}