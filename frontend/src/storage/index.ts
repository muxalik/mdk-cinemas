import { proxy } from 'valtio'

export const state = proxy({
  sidebarCollapsed: false,
})
