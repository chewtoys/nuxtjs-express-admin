import { PBSetting } from 'kenote-socket-helper'
import { Setting } from './proto'

declare namespace channel {

  interface NavMenus {
    id                 : number
    name               : string
    label              : string
    description       ?: string
    default            : string
    navs               : Array<MenuItem>
    rstp              ?: Rstps
    proto             ?: PBSetting
    options           ?: {}
    settings          ?: Array<Setting>
  }

  interface Setting {
    key                : string
    name               : string
  }

  interface Options {
    [propsName: string]: Array<{}> | {}
  }

  interface Rstps {
    [propsName: string]: Setting.Server
  }

  interface MenuItem {
    index              : string
    name               : string
    icon              ?: string
    children          ?: Array<MenuItem>
    maps              ?: Array<MenuItem>
    disabled          ?: boolean
    queryer           ?: Array<Queryer>
    api               ?: string
    columns           ?: Array<ColumnItem>
    polling           ?: string
    timeout           ?: number
    cards             ?: Cards
    export            ?: Export
    querySelect       ?: QuerySelect
    search            ?: Search
  }

  interface Search {
    field              : string
  }

  interface QuerySelect {
    default            : string
    options            : Array<QuerySelectOption>
  }

  interface QuerySelectOption {
    key                : string
    name               : string
    queryer            : Array<Queryer>
  }

  interface Export {
    sheetName         ?: string
  }

  interface Queryer {
    key                : string
    name               : string
    type               : string
    default           ?: string | number | Date | Array<string | number | Date | undefined>
    required          ?: boolean
    fetch             ?: string
    data              ?: Array<{ key: string, name: string }>
    options           ?: string
    rules             ?: Array<Rule>
    cardinal          ?: string
  }

  interface Cards {
    type               : 'default' | 'user-info'
    emit              ?: CardsEmit
  }

  interface CardsEmit {
    key                : string
    param              : string 
  }

  interface Rule {
    required          ?: boolean
    message            : string
  }

  interface ColumnItem {
    key                : string
    name               : string
    fixed             ?: boolean | 'left' | 'right'
    width             ?: number
    format            ?: Format
    minwidth          ?: number
    emit              ?: Array<EmitItem>
  }

  interface EmitItem {
    key                : string
    name               : string
    api               ?: string
    param             ?: string
    options           ?: {
      [propsName: string]: number | string
    }
  }

  interface Format {
    type              ?: 'string' | 'number'
    regexp            ?: RegExp
    substr            ?: string
    function          ?: string
    options           ?: any
    suffix            ?: string
    prefix            ?: string
  }

  interface Flags {
    [propsName: string]: FlagItem
  }

  interface FlagItem {
    access             : number
  }

  type Selected = number
}

export = channel