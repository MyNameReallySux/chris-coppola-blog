import { expect } from 'chai'
import { List, Map } from 'immutable'

import reducer from '../client/reducer'

describe('Immutable?', () => {
	describe('Number', () => {
		function increment(currentState) {
			return currentState + 1
		}
		it('is immutable', () => {
			let state = 42
			let nextState = increment(state)
			expect(nextState).to.equal(43)
			expect(state).to.equal(42)
		})
	})
	describe('List', function () {
		function addUserToList(currentState, item) {
			return currentState.push(item)
		}

		it('is immutable', () => {
			let state = List.of('Chris', 'Jon')
			let nextState = addUserToList(state, 'Mel')

			expect(nextState).to.equal(List.of(
				'Chris',
				'Jon',
				'Mel'
			))
			expect(state).to.equal(List.of(
				'Chris',
				'Jon'
			))
		})
	})
	describe('Tree', function () {
		function addUserToTree(currentState, item) {
			return currentState.set('users', currentState.get('users').push(item))
		}

		it('is immutable', () => {
			let state = Map({
				users: List.of('Chris', 'Jon')
			})
			let nextState = addUserToTree(state, 'Mel')

			expect(state).to.equal(Map({
				users: List.of('Chris', 'Jon')
			}))

			expect(nextState).to.equal(Map({
				users: List.of('Chris', 'Jon', 'Mel')
			}))

		})
	})
})