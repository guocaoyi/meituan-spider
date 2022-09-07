let shops = []
if (!Reflect.get(history, '_modify')) {
  Reflect.set(history, '_modify', true)
  const historyPushState = history.pushState
  history.pushState = function (data, unused, url) {
    console.info('history.pushstate', data, unused, url)
    let uri = `https://placeholder.com${url}`
    let uriObj = new URL(uri)
    let shopId = uriObj.searchParams.get('mtShopId')
    shops.push(shopId)
    throw new Error('history prevent')
  }
}
window.addEventListener('beforeunload', function (event) {
  console.info('before xxx', event?.stopPropagation)
  event?.stopPropagation()
  console.info('before xxx', event?.defaultPrevented)
  event?.defaultPrevented()
})
window.addEventListener('unload', function (event) {
  console.info('before xxx', event?.stopPropagation)
  event?.stopPropagation()
  console.info('before xxx', event?.defaultPrevented)
  event?.defaultPrevented()
})

if (Reflect.get(history, '_modify')) {
  Reflect.set(history, '_modify', true)
  const historyGo = history.go
  history.go = function (detaly) {
    console.info('history.go')
    historyGo(detaly)
  }

  const historyPushState = history.pushState
  history.pushState = function (data, unused, url) {
    console.info('history.pushstate', data, unused, url)
    historyPushState(data, unused, url)
  }
  const historyReplaceState = history.pushState
  history.replaceState = function (data, unused, url) {
    console.info('history.replaceState', data, unused, url)
    historyReplaceState(data, unused, url)
  }
}

//  picker address
const ke = new KeyboardEvent('keydown', {
  bubbles: true,
  cancelable: true,
  keyCode: 13,
})
const me = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
})
document.getElementsByClassName('_1EmUj62Pz9NkOzTEdbyD-o')[0].dispatchEvent(me)
document.getElementsByClassName('_1EmUj62Pz9NkOzTEdbyD-o')[0].dispatchEvent(ke)

//  picker city
