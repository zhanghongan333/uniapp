// 维护一个更完整的config对象
export async function requestConfig(ins, options, successHandler, failHandler, completeHandler) {
  // base
  ins.header = options.hander || ins.header
  ins.baseUrl = options.baseUrl || ins.baseUrl
  // config base
  const config = {
    url: ins.baseUrl + options.url,
    hander: ins.header
  }
  console.log(ins.baseUrl + options.url)
  // 请求拦截
  if (ins.requestInterceptor) {
    let _cg = null
    try {
      _cg = await ins.requestInterceptor(Object.assign({}, options.config))
    } catch (e) {
      // TODO handle the exception
      return false
    }

    if (!_cg || typeof _cg !== 'object') {
      return false
    }
    if (Object.keys(_cg).length !== 0) {
      const op = Object.assign(options, _cg)
      // 允许在请求拦截函数中对url,header进行修改
      config.url = ins.baseUrl + op.url
      config.hander = op.hander
    }
  }
  const type = options.type || 'request'
  if (type === 'request') {
    config['data'] = options.data || options.params || {}
    config['method'] = options.method || 'GET'
    config['dataType'] = options.dataType || 'json'
    config['responseType'] = options.responseType || 'text'
  } else if (type === 'upload') {
    config['filePath'] = options.filePath
    config['name'] = options.name
    config['method'] = options.method || 'POST'
    config['formData'] = options.forData
    config['fileType'] = options.fileType || 'image'
    delete config.hander['Content-Type']
  } // 文件下载不需要做额外的操作
  return config
}
