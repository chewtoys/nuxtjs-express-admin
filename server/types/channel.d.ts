
declare namespace channel {

  interface NavMenus {
    id          : number
    name        : string
    default     : string
    navs        : Array<MenuItem>
  }

  interface MenuItem {
    index       : string
    name        : string
    icon       ?: string
    children   ?: Array<MenuItem>
    maps       ?: Array<MenuItem>
  }

  interface Flags {
    [propsName: string]: FlagItem
  }

  interface FlagItem {
    access      : number
  }

  type Selected = number
}

export = channel