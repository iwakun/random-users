import {
	React,
	useState,
	useEffect
} from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import axios from 'axios';

import Home from './Home';
import Details from './Details';

function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:4000/users')
			.then((response) => {
				setUsers(response.data);
			});
	}, []);

	return (
		<Router>
			<Switch>
				<Route path="/details/:id">
					<Details />
				</Route>
				<Route path="/">
					<Home users={users} />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
