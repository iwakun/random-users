import { React, useState, useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom';

function Home(props) {
	const [search, setSearch ] = useState('');

	const unfilteredUsers = props.users;
	const [ filteredUsers, setFilteredUsers ] = useState(unfilteredUsers);

	const doSearch = (e) => {
		e.preventDefault();

		let keyword = e.target.value;
		setSearch(keyword);

		let filter = unfilteredUsers.filter((item) => {
			return (
				item.name.first.indexOf(keyword) !== -1 ||
				item.name.last.indexOf(keyword) !== -1 ||
				item.email.indexOf(keyword) !== -1 ||
				item.location.city.indexOf(keyword) !== -1 ||
				item.location.country.indexOf(keyword) !== -1
			)
		});
		if(keyword === '') {
			setFilteredUsers(unfilteredUsers);
		} else {
			setFilteredUsers(filter);
		}
	}

	useEffect(() => {
		let unfilteredUsers = props.users;
		setFilteredUsers(unfilteredUsers);
	}, [props.users])

	const Row = ({ index, style }) => {
		return (
			<div style={style} className={index % 2 ? 'user-even' : 'user-odd'}>
				<Link className="user" to={`/details/${filteredUsers[index].userid}`}>
					<div className="user-name">
						{filteredUsers[index].name.first} {filteredUsers[index].name.last}
					</div>
					<div className="user-email">
						{filteredUsers[index].email}
					</div>
					<div className="user-location">
						{filteredUsers[index].location.city}, {filteredUsers[index].location.country}
					</div>
				</Link>
			</div>
		);
	};
	return (
		<div className="page-home">
			<header>
				<h1>Users</h1>
			</header>
			<div className="users-container">
				<input
					className="users-search"
					type="text"
					value={search}
					placeholder="Search"
					onChange={doSearch} />
				{ filteredUsers.length > 0 ? (
					<FixedSizeList
						height={700}
						width={1000}
						itemSize={35}
						itemCount={filteredUsers.length}
						className="users">
						{Row}
					</FixedSizeList>
				) : (
					<p>No results found</p>
				)}
			</div>
		</div>
	);
}

export default Home;
