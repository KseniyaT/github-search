import { generateIssueQuery } from './index';

describe('utils', () => {
	it('generateIssueQuery should return string including query and state when the state is passed', () => {
		const queryOpenState = generateIssueQuery({repo: 'facebook', state: 'open', keyWord: 'svg and png'});
		expect(queryOpenState).toBe('repo:facebook in:title, in:body is:issue is:open svg and png');
	});

	it('generateIssueQuery should return string including query without state when it is not passed', () => {
		const queryOpenState = generateIssueQuery({repo: 'facebook', keyWord: 'svg and png'});
		expect(queryOpenState).toBe('repo:facebook in:title, in:body is:issue svg and png');
	});
});