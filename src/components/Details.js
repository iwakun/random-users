import {
	React,
	useEffect,
	useState
} from 'react';
import {
	useParams,
	Link
} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Details() {
	const { id } = useParams();
	const [ user, setUser ] = useState('');

	useEffect(() => {
		axios
			.get(`http://localhost:4000/user/${id}`)
			.then((response) => {
				setUser(response.data);
			});
	}, [id])

	return (
		<div className="page-details">
			{ user ? (
				<>
					<header>
						<Link className="back-button" to="/">
							<FontAwesomeIcon icon={faArrowLeft} />
						</Link>
					</header>
					<div className="user-card">
						<div
							className="user-card-image"
							style={{'backgroundImage': `url(${user.picture.large})`}}>
						</div>
						<h1 className="user-card-name">
							{user.name.first} {user.name.last}
						</h1>
						<ul className="user-card-details">
							<li><strong>Email:</strong> {user.email}</li>
							<li><strong>Phone:</strong> {user.phone}</li>
							<li>
								<strong>Address:</strong>{` `}
								{user.location.street.number} {user.location.street.name}
								{' '}
								{user.location.city}, {user.location.state} {user.location.country}
							</li>
						</ul>
					</div>
				</>
			) : (
				<p>... Loading ...</p>
			)}
		</div>
	);
}

export default Details;
