
import { Fragment } from "react"
import { Header } from "./header"
type LayoutProps = {
    children: React.ReactElement
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Fragment>
        <Header />
        {children}
    </Fragment>
  )
}
