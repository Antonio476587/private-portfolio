import React, { useRef } from "react";

interface WorkPresentation {
    h1: string;
    p: string;
    urlId: string;
}

interface CarouselItemProps {
    content: WorkPresentation;
    classActive?: string;
}

const contents: WorkPresentation[] = [
    {
        h1: "My first SPA",
        p: "With MERN stack, google sign in, JWT, etc.",
        urlId: "work/1",
    },
    {
        h1: "NFTs",
        p: "NFTs where appear Elon Musk, Lebron James, BonsAI...",
        urlId: "work/2",
    },
    {
        h1: "Three on a line",
        p: "How I did the little AI",
        urlId: "work/3",
    },
    {
        h1: "Three on a line game",
        p: "You can play alone with a little AI",
        urlId: "tic-tac-toe.html",
    },
    {
        h1: "BarbaJS with CSS plugin and Gsap",
        p: "Beatifuld and smooth transitions.",
        urlId: "work/4",
    },
    {
        h1: "My first static page.",
        p: "This is my BonsAI page",
        urlId: "work/5",
    },
    {
        h1: "Background Complement",
        p: "Background Complement with an interface to manage",
        urlId: "bgcomplement.html",
    },
    {
        h1: "My friends",
        p: "They are the best choice and achieve I have made",
        urlId: "work/6",
    },
];

function CarouselItem({ content, classActive = "" }: CarouselItemProps) {
    return (
        <div className={`carousel-item ${classActive}`}>
            <div
                className="bd-placeholder-img"
                userselect="none"
                aria-hidden="true"
            />

            <div className="container">
                <div className="carousel-caption text-start">
                    <h1>{content.h1}</h1>
                    <p>{content.p}</p>
                    <p>
                        <a className="btn btn-lg btn-light" href={content.urlId}>
                            See More
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Works() {
    const worksRef: React.RefObject<HTMLDivElement> = useRef(null);

    return (
        <div
            id="myCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            ref={worksRef}
        >
            <div className="carousel-inner">
                {contents.map((con, index) => (
                    index === 0 ? <CarouselItem content={con} classActive="active" /> : <CarouselItem content={con} />
                ))}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="prev"
                aria-label="Previous Carousel Item"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="next"
                aria-label="Next Carousel Item"
            >
                <span className="carousel-control-next-icon" aria-hidden="false" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
