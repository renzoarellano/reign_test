import { Layout } from "./layout";
import { RouterApp } from "./router"
import { ArticleProvider } from "../context/articles-context";
import { SelectProvider } from "../context/select-context";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css"
export const App = (): React.ReactElement => {
    return (
      <SelectProvider>
        <ArticleProvider>
        <Layout>
          <RouterApp />
        </Layout>
      </ArticleProvider>
      </SelectProvider>
      
    );
  };