/* eslint-disable react-hooks/exhaustive-deps */
import { ArticleCard } from "./article-card"
import { ArticlesContext } from "../../context/articles-context"
import { Filters } from "../../components/filters"
import { Fragment, useContext, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { SelectContext } from "../../context/select-context"
import InfiniteScroll from "react-infinite-scroll-component"
import { v4 as uuidv4 } from 'uuid';
export const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { articleList, isLoading, page , updateArticles } = useContext(ArticlesContext)
  const { selectedFilter } = useContext(SelectContext)


  useEffect(() => {
     setSearchParams({ query : selectedFilter, page: page.toString() }) 
  }, [page])


  
    return (
      <Fragment>
        <div className="col-3 mt-5 mb-5">
          <Filters />
        </div>
        <div className="row">
        { articleList.map(hit => 
           <div className="col-12 col-lg-6 mb-8" key={hit.objectID}> <ArticleCard article={hit} /> </div>  ) }
         {
           !isLoading &&  <InfiniteScroll className="row" dataLength={ articleList.length}
           next={() =>  updateArticles(selectedFilter,true) 
           }
           hasMore={true}
           loader={<h4>Loading...</h4>}>
           { articleList.map(hit => 
           <div className="col-12 col-lg-6 mb-8" key={`${hit.objectID}-${hit.created_at_i}-${uuidv4()}`}> <ArticleCard article={hit} /> </div>  ) }
           </InfiniteScroll>
         }
        
        </div>
      </Fragment>
    )
  }
  