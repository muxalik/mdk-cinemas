import useLocalStorage from './useLocalStorage'
import { state } from '../storage'

const useCollapse = (initial?: boolean) => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage('collapse', initial)

  if (isCollapsed) {
    state.sidebarCollapsed = true
    document.body.classList.add('sidebar-collapsed')
  }

  if (!isCollapsed) {
    state.sidebarCollapsed = false
    document.body.classList.remove('sidebar-collapsed')
  }

  return [isCollapsed, setIsCollapsed] as const
}

export default useCollapse
