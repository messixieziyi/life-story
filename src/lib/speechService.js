/**
 * 语音识别服务
 * 使用 Web Speech API 进行语音转文字
 */

/**
 * 检查浏览器是否支持语音识别
 */
export function isSpeechRecognitionSupported() {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
}

/**
 * 开始语音识别
 * @param {Function} onResult - 识别结果回调 (text: string) => void
 * @param {Function} onError - 错误回调 (error: Error) => void
 * @param {Function} onEnd - 结束回调 () => void
 * @returns {Object} { start: Function, stop: Function }
 */
export function startSpeechRecognition(onResult, onError, onEnd) {
  if (!isSpeechRecognitionSupported()) {
    const error = new Error('您的浏览器不支持语音识别功能，请使用 Chrome 或 Edge 浏览器')
    onError(error)
    return null
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  // 配置
  recognition.lang = 'zh-CN' // 中文
  recognition.continuous = true // 持续识别
  recognition.interimResults = true // 返回临时结果

  let finalTranscript = ''

  recognition.onresult = (event) => {
    let interimTranscript = ''

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) {
        finalTranscript += transcript
      } else {
        interimTranscript += transcript
      }
    }

    // 返回最终结果和临时结果
    onResult(finalTranscript + interimTranscript)
  }

  recognition.onerror = (event) => {
    let errorMessage = '语音识别出错'
    
    switch (event.error) {
      case 'no-speech':
        errorMessage = '未检测到语音，请重新尝试'
        break
      case 'audio-capture':
        errorMessage = '无法访问麦克风，请检查权限设置'
        break
      case 'not-allowed':
        errorMessage = '麦克风权限被拒绝，请在浏览器设置中允许访问麦克风'
        break
      case 'network':
        errorMessage = '网络错误，请检查网络连接'
        break
      default:
        errorMessage = `语音识别错误: ${event.error}`
    }
    
    onError(new Error(errorMessage))
  }

  recognition.onend = () => {
    onEnd()
  }

  // 开始识别
  try {
    recognition.start()
  } catch (error) {
    onError(new Error('无法启动语音识别，请重试'))
    return null
  }

  return {
    start: () => {
      try {
        recognition.start()
      } catch (error) {
        // 如果已经在运行，忽略错误
      }
    },
    stop: () => {
      recognition.stop()
    },
    abort: () => {
      recognition.abort()
    }
  }
}
