import { useState, useEffect, createContext } from "react";
type SelectProviderProps = {
    children: React.ReactElement
}

type SelectContextProps = {
    selectedFilter: string,
    changeFilter: (value:string) => void,
}



const SelectContext = createContext<SelectContextProps>({} as SelectContextProps);

const SelectProvider = ({ children }: SelectProviderProps) => {
    const [selectedFilter, setSelectedFilter] = useState<string>("")
    const changeFilter = (value:string) => {
        setSelectedFilter(value);
    }

    useEffect(() => {
      const filter = window.localStorage.getItem("selectedFilter");
      const params = new URLSearchParams(window.location.search)
      let filterParam = params.get('query')
      if(filterParam){
      console.log("🚀 ~ file: select-context.tsx ~ line 26 ~ useEffect ~ filterParam", filterParam)
          setSelectedFilter(filterParam)
      }else if(typeof filter != "undefined"){
          setSelectedFilter(filter || "")
      }
    }, [])

    useEffect(() => {
        window.localStorage.setItem("selectedFilter", selectedFilter);
      }, [selectedFilter])
    
    
    return(
        <SelectContext.Provider value={{ 
                selectedFilter,
                changeFilter
                 }}>
            {children}
        </SelectContext.Provider>
    )

}

export { SelectContext, SelectProvider }