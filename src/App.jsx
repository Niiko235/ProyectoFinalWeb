import React from 'react'
import {Admin, ListGuesser, Resource} from "react-admin"
import fakeDataProvider from 'ra-data-fakerest'
import {data} from "./data"
import './App.css'

const dataProvider = fakeDataProvider(data, true);

const App = () => {
  return (
    <>

    </>
  )
}

export default App