import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import { RouterApp } from '@/router'
import { store } from '@/store/store'

import { ModalMaster } from '@/common/components/modal/ModalMaster'
import { DrawerMaster } from '@/common/components/drawer/DrawerMaster'
import { ToastContainer } from '@/common/components/toast/ToastContainer'
import { Menu } from '@/common/components/menu/Menu'
import { MusicPlayer } from '@/common/components/music-player/MusicPlayer'

const AppRouter = import.meta.env.BASE_URL === '/' ? BrowserRouter : HashRouter

const InvitationAppContent: React.FC = () => {
  return (
    <AppRouter>
      <RouterApp />
      <ModalMaster />
      <DrawerMaster />
      <ToastContainer />
      <Menu />
      <MusicPlayer />
    </AppRouter>
  )
}

export const InvitationApp: React.FC = () => {
  return (
    <Provider store={store}>
      <InvitationAppContent />
    </Provider>
  )
}
