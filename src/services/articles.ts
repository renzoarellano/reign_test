const getArticleURL = ( technology: string, page: number) => {
    return `https://hn.algolia.com/api/v1/search_by_date?query=${technology}&page=${page}`
}

type GetArticlesProps = {
    technology: string,
    page: number,
}

type DetailArticle = {
    value:string,
    matchLevel: string,
    fullyHighlighted?: boolean,
    matchedWords: Array<string>
  }

type ArticleResponse = {
nbHits: number,
  page: number,
  nbPages: number,
  hitsPerPage: number,
  exhaustiveNbHits: boolean,
  exhaustiveTypo: boolean,
query: string,
  params: string,
  processingTimeMS: number,
hits: Array<
{

    created_at: string,
    title?: string,
    url?: string,
    author: string,
    points?: string,
    story_text?: string,
    comment_text: string,
    num_comments?: string,
    story_id: number,
    story_title: string,
    story_url: string,
    parent_id: number,
    created_at_i: number,
    _tags: Array<string>,
    objectID: string,
    _highlightResult: {
      author?: DetailArticle,
      comment_text?:DetailArticle ,
      story_title?: DetailArticle,
      story_url?: DetailArticle
    }
  }>
}


const  gettingArticles = async (
{ technology, page } : GetArticlesProps) 
: Promise<ArticleResponse> => {
    try{
        return  await fetch(getArticleURL(technology, page))
              .then(response => {return response.json()})
                .then(data => {return data})
    }catch(e){
        const error = e as Error;
    throw Error(error.message)
    }
}

export { gettingArticles } 
export type{ ArticleResponse }