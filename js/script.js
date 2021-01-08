'use strict';
/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */

const titleClickHandler = function(event){

  event.preventDefault();

  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);


  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

};



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optAuthorsSelector= '.post-author',
  optTagsListSelector = '.tag-list';

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] get the title from the title element */

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* [DONE] insert link into titleList */

    html = html + linkHTML;

  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function generateTags(){

  let allTags = [];

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for(let article of articles){

    /* [DONE] find tags wrapper */

    const tagList = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /*[DONE] generate HTML of the link */

      const tagHTML = '<li><a href="#tag-' + tag +'"><span>' + tag + '</span></a></li> ';

      /* [DONE] add generated code to html variable */

      html = html + tagHTML;

      if(allTags.indexOf(tagHTML) == -1){
        allTags.push(tagHTML);
      }

    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagList.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }

  const tagList = document.querySelector('.tags');

  tagList.innerHTML = allTags.join(' ');

}

generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */

  for(let activeTagLink of activeTagLinks){

    /* [DONE] remove class active */

    activeTagLink.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */

  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const tagHrefLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */

  for(let tagHrefLink of tagHrefLinks){

    /* [DONE] add class active */

    tagHrefLink.classList.add('active');

  /* [DONE] eND LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */

  const linkTag = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for(let linkTags of linkTag){


    /* add tagClickHandler as event listener for that link */

    linkTags.addEventListener('click',tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();


function generateAuthors(){

  /* [DONE] find authors wrapper */

  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const authorsWrapper = article.querySelector(optAuthorsSelector);

    let html = '';

    const articleAuthor = article.getAttribute('data-author');

    const linkHTML =  '<a href="#author-' + articleAuthor +'"><span>' + articleAuthor +'</span></a>';

    html = html + linkHTML;

    authorsWrapper.innerHTML = html;

  }
}

generateAuthors();

function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for(let activeAuthorLink of activeAuthorLinks){

    activeAuthorLink.classList.remove('active');

  }

  const authorHrefLinks = document.querySelectorAll('a[href="'+ href +'"]');

  for (let authorHrefLink of authorHrefLinks){

    authorHrefLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="'+ author + '"]');

}

function addClicklListenerToAuthors(){

  const linkAuthor = document.querySelectorAll('a[href^="#author"]');

  for(let linkAuthors of linkAuthor){

    linkAuthors.addEventListener('click',authorClickHandler);
  }

}

addClicklListenerToAuthors();
