import React from "react";
import { starSvg, starHalfSvg, starBlackSvg } from "./Svg";

const stars = (num: number, booleanHalfStar = false) => {
    let starsQuantity: number = num;
    let halfStar = booleanHalfStar;

    const totalStars: React.ReactElement<SVGElement>[] = [];

    for (let i = 0; i < 5; i++) {
        switch (true) {
        case starsQuantity <= 0 && halfStar:
            totalStars.push(starHalfSvg);
            halfStar = !halfStar;
            break;
        case starsQuantity <= 0:
            totalStars.push(starBlackSvg);
            break;
        default:
            totalStars.push(starSvg);
            starsQuantity -= 1;
        }
    }

    return totalStars;
};

export interface ability {
    name: string;
    content?: React.ReactElement<SVGElement>[] | React.ReactElement | string;
    subAbs?: ability[];
}

interface abilities {
    id: string
    ability: string;
    abs: ability[]
}

const abilities: abilities[] = [
    {
        id: "graphic__design",
        ability: "Graphic Design",
        abs: [
            {
                name: "Photoshop",
                content: stars(4),
            },
            {
                name: "Illustrator",
                content: stars(3),
            },
        ],
    },
    {
        id: "langs",
        ability: "Languages",
        abs: [
            {
                name: "Spanish",
                content: "Native",
            },
            {
                name: "English",
                content: stars(3, true),
            },
            {
                name: "French",
                content: stars(1, true),
            },
        ],
    },
    {
        id: "programming",
        ability: "Programming",
        abs: [
            {
                name: "Web Basics",
                subAbs: [
                    {
                        name: "HTML",
                        content: stars(4),
                    },
                    {
                        name: "JavaScript",
                        content: stars(3, true),
                    },
                    {
                        name: "CSS",
                        content: stars(3, true),
                    },
                    {
                        name: "Prototype",
                        content: stars(2),
                    },
                ],
            },
            {
                name: "JavaScript",
                subAbs: [
                    {
                        name: "NodeJS",
                        content: stars(3, true),
                    },
                    {
                        name: "React",
                        content: stars(3),
                    },
                    {
                        name: "Express",
                        content: stars(3),
                    },
                    {
                        name: "GraphQL",
                        content: stars(3),
                    },
                    {
                        name: "TypeScript",
                        content: stars(3),
                    },
                    {
                        name: "JSDoc",
                        content: stars(2),
                    },
                ],
            },
            {
                name: "Typescript",
                subAbs: [
                    {
                        name: "React",
                        content: stars(3),
                    },
                    {
                        name: "Deno",
                        content: stars(2, true),
                    },
                ],
            },
            {
                name: "Languages",
                subAbs: [
                    {
                        name: "JavaScript",
                        content: stars(3, true),
                    },
                    {
                        name: "Python",
                        content: stars(2),
                    },
                    {
                        name: "C",
                        content: stars(2),
                    },
                    {
                        name: "Solidity",
                        content: stars(1, true),
                    },
                    {
                        name: "Go",
                        content: stars(0, true),
                    },
                ],
            },
            {
                name: "Tools",
                subAbs: [
                    {
                        name: "Bootstrap",
                        content: stars(4),
                    },
                    {
                        name: "Webpack",
                        content: stars(3),
                    },
                    {
                        name: "Git & GitHub",
                        content: stars(2, true),
                    },
                    {
                        name: "Eslint",
                        content: stars(2, true),
                    },
                    {
                        name: "Babel",
                        content: stars(2, true),
                    },
                ],
            },
            {
                name: "Databases",
                subAbs: [
                    {
                        name: "LowDB",
                        content: stars(4),
                    },
                    {
                        name: "MongoDB",
                        content: stars(3, true),
                    },
                    {
                        name: "MariaDB",
                        content: stars(2),
                    },
                ],
            },
            {
                name: "CMS",
                subAbs: [
                    {
                        name: "WordPress",
                        content: stars(3, true),
                    },
                    {
                        name: "Zyro",
                        content: stars(1, true),
                    },
                ],
            },
        ],
    },
    {
        id: "info",
        ability: "Information",
        abs: [
            {
                name: "Name:",
                content: "Felix Cabello",
            },
            {
                name: "Age:",
                content: "18",
            },
            {
                name: "Country:",
                content: "Venezuela",
            },
            {
                name: "State:",
                content: "La Guaira",
            },
            {
                name: "Favorites",
                subAbs: [
                    {
                        name: "Meal:",
                        content: "Soup",
                    },
                    {
                        name: "Color:",
                        content: <span className="span-orange" />,
                    },
                    {
                        name: "Anime:",
                        content: "Naruto",
                    },
                    {
                        name: "Sport:",
                        content: "Martial Arts",
                    },
                ],
            },
        ],
    },
];

export default abilities;
