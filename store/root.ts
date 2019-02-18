import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
import { RootState } from 'store'
import { IRequest } from '~/server/types/resuful'
import * as setting from './modules/setting'

export const types = {}

export interface State {}

export const state = (): State => ({})

export const getters: GetterTree<State, RootState> = {}

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>, server: HTTPServer): void
}

interface HTTPServer {
  req: IRequest
}

export const actions: Actions<State, RootState> = {
  async nuxtServerInit({ commit }, { req }) {
    //console.log(req.__rules, req.path)
    commit(`${setting.name}/${setting.types.REGISTER}`, req.__register)
    commit(`${setting.name}/${setting.types.__RULES}`, req.__rules)
  }
}

export const mutations: MutationTree<State> = {}