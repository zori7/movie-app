import React from 'react'

interface IRoute {
  path: string
  component: React.ComponentType
  exact?: boolean
}

export default IRoute
