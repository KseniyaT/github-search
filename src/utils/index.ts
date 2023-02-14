import { QueryIssueRequestType } from '../types';

/**
 * Returns a query to search for issues based on a keyword
 * @param {String} repo - name of repo to find issues in
 * @param {'open' | 'closed' | ''} state - the state in which the issues may be 
 * @param {String} keyWord - keyword to search for
 * @returns {String} query to search issues
 */
export const generateIssueQuery = ({ repo, state, keyWord }: QueryIssueRequestType): string => {
  return `repo:${repo} in:title, in:body is:issue${state ? ` is:${state}` : ''} ${keyWord}`;
};
