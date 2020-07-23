import {
  getLogger,
  Logger
} from 'loglevel'
const logger = getLogger('CCPay')

function loadScript (src: string) {
  const head = document.head
  const script = document.createElement('script')

  script.src = src

  head && head.appendChild(script)

  return new Promise((resolve, reject) => {
    script.onload = resolve
    script.onerror = reject
  })
}

async function initDebug (): Promise<void> {
  if (!window.VConsole) {
    await loadScript('https://cdn.jsdelivr.net/npm/vconsole')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vConsole = new window.VConsole()

  // setLevel 必须在最后一行，不然 vConsole 无法接管 log
  logger.setLevel('trace')
}

export {
  logger,
  initDebug
}

// export const logger = console as any as Logger
