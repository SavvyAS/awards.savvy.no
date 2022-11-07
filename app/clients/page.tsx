'use client'

import { Clients } from '@/lib/content'
import content from '@/lib/content.json'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import clsx from 'clsx'
import Image from 'next/image'
import styles from './page.module.scss'

export default function Page() {
  const clientPage = content.pages.clients as Clients

  return (
    <div className={clsx(styles.clients, 'container')}>
      <header>
        <div className="row">
          <h1 className={clsx(styles.clients__heading, 'column-4')}>{clientPage.heading}</h1>
        </div>
        <div className="row">
          <p className="column-2 paragraph-large">{clientPage.ingress}</p>
        </div>
      </header>
      <section className={styles['clients-list']}>
        <h2 className="sr-only">Clients</h2>
        {clientPage.clients.map((client, index) => (
          <div className={clsx(styles['clients-list__client'], 'row')} key={client.name}>
            <div className={index % 2 === 0 ? 'column' : 'column-2'}>
              <Card
                alignRight={index % 2 !== 0}
                image={
                  <div className={styles.background}>
                    <Image
                      src={client.backgroundPath}
                      width="379"
                      height="431"
                      quality="100"
                      alt=""
                    />
                    <div className={styles.logo}>
                      <Image
                        src={client.logoPath}
                        alt={client.name + ' logo'}
                        width="379"
                        height="431"
                        className={styles['logo__image']}
                      />
                    </div>
                  </div>
                }
              >
                <div className="vertical-align-center">
                  <small style={{ display: 'block' }}>Client</small>

                  <span className="h3">{client.name}</span>

                  <p>{client.text}</p>

                  <a href={client.websiteUrl}>
                    <Button>Visit {client.name}</Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
