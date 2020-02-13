import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import Home from "./modules/Home";

export default class App extends Component {
    private currentUrl;
    
    render() {
        return (
            <div id="app">
                <Router onChange={this.handleRoute}>
                    <Home path="/" />
                </Router>
            </div>
        );
    }

    /** Gets fired when the route changes.
     *    @param {Object} event        "change" event from [preact-router](http://git.io/preact-router)
     *    @param {string} event.url    The newly routed URL
     */

    private handleRoute = (e: any) => {
        this.currentUrl = e.url;
    };
}
