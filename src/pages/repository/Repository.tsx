import React, { useState, useCallback, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import Input from '../../components/inputs/Input';
import Radio from '../../components/inputs/Radio';
import Loading from '../../components/loading/Loading';
import Error from '../../components/errors/Error';
import HorizontalCard from '../../components/cards/HorizontalCard';
import NoMatch from '../no-match/NoMatch';
import { StateType, PageInfoType } from '../../types';
import { generateIssueQuery } from '../../utils';

type RepositoryType = {
	repository: {
		id: string;
    nameWithOwner: string;
    description: string;
    url: string;
    issues: {
    	totalCount: number;
    };
	};
};

type IssueType = {
	__typename: string;
	id: string;
	number: number;
  createdAt: string;
  title: string;
  url: string;
  state: string;
};

type IssueNodeType = {
  // eslint-disable-next-line
	node: IssueType;
};

type SearchType = {
	search: {
		issueCount: number;
		pageInfo: PageInfoType;
		edges: IssueNodeType[];
	};
};

export const GET_REPOSITORY = gql`
  query getRepository($owner: String!, $repositoryId: String!) {
    repository(owner: $owner, name: $repositoryId){
      id
      nameWithOwner
      description
      url
      issues{
      	totalCount
      }
    }
  }
`;

export const GET_ISSUE = gql`
	query getIssue($query: String!, $after: String) {
	  search(query: $query, first: 20, type: ISSUE, after: $after) {
	    issueCount
	    pageInfo {
	      hasNextPage
	      hasPreviousPage
	      endCursor
	    }
	    edges {
	      node {
	        ... on Issue {
	        	__typename
	        	id
	        	number
	          createdAt
	          title
	          url
	          state
	        }
	      }
	    }
	  }
	}
`;

const Repository = () => {
	const { owner, repositoryId } = useParams();

	const [keyWord, setKeyWord] = useState('');
	const [query, setQuery] = useState('');
	const [issueState, setIssueState] = useState<StateType>('');
	const [issues, setIssues] = useState<IssueNodeType[] | []>([]);

	const [hasNextPage, setHasNextPage] = useState(false);
  const [lastIssueId, setLastIssueId] = useState('');
  const [issuesCount, setIssuesCount] = useState<number | undefined>();
  const [totalCount, setTotalCount] = useState<number>(0);

	const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { owner, repositoryId },
    nextFetchPolicy: 'cache-first',
    onCompleted: (res: RepositoryType) => {
			setTotalCount(res.repository.issues.totalCount);
    },
  });

  const [search, { loading: issueLoading, error: issueError }] = useLazyQuery(GET_ISSUE, {
  	onCompleted: (res: SearchType) => {
  		setIssues(res.search.pageInfo.hasPreviousPage ? [...issues, ...res.search.edges] : res.search.edges);
  		setHasNextPage(res.search.pageInfo.hasNextPage);
      setLastIssueId(res.search.pageInfo.endCursor);
      setIssuesCount(res.search.issueCount);
  	},
  });

	const handleFilterChange = (value: string): void => {
		setIssueState(value as StateType);
	};

	const handleSubmit = useCallback((event: React.MouseEvent<HTMLElement>) => {
	    event.preventDefault();
	    if (!keyWord) return;
	    const searchQuery = generateIssueQuery({ repo: `${owner}/${repositoryId}`, keyWord, state: issueState });
	    setQuery(searchQuery);
	    search({ 
	      variables: { query: searchQuery },
	    });
    },
    [owner, repositoryId, search, keyWord, issueState],
  );

  const handlePageClick = () => {
    search({ 
      variables: { query, after: lastIssueId },
    });
  };

  if (!(owner && repositoryId)) {
		return <NoMatch />;
	}

	return (
    <div className="container">
    	{loading && <div className="row"><div className="col s12"><Loading /></div></div>}
    	{error && <div className="row"><div className="col s12"><Error msg={error.message} /></div></div>}
    	{data && (
    		<>
    			<div className="row">
            <div className="col s12">
              <h5>{data.repository.description}</h5>
              <Link to={data.repository.url}>
                {data.repository.nameWithOwner}
              </Link>
            </div>   				
    			</div>
	    		
	    		{!totalCount && <div className="row"><div className="col s12"><h6>There is no issue</h6></div></div>}
	    		{!!totalCount && (
            <form>
              <div className="row">
                <div className="col s6">
                  <Input
                    onChange={setKeyWord}
                    disabled={issueLoading}
                    validate={(val) => !!val}
                    placeholder="Key word:"
                    label="Enter a key word to find issues"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <Radio
                    label="All issues"
                    name="status"
                    value=""
                    onChange={handleFilterChange}
                    defaultChecked
                    disabled={issueLoading}
                  />
                  <Radio label="Open" name="status" value="open" onChange={handleFilterChange} disabled={issueLoading} />
                  <Radio label="Closed" name="status" value="closed" onChange={handleFilterChange} disabled={issueLoading} />
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <button
                  type="submit"
                  className={`waves-effect waves-light btn ${issueLoading && 'disabled'}`} 
                  onClick={handleSubmit}
                  >
                    Search
                  </button>
                </div> 	    				
              </div>
            </form>
          )}
          {issueError && <div className="row"><div className="col s6"><Error /></div></div>}
          {issueLoading && <div className="row"><div className="col s6"><Loading /></div></div>}
          <div className="row">
          	{(!issueLoading && !issueError && issuesCount !== undefined) && (
          		<div className="col s12">
          			<h6>Found {issuesCount} {`issue${issuesCount > 1 ? 's' : ''}`}</h6>
          		</div>
          	)}   				
          	{
              issues.filter(({ node }: IssueNodeType) => node.__typename === 'Issue')
        			.map(({ node }: IssueNodeType) => {
        				return (
        					<div className="col s12" key={node.id}>
        						<HorizontalCard
        							linkUrl={`/issue/${owner}/${repositoryId}/${node.number}`}
        							linkText="See the issue"
        							title={node.title}
        							content={
                        // eslint-disable-next-line
        								<div>
                          <span
                            className={`new badge ${node.state === 'OPEN' ? 'blue' : 'red'}`}
                            data-badge-caption=""
                          >
                            {node.state}
                          </span>
        									<div>{new Intl.DateTimeFormat('en-GB').format(new Date(node.createdAt))}</div>
        									<Link to={node.url} target="_blank" rel="noopener noreferrer">See the sourse</Link>
        								</div>
        							}
        						/>			    							
        					</div>
        				);
        			})
        		}
        		{hasNextPage && (
              <div className="row">
                <div className="col s12">
                  <button
                    type="button"
                    className={`waves-effect waves-light btn ${issueLoading && 'disabled'}`}
                    onClick={handlePageClick}
                  >
                    Next
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
            )}
          </div>
	    	</>
    	)}
    </div>
	);
};

export default Repository;
