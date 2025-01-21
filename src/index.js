// DOM elements
const description = document.querySelector(".description");
const blog = document.querySelector(".blog");
const blogCounter = document.querySelector(".blog_counter");

async function fetchWithFallback(url, fallback) {
return fetch(url)
    .then(response => {
    return response;
    })
    .catch(() => {
    return fetch(fallback)
        .then(response => {
        return response
        });
    });
}

function randomizeDescription() {
    fetchWithFallback("https://a-moseman.neocities.org/resources/descriptions.txt", "./resources/descriptions.txt")
        .then(file => file.text())
        .then(text => {
            const descriptions = text.trim().split("\n");
            const choice = Math.floor(Math.random() * (descriptions.length));
            const chosen = document.createElement("i");
            description.textContent = descriptions[choice];
        });
}


function descriptionFadeIn() {
    const keyframes = [
        { transform: 'translateY(10px)', opacity: '0' },
        { transform: 'translateY(0px)', opacity: '1' }
    ];
    const options = {
        duration: 1000,
        iterations: 1
    };
    description.animate(keyframes, options);
}

function descriptionFadeOutAndIn() {
    const keyframes = [
        { transform: 'translateY(0px)', opacity: '1'},
        { transform: 'translateY(-10px)', opacity: '0' },
        { transform: 'translateY(10px)', opacity: '0' },
        { transform: 'translateY(0px)', opacity: '1' }
    ];
    const options = {
        duration: 2000,
        iterations: 1
    };
    description.animate(keyframes, options);
}

function onDescriptionClick() {
    setTimeout(randomizeDescription, 750);
    descriptionFadeOutAndIn();
}

description.style.position = "relative";
description.onclick = onDescriptionClick;
randomizeDescription();
descriptionFadeIn();

setInterval(onDescriptionClick, 10_000);

fetchWithFallback("https://a-moseman.neocities.org/resources/blog/index.txt", "./resources/blog/index.txt")
.then(file => file.text())
.then(text => {
    const posts = parseInt(text.trim());

    blogCounter.textContent = `total posts: ${posts}`;

    for (let i = posts; i >= 1; i--) {
    fetchWithFallback(`https://a-moseman.neocities.org/resources/blog/${i}.txt`, `./resources/blog/${i}.txt`)
        .then(postFile => postFile.text())
        .then(postText => {
        const post = document.createElement("div");
        post.className = "blog_post";

        const postLines = postText.trim().split("\n");

        const postTitle = document.createElement("div");
        const postDate = document.createElement("div");
        postTitle.className = "blog_post_title";
        postDate.className = "blog_post_date";
        postTitle.textContent = postLines[0];
        postDate.textContent = postLines[1];
        post.appendChild(postTitle);
        post.appendChild(postDate);

        for (let j = 2; j < postLines.length; j++) {
            let paragraphText = postLines[j];
            if (paragraphText === "") {
            continue;
            }
            const postParagraph = document.createElement("div");
            postParagraph.className = "blog_post_paragraph";
            paragraphText = "\u00A0\u00A0\u00A0\u00A0" + paragraphText; // start each paragraph with a tab
            postParagraph.textContent = paragraphText;
            post.appendChild(postParagraph);
        }

        blog.appendChild(post);
        });
    }
});


// site info
fetchWithFallback("https://a-moseman.neocities.org/resources/site-info.txt", "./resources/site-info.txt")
    .then(site_info_file => site_info_file.text())
    .then(site_info_text => {
        const json = JSON.parse(site_info_text);
        const info = json["info"];

        const created = new Date(info["created_at"]);
        const updated = new Date(info["last_updated"]);
        const hits = info["hits"];

        const current = Date.now();
        const milliseconds = Math.abs(created - current);

        const days = milliseconds / 1000 / 60/ 60 / 24;
        const daysRounded = Math.floor(days);
        const hours = (days - daysRounded) * 24;
        const hoursRounded = Math.floor(hours);

        const site_info = document.getElementById("site-info");

        const daysElement = document.createElement("div");
        daysElement.textContent = `- site age: ${daysRounded} days ${hoursRounded} hours`;

        const hitsElement = document.createElement("div");
        hitsElement.textContent = `- hits: ${hits}`;

        site_info.appendChild(daysElement);
        site_info.appendChild(hitsElement);
    });
