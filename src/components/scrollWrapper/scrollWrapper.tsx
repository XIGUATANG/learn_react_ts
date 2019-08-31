import React, { Component } from 'react'
import './index.scss'

interface itemData {
  val: number
  height: number
  offsetTop?: number
  endIndex?: number
}
interface State {
  top: number
  visibleData: itemData[]
  list: itemData[]
  offset: number
  // 间隔
  interval: number
  refreshHeight: number
  loading: boolean
}

export default class ScrollWrapper extends Component<{}, State> {
  wrapper?: HTMLDivElement | null
  randomBoolean = () => Math.random() - 0.5 > 0

  constructor(props: {}) {
    super(props)
    const list: itemData[] = []
    for (let val = 0; val < 770; val++) {
      // randam height
      const height = this.randomBoolean() ? 60 : 30,
        obj: itemData = { val, height }
      if (!val) {
        obj.offsetTop = height
      }
      list.push(obj)
    }

    this.state = {
      visibleData: [],
      top: 0,
      list,
      offset: 10,
      refreshHeight: 40,
      // 间隔
      interval: 2,
      loading: false
    }
  }
  get visibleHeight() {
    return this.wrapper ? this.wrapper.clientHeight : 0
  }

  get contentHeight() {
    return this.state.list.reduce((p, c) => p + c.height, 0)
  }

  componentDidMount() {
    this.setState({
      ...this.doCalculate(0)
    })
  }

  calculateOffset = (index: number) => {
    const { list } = this.state

    if (index === list.length) {
      return 0
    }

    // 取缓存
    if (list[index].offsetTop) {
      return list[index].offsetTop || 0
    }

    let offsetTop = list[index].height

    offsetTop += this.calculateOffset(index - 1)

    // 添加缓存
    list[index] = {
      ...list[index],
      offsetTop
    }

    this.setState({ list })

    return offsetTop
  }

  findStartIndex = (top: number) => {
    const { list } = this.state

    let index = 0

    while (index < list.length) {
      if (!list[index].offsetTop) {
        this.calculateOffset(index)
      }

      if (top < (list[index].offsetTop || 0)) {
        break
      }

      index++
    }

    return index
  }

  findEndIndex = (startIndex: number) => {
    const { visibleHeight } = this,
      { list } = this.state
    let start = list[startIndex]
    if (start.endIndex) {
      return start.endIndex
    }
    const endIndex = this.calculateEndIndex(visibleHeight, startIndex)
    list[startIndex].endIndex = endIndex
    this.setState({ list })
    return endIndex
  }

  findTopByIndex = (index: number) => (index ? this.state.list[index - 1].offsetTop || 0 : 0)

  doCalculate = (startIndex: number) => {
    const { list, offset } = this.state
    const innerOffset = (startIndex = startIndex - offset)
    startIndex = startIndex > 0 ? startIndex : 0
    let endIndex = this.findEndIndex(startIndex) + offset * 2 + 1
    endIndex = innerOffset < 0 ? endIndex + innerOffset : endIndex
    endIndex = endIndex > list.length ? list.length : endIndex
    const visibleData = list.slice(startIndex, endIndex)
    const top = this.findTopByIndex(startIndex)
    return { visibleData, top }
  }

  calculateEndIndex = (visibleHeight: number, index: number = 0) => {
    const { list } = this.state

    while (visibleHeight > 0) {
      const i = index + 1
      if (i !== list.length) visibleHeight -= list[++index].height
      else break
    }

    return index
  }

  scrollHandler = () => {
    const { interval } = this.state,
      scrollTop = this.wrapper ? this.wrapper.scrollTop : 0

    const startIndex = this.findStartIndex(scrollTop)
    if (scrollTop + this.visibleHeight >= this.contentHeight) {
      // await this.
    }
    console.log(scrollTop + this.visibleHeight)

    if (startIndex % interval === 0) {
      this.setState(this.doCalculate(startIndex))
    }
  }
  render() {
    const { visibleData, top } = this.state
    return (
      <div className="infinite-list-wrapper" onScroll={this.scrollHandler} ref={ref => (this.wrapper = ref)}>
        <div className="infinite-list-ghost" style={{ height: this.contentHeight }} />
        <div className="infinite-list" style={{ transform: `translate3d(0, ${top}px, 0)` }}>
          {visibleData.map((item, i) => {
            const style = { height: `${item.height}px`, lineHeight: `${item.height}px` }
            return <div className="item" key={i} style={style}>{`item-${item.val}`}</div>
          })}
          <div className="loading-wrapper">
            {!this.state.loading ? (
              <svg viewBox="25 25 50 50" className="circular">
                <circle cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke="#2d8cf0" stroke-miterlimit="10" className="path" />
              </svg>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}
