import snakeToCamel from '~/utils/transformers/snakeToCamel'

function convertResponse(response: any) {
  let parentKeys = Object.keys(response)

  parentKeys.forEach(key => {
    let currentObj = response[key]

    delete response[key]

    let newKey = snakeToCamel(key)
    response[newKey] = currentObj

    if (typeof response[newKey] === 'object') {
      convertResponse(response[newKey])
    }
  })

  return response
}

export default convertResponse
