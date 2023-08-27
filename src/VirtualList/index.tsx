import React from "react";
import { flushSync } from 'react-dom'
import style from "./index.module.css";
import VirtualItem from "../VirtualItem";

interface Props {
  preHeight?: number//预测列表项高度
  extraRenderCount?: number;//额外渲染的列表项个数
  components: React.ReactElement[]
}

const getStartIndex = (tops: number[], scrollTop: number) => {
  let left = 0, right = tops.length;
  while (left < right) {
    const mid = left + (~~((right - left) / 2))
    if (tops[mid] >= scrollTop) right = mid
    else left = mid + 1
  }
  return Math.max(0, left - 1)
}

const getEndIndex = (tops: number[], clientHeight: number, scrollTop: number) => {
  let left = 0, right = tops.length
  while (left < right) {
    const mid = left + (~~((right - left) / 2))
    if (tops[mid] < scrollTop + clientHeight) left = mid + 1
    else right = mid
  }
  return left
}

const getRangeToRender = (tops: number[], scrollTop: number, clientHeight: number | undefined, extraRenderCount: number) => {
  const startIndex = getStartIndex(tops, scrollTop)
  const endIndex = typeof clientHeight === 'number' ? getEndIndex(tops, clientHeight, scrollTop) : 0
  return [Math.max(0, startIndex - extraRenderCount), Math.min(tops.length - 1, endIndex + extraRenderCount), startIndex, endIndex]
}

const VirtualList: React.FC<Props> = ({ preHeight = 50, extraRenderCount = 10, components }) => {
  const getVirtualItemHeight = React.useCallback((index: number) => {
    return heightsRef.current[index] ?? preHeight
  }, [preHeight])

  const setVritualItemHeight = (index: number, height: number) => {
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height
      setTops(getTops())
    }
  }

  const heightsRef = React.useRef<number[]>([])

  const getTops = React.useCallback(() => {
    const tops: number[] = []
    tops[0] = 0
    for (let i = 1; i <= components.length; i++) {
      tops[i] = tops[i - 1] + getVirtualItemHeight(i - 1)
    }
    return tops
  }, [components.length, getVirtualItemHeight])

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = React.useState(0)
  const [tops, setTops] = React.useState<number[]>(getTops())

  const getCurrentRenderItems = () => {
    const height = tops[tops.length - 1] ?? 0
    const [start, end] = getRangeToRender(tops, scrollTop, scrollContainerRef.current?.clientHeight, extraRenderCount)

    return <div style={{ width: '100%', height: height + 'px' }}>
      {components.slice(start, end).map((component) => {
        const index = component.props['data-index']
        return <VirtualItem
          key={component.key}
          setHeight={setVritualItemHeight}
          style={{ position: 'absolute', width: '100%', top: `${tops[index]}px` }}
          index={index}>
          {component}
        </VirtualItem>
      })}
    </div>
  }

  return (
    <div
      ref={scrollContainerRef}
      className={style["virtual-container"]}
      onScroll={e => {
        flushSync(() => setScrollTop(e.currentTarget.scrollTop))
      }}>
      {getCurrentRenderItems()}
    </div>
  );
};

export default VirtualList;
