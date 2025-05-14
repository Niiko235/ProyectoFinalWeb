import React from 'react'
import {Admin, ListGuesser, Resource} from "react-admin"
import fakeDataProvider from 'ra-data-fakerest'
import {data} from "./data"
import './App.css'

const dataProvider = fakeDataProvider(data, true);

const App = () => {
  return (
    <>
      <Admin dataProvider={dataProvider}>
        <Resource name='posters' list={ListGuesser}/>
        <Resource name='users' list={ListGuesser}/>
        
      </Admin>
    </>
  )
}

export default App