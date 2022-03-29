import { gettingArticles, ArticleResponse } from "../services/articles";
import { useState, useEffect, createContext } from "react";

type ArticleProviderProps = {
    children: React.ReactElement
}

type ArticleContextProps = {
    articleList: ArticleResponse["hits"],
    favoriteList: ArticleResponse["hits"], 
    page: number,
    isLoading: boolean, 
    settingPage: (pageNumber:number) => void;
    updateArticles: (selectedFilter: string, infinite: boolean) => void;
    addFavorites: (article: ArticleResponse["hits"][number]) => void;   
    removeFavorites: (article: ArticleResponse["hits"][number]) => void;            
}

const ArticlesContext = createContext<ArticleContextProps>({} as ArticleContextProps);

const ArticleProvider = ({ children }: ArticleProviderProps) => {
    const [articleList, setArticleList] = useState<ArticleResponse["hits"]>
                                    ([] as ArticleResponse["hits"]) 
    const [isLoading, setIsLoading] = useState<boolean>(true)     
    const [favoriteList, setFavoritesList] = useState<ArticleResponse["hits"]>
                                    ([] as ArticleResponse["hits"])  
    const [page, setPage] = useState<number>(1)   

     async function fetchData(selectedFilter?: string, infinite: boolean = false ) {
        const articlesFetch = await gettingArticles(
                                { technology: selectedFilter, page: infinite ? page: 1 })
        const articles = articlesFetch.hits.map(hit => ({ ...hit, favorite: false, }))
            if(!infinite){ 
                setArticleList(articles);
                setIsLoading(false)
            }else{
                setArticleList(prevState => (prevState.concat(articles)))
            }
            setPage(prevState => prevState+1)
    }
    
    useEffect(() => {
        const filter = window.localStorage.getItem("selectedFilter") || "";
        const favoritesLocalStorage = window.localStorage.getItem("favorites") || "";
        fetchData(filter);
        if(favoritesLocalStorage.length){
            const favoriteData = JSON.parse(favoritesLocalStorage) as ArticleResponse["hits"] ;
            setFavoritesList(favoriteData)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const settingPage = (pageNumber:number) => {
        setPage(pageNumber)
    }

    async function updateArticles(selectedFilter: string,  infinite: boolean = false) {
        fetchData(selectedFilter, infinite)
    }

    const editDataToFavoriteStatus = ( article: ArticleResponse["hits"][number] ) => {
        const prevData = articleList;
            const newHits = prevData.map((card) => {
                                    
                if(card.objectID === article.objectID){
                    return { ...card, favorite: !article.favorite }
                }else{
                    return { ...card }
                }
            })
            setArticleList(newHits)
            setIsLoading(false)
    }

    async function addFavorites(article: ArticleResponse["hits"][number]) {
        setIsLoading(true)
        const favorites = window.localStorage.getItem("favorites") || ""  ;
       if(favorites.length){
        const parseData = JSON.parse(favorites);
        const exits =  parseData.filter((favorite : ArticleResponse["hits"][number]) => favorite.objectID === article.objectID)
            if(!exits.length){
                parseData.unshift({ ...article, favorite: true })
                setFavoritesList(parseData)
                window.localStorage.setItem("favorites",JSON.stringify(parseData))
                editDataToFavoriteStatus(article)
            }
       }else{
            const arrayFavorites = []
            arrayFavorites.unshift({ ...article, favorite: true })
            setFavoritesList(arrayFavorites)
           window.localStorage.setItem("favorites",JSON.stringify(arrayFavorites))
           editDataToFavoriteStatus(article)
       }
    }

    async function removeFavorites(article: ArticleResponse["hits"][number]) {
        const favorites = window.localStorage.getItem("favorites") || ""  ;
        if(favorites.length){
            const parseData = JSON.parse(favorites) as ArticleResponse["hits"];
            const newData =  parseData?.filter((favorite : ArticleResponse["hits"][number]) => favorite.objectID !== article.objectID)
            window.localStorage.setItem("favorites",JSON.stringify(newData))
            setFavoritesList(newData)
            editDataToFavoriteStatus(article)
        }
    }
    

    return(
        <ArticlesContext.Provider value={{ 
            articleList,
            isLoading,
            page,
            favoriteList,  
            settingPage,
            updateArticles, 
            addFavorites, 
            removeFavorites }
            }>
            {children}
        </ArticlesContext.Provider>
    )

}

export { ArticlesContext, ArticleProvider }
