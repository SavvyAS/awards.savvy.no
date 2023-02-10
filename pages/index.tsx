import content from '@/lib/content.json'
import styles from './index.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowRight } from "@fortawesome/pro-regular-svg-icons";
import Image from 'next/image'
import { PriceItem } from "@/lib/content.interface";
import { useEffect, useState } from "react";

type Props = { title: string }

export default function Index({ title }: Props) {
    const { home } = content.pages as any
    return (
        <main className={styles.container}>
            <section>

                <h1>{home.heading}</h1>
                <p>{home.ingress}</p>
                <a href="mailto:hakon@savvy.no">
                    {home.registerContribution}
                    <FontAwesomeIcon icon={faLongArrowRight} />
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
            <ScoreBoard data={home.points} />

            <section className={styles.footer}>
                ©2023. All Rights Reserved
            </section>
        </main>
    )
}

const ScoreBoard = ({ data }: any) => {

    const { contributors, contributions, categories } = data;

    const [filter, setFilter] = useState("2023");
    const [filteredContributions, setFilteredContributions] = useState<any[]>([]);

    useEffect(() => {
        const startDate = new Date(data.filters[filter].start);
        const endDate = new Date(data.filters[filter].end);
        const c = contributions.filter((c: any) => {
            const date = new Date(c.date);
            return date >= startDate && date <= endDate;
        })
        setFilteredContributions(c);
    }, [filter])

    const format = (contributions: any) => {
        let combined_contributions = contributions.reduce((current: any, contribution: any) => {
            let contributor = current[contribution.contributor] ?? {};
            let points = (categories[contribution.category]?.points ?? 0) + (contribution.collaboration ? 1 : false);
            contributor.totalScore = contributor.totalScore ? contributor.totalScore + points : points;
            contributor[contribution.category] = contributor[contribution.category] ? contributor[contribution.category] + 1 : 1;
            return { ...current, [contribution.contributor]: contributor }
        }, {})

        return Object.keys(combined_contributions).map(x => ({
            id: x,
            name: contributors[x].name,
            image: contributors[x].image,
            scores: { ...combined_contributions[x] }
        }
        )).sort((a, b) => b.scores.totalScore - a.scores.totalScore);
    }

    return (
        <section>
            <div className={styles["scores-header"]}>
                <h2 className={styles.purple}>{data.title}</h2>

                <select className={styles["filter-select"]} value={filter} onChange={e => setFilter(e.target.value)}>
                    {Object.keys(data.filters).map(filter =>
                        <option key={filter} value={filter}>
                            {data.filters[filter].title}
                        </option>
                    )}
                </select>
            </div>

            <ul className={styles.scores}>
                {format(filteredContributions).map((x, i) =>
                    <li key={x.id}>
                        <ScoreBoardListItem
                            categories={categories}
                            position={i + 1}
                            contributor={x}
                            contributions={filteredContributions.filter(y => y.contributor === x.id)} />
                    </li>
                )}
            </ul>
        </section>
    )
}

const ScoreBoardListItem = ({ categories, contributor, contributions, position }: any) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={styles["list-item-header"]} onClick={() => setOpen(!open)}>
                <div className={styles["score-total"]}>
                    <span>{position}</span>
                    <figure className={styles.image}>
                        <Image
                            src={contributor.image}
                            quality="100"
                            width={100}
                            height={100}
                            alt={`Bilde av ${contributor.name}`}
                        />
                    </figure>
                    <span className={styles["content-block"]}>
                        <span>{contributor.name}</span>
                        <span>{`${contributor.scores.totalScore ?? "-"} Poeng`}</span>
                    </span>
                </div>
                <ul className={styles["score-details"]}>
                    <li className={styles["content-block"]}>
                        <span>{categories.internalPresentation.name}</span>
                        <span>{contributor.scores.internalPresentation ?? "-"}</span>
                    </li>
                    <li className={styles["content-block"]}>
                        <span>{categories.externalPresentation.name}</span>
                        <span>{contributor.scores.externalPresentation ?? "-"}</span>
                    </li>
                    <li className={styles["content-block"]}>
                        <span>{categories.article.name}</span>
                        <span>{contributor.scores.article ?? "-"}</span>
                    </li>
                </ul>
            </div>
            {
                open &&
                <div className={styles["list-item-description"]}>
                    <span>Mine bidrag:</span>
                    <ul>
                        {contributions.map((x: any) =>
                            <li key={JSON.stringify(x)}>
                                {x.title} ({categories[x.category].points + (x.collaboration ? 1 : 0)}p)
                            </li>
                        )}
                    </ul>
                </div>
            }
        </>
    )
}
