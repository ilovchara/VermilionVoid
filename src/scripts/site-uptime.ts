// 修改站点上线时间
let timer: number | undefined

function stopSiteUptime() {
  window.clearInterval(timer)
  timer = undefined
}

function initSiteUptime() {
  stopSiteUptime()

  const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-site-uptime]")).map((element) => ({
    element,
    start: Date.parse(element.dataset.start ?? ""),
  }))

  function update() {
    const now = Date.now()

    for (const { element, start } of counters) {
      if (!Number.isFinite(start)) {
        element.textContent = "上线时间设置有误"
        continue
      }

      const totalSeconds = Math.max(0, Math.floor((now - start) / 1000))
      const days = Math.floor(totalSeconds / 86400)
      const hours = Math.floor((totalSeconds % 86400) / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      element.textContent = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`
    }
  }

  update()
  if (counters.length > 0) timer = window.setInterval(update, 1000)
}

initSiteUptime()
document.addEventListener("astro:page-load", initSiteUptime)
document.addEventListener("astro:before-swap", stopSiteUptime)
