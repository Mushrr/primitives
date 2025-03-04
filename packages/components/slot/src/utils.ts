import { Fragment, type VNode } from 'vue'
import { OkuSlottable } from './slot'

export function isValidVNodeElement(input: any): boolean {
  return (
    input
    && (typeof input.type === 'string'
      || typeof input.type === 'object'
      || typeof input.type === 'function')
  )
}

export function isSlottable(child: VNode): child is VNode {
  return (
    isValidVNodeElement(child)
    && (child.type === OkuSlottable)
  )
}

export function isEmptyElement(c: any) {
  return (
    c
    && (c.type === Comment
      || (c.type === Fragment && c.children.length === 0)
      || (c.type === Text && c.children.trim() === ''))
  )
}

export function isEmptySlot(c: any) {
  return !c || c().every(isEmptyElement)
}

export function isStringElement(c: any) {
  return c && c.type === Text
}

export function filterEmpty(children = []) {
  const res: any = []
  children.forEach((child: any) => {
    if (Array.isArray(child))
      res.push(...child)

    else if (child.type === Fragment)
      res.push(...child.children)

    else
      res.push(child)
  })
  return res.filter((c: any) => !isEmptyElement(c))
}
