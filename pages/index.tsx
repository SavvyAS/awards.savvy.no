import content from '@/lib/content.json'
import styles from './index.module.scss';
import {GetStaticProps} from 'next/types'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowRight} from "@fortawesome/pro-regular-svg-icons";
import Image from 'next/image'
import {PriceItem} from "@/lib/content.interface";

type Props = { title: string }

export default function Index({title}: Props) {
    const {home} = content.pages as any
    return (
        <main className={styles.container}>
            <h1>{home.heading}</h1>
            <p>{home.ingress}</p>
            <a href="mailto:hakon@savvy.no" className={styles["send-contribution"]}>
                {home.registerContribution}
                <FontAwesomeIcon icon={faLongArrowRight}/>
            </a>
            <ul className={styles.points}>
                {home.contributions.map((c: any) =>
                    <li key={c.title}>
                        <span>{c.points}</span>
                        <span>{c.title}</span>
                        <span>{c.description}</span>
                    </li>
                )}
            </ul>
            <h3>{home.prices.title}</h3>
            <p>{home.prices.description}</p>
            <div className={styles.prices}>
                <ul>
                    <li key={home.prices.yearEnd.title} className={styles.item}>
                        <Image
                            src={home.prices.yearEnd.imagePath}
                            quality="100"
                            width={100}
                            height={100}
                            alt="Bilde av Big Ben"
                        />
                        <span>
                            {home.prices.yearEnd.title}
                            <span className={styles.purple}>{home.prices.yearEnd.description}</span>
                        </span>
                    </li>

                    {home.prices.quarterly.map((x: PriceItem) =>
                        <li key={x.title} className={styles.item}>
                            {x.imagePath ?
                                <Image
                                    src={x.imagePath}
                                    quality="100"
                                    width={100}
                                    height={100}
                                    alt="Bilde av Big Ben"
                                /> :
                                <span className={styles.placeholder}>?</span>
                            }
                            <span>{x.title}
                                <span className={styles.purple}>{x.description}</span>
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </main>
    )
}

const ScoreBoard = (data: any) => {

    const format = (items: any) => {
        let persons: any = {};
        items.forEach((x: any) => {
            if (persons[x.contributor]) {
                if (persons[x.contributor][x.category]) {
                    persons[x.contributor][x.category] += 1;
                } else {
                    persons[x.contributor][x.category] = 1;
                }
                persons[x.contributor].totalScore += 1;
            } else {
                persons[x.contributor] = {};
                persons[x.contributor][x.category] = 1;
                persons[x.contributor].totalScore = 1;
            }
        });

    }

    return (
        <>
            <h3>{data.title}</h3>


        </>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        props: {
            title: 'Awards'
        }
    }
}
