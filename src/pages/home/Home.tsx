import React, { useState, useCallback } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import RepositoriesList from '../../components/grid/RepositoriesList';
import Input from '../../components/inputs/Input';
import Loading from '../../components/loading/Loading';
import Error from '../../components/errors/Error';
import { RepositoryType, PageInfoType } from '../../types';
import earth from '../../images/earth.svg';
import spaceman from '../../images/spaceman.svg';
import styles from './Home.styles.module.scss';

export const GET_REPOSITORIES = gql`
  query getRepositories($repositoryKey: String!, $after: String) {
    search(query: $repositoryKey, type: REPOSITORY, first: 20, after: $after){
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }   
      repositoryCount
      edges{
        node{
          ... on Repository{
            id
            name
            nameWithOwner
            owner{
              login
            }
          }
        }
      }
    }
  }
`;

type DataType = {
  search: {
    edges: RepositoryType[];
    pageInfo: PageInfoType;
    repositoryCount: number;
  };
};

const Home = () => {
  const [repositoryKey, setRepositoryKey] = useState('');
  const [repositories, setRepositories] = useState<RepositoryType[] | []>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [lastRepositoryId, setLastRepositoryId] = useState('');
  const [repositoryCount, setRepositoryCount] = useState<number | undefined>();

  const [search, { error, loading }] = useLazyQuery(GET_REPOSITORIES, {
    onCompleted: (res: DataType) => {
      setRepositories(res.search.pageInfo.hasPreviousPage ? [...repositories, ...res.search.edges] : res.search.edges);
      setHasNextPage(res.search.pageInfo.hasNextPage);
      setLastRepositoryId(res.search.pageInfo.endCursor);
      setRepositoryCount(res.search.repositoryCount);
    },
  });

  const handleSubmit = useCallback((event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (!repositoryKey) return;
      search({ 
        variables: { repositoryKey },
      });
    },
    [search, repositoryKey],
  );

  const handlePageClick = () => {
    search({ 
      variables: { repositoryKey, after: lastRepositoryId },
    });
  };

  return (
    <section className={styles.home}>
      <div className={styles.top}>
        <div className={`container ${styles.fullHeight}`}>
          <div className={`row ${styles.fullHeight}`}>
            <div className="col s12 m6">
              <form>
                <div>
                  <h1>Github - connecting people</h1>
                  <p>
                    Searching github repositories has never been so easy - 
                    just enter a keyword in the field and click the Search button
                  </p>
                  <div className={styles.topSearchGroup}>
                    <div className={styles.inputContainer}>
                      <Input
                        onChange={setRepositoryKey}
                        disabled={loading}
                        placeholder="Key word"
                        className={styles.input}
                      />                      
                    </div>
                    <button
                      type="submit"
                      className={`waves-effect waves-light btn ${styles.topBtn} ${loading ? 'disabled' : ''}`} 
                      onClick={handleSubmit}
                    >
                      Search
                    </button>                      
                  </div>                                  
                </div>
                {loading && <Loading />}  
              </form>
              { error && <div className="row"><div className="col s12"><Error /></div></div> }          
            </div>
            <div className={`col s6 hide-on-small-only right ${styles.fullHeight}`}>
              <img src={earth} alt="" width="490" height="472" className={styles.earth} />
              <img src={spaceman} alt="" width="358" height="316" className={styles.spaceman} />
            </div>
          </div>
        </div>       
      </div>
      <div className={styles.bottom}>
        <div className="container">
          {repositoryCount === undefined && <h6 className={styles.bottomTitle}>The result will be here...</h6>}
          {(!error && repositoryCount !== undefined) && (
            <div className="row">
              <div className="col s12">
                <h6 className={styles.bottom_title}>Found {repositoryCount} {`repositor${repositoryCount > 1 ? 'ies' : 'y'}`}</h6>
              </div>
              <div className="col s12">
                <RepositoriesList data={repositories} />
                {hasNextPage && (
                  <button
                    type="button"
                    className={`waves-effect waves-light btn ${loading && 'disabled'}`}
                    onClick={handlePageClick}
                  >
                    Next
                    <i className="material-icons right">send</i>
                  </button>           
                )}
              </div>
            </div>
          )}    
        </div>
      </div>
    </section>
  );
};

export default Home;
