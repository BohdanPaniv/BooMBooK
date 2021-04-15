import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {UserSetting} from "./components/UserSetting/UserSetting"
import {Profile} from "./components/Profile/Profile"
import {ArticlePage} from "./components/ArticlePage/ArticlePage";
import {ArticleRedactor} from "./components/ArticleRedactor/ArticleRedactor"
// import { AuthenticationPage } from "./components/AuthenticationPage"

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route exact path='/Settings' component={UserSetting}/>
                <Route path='/ArticlePage/:id' component={ArticlePage}/>
                {/*<Route exact path='/Authentication' component={AuthenticationPage}/>*/}
                <Route exact path='/Profile' component={Profile}/>
                <Route exact path='/Redactor/:id' component={ArticleRedactor}/>
                {/*  <Route path='/counter' component={Counter} />*/}
                {/*  <Route path='/fetch-data' component={FetchData} />*/}
            </Layout>
        );
    }
}
