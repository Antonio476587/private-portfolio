import React from "react";

interface Work {
  h2: string,
  p1: string,
  img1: string[],
  img2: string[],
  p2: string,
  p3: string,
  img3: string[],
  p4: string,
  img4: string[],
  styles: string[],
}

const workContents: Array<Work> = [
    {
        h2: "My first SPA",
        p1: `When I got a better knowledge in JavaScript, I thought
    that it was time to learn a framework. The reason why I chose
    React was that React have a lot of documentation and community.
    So it would be easier to get understand. I decided to learn React
    by the great book of Vasan Subramanian. His book had a few things deprecated.
    But I didn't mind about it. Because when I read the book of Uncle Bob
    'The Clean Architecture' I actually realized that almost nothing has changed
    in the programming, and the principles are the same yet.
    `,
        img1: [
            "/img/tracker1.jpg",
            "How I create the NFTs.",
        ],
        img2: [
            "/img/tracker2.jpg",
            "Each NFT has unique things.",
        ],
        p2: `When I started the book, I had a little idea about React,
    I knew Mongodb, Node and Express, but I didn't know nothing about
    GraphQL, ReactRouter, ESlint and a lot more of things that I learned.
    Because the book is a bit old, many things didn't work. I used to give
    14 hours a day to the book and programming the SPA, it was really cool.
    I endeed the app in 11 days. I must say that I was pretty hard for me.`,
        p3: `I uploaded the code to GitHub when I finished the app. I am really grateful
    with Vasan and all his effort to make the book. I'm going to make a 
    great use with those knowledge. after that I decided to
    make my portfolio with React to apply all the learned.
      `,
        img3: [
            "/img/tracker3.jpg",
            "A img representing a NFT in the digital world.",
        ],
        p4: `I hope that you're enjoying my portfolio and don't forget, 
    Towards the future!!!`,
        img4: [
            "/img/tracker4.jpg",
            "A lot of NFTs gathered.",
        ],
        styles: ["#EBEBFF", "#0C043E", "#111"],
    },
    {
        h2: "NFTs",
        p1: `NFTs, they have become well known fast, but, what are they exactly?
    They are things like art, or whatever that is unique at the world, but inside
    the technology world. Yes, they still being unique althought someone copy it
    or have a similar one. If you ask to the best painter of the world to 
    replicate the Salvador Mundi, it will be exactly the same. but it's no the 
    Da Vinci's Salvador Mundi and it won't cost the same, another example can be
    the iPhone of the Steve Jobs, there're a lot of the same, but only one was
    of Steve Jobs.
    `,
        img1: [
            "/img/NFT2.png",
            "How I create the NFTs.",
        ],
        img2: [
            "/img/NFT3.jpg",
            "Each NFT has unique things.",
        ],
        p2: `They have information, features and data that make them uniques.
    With the new VR world, the NFT are taking more presence on the world,
    someone can buy a NFT, and that NFT will be only of the person who bought it.
    In the case of the NFTs, their features and data is archived in way of 
    metadata. When you take a picture with your cellphone it keeps information about
    the picture, like date, place and the cellphone that took it. That's metadata.`,
        p3: `I made my own NFTs, they are not on sell yet, because I haven't decided to
    sell them individually or by an auction. It's a collection of 10 NFTs. Until now
    I have only showed 8, but I will show the other 2 soon. Their names are numbers,
    that go since 1 to 10, it's very simple to remember. If you want see every one
    I let them on the contact page, you will see my way to think and my creative on them.`,
        img3: [
            "/img/NFT1.jpeg",
            "A img representing a NFT in the digital world.",
        ],
        p4: `I hope that you're enjoying my portfolio and don't forget, 
    Towards the future!!!`,
        img4: [
            "/img/NFT4.jpg",
            "A lot of NFTs gathered.",
        ],
        styles: ["#DEE2E6", "#6F42C1", "#023580"],
    },
    {
        h2: "Three on a line",
        p1: `I was thinking how an AI have to work to be an AI, then I began to research about AI, I 
    learned that there are three principals kinds of AIs. The first is the Artifitial 
    Intelligent,  it's made to do things predefined, it's pretty common. Then, come machine 
    learning, this AI is more powerful than a common AI, its principal function is the repetition 
    of works to get better in that work. The most powerful is the deep learning, and it's 
    intended to work like a human brain. With neuronals connections and great results. 
    `,
        img1: [
            "/img/three1.jpg",
            "The game of three on a ray that I made.",
        ],
        img2: [
            "/img/three2.jpg",
            "The code of the AI and the HTML code with Pug template.",
        ],
        p2: `I decided for make a simple AI, I thought in Deep Blue of IBM and what kind of
    AI it is. I assumed that it is a simple AI too, with instructions to reach the victory
    ever finding the correct combinations of movements. But I didn't know how to make my 
    AI play with all the winners combinations without I give it to it. I realized
    I didn't want to make combinations predefined, I wanted that it can play randomized and
    response to the opponent movements.`,
        p3: `Now, I knew how it should work. But I had to find a way to apply that AI. While I was 
    playing with my cousin three on a line (In Venezuela we call it 'La vieja'), I wanted to try 
    with that game, so I started with comments without code and pseudocode. Four days after that 
    I had the simple AI working, I only have to make it look better, I tried to render the html 
    with Pug and use css to change the ui depends on the theme was light o dark. If you like you 
    can play with the AI clicking in the button in works page or see the code in my GitHub.`,
        img3: [
            "/img/three3.jpg",
            "The game of three on a ray that I made with different colors.",
        ],
        p4: `I hope that you're enjoying my portfolio and don't forget, 
    Towards the future!!!`,
        img4: [
            "/img/three4.png",
            "X and O of three on a line.",
        ],
        styles: ["#FFE0E0", "#591C1C", "#000"],
    },
    {
        h2: "BarbaJS transitions",
        p1: `Usually the interactivity is part essential of our lives. In the
    internet the interactivity is very worth now. I love what barba does,
    It can prefetch a page and save their content in cache, so if you go
    to that page barba join the two pages in one to make a transition between them,
    It give to you a lot of cool things that you can do to make the transitions beatiful. 
    `,
        img1: [
            "/img/barba1.jpg",
            "BarbaJS logo.",
        ],
        img2: [
            "/img/barbacss.mp4",
            "A video of barbacss",
        ],
        p2: `I found barba thanks to Petr Tichy and his channel Ihatetomatoes. With a great tutorial 
    made by him, I really liked BarbaJS and I made the tutorial in his channel. It was
    really useful, now I can make beatiful transitions too with barba. But that didn't stop
    here. I didn't know Gsap, I knew it in the same BarbaJS tutorial, I was used to make 
    animations with AnimeJS, but I had to learn Gsap. I studied a lot the Gsap documentation, and
    I used that knowledge to make this portfolio with Gsap, AnimeJS and AnimeCSS.`,
        p3: `Now I know that Barba is a great alternative to SPAs, I don't really
    like SPA applications, because they are so difficult to create, but with Barba I 
    can make a simple app and make it look like a SPA. It's really useful, I
    can't use it with React in my portfolio because it was very dificult, but I'm going
    to keep trying join React and BarbaJS.`,
        img3: [
            "/img/barbagsap.mp4",
            "A video of barbagsap",
        ],
        p4: `I hope that you're enjoying my portfolio and don't forget, 
    Towards the future!!!`,
        img4: [
            "/img/barba2.jpg",
            "Barba and gsap in a really nice picture.",
        ],
        styles: ["#E1CCA4", "#1F6161", "#FFFFF0"],
    },
    {
        h2: "My first static page.",
        p1: `This was my first static page, I really liked it. Because it was
    my first goal to make, when I did it I felt good. This page was made without
    any framework, the most difficult thing in that moment were the algoritms.
    I didn't know any, I didn't have any idea to how make them, I didn't 
    thinking like a programmer. Then I stoped to programming and started
    to read books of programmers like Uncle Bob, Vasan Subramanian, Thomas H Cormen, etc. See
    videos of programmers and the begin of a languague or program. Those things helped me 
    a lot. 
    `,
        img1: [
            "/img/bonsai1.jpg",
            "BonsAI my first loved page.",
        ],
        img2: [
            "/img/bonsai2.jpg",
            "BonsAI my first loved page.",
        ],
        p2: `I was learning only about JavaScript when I made this page. I made it
    beacause I have made a shop, it was a techonology shop, I used to sell
    wires, chargers, phones and further. But I couldn't manage it by myself, 
    I decided that I didn't want to close it forever, then to don't lose all
    the things I have achieved, I closed it temporarily, I was going to make
    a page with my knowledge and start to sell online.`,
        p3: `Althought I can make a better professional page, I decided don't do that.
    I learned more about bussiness, I only couldn't start again without a plan. That was
    the purpose of my BonsAI page. I gave it all my dedication and knowledge in that time. 
    It showed me in that moment, that I gave my all, everything could be great.`,
        img3: [
            "/img/bonsai3.jpg",
            "BonsAI my first loved page.",
        ],
        p4: `I hope that you're enjoying my portfolio and don't forget, 
    Towards the future!!!`,
        img4: [
            "/img/bonsai4.jpg",
            "BonsAI my first loved page.",
        ],
        styles: ["#FFEDED", "#A51818", "#800202"],
    },
    {
        h2: "My friends",
        p1: `They are my friends and they are the best work I ever made. They are the best work I ever made, not 
    because they were difficult to find nor because they are difficult to mantain like friends, it's 
    because they will be with me the rest of my life, there's no work that can do that.
    it's because they make my life better. It's because we are family.
    `,
        img1: [
            "/img/hommies1.jpg",
            "They are the best choice and achieve I have made",],
        img2: [
            "/img/hommies2.jpg",
            "We are pointing to coco mango's logo.",],
        p2: `We are not friends because we wanted, it happened by coincidence. 
    But we have a lot on common like the basketball, we are a basketball team called
    Los Pollos(The Chickens), we are bad, and I over all. Althought we still playing 
    basket because we love it and we don't care about if we are bad, we enjoy playing basket and
    we will still playing basket.`,
        p3: `All we have dreams and we're going to achieve all those dreams.
    Each one of us is doing something to improve like a person, we're getting experiences 
    and great moments. We have a lot of stories and remembers that will be with us forever.
    It's awesome how your friends can improve your life, it seems false.`,
        img3: [
            "/img/hommies3.jpg",
            "We are family",],
        p4: `I hope that you're enjoying my portfolio and don't forget, 
    Towards the future!!!`,
        img4: [
            "/img/hommies4.jpg",
            "A collage of my friends.",
        ],
        styles: ["#fffff0", "#fd7e14", "#212529"],
    },
];

export default workContents;
