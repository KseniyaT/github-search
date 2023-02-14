import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import Issue, { GET_COMMENTS } from './Issue';

const issueMocks = [
  {
    request: {
      query: GET_COMMENTS,
      variables: {owner: 'facebook', repositoryId: 'react', number: 123}
    },
    result: {
      data: {
        repository: {
          issue: {
            __typename: 'Issue',
            title: 'New issue',
            bodyText: 'There is a new issue',
            comments: {
              __typename: 'IssueCommentConnection',
              totalCount: 2,
              pageInfo: {
                hasNextPage: false,
                endCursor: '1',
              },
              edges: [
                {node: {
                  __typename: 'IssueComment',
                  id: '0',
                  author: {
                    avatarUrl: 'http://test.com',
                    login: 'Author 1',
                  },
                  bodyHTML: '<div>Hei!</div>'
                }},
                {node: {
                  __typename: 'IssueComment',
                  id: '1',
                  author: {
                    avatarUrl: 'http://test.com',
                    login: 'Author 2',
                  },
                  bodyHTML: '<div>Hello!</div>'
                }},                
              ],
            }
          }
        }
      }
    }
  },
];


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ owner: 'facebook', repositoryId: 'react', number: 123 })
}));

describe('Repository', () => {
  it('should be rendered without error and show loading during the initialize', async () => {
    render(
      <MockedProvider mocks={issueMocks} addTypename={false}>
        <Issue />
      </MockedProvider>
    );

    expect(await screen.findByTestId('loading')).toBeInTheDocument();
  }); 

  it('should render essue page when data is catched', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={issueMocks} addTypename={false}>
          <Issue />
        </MockedProvider>      
      </MemoryRouter>

    );
    expect(await screen.findByTestId('loading')).toBeInTheDocument();
    expect(await screen.findByText('New issue')).toBeInTheDocument();
    expect(await screen.findByText('There is a new issue')).toBeInTheDocument();
    expect(await screen.findByText('Author 1')).toBeInTheDocument();
    expect(await screen.findByText('Author 2')).toBeInTheDocument();
    expect(await screen.findByText('Hei!')).toBeInTheDocument();
    expect(await screen.findByText('Hello!')).toBeInTheDocument();
  });  
});



