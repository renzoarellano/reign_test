import { Favorites } from "./articles/favorites"
import { Articles } from "./articles"
import { Tab } from "@headlessui/react"
import { Fragment } from "react"
export const Tabs = () => {

const TabList = [
  {
    key: "general_articles",
    name: "All",
    component: Articles,
  },
  {
    key: "favorite_articles",
    name: "Favorites",
    component: Favorites,
  }
]

  return (
    <Tab.Group >
      <Tab.List className="text-center">
          {TabList.map((tab)=> 
          <Tab key={`tab-${tab.key}`} as={Fragment}>
            {({ selected }) => (
              <button
                type="button"
                className={`buttonTab ${selected ? "activeTab": ""}`}
              >
                {tab.name}
              </button>
            )}
          </Tab>)}
      </Tab.List>
      <Tab.Panels>
        {TabList.map(({ key, component: Component }) => (
          <Tab.Panel key={key}>
            <Component />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
