export const imagerror = {
  inserted(el, options) {
    // 当图片出现异常，给一个默认值做图片
    el.onerror = function() {
      el.src = options.value
    }
  }
}
