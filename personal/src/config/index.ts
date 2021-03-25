interface Config {
  noConsole: boolean,
  baseUrl: string
}

function getConfig (): Config {
  let baseUrl = ''
  let noConsole: boolean
  if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3721'
    noConsole = false
  } else {
    baseUrl = 'https://points.xinongtech.com/integ'
    noConsole = true
  }
  return { baseUrl, noConsole }
}

export default getConfig
