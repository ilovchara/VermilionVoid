import type { ComponentType, SVGProps } from "react"
import { Github, Music } from "lucide-react"
import { profile, type ExternalProfileLink, type ExternalProfileLinkType } from "@/data/profile"
import { QqIcon } from "@/components/icons/qq-icon"

const iconMap: Record<ExternalProfileLinkType, ComponentType<SVGProps<SVGSVGElement>>> = {
  qq: QqIcon,
  music: Music,
  github: Github,
}

// 页脚编辑
// 网站上线时间（北京时间）；修改这里即可调整运行计时的起点。
const siteStartTime = "2026-11-01T00:00:00+08:00"

const footerNavItems: { name: string; href: string; external?: boolean }[] = [
  { name: "首页", href: "/" },
  { name: "时间线", href: "/timeline/" },
  // 书架重新设计期间暂时隐藏入口。
  // { name: "书架", href: "/bookshelf/" },
  { name: "专题", href: "/studies/" },
  { name: "工作", href: "/work/" },
  { name: "关于", href: "/about/" },

  // { name: "友链", href: "/friends/" },
  // { name: "开往", href: "https://www.travellings.cn/go.html", external: true },
]

export function Footer() {
  return (
    <footer className="site-footer border-t border-border/50 bg-background">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-6 md:pt-14 md:pb-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
          {/* 左侧：站点介绍 */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="/"
              className="inline-block font-serif text-3xl font-bold tracking-tight text-primary transition-opacity hover:opacity-80"
            >
              朱墨<span className="text-black dark:text-white">留白</span>
            </a>
            <p className="mt-3 max-w-72 font-serif text-sm leading-relaxed text-muted-foreground">
              {profile.bio}
            </p>
          </div>

          {/* 中间：导航 */}
          <div className="md:justify-self-center">
            <h4 className="mb-4 text-xs font-medium tracking-widest text-foreground">导航</h4>
            <nav aria-label="页脚导航" className="flex flex-col items-start gap-2.5">
              {footerNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* 右侧：联系方式 */}
          <div className="md:justify-self-end">
            <h4 className="mb-4 text-xs font-medium tracking-widest text-foreground">联系</h4>
            <div className="-ml-2 flex flex-wrap items-center gap-1">
              {profile.links.filter((link): link is ExternalProfileLink => link.type !== "wechat").map((link) => {
                const Icon = iconMap[link.type]
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:text-primary"
                    aria-label={link.name}
                    title={link.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/50 grid items-center gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
          <p className="text-muted-foreground text-xs">© 2026 猹 Όλα θα πάνε καλά...</p>
          <p className="text-muted-foreground text-xs tabular-nums md:text-center" role="timer" aria-live="off">
            网站已运行{" "}
            <span data-site-uptime data-start={siteStartTime}>正在计算…</span>
          </p>
          <a
            href="https://github.com/Lapis0x0/VermilionVoid"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted-foreground text-xs hover:text-primary transition-colors duration-200 md:justify-end"
          >
            <Github className="w-3.5 h-3.5" />
            <span>博客主题：朱墨留白 | VermilionVoid</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
