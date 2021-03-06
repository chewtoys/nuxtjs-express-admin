import { Command } from '~/types'
import { zipObject } from 'lodash'

export const parseCommand = (value: string): Command.Value | null => {
  if (!value) return null
  let command: RegExpMatchArray | null = value.match(/^(command|router)\:(\S+)$/)
  if (!command) return null
  return {
    type: <Command.Type> command[1],
    path: command[2]
  }
}


export const getDifferenceDate = async (begin: string, end: string | null, done: (time: number) => void, filter?: string): Promise<void> => {
  if (/(\,|\|)/.test(begin)) {
    let _begin: number[] = begin.split(/\,|\|/).map( (value: string) => new Date(value).getTime())
    for (let k of _begin) {
      await done(k)
    }
    return
  }
  let beginTime: number = new Date(begin).getTime()
  let endTime: number = new Date(end || begin).getTime()
  let dayTime: number = 24 * 60 * 60 * 1000

  for (let k = beginTime; k <= endTime;) {
    let isTrue: boolean = true
    if (filter) {
      let _filter: number[] = filter.split(/\,|\|/).map( (value: string) => new Date(value).getTime())
      isTrue = _filter.indexOf(k) === -1
    }
    isTrue && await done(k)
    k += dayTime
  }
}

export const intToTime = (value: number, tag: 'm' | 's' = 'm'): string => {
  if (tag === 'm') {
    let minute: number = value % 60
    let hour: number = (value - minute) / 60
    return [hour, minute].map( o => o.toLocaleString('zh', { minimumIntegerDigits: 2 })).join(':')
  }
  else {
    let second: number = value % 60
    let minute: number = ((value - second) / 60) % 60
    let hour: number = (value - minute*60 - second) / 60
    return [hour, minute, second].map( o => o.toLocaleString('zh', { minimumIntegerDigits: 2 })).join(':')
  }
}

export const formatDefaultValue = (value: any): any => {

  if (/^([\-]{0,1})([0-9]{1,3})(days)$/.test(value)) {
    let parseValue: RegExpMatchArray | null = (<string> value).match(/^([\-]{0,1})([0-9]{1,3})(days)$/)
    let { val, operator } = zipObject(['','operator', 'val'], <Array<any>> parseValue)
    return new Date().setDate(operator === '-' ? new Date().getDate() - Number(val) : new Date().getDate() + Number(val))
  }
  switch (value) {
    case 'now':
    case 'today':
      return new Date()
    case 'yesterday':
      return new Date().setDate(new Date().getDate() - 1)
    default:
      return value
  } 
}