<template>
  <header>
    <div class="header-start">
      <div class="header-link-box">
        <nuxt-link class="header-link logo" to="/">
          <img src="/logo.png" />
        </nuxt-link>
      </div>
      <el-dropdown @command="selectChannel" placement="top-start" trigger="click" @visible-change="handleVisible">
        <a class="header-link" v-bind:class="visible ? 'active' : ''">
          <span class="el-dropdown-link">
            <i class="el-icon-menu el-icon--left"></i>{{ currentChannel.name }}
          </span>
        </a>
        <el-dropdown-menu slot="dropdown" class="header-link-dropdown">
          <template v-for="(channel, idx) in platforms">
            <el-dropdown-item v-if="channel.id === 11" :key="idx+1000" divided></el-dropdown-item>
            <el-dropdown-item :key="idx" :command="channel.id">[{{ channel.id }}] {{ channel.name }}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="header-end">
      <slot></slot>
      <auth-dropdown :auth="auth" :command="command" :user-entrance="userEntrance" />
    </div>
  </header>
</template>

<script lang="ts">
import Component from 'nuxt-class-component'
import { Prop, Provide, Vue } from 'vue-property-decorator'
import channel from '~/server/types/channel'
import { responseDocument as responseUserDocument } from '~/server/types/proxys/user'
import authDropdown from './auth-dropdown.vue'
import { Dropdown } from '~/types'
import { map, uniq, concat } from 'lodash'

@Component({
  name: 'console-header',
  components: {
    authDropdown
  },
  mounted () {
    if (!this.auth) return
    let platform: Array<number> | undefined
    if (this.auth.group.level < 9000) {
      platform = uniq(map(this.auth.teams, 'platform').toString().split(',')).map(Number)
      //console.log( this.filterChannels(this.$data.platform) )// map(this.auth.teams, 'platform')
      //let res = new Map()
      //console.log( [[1,2], [2,3]].toString().split(',').map(Number).filter( o => !res.has(o) && res.set(o, 1) ) )
      //console.log( Array.from(new Set([[1,2], [2,3]].toString().split(',').map(Number))) )
    }
    this.$data.platforms = this.filterChannels(platform)
  }
})
export default class  extends Vue {

  @Prop({ default: null }) auth: responseUserDocument | null
  @Prop({ default: [] }) userEntrance: Array<Dropdown.MenuItem>
  @Prop({ default: [] }) channels: Array<channel.NavMenus>
  @Prop({ default: { id: 0, name: '控制台', navs: [], default: '/' } }) currentChannel: channel.NavMenus
  @Prop({ default: (value: number): void => {} }) selectChannel: (value: number) => void
  @Prop({ default: (value: string): void => {} }) command: (value: string) => void

  @Provide() visible: boolean = false
  @Provide() platforms: Array<channel.NavMenus> = []

  handleVisible (visible: boolean): void {
    this.visible = visible
  }

  filterChannels (platform: Array<number> | undefined): Array<channel.NavMenus> {
    if (!platform) return this.channels
    return this.channels.filter( o => platform.indexOf(o.id) > -1 )
  }
  
}

</script>