import { ArticleCard } from "./article-card"
import { ArticlesContext } from "../../context/articles-context"
import { Fragment, useContext } from "react"

const Favorites = () => {
  const { favoriteList, isLoading } = useContext(ArticlesContext)
    return (
      <Fragment>
        <div className="row">
        { !isLoading ? favoriteList.length ? favoriteList.map(card => 
          <div className="col-12 col-lg-6 mb-8" key={card.objectID}> <ArticleCard article={card} /> </div>  ) : <div>No hay Favoritos</div> 
          : <div>Loading</div>}
        </div>
      </Fragment>
    )
  }

export { Favorites }
  