import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import Home from './modules/Home';

const App = () => {
	function handleRoute(e: any) {
		return e.url;
	}
	return (
		<div id="app">
			<Router onChange={handleRoute}>
				<Home path="/" />
			</Router>
		</div>
	);

	/** Gets fired when the route changes.
     *    @param {Object} event        "change" event from [preact-router](http://git.io/preact-router)
     *    @param {string} event.url    The newly routed URL
     */
};

export default App;
