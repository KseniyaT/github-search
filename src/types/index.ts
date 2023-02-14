export type RepositoryType = {
  node: {
    id: string;
    name: string;
    nameWithOwner: string;
    owner: {
      login: string;
    };
  }
};

export type PageInfoType = {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean; 
};

export type StateType = 'open' | 'closed' | '';

export type QueryIssueRequestType = {
  repo: string;
  state?: StateType;
  keyWord: string;
};