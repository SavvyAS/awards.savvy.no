'use client'

import content from '@/lib/content.json'
import { Pages } from '@/lib/content'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import Image from 'next/image'

export default function Page() {
  const { agency } = content.pages as Pages

  const getColor = (i: number) => {
    switch (i) {
      case 0:
        return 'secondary-dark'
      case 1:
        return 'primary'
      case 2:
        return 'primary-dark'
      default:
        return 'primary'
    }
  }

  const dynamic = (content: any, color: string) => {
    // open text modal
  }

  const showSendMessageModal = () => {
    // open send message modal
  }

  return (
    <div className="agency container">
      <header>
        <div className="row">
          <h1 className="column-4 agency__heading">{agency.heading}</h1>
        </div>
        <div className="row">
          <p className="column-2 paragraph-large">{agency.ingress}</p>
        </div>
      </header>
      <div className="row">
        <Image
          className="column graffiti-top"
          src="/images/graffiti.svg"
          quality="100"
          width="413"
          height="408"
          alt=""
        />
      </div>
      <div className="row">
        <p className="relative column-4">{agency.text}</p>
      </div>
      <section className="row">
        <div className="column">
          <Card
            image={
              <div className="card-image-wrapper">
                <Image
                  src="/images/purple-room.png"
                  alt=""
                  quality="100"
                  width="790"
                  height="628"
                />
              </div>
            }
          >
            <div className="vertical-align-center">
              <span className="h3">{agency.guilty.heading}</span>
              <p>{agency.guilty.text}</p>
              <a href="agency.guilty.webpageUrl" style={{ width: 'auto' }}>
                <Button>Visit Guilty</Button>
              </a>
            </div>
          </Card>
        </div>
      </section>
      <section>
        <div className="row">
          <h2 className="column color-secondary">{agency.list.heading}</h2>
        </div>
        <ul>
          {agency.list.items.map((coreValue, index) => (
            <li className="row" key={coreValue.name}>
              <div className="column-4">
                <Button
                  type="plus"
                  size="large"
                  color={getColor(index)}
                  onClick={() => dynamic(coreValue.modalContent, getColor(index))}
                  marginBottom
                >
                  {coreValue.name}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="employees">
        <h2 className="sr-only">Employees</h2>
        {agency.team.map((employee, index) => (
          <div className="row employees__row" key={employee.name + index}>
            <div className={index % 2 === 0 ? 'column' : 'column-2'}>
              <Card
                alignRight={index % 2 !== 0}
                image={
                  <div className="card-image-wrapper">
                    <Image
                      src={employee.imagePath}
                      alt=""
                      width="379"
                      height="431"
                      quality="100"
                      sizes="sm:400px md:100% lg:800px"
                    />
                    {index === 1 && (
                      <div className="graffiti">
                        <Image
                          src="/images/graffiti_2.svg"
                          width="379"
                          height="431"
                          quality="100"
                          alt=""
                        />
                      </div>
                    )}
                    {index === 3 && (
                      <div className="graffiti">
                        <Image
                          src="/images/graffiti.svg"
                          quality="100"
                          width="413"
                          height="408"
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                }
              >
                <div className="vertical-align-center">
                  <small>{employee.title}</small>
                  <h3 className="mb-1\/2">{employee.name}</h3>
                  <p>{employee.about}</p>
                  <a href={`mailto:${employee.email}`} className="color-primary paragraph-small">
                    {employee.email}
                  </a>
                  <Button onClick={showSendMessageModal}>Ask for cv</Button>
                  <div v-if="index === 1" className="graffiti-mobile">
                    <Image
                      src="/images/graffiti_2.svg"
                      quality="100"
                      width="379"
                      style={{ position: 'relative' }}
                      height="431"
                      alt=""
                    />
                  </div>
                  <div v-if="index === 3" className="graffiti-mobile">
                    <Image
                      src="/images/graffiti.svg"
                      width="413"
                      quality="100"
                      height="408"
                      style={{ position: 'relative' }}
                      alt=""
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}