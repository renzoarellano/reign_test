import { RouterApp } from "./router"
import { ArticleProvider } from "../context/articles-context";
export const App = (): React.ReactElement => {
    return (
      <ArticleProvider>
        <RouterApp />
      </ArticleProvider>
    );
  };