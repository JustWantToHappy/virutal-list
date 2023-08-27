import React from 'react'

type Props = {
  index: number;
  setHeight: (index: number, height: number) => void;
  style?: React.CSSProperties,
  children?: React.ReactElement,
}

const VirtualItem: React.FC<Props> = React.memo(({ index, children, setHeight, style }) => {
  const itemRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (itemRef.current) {
      setHeight(index, itemRef.current.getBoundingClientRect().height)
    }
  }, [setHeight, index])

  return (
    <div ref={itemRef} style={style}>
      {children}
    </div>
  )
})

export default VirtualItem