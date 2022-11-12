const wallMaxLength = 8;

export interface worksPresentationObject {
    img: string;
    squaredImg:string;
    alternativeText: string;
    urlId: string;
}

const worksPresentation: worksPresentationObject[] = [
    {
        img: "/img/SPA.webp",
        squaredImg: "/img/SPA-squared.webp",
        alternativeText: "Single Page Applicaation with MERN stack, google sign in, JWT, etc.",
        urlId: "work/1",
    },
    {
        img: "/img/NTFs.webp",
        squaredImg: "/img/NFTs-squared.webp",
        alternativeText: "NFTs where appear Elon Musk, Lebron James, BonsAI...",
        urlId: "work/2",
    },
    {
        img: "/img/BarbaJS.webp",
        squaredImg: "/img/BarbaJS-squared.webp",
        alternativeText: "Beatifuld and smooth transitions.",
        urlId: "work/4",
    },
    {
        img: "/img/Bonsai.webp",
        squaredImg: "/img/Bonsai-squared.webp",
        alternativeText: "This is my BonsAI page",
        urlId: "work/5",
    },
    {
        img: "/img/Friends.webp",
        squaredImg: "/img/Friends-squared.webp",
        alternativeText: "They are the best choice and achieve I have made",
        urlId: "work/6",
    },
    {
        img: "/img/Games.webp",
        squaredImg: "/img/Games-squared.webp",
        alternativeText: "These are the games I've made, what are you waiting for watch them?",
        urlId: "/",
    },
    {
        img: "/img/Blog.webp",
        squaredImg: "/img/Blog-squared.webp",
        alternativeText: "This is my blog, I should make it interesting",
        urlId: "/",
    },
    {
        img: "/img/Projects.webp",
        squaredImg: "/img/Projects-squared.webp",
        alternativeText: "There are projects, but projects are ideas for more projects, so let's make more projects",
        urlId: "/",
    },
];

const NA: worksPresentationObject = {
    img: "/img/NA.webp",
    squaredImg: "/img/NA-squared.webp",
    alternativeText: "It's a building's window, there's no work there already",
    urlId: "/",
};

function getWorksForWall(wallID: string): worksPresentationObject[] | undefined {
    const wallIDNumber = parseInt(wallID);

    if (wallIDNumber == 0 || isNaN(wallIDNumber)) return;

    let windowsArray;

    const newIndexForSearch = wallMaxLength * (wallIDNumber - 1);
    const newLimitForSearch = wallMaxLength * wallIDNumber;

    if (newLimitForSearch == wallMaxLength && newIndexForSearch == 0) {
        windowsArray = worksPresentation.slice(0, newLimitForSearch);
    } else {
        windowsArray = worksPresentation.slice(newIndexForSearch, newLimitForSearch);

        if (windowsArray.length < wallMaxLength) {
            for (let i = windowsArray.length; i < wallMaxLength; i++) {
                windowsArray[i] = NA;
            }
        }
    }

    return windowsArray;
} 

export default worksPresentation;
export { getWorksForWall, worksPresentation as worksPresentationObject };