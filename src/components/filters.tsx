

import { ArticlesContext } from "../context/articles-context"
import { SelectContext } from "../context/select-context"
import { SELECT_OPTIONS } from "../utils/dummy"
import { useContext } from "react"
export const Filters = () => {
  const { updateArticles } = useContext(ArticlesContext) 
  const { selectedFilter, changeFilter } = useContext(SelectContext) 
  const changeNews = (value: string) =>  {
    changeFilter(value)
    updateArticles(value, 0)
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
            SELECT_OPTIONS.map(({ value, name, icon: Icon }) => 
                <option 
                  key={value} 
                  value={value}> 
                 <Icon style={{ width:"20px", height: "20px" }}/> {name}
                </option>
            )
          }
      </select>
    )
  }
  