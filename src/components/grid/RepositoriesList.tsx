import React from 'react';
import { Link } from 'react-router-dom';
import { RepositoryType } from '../../types';

const RepositoriesList = ({ data }: { data: [] | RepositoryType[] }): JSX.Element | null => {
	if (!(data && data.length)) return null;

	return (
		<ul className="collection">
			{data.map(({ node }) => {
				return (
					<li className="collection-item" key={node.nameWithOwner}>
						<Link to={`/repository/${node.owner.login}/${node.name}`}>{node.owner.login} / {node.name}</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default RepositoriesList;
