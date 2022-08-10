import React from "react";

import worksPresentation, { WorkPresentation } from "./worksPresentation";

interface CarouselItemProps {
    content: WorkPresentation;
    classActive?: string;
}

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

    return (
        <div
            id="myCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner">
                {worksPresentation.map((con, index) => (
                    index === 0 ? <CarouselItem content={con} classActive="active" key={index} /> : <CarouselItem content={con} key={index} />
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
