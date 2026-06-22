import { MessageSquare } from 'lucide-react'
import { getMeetupMeta } from '@/meetup/data/meetup'
import { useLang, useT } from '@/meetup/i18n'

/**
 * Slide finale — Q&A.
 *
 * Pattern simple : appel à questions + contact speaker.
 * Pour une slide Q&A plus riche avec questions préparées en accordion,
 * cf. slide-27-qa du meetup forecasting (référence).
 */
export function SlideEndQA() {
  const t = useT()
  const { lang } = useLang()
  const meetup = getMeetupMeta(lang)
  return (
    <div className="relative flex h-full w-full items-center justify-center px-12">
      <div className="text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-ilab-green/15 text-ilab-green">
          <MessageSquare className="h-12 w-12" />
        </div>
        <h2 className="ilab-gradient-text animate-shimmer-text text-7xl font-black md:text-8xl">
          {t('Questions ?', 'Questions?')}
        </h2>
        <p className="mt-8 max-w-2xl text-xl text-muted-foreground">
          {meetup.speaker.name} · {meetup.speaker.role}
        </p>
        <p className="mt-4 text-lg text-ilab-green">philippe.pary@astek.net</p>
      </div>
    </div>
  )
}
