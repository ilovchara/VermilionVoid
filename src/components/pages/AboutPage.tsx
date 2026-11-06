import { MapPin, Heart } from "lucide-react"
import { profile } from "@/data/profile"
import { ProfileContactLink } from "@/components/profile-contact-link"

export default function AboutPage() {
  return (
    <div className="site-content bg-background dark:bg-surface-subtle">
      <main className="pt-32 pb-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero Section */}
          <section className="mb-10">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-border shadow-lg">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    width={176}
                    height={176}
                    loading="lazy"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <span className="w-1 h-8 bg-primary rounded-full" />
                  关于我
                </h1>
                <p className="text-xl text-muted-foreground mb-4">{profile.bio}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    中国
                  </span>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {profile.links.map((link) => {
                    return (
                      <ProfileContactLink
                        key={link.name}
                        link={link}
                        className="p-2.5 rounded-lg bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        iconClassName="w-5 h-5"
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Bio Section */}
          <section className="mb-16">
            <div className="prose prose-neutral dark:prose-invert max-w-none
              prose-p:text-base prose-p:leading-8 prose-p:my-5 prose-p:text-foreground/90 dark:prose-p:text-foreground
              prose-a:text-primary prose-a:no-underline prose-a:hover:underline
              prose-blockquote:border-l-primary prose-blockquote:border-l-2 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-content-secondary prose-blockquote:font-normal prose-blockquote:bg-surface-subtle prose-blockquote:py-2 prose-blockquote:rounded-r-lg
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-foreground/90 dark:prose-ul:text-foreground prose-ul:my-5
              prose-li:marker:text-primary prose-li:my-1.5"
            >
              <blockquote>
                生命就是无意义的重复
              </blockquote>

              <p>没什么特别的人,名字来源于传说之下，但是本人还是云玩家。</p>
              <p>项目文件来源于朱墨留白，之后会慢慢改造的。</p>
              <p>至于我的介绍之后再补充吧。</p>

            </div>

            <figure className="mt-10 overflow-hidden rounded-2xl border border-border/60 bg-surface-subtle shadow-sm">
              <img
                src="/radandwirte.jpg"
                alt="红白墙面与两扇窗户"
                className="aspect-video w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </section>

        </div>
      </main>
    </div>
  )
}
