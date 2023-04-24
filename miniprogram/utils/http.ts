// HTTP请求方法枚举
export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	OPTIONS = 'OPTIONS',
	PUT = 'PUT',
	DELETE = 'DELETE'
}
// HTTP请求配置
interface RequestConfig {
	url?: string  // API路径
	method?: HttpMethod  // Method类型
	data?: any  // 接口返回数据
	needToken?: boolean  // 无TOKEN触发异常捕获时，是否执行异常逻辑
	header?: object  // Header头部
	dataType?: string  // 返回的数据格式
	noShowMsg?: boolean  // 请求报错时，是否弹出message提示（默认弹出)
}
// 业务数据类型
// interface MyAwesomeData<T> {
// 	code: number
// 	msg: string
// 	data: T
// }

class HttpRequest {
  private static instance: HttpRequest
  private constructor() {}
  
  public static getInstance(): HttpRequest {
    if (!this.instance) {
      this.instance = new HttpRequest();
    }
    return this.instance;
  };

  private handerErrorStatus(statusCode: number, requestConfig: RequestConfig) {
    let msg = '服务找不到';
    if (statusCode === 502 || statusCode === 503) {
			msg = '服务器开小差了~'
		}
		!requestConfig.noShowMsg && wx.showToast({
			title: `${msg}，错误码：${statusCode}`,
			icon: 'none'
		})
    return msg;
  }

  private handerError(err: { errMsg: string }, requestConfig: RequestConfig) {
		let msg = `请求异常`
		if (/timeout/.test(err.errMsg)) {
			msg = '请求超时'
		}
		!requestConfig.noShowMsg && wx.showToast({
			title: msg,
			icon: 'none'
		});
		return msg
	}

  public request<T>(requestConfig: RequestConfig): Promise<T>{
    let _this = this;
    return new Promise((resolve, reject) => {
      // 默认header
			const contentType = requestConfig.method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json'
			const header = {
				'content-type': contentType
      }
      wx.request({
        method: requestConfig.method,
        url: `${requestConfig.url}`,
        data: requestConfig.data,
        header: Object.assign(header, requestConfig?.header),
        success: (res) => {
          const code = res.statusCode || -404;
          const data = res.data;
          if (code === 200) {
            resolve(data as any);
          } else if (code === 401) {
            // 未授权
						!requestConfig.noShowMsg && wx.showModal({
							title: '登录失效',
							content: '登录失效，请重新登录',
						}).then(resModa => {
							if (resModa.confirm) { }
						})
						reject({ code, msg: '未登录', data: data });
          } else {
            let errMsg = _this.handerErrorStatus(code, requestConfig);
            reject({code, msg: errMsg, data});
          }
        },
        fail: (err) => {
          let msg = _this.handerError(err, requestConfig);
          reject({msg});
        }
      })
    });
  }

  // get方法
  public get<T>(url: string, data: object, otherConfig?: RequestConfig) {
    return this.request<T>({method: HttpMethod.GET, url, data, ...otherConfig});
  }

  // put方法
  public put<T>(url: string, data: object, otherConfig?: RequestConfig) {
    return this.request<T>({method: HttpMethod.PUT, url, data, ...otherConfig});
  }

  // delete方法
  public delete<T>(url: string, data: object, otherConfig?: RequestConfig) {
    return this.request<T>({method: HttpMethod.DELETE, url, data, ...otherConfig});
  }

  // post方法
  public post<T>(url: string, data: object, otherConfig?: RequestConfig) {
    return this.request<T>({method: HttpMethod.POST, url, data, ...otherConfig});
  }
}

export default HttpRequest.getInstance();
