import React from 'react'

interface CallbackFun {
  (top: number): void
}

export default class Scrooler {
  private __callback: CallbackFun
  private __initialTouchLeft: number = 0
  private __initialTouchTop: number = 0
  private __lastTouchLeft: number = 0
  private __lastTouchTop: number = 0
  private __lastTouchMove: number = 0
  constructor(callback: CallbackFun) {
    this.__callback = callback
  }
  doTouchStart(touches: React.TouchList, timeStamp: number) {
    var currentTouchLeft: number, currentTouchTop: number
    var isSingleTouch = touches.length === 1
    if (isSingleTouch) {
      currentTouchLeft = touches[0].pageX
      currentTouchTop = touches[0].pageY
    } else {
      currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2
      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2
    }

    // Store initial positions
    this.__initialTouchLeft = currentTouchLeft
    this.__initialTouchTop = currentTouchTop

    this.__lastTouchLeft = currentTouchLeft
    this.__lastTouchTop = currentTouchTop

    this.__lastTouchMove = timeStamp
  }
  doTouchMove(touches: React.TouchList, timeStamp: number) {
    var currentTouchLeft: number, currentTouchTop: number
    if (touches.length === 2) {
      currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2
      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2
    } else {
      currentTouchLeft = touches[0].pageX
      currentTouchTop = touches[0].pageY
    }
    var moveY = currentTouchTop - this.__lastTouchTop
    var distanceY = Math.abs(currentTouchTop - this.__initialTouchTop)
    this.__callback(moveY)
  }
  doTouchEnd(){}
}
