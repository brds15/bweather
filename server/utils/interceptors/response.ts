import snakeToCamel from '~/server/utils/transformers/snakeToCamel'

function convertToCamelResponse(response: any) {
  let parentKeys = Object.keys(response)

  parentKeys.forEach(key => {
    let currentObj = response[key]

    delete response[key]

    let newKey = snakeToCamel(key)
    response[newKey] = currentObj

    if (typeof response[newKey] === 'object') {
      convertToCamelResponse(response[newKey])
    }
  })

  return response
}

export default convertToCamelResponse
