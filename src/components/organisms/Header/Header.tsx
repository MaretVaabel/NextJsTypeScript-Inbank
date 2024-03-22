import Image from 'next/image'
import Link from 'next/link'
import classes from './classes.module.scss'
import LogoDesktop from 'assets/header-desktop.svg'
import LogoMobile from 'assets/header-mobile.svg'

const Header = () => {
  return (
    <header className={classes.header}>
      <Link href="/">
        <Image
          src={LogoDesktop}
          alt={'Inbank logo'}
          style={{ objectFit: 'contain', width: '100%', height: '112px' }}
          className={classes.desktop}
        />
        <Image
          src={LogoMobile}
          alt={'Inbank logo'}
          style={{ objectFit: 'contain', width: '100%', height: '72px' }}
          className={classes.mobile}
        />
      </Link>
    </header>
  )
}

export default Header
