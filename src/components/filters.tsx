

import { ArticlesContext } from "../context/articles-context"
import { SelectContext } from "../context/select-context"
import { SELECT_OPTIONS } from "../utils/dummy"
import { useContext } from "react"
export const Filters = () => {
  const { settingPage,updateArticles } = useContext(ArticlesContext) 
  const { selectedFilter, changeFilter } = useContext(SelectContext) 
  const changeNews = (value: string) =>  {
    changeFilter(value)
    settingPage(1)
     updateArticles(value, false)
  }

    return (
      <select 
        className="form-select" 
        aria-label="Choose News" 
        value={selectedFilter}
        onChange={(e) => changeNews(e.target.value)}
        >
          <option value="">Selected your news</option>
          {
            SELECT_OPTIONS.map(({ value, name, icon: SVG }) => 
                <option 
                  key={value} 
                  value={value}> 
                  <SVG /> {name}
                </option>
            )
          }
      </select>
    )
  }
  