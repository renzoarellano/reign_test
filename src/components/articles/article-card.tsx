import { ArticleResponse } from "../../services/articles"
import moment from "moment"
import { AiOutlineHeart, AiFillHeart, AiOutlineClockCircle } from "react-icons/ai"

type ArticleCardProps = {
  article: ArticleResponse["hits"][number]
}

export const ArticleCard = ( { article } : ArticleCardProps) => {

const diffDate = (created_at : string) => {
  const now = moment(new Date());
  const articleDate = moment(created_at)
  const minutes = now.diff(articleDate, "minutes")
  console.log("🚀 ~ file: article-card.tsx ~ line 14 ~ diffDate ~ minutes", minutes)
  const hours = now.diff(articleDate, "hours")

  if(minutes < 60){
     return `${minutes} ${minutes > 1 ? "minute" : "minutes"} ago`;
  }else{
    return `${hours} ${hours > 1 ? "hour" : "hours"} ago`;
  }
}

const chooseFavorite = ( data :  ArticleCardProps["article"]) => {
console.log("🚀 ~ file: article-card.tsx ~ line 26 ~ chooseFavorite ~ article", data)
}
    return (
        <div  className="article_card">
        <a href={article.story_url} target="_blank" rel="noreferrer" className="article_card__data">
          <div className="article_card__data__time">
              <AiOutlineClockCircle className="article-icon-time"/> {diffDate(article.created_at)} by {article.author}
          </div>
          <div className="article_card__data__title">
          {article.story_title || "This article does not have title"}
          </div>
        </a>
        <div className="article_card__favorite">
          <button className="article-icon-button" onClick={() => chooseFavorite(article)}>
            {
              article?.favorite ? <AiFillHeart className="article-icon" fill="red" /> : <AiOutlineHeart className="article-icon" fill="red"/>
            }
          </button>
        </div>
        </div>
    )
  }
  