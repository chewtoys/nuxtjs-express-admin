import { Request, Response } from 'express'
import { errorInfo, IError } from 'kenote-express-helper'
import { StoreItem } from 'kenote-store-helper'
import { Register, __Rules } from './config'
import channel from './channel'

export interface resufulInfo {
  data         : any
  Status       : errorInfo
}

export interface Payload {
  _id          : string
  iat         ?: number
}

export interface JwtSign {
  (payload: Payload, iat?: number): string
}

export interface IResponse extends Response {
  api          : (data: any, error?: number | IError | errorInfo, opts?: string[]) => Response
  notfound     : () => void
}

export interface IRequest extends Request {
  __register   : Register
  __rules      : __Rules
  __channels   : Array<channel.NavMenus>
  __selected   : Selected
  __flags      : channel.Flags
}

export interface Selected {
  channels     : number
}

export interface HeaderOptions {
  token       ?: string
  header      ?: object
  upload      ?: (percentage: number) => void
  download    ?: (percentage: number) => void
  entry       ?: string
}

export type Method = 'get' | 'post' | 'put' | 'delete'

export type FlagTag = 'access' | 'save' | 'create' | 'edit' | 'remove' | 'list'

export interface PageInfo {
  page: number
  limit: number
  skip: number
}

export interface DownloadStore {
  filePath: string
  fileStream: Buffer
  mimeType: string | false
}

export interface FileStores {
  [propsName: string]: StoreItem
}