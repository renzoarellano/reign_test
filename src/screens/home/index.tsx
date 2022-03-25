import { useContext, Fragment } from "react"
import { ArticlesContext } from "../../context/articles-context"

export const Home = () : React.ReactElement => {
  const { hits, isLoading } = useContext(ArticlesContext)
  console.log("hits",hits)

  return(
    !isLoading ? 
      <div>Hello</div> : <Fragment></Fragment>
  )
  
}
