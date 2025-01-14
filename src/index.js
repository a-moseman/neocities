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

// DOM elements
const description = document.querySelector(".description");
const blog = document.querySelector(".blog");

fetchWithFallback("https://a-moseman.neocities.org/resources/descriptions.txt", "./resources/descriptions.txt")
.then(file => file.text())
.then(text => {
    const descriptions = text.trim().split("\n");
    const choice = Math.floor(Math.random() * (descriptions.length));
    const chosen = document.createElement("i");
    chosen.innerText = descriptions[choice];
    description.appendChild(chosen);
});

fetchWithFallback("https://a-moseman.neocities.org/resources/blog/index.txt", "./resources/blog/index.txt")
.then(file => file.text())
.then(text => {
    const posts = parseInt(text.trim());
    for (let i = 1; i <= posts; i++) {
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
