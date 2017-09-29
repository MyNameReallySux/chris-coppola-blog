export default {
	oneOfRequiredSet: (oneOf) => {
		return (props, promName, componentName) => {
			let firstOneFound = undefined
			let string = oneOf.reduce((string, value) => {
				return `${string}, ${value}`
			})
			oneOf.forEach((itemName) => {
				if(firstOneFound)
					return new Error(`More than item from given set [${string}] was a valid prop, [${firstOneFound}, ${itemName}]`)
				if(props[itemName] != undefined) 
					firstOneFound = itemName
			})
			return firstOneFound ? null : new Error(`One item in given set [${string}] must be a valid prop`)
		}
	}
}