let container = document.querySelector("#main-container");
  container.style.marginTop = "1em";
  container.style.padding = "1em";

let header = document.querySelector("#header");
  header.style.marginTop = "2em";
  header.style.marginLeft = "1em"

 let ol = document.createElement("ol");
 

async function render(data) {
  
  for (const [key, value] of Object.entries(data)) {
    let key = [];
    key.push(value);
    let res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${key[0]}.json?print=pretty`);
    let data = await res.json();

    let aTag = document.createElement("a");
    aTag.href = data.url;
    aTag.target = "_blank";

    let li = document.createElement("li");

    aTag.innerText = data.title;
    li.append(aTag);

    let infoDIV = document.createElement("div");
    
    let scoreDiv = document.createElement("div")
    scoreDiv.innerText = `Score: ${data.score}`
    
    let commentsDiv = document.createElement("div")
    if(data.kids !== undefined){
      let comments = data.kids;
      let numComments = comments.length;
      commentsDiv.innerText = `comments: ${numComments}`
    }else if(data.kids === undefined){
      commentsDiv.innerText = `comments: 0`
    }

    let authorDiv = document.createElement("div");
    authorDiv.innerText = `Author: ${data.by}`;

    infoDIV.style.display = "flex";
    infoDIV.style.flexDirection = "row"

    scoreDiv.style.margin = "3px";
    commentsDiv.style.margin = "3px"
    authorDiv.style.margin = "3px"
    aTag.style.color = "white"
    
    li.className = "div"
    
    infoDIV.append(scoreDiv, commentsDiv, authorDiv)
    ol.append(li,infoDIV);
    // console.log(ol)
    container.append(ol);
  } 

}

async function getAsk() {

  let res = await fetch("https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty");
  let data = await res.json();
  
  header.innerText = "Ask"; 
  render(data);
}
getAsk();
