import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import * as DOMPurify from 'dompurify';
import Loading from '../../components/loading/Loading';
import Error from '../../components/errors/Error';
import NoMatch from '../no-match/NoMatch';
import { PageInfoType } from '../../types';
import './Issue.styles.scss';

export const GET_COMMENTS = gql`
	query getComments($owner: String!, $repositoryId: String!, $number: Int!, $after: String) {
		repository(owner: $owner, name: $repositoryId) {
			issue(number: $number) {
				title
				bodyText
				comments(first: 10, after: $after) {
					totalCount
					pageInfo {
    				hasNextPage
    				endCursor
  				}
       		edges {
          	node {
          		id
            	author {
              	avatarUrl
              	login
            	}
            	bodyHTML
          	}
        	} 				
				}
			}			
		}
	}
`;

type CommentType = {
	id: string;
	number: number;
	author: {
		avatarUrl: string;
		login: string;
	};
	bodyHTML: string;
};

type NodeCommentType = {
  // eslint-disable-next-line
	node: CommentType;
};

type DataType = {
	repository: {
		issue: {
			title: string;
			bodyText: string;
			comments: {
				totalCount: number;
				edges: NodeCommentType[];
				pageInfo: PageInfoType;
			}
		}
	};
};

const Issue = () => {
	const { owner, repositoryId, number } = useParams();

	const [comments, setComments] = useState<NodeCommentType[] | []>([]);
	const [hasNextPage, setHasNextPage] = useState(false);
  const [lastCommentId, setLastCommentId] = useState('');
  const [CommentsCount, setCommentsCount] = useState(0);

	const { loading, error, data } = useQuery(GET_COMMENTS, {
	  variables: { owner, repositoryId, number: number ? +number : number },
	  onCompleted: (res: DataType) => { 
	  	setComments(res.repository.issue.comments.edges);
	  	setHasNextPage(res.repository.issue.comments.pageInfo.hasNextPage);
	  	setCommentsCount(res.repository.issue.comments.totalCount);
	  	setLastCommentId(res.repository.issue.comments.pageInfo.endCursor);
	  },
	});

  const [search, { loading: nextCommentsLoading, error: nextCommentsError }] = useLazyQuery(GET_COMMENTS, {
  	onCompleted: (res: DataType) => {
  		setComments([...comments, ...res.repository.issue.comments.edges]);
  		setHasNextPage(res.repository.issue.comments.pageInfo.hasNextPage);
  		setLastCommentId(res.repository.issue.comments.pageInfo.endCursor);
  	},
  });

  const handlePageClick = () => {
		search({ 
    	variables: { 
    		owner, 
    		repositoryId, 
    		number: number ? +number : number, 
    		after: lastCommentId,
    	},
  	});
  };

  if (!(number && owner && repositoryId)) {
		return <NoMatch />;
	}

	return (
    <div className="container">
    	{(loading) && <div className="row"><div className="col s12"><Loading /></div></div>}
    	{(error || nextCommentsError) && <div className="row"><div className="col s12"><Error /></div></div>}
    	{!(loading || error || nextCommentsError) && data && (
	    		<div className="row markdown-body">
		    		<div className="col s12">
		    			<div className="row">
			    			<div className="col s12">
                  <h5>
                    Issue <strong>{data.repository.issue.title}</strong> 
                    has {CommentsCount} {`comment${CommentsCount > 1 ? 's' : ''}`}
                  </h5>
			    				<div>{data.repository.issue.bodyText}</div>
		    				</div>
	    				</div>
							<ul className="collection">
			  				{comments.map(({ node }: NodeCommentType) => {
			  					const clean = DOMPurify.sanitize(node.bodyHTML);
			  					return (
										<li className="collection-item avatar" key={node.id}>
											<img src={node.author.avatarUrl} alt="" className="circle" />
											<p className="title"><strong>{node.author.login}</strong></p>
											<div dangerouslySetInnerHTML={{ __html: clean }} />
										</li>
									);
			  				})}
							</ul> 	    			
		    		</div>
		    		{ hasNextPage && (
              <div className="col s12">
                <button
                  type="button"
                  className={`waves-effect waves-light btn ${nextCommentsLoading && 'disabled'}`}
                  onClick={handlePageClick}
                >
                  Next
                  <i className="material-icons right">send</i>
                </button>
              </div>
			    	)}
	    		</div> 		
	    	)}
    </div>
	);
};

export default Issue;
