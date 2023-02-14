import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import Home, { GET_REPOSITORIES } from './Home';


const generateRepo = (num) => {
  return [...Array(num)].map((el, index) => ({
      node: {
        __typename: 'Repository',
        id: index,
        name: `react${index+1}`,
        nameWithOwner: `facebook/react${index+1}`,
        owner: { __typename: 'User', login: 'facebook' },
      },
    }));
};

const inputValue = 'facebook/react';

const repositoryMocks = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: {
        repositoryKey: inputValue
      }
    },
    result: {
      data: {
        search: {
          edges: generateRepo(30),
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
            endCursor: '19',
          },         
          repositoryCount: 30,
        }       
      },
    }
  }
];

describe('Home', () => {
  it('should be rendered', async () => {
    render(
      <MockedProvider mocks={repositoryMocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(screen.getByPlaceholderText('Key word')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  }); 
 

  it('should render list of issues when Search btn is clicked', async () => {
    const page = render(
      <MemoryRouter>
        <MockedProvider mocks={repositoryMocks} addTypename={false}>
          <Home />
        </MockedProvider>   
      </MemoryRouter>   
    );
    const input = page.getByPlaceholderText('Key word');
    fireEvent.change(input, { target: { value: inputValue } });
    expect(input.value).toBe(inputValue);

    const submitBtn = page.getByText('Search');
    fireEvent.click(submitBtn);

    expect(await screen.findByTestId('loading')).toBeInTheDocument();
    expect(await screen.findByText('Found 30 repositories')).toBeInTheDocument();
    expect(screen.getByText(/react5/i)).toBeInTheDocument();
  });

  it('should show error UI when we get it as result of issue request', async () => {
    const errorMock = {
      request: {
        query: GET_REPOSITORIES,
        variables: { repositoryKey: inputValue }
      },
      error: new Error("An error occurred")
    };

    const page = render(
      <MemoryRouter>
        <MockedProvider mocks={[errorMock]} addTypename={false}>
          <Home />
        </MockedProvider>
      </MemoryRouter>
    );
    const input = page.getByPlaceholderText('Key word');
    fireEvent.change(input, { target: { value: inputValue } });
    expect(input.value).toBe(inputValue);

    const submitBtn = page.getByText('Search');
    fireEvent.click(submitBtn);

    expect(await screen.getByTestId('loading')).toBeInTheDocument();
    expect(await screen.findByText('Sorry, something went wrong. We are working to fix the problem.')).toBeInTheDocument();
  });  
});



