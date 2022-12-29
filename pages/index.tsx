import { Pages } from '@/lib/content.interface'
import content from '@/lib/content.json'
import Image from 'next/image'
import clsx from 'clsx'
import { AnimatedHeading } from 'components/AnimatedHeading/AnimatedHeading'
import Link from 'next/link'
import { Button } from 'components/Button/Button'
import { HalfImage } from 'components/HalfImage/HalfImage'
import { HorizontalScrollContainer } from 'components/HorizontalScrollContainer/HorizontalScrollContainer'
import { CvPartnerClientFactory } from '@/lib/cvpartner'
import { GetStaticProps } from 'next/types'

type Props = { title: string }

export default function Index({title}: Props) {
  const { home } = content.pages as Pages
  return (
    <div>
     <h1>{title}</h1>
      <h1>{home.heading}</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      title: 'Awards'
    }
  }
}
