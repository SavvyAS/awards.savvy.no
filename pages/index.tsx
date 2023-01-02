import content from '@/lib/content.json'
import styles from './index.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowRight} from "@fortawesome/pro-regular-svg-icons";
import Image from 'next/image'
import {PriceItem} from "@/lib/content.interface";

type Props = { title: string }

export default function Index({title}: Props) {
    const {home} = content.pages as any
    return (
        <main className={styles.container}>
            <section>

                <h1>{home.heading}</h1>
                <p>{home.ingress}</p>
                <a href="mailto:hakon@savvy.no">
                    {home.registerContribution}
                    <FontAwesomeIcon icon={faLongArrowRight}/>
                </a>
            </section>
            <section>

                <ul className={styles.points}>
                    {home.contributions.map((c: any) =>
                        <li key={c.title}>
                            <span>{c.points}</span>
                            <span>{c.title}</span>
                            <span>{c.description}</span>
                        </li>
                    )}
                </ul>
            </section>

            <section>
                <h2>{home.prices.title}</h2>
                <p>{home.prices.description}</p>
                <div className={styles.prices}>

                    <div>
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
                    </div>
                    <ul>
                        {home.prices.quarterly.map((x: PriceItem) =>
                            <li key={x.title}>
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
                                <span>
                                {x.title}
                                    <span className={styles.purple}>{x.description}</span>
                            </span>
                            </li>
                        )}
                    </ul>
                </div>

            </section>

            <section>

                <h2 className={styles.purple}>{home.points.title}</h2>
                <ScoreBoard data={home.points}/>
            </section>

            <section className={styles.footer}>
                ©2021. All Rights Reserved
            </section>
        </main>
    )
}

const ScoreBoard = ({data}: any) => {

    const {contributors, contributions, categories} = data;

    const format = (contributions: any) => {
        let combined_contributions = contributions.reduce((current: any, contribution: any) => {
            let contributor = current[contribution.contributor] ?? {};
            contributor.totalScore = contributor.totalScore ? contributor.totalScore + 1 : 1;
            contributor[contribution.category] = contributor[contribution.category] ? contributor[contribution.category] + 1 : 1;
            return {...current, [contribution.contributor]: contributor}
        }, {})

        return Object.keys(combined_contributions).map(x => ({
                id: x,
                name: contributors[x].name,
                image: contributors[x].image,
                scores: {...combined_contributions[x]}
            }
        )).sort((a, b) => b.scores.totalScore - a.scores.totalScore);
    }

    return (
        <ul className={styles.scores}>
            {format(contributions).map((x, i) =>
                <li key={x.id}>
                    <div className={styles["score-total"]}>
                        <span>{i + 1}</span>
                        <figure className={styles.image}>
                            <Image
                                src={x.image}
                                quality="100"
                                width={100}
                                height={100}
                                alt={`Bilde av ${x.name}`}
                            />
                        </figure>
                        <span className={styles["content-block"]}>
                            <span>{x.name}</span>
                            <span>{`${x.scores.totalScore ?? "-"} ${data.totalScore}`}</span>
                        </span>
                    </div>
                    <ul className={styles["score-details"]}>
                        <li className={styles["content-block"]}>
                            <span>{categories.internalPresentation}</span>
                            <span>{x.scores.internalPresentation ?? "-"}</span>
                        </li>
                        <li className={styles["content-block"]}>
                            <span>{categories.externalPresentation}</span>
                            <span>{x.scores.externalPresentation ?? "-"}</span>
                        </li>
                        <li className={styles["content-block"]}>
                            <span>{categories.article}</span>
                            <span>{x.scores.article ?? "-"}</span>
                        </li>
                    </ul>
                </li>
            )}
        </ul>
    )
}
