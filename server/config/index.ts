
import { Config } from '../types/config'

const project: Config = {
  Host: '0.0.0.0',
  Port: 4000,

  site_name: 'Kenote',
  site_url: 'http://localhost:4000',

  session_secret: 'kenote_secret',
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0
  },

  mongo: {
    uris: 'mongodb://localhost:27017/kenote_nuxtjs_admin',
  }
}

export default project