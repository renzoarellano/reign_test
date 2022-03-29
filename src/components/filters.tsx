import { ArticlesContext } from "../context/articles-context"
import { SelectContext } from "../context/select-context"
import { SELECT_OPTIONS } from "../utils/dummy"
import { useContext, useState } from "react"

export const Filters = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { settingPage,updateArticles } = useContext(ArticlesContext) 
  const { selectedFilter, changeFilter } = useContext(SelectContext) 

  const labelSelect = (label : string) => {
    const objectLabel = SELECT_OPTIONS.find(option => option.value === label) 
    return <div className="custom-label-option">
        {objectLabel?.icon && <img src={objectLabel?.icon} alt={objectLabel?.label} />}
        {objectLabel?.label}
    </div>
  }

  const changeNews = (value: string) =>  {
    changeFilter(value)
    settingPage(1)
     updateArticles(value, false)
     setIsOpen(prevState => !prevState)
  }

    return (
      <div className="custom-select-container">
        <div
          className={isOpen ? "selected-text active" : "selected-text"}
          onClick={() => setIsOpen(prevState => !prevState)}
        >
          {labelSelect(selectedFilter)}
        </div>
        {isOpen && (
          <ul className="select-options">
            {SELECT_OPTIONS.map(option => {
              return (
                <div key={option.label} className="custom-select-option" onClick={() => changeNews(option.value)}>
                  { option.icon && <img src={option.icon} alt={option.label} /> }
                  <li
                  data-name={option.label}
                  >
                  {option.label}
                </li>
                </div>
              );
            })}
          </ul>
        )}
      </div>
    )
  }

  /* {
            SELECT_OPTIONS.map(({ value, name, icon }) => 
                <option 
                  key={value} 
                  value={value}
                  style={{ backgroundImage: icon }}
                  > 
               {name}
                </option>
            )
          } */
  