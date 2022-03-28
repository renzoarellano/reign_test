import { ArticleCard } from "./article-card"
import { ArticlesContext } from "../../context/articles-context"
import { Filters } from "../../components/filters"
import { Fragment, useContext } from "react"

export const Articles = () => {
  const { articleList, isLoading } = useContext(ArticlesContext)
    return (
      <Fragment>
        <div className="col-3 mt-5 mb-5">
          <Filters />
        </div>
        <div className="row">
        { !isLoading ? articleList.hits.map(hit => 
          <div className="col-12 col-lg-6 mb-8" key={hit.objectID}> <ArticleCard article={hit} /> </div>  ) 
          : <div>Loading</div>}
        </div>
      </Fragment>
    )
  }
  