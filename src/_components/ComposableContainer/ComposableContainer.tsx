import React, { Component, ReactChild } from 'react'
import { ToggleContainer } from '../ToggleContainer/ToggleContainer'
import './card.css'

// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
// type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

type Props = {
  children: ReactChild | NamedChildrenSlots,
showHeader: boolean
}

type NamedChildrenSlots = {
    header?: ReactChild,
    content: ToggleContainer
  }

const isObject = <T extends object>(value: any): value is T =>
  typeof value === 'object' && typeof value !== 'function' && value !== undefined

  const isNamedSlots = (children: any): children is NamedChildrenSlots =>
  isObject(children) && 'content' in children

export class ComposableContainer extends Component<Props> {
  render() {
    const { showHeader, children } = this.props

    if (!children) {
      throw new Error('children is missing !')
    }

    if (isNamedSlots(children)) {
      const { header, content} = children


      return (
        <div className="card">
         {/* { header ? <div>{header}</div> : null } */}
         { showHeader ? <div>{header}</div> : null }
         { content ? <div>{content}</div> : null }
        </div>
      )
    }

    return <div className="card">{children}</div>
  }
}
