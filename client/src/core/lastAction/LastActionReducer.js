import { StringUtils } from '@beautiful-code/string-utils'
import { TypeUtils } from '@beautiful-code/type-utils'

export const INITIAL_STATE = {type: '@@initial'}

export const LastActionReducer = (state = INITIAL_STATE, action) => {
	if(TypeUtils.isUndefined(action))
		return null
	else if(StringUtils.contains(action.type, '@@'))
		return state
	else
		return action
	
}