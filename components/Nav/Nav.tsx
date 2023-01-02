import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from './Nav.module.scss'
import {useState} from 'react'

export const Nav = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const router = useRouter()

    const nav = [
        {name: 'savvy.no', slug: '/clients'},
    ]

    return (
        <>
            <nav className={styles.navbar}>
                <div className="container">
                    <div className="column">
                        <div className={styles.navbar__inner}>
                            <div className={styles.navbar__logo}>
                                <Link href="/">
                                    <div>
                                        <img
                                            className="logo"
                                            src="/images/savvy-logo.svg"
                                            alt="Savvy logo"
                                            width="105"
                                            height="35"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className={styles.navbar__links}>
                                <div className={styles['link-wrapper']}>
                                    <a href="https://savvy.no/" target="_blank">
                                        <span>savvy.no</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
