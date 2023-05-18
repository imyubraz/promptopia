"use client";

import React from 'react'

import { SessionProvider } from 'next-auth/react'

const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>

    // providing session context to children wrap by <Provider></Provider>
  )
}

export default Provider