import React, { FunctionComponent } from "react"
import { Global, css } from "@emotion/react"

const defaultStyle = css`
  @import url("https://avatars.githubusercontent.com/u/84652554?v=4");

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Nanum Myeongjo", serif;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle
