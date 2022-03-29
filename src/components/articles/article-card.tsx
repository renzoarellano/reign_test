import { ArticleResponse } from "../../services/articles"
import moment from "moment"
import { ArticlesContext } from "../../context/articles-context"
import { useContext } from "react"
import { AiOutlineHeart, AiFillHeart, AiOutlineClockCircle } from "react-icons/ai"

type ArticleCardProps = {
  article: ArticleResponse["hits"][number]
}

export const ArticleCard = ( { article } : ArticleCardProps) => {

  const { addFavorites, removeFavorites } = useContext(ArticlesContext)

const diffDate = (created_at : string) => {
  const now = moment(new Date());
  const articleDate = moment(created_at)
  const minutes = now.diff(articleDate, "minutes")
  const hours = now.diff(articleDate, "hours")
  const days = now.diff(articleDate, "days")
  if(minutes < 60){
     return `${minutes} ${minutes < 2 ? "minute" : "minutes"} ago`;
  }else if(hours < 24){
    return `${hours} ${hours < 2 ? "hour" : "hours"} ago`;
  }else if(days < 366){
    return `${days} ${days < 2 ? "day" : "days"} ago`;
  }
}

const chooseFavorite = ( data :  ArticleCardProps["article"]) => {
  if(data.favorite){
    removeFavorites(data)
  }else{
    addFavorites(data)
  }
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
  