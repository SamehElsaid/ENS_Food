import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../../i18n/settings'
import { useTranslation } from '../../../i18n'
export const Header = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer')
  return (
    <footer className='bg-red-500' style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{{lng}}</strong> to:{' '}
      </Trans>
      {languages.filter((l) => lng !== l).map((l, index) => {
        return (
          <span key={l}>
            {index > 0 && (' or ')}
            <Link 
// replace
            as={`/${l}`}
            href={`/${l}`}
            >
              {l}
            </Link>
          </span>
        )
      })}
    </footer>
  )
}