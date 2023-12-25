import * as _ from 'lodash'

/**
 * Returns the first element of an array if it is an array, otherwise it returns the element.
 * @param variable
 * @example
 * fristElementOrVariable<number>([1]) // 1
 * fristElementOrVariable<number>(1) // 1
 * fristElementOrVariable<number>([]) // undefined
 * fristElementOrVariable<number>(undefined) // undefined
 */
export default function fristElementOrVariable<T>(variable: T | T[] | undefined): T | undefined  {
        return _.isArray(variable) ? _.head(variable) as T : variable
}
