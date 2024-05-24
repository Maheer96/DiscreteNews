document.addEventListener("DOMContentLoaded", function(){
    const titlebar = document.querySelector(".titlebar");
    titlebar.classList.add("slide-in")
    const body = document.querySelector("body");
    body.classList.add("load")

    const apiKey = "b95c0c199acc4716bac991ef78711120";
    const blogContainer = document.getElementById("blog-container");
    const searchField = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    async function fetchRandomNews(){
        try{
            const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=20&apiKey=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log("API Response:", data);
            return data.articles;

        } catch(error){
            console.error("Error fetching random news", error);
            return [];
        }
    }

    searchButton.addEventListener("click", async ()=> {
        const query = searchField.value.trim()
        if(query !== ""){
            try{
                const articles = await fetchNewsQuery(query)
                displayBlogs(articles)
            }catch(error){
                console.log("Error fetching news by query")
            }
        }
    });

    async function fetchNewsQuery(query){
        try{
            const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log("API Response:", data);
            return data.articles;

        } catch(error){
            console.error("Error fetching random news", error);
            return [];
        }
    }

    function displayBlogs(articles) {
        blogContainer.innerHTML = "";
        articles.forEach((article) =>{
            if (!article || article.title === "[Removed]") return;

            const blogCard = document.createElement("div");
            blogCard.classList.add("blog-card");

            const img = document.createElement("img");
            img.src = article.urlToImage || "https://picsum.photos/600/400";
            img.alt = article.title;

            const title = document.createElement("h2");
            const truncatedTitle = article.title.length > 45? article.title.slice(0,45) + "..." : article.title || "No title available";
            title.textContent = truncatedTitle;

            const description = document.createElement("p");
            const truncatedDesc = article.description.length > 130? article.description.slice(0,130) + "..." : article.description || 
            "No description available";
            description.textContent = truncatedDesc;

            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogCard.addEventListener('click', ()=> {
                window.open(article.url, "_blank")
            })
            blogContainer.appendChild(blogCard);

            setTimeout(() => {
                blogCard.classList.add("show");
            }, 100);
        });
    }

    (async ()=>{
        try{
            const articles = await fetchRandomNews();
            displayBlogs(articles);
        } catch(error){
            console.error("Error fetching random news", error);
        }

    })();
});