import { gettingArticles, ArticleResponse } from "../services/articles";
import { useState, useEffect, createContext } from "react";

type ArticleProviderProps = {
    children: React.ReactElement
}

type ArticleContextProps = {
    articleList: ArticleResponse,
    isLoading: boolean, 
    page?: number,
    updateArticles: (selectedFilter: string, page: number) => void;              
}


type ArticleContextAttr = {
    articleList: ArticleResponse,
    isLoading: boolean, 
    page?: number,                 
}

const ArticlesContext = createContext<ArticleContextProps>({} as ArticleContextProps);

const ArticleProvider = ({ children }: ArticleProviderProps) => {
    const [data, setData] = useState<ArticleContextAttr>
                                    ({ isLoading: true, page:0 } as ArticleContextAttr)

     async function fetchData(selectedFilter?: string, page?: number) {
        const articles = await gettingArticles({ technology: selectedFilter, page })
        const newData = { articleList: articles, isLoading: false }
            setData(newData);
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    async function updateArticles(selectedFilter: string, page: number = 0) {
        fetchData(selectedFilter, page)
    }
    
    
    return(
        <ArticlesContext.Provider value={{ ...data, updateArticles }}>
            {children}
        </ArticlesContext.Provider>
    )

}

export { ArticlesContext, ArticleProvider }