function debounce(fn: Function, time = 400) {
  let timeoutId: number | null = null

  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = window.setTimeout(() => {
      fn(...args)
    }, time)
  }
}

export default debounce
