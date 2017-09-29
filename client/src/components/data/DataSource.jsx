import React from 'react'
import PropTypes from 'prop-types'
import { TypeUtils } from '@beautiful-code/type-utils'
import { StringUtils } from '@beautiful-code/string-utils'
import { Store } from '@core'

class DataSource extends React.Component {
	/* Static Properties */
	static defaultProps = {
		data: null,
		source: null,
		initialData: null,
		hasValidData: (data) => data != null,
		reset: () => { return false },
		fetch: () => { return false },
		shouldReset: (props, state) => { return false },
		shouldFetch: (props, state) => { return !state.hasFetched },
		onReset: () => { return true },
		onFetch: () => { return false },
		extractData: (nextData, prevData) => {
			!deepCompare(nextData, prevData)
		}
	}
	
	static propTypes = {
		data: PropTypes.any,
		source: PropTypes.string.isRequired,
		reset: PropTypes.func,
		fetch: PropTypes.func,
		shouldReset: PropTypes.func,
		shouldFetch: PropTypes.func,
		onReset: PropTypes.func,
		onFetch: PropTypes.func
	}
	
	/* Instance Methods */
	state = {
		data: this.props.data,
		hasValidData: this.props.hasValidData,
		hasFetched: false,
		isResetting: false,
		hasReset: false,
	}
	
	constructor(props){
		super(props)
	}

	resetIfSet = async () => {
		let shouldReset = this.props.shouldReset(this.props, this.state)
		if(shouldReset){
			let action = this.props.reset(this.props, this.state)
						
			if(TypeUtils.isNull(action) || !TypeUtils.isFunction(action) && !TypeUtils.isObject(action)){
				console.warn(`WARNING: DataSource '${this.props.source}' was not passed a valid action for 'reset'.`)
			} else {
				let hasValidData = this.props.hasValidData(this.state.data),
					isResetting = this.state.isResetting,
					hasReset = this.state.hasReset,
					isLoading = this.state.loading || this.state.data.loading
					
				if(hasValidData && !isResetting && !hasReset && !isLoading){
					await this.setState({
						isResetting: true,
					}, async () => {
						await this.props.dispatch(action)
						this.setState({
							data: this.props.initialData,
							loading: false,
							isResetting: false,
							hasReset: true,
							hasFetched: false,
						}, () => {
							return
						})
					})
					
				}
			}
		}
	}
	
	fetchIfSet = async () => {
		let shouldFetch = this.props.shouldFetch(this.props, this.state)
		if(shouldFetch){
			let action = this.props.fetch(this.props, this.state)
						
			if(TypeUtils.isNull(action) || !TypeUtils.isFunction(action) && !TypeUtils.isObject(action)){
				console.warn(`WARNING: DataSource '${this.props.source}' was not passed a valid action for 'fetch'.`)
			} else {
				let hasValidData = this.props.hasValidData(this.state.data),
					loading = this.state.loading || this.state.data.loading,
					hasFetched = this.state.hasFetched
									
				if(!loading && !hasFetched){
					this.setState({
						loading: true
					}, async () => {
						await this.props.dispatch(action)
						this.setState({
							loading: false,
							hasFetched: true,
							hasReset: false,
						})
					})
					
				}
			}
		}
	}
	
	componentWillUnmount = (...args) => {
		this.resetIfSet()
	}

	componentWillMount = async (...args) => {
		await this.fetchIfSet()
		this.handleDataChange(this.props.source, this.props.data)
	}
	
	componentWillReceiveProps = async (nextProps) => {
		await this.resetIfSet()
		await this.fetchIfSet()
				
		if(this.props.didDataChange(nextProps.data, this.state.data)){
			await this.setState({
				data: nextProps.data
			})
			this.handleDataChange(this.props.source, nextProps.data)
		 }
	}
	
	shouldComponentUpdate = (nextProps) => {
		return !this.state.isResetting && this.props.didDataChange(nextProps.data, this.state.data)
	}
	
	handleDataChange = async (source, nextData) => {
		this.props.extractData(source, nextData)
	}
	
	render(){
		if(this.props.hasValidData(this.state.data)){
			return (
				<div>{this.props.children}</div>
			)
		} else {
			return null
		}
	}
}

let compareObject = (obj1, obj2) => {
	for(let key of Object.keys(obj1)){
		if(obj1.hasOwnProperty(key) != obj2.hasOwnProperty(key)){
			switch (typeof (obj1[key])) {
				case 'object': {
					if (!Object.compare(obj1[key], obj2[key])) return false
				} break
				case 'function': {
					if(typeof (obj2[key]) == 'undefined'|| (key != 'compare'&& obj1[key].toString() != obj2[key].toString())
					) return false
				} break
				default:
					if (obj1[key] != obj2[key]) return false
			}
		}
	}
	for (let key of Object.keys(obj2)) {
		if (typeof (obj1[key]) == 'undefined') return false
	}
	return true
}

let deepCompare = () => {
	let i, l, leftChain, rightChain

	let compare2Objects = (x, y) => {
		let p

		// remember that NaN === NaN returns false
		// and isNaN(undefined) returns true
		if(isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
			return true
		}

		// Compare primitives and functions.
		// Check if both arguments link to the same object.
		// Especially useful on the step where we compare prototypes
		if(x === y) {
			return true
		}

		// Works in case when functions are created in constructor.
		// Comparing dates is a common scenario. Another built-ins?
		// We can even handle functions passed across iframes
		if((typeof x === 'function' && typeof y === 'function') ||
			(x instanceof Date && y instanceof Date) ||
			(x instanceof RegExp && y instanceof RegExp) ||
			(x instanceof String && y instanceof String) ||
			(x instanceof Number && y instanceof Number)) {
			return x.toString() === y.toString()
		}

		// At last checking prototypes as good as we can
		if(!(x instanceof Object && y instanceof Object)) {
			return false
		}

		if(x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
			return false
		}

		if(x.constructor !== y.constructor) {
			return false
		}

		if(x.prototype !== y.prototype) {
			return false
		}

		// Check for infinitive linking loops
		if(leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
			return false
		}

		// Quick checking of one object being a subset of another.
		// todo: cache the structure of arguments[0] for performance
		for(p in y) {
			if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
				return false
			} else if (typeof y[p] !== typeof x[p]) {
				return false
			}
		}

		for(p in x) {
			if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
				return false
			} else if (typeof y[p] !== typeof x[p]) {
				return false
			}

			switch (typeof (x[p])) {
				case 'object':
				case 'function':

					leftChain.push(x)
					rightChain.push(y)

					if (!compare2Objects(x[p], y[p])) {
						return false
					}

					leftChain.pop()
					rightChain.pop()
					break

				default:
					if (x[p] !== y[p]) {
						return false
					}
					break
			}
		}

		return true
	}

	if(arguments.length < 1) {
		return true //Die silently? Don't know how to handle such case, please help...
		// throw "Need two or more arguments to compare"
	}

	for(i = 1, l = arguments.length; i < l; i++) {

		leftChain = [] //Todo: this can be cached
		rightChain = []

		if (!compare2Objects(arguments[0], arguments[i])) {
			return false
		}
	}

	return true
}

export default DataSource
