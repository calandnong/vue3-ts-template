/**
 * 一个rem的计算方法，根据750版设计稿计算。1rem = 1px
 * @returns
 */
function rem() {
  const domElement = document.documentElement;
  if (!domElement) return;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const setRem = () => {
    const { clientWidth } = domElement;// 获取窗口宽度
    let r = 1;
    if (!clientWidth) return;
    // 大于750，则给最大1px
    if (clientWidth >= 750) {
      domElement.style.fontSize = `${r}px`;
    } else {
      r = 1 * (clientWidth / 750);
      // 小于750，则根据750的基数*1，给字体大小
      domElement.style.fontSize = `${r}px`;
    }
  };
  setRem();
  // 监听窗口变化，设置document的字体带下
  window.addEventListener(resizeEvt, setRem, false);
  document.addEventListener('DOMContentLoaded', setRem, false);
}

/**
 * 设置自适应单位
 */
export function setUnis() {
  rem();
}
