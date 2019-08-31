export default function getContentRender(content: HTMLElement) {
  var global = window

  var docStyle = document.documentElement.style

  var engine: string
  if ('MozAppearance' in docStyle) {
    engine = 'gecko'
  } else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit'
  }

  var vendorPrefix = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O'
  }[engine]

  var helperElem = document.createElement('div')
  var undef: undefined

  var perspectiveProperty = vendorPrefix + 'Perspective'
  var transformProperty = vendorPrefix + 'Transform'

  if (helperElem.style[perspectiveProperty] !== undef) {
    return function(left: number, top: number, zoom: number) {
      content.style[transformProperty] = 'translate3d(' + -left + 'px,' + -top + 'px,0) scale(' + zoom + ')'
    }
  } else if (helperElem.style[transformProperty] !== undef) {
    return function(left: number, top: number, zoom: number) {
      content.style[transformProperty] = 'translate(' + -left + 'px,' + -top + 'px) scale(' + zoom + ')'
    }
  } else {
    return function(left: number, top: number, zoom: number) {
      content.style.marginLeft = left ? -left / zoom + 'px' : ''
      content.style.marginTop = top ? -top / zoom + 'px' : ''
      content.style.zoom = zoom + '' || ''
    }
  }
}
