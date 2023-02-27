import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import Repository, { GET_REPOSITORY, GET_ISSUE } from './Repository';
import { generateIssueQuery } from '../../utils';

const generateIssue = (num) => {
  return [...Array(num)].map((el, index) => ({
      node: {
        __typename: 'Issue',
        id: index,
        number: Math.random() * 100,
        createdAt: '2023-01-01',
        title: `issue ${index+1} title`,
        url: 'http://test.com',
        state: index%3 ? 'open' : 'closed',
        body: 'body description',
      },
    }));
};

const inputValue = 'svg';
const nameWithOwner = 'facebook/react';
const states = ['open', 'closed', ''];

const issueQuery = generateIssueQuery({ repo: nameWithOwner, state: states[2], keyWord: inputValue });

const repositoryMocks = [
  {
    request: {
      query: GET_REPOSITORY,
      variables: {
        owner: 'facebook',
        repositoryId: 'react'
      }
    },
    result: {
      data: {
        repository: {
          id: '1',
          nameWithOwner,
          description: 'react description',
          url: `https://url.com/${nameWithOwner}`,
          issues: {
            totalCount: 30,
          }
        }
      }
    }
  },
  {
    request: {
      query: GET_ISSUE,
      variables: {
        query: issueQuery,
      },
    },
    result: {
      issueData: {
         search: {
          issueCount: 30,
          pageInfo: {
            hasPreviousPage: false,
            hasNextPage: true,
            endCursor: '19',
          },
          edges: generateIssue(30),
        }       
      },
      data: {
        search: {
          issueCount: 30,
          pageInfo: {
            hasPreviousPage: false,
            hasNextPage: true,
            endCursor: '19',
          },
          edges: generateIssue(30),
        }
      }
    }
  }
];


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ owner: 'facebook', repositoryId: 'react' })
}));

describe('Repository', () => {
  it('should be rendered without error and show loading during the initialize', async () => {
    render(
      <MockedProvider mocks={repositoryMocks} addTypename={false}>
        <Repository />
      </MockedProvider>
    );

    expect(await screen.findByTestId('loading')).toBeInTheDocument();
  }); 

  it('should render repository page when data is catched', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={repositoryMocks} addTypename={false}>
          <Repository />
        </MockedProvider>      
      </MemoryRouter>

    );
    expect(await screen.findByTestId('loading')).toBeInTheDocument();
    expect(await screen.findByText('facebook/react')).toBeInTheDocument();
    expect(await screen.findByText('react description')).toBeInTheDocument();
    expect(await screen.findByText('All issues')).toBeInTheDocument();
    expect(await screen.findByText('Open')).toBeInTheDocument();
    expect(await screen.findByText('Closed')).toBeInTheDocument();
  }); 

  it('should render list of issues when Search btn is clicked', async () => {
    const page = render(
      <MemoryRouter>
        <MockedProvider mocks={repositoryMocks} addTypename={true}>
          <Repository />
        </MockedProvider>      
      </MemoryRouter>

    );
    expect(await screen.findByTestId('loading')).toBeInTheDocument();
    expect(await screen.findByText('facebook/react')).toBeInTheDocument();
    const input = page.getByLabelText('Enter a key word to find issues');
    fireEvent.change(input, { target: { value: inputValue } });
    expect(input.value).toBe(inputValue);

    const submitBtn = page.getByText('Search');
    fireEvent.click(submitBtn);

    expect(await screen.findByTestId('loading')).toBeInTheDocument();
    expect(await screen.findByText('Found 30 issues')).toBeInTheDocument();
    expect(await screen.findByText(/issue 5 title/i)).toBeInTheDocument();
  });

  it('should show error UI when we get it as result of issue request', async () => {
    const errorMock = {
      request: {
        query: GET_REPOSITORY,
        variables: {
          owner: 'facebook',
          repositoryId: 'react'
        }
      },
      error: new Error('An error occurred')
    };
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <Repository />
      </MockedProvider>
    );
    expect(await screen.findByText('An error occurred')).toBeInTheDocument();
  });  
});



