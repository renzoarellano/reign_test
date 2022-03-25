import { gettingArticles, ArticleResponse } from "../services/articles";
import { useState, useEffect, createContext } from "react";

type ArticleProviderProps = {
    children: React.ReactElement
}


const ArticlesContext = createContext<ArticleResponse & 
                        Partial<{isLoading: boolean}>>({} as ArticleResponse);

const ArticleProvider = ({ children }: ArticleProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<ArticleResponse>({} as ArticleResponse)

    useEffect(() => {
        async function fetchData() {
          const articles = await gettingArticles({ technology: "reactjs", page:0 })
          setData(articles);
          setIsLoading(false);
        }
        fetchData();
      }, []);
    
    return(
        <ArticlesContext.Provider value={{ ...data,isLoading }}>
            {children}
        </ArticlesContext.Provider>
    )

}

export { ArticlesContext, ArticleProvider }