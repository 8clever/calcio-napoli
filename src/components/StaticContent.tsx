import { createElement, useRef, useState, useEffect } from 'react'

function useStaticContent() {
  const ref = useRef<HTMLElement>(null)
  const [render, setRender] = useState(typeof window === 'undefined')

  useEffect(() => {
    const isEmpty = ref.current?.innerHTML === ''
    if (isEmpty) {
      setRender(true)
    }
  }, [])

  return [render, ref]
}

export function StaticContent({ children, element = 'div', ...props }: any) {
  const [render, ref] = useStaticContent()

  if (render) {
    return createElement(element, {
      ...props,
      children,
    })
  }

  return createElement(element, {
    ...props,
    ref,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: '' },
  })
}
