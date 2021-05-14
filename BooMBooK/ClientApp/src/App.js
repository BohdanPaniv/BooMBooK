import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {UserSetting} from "./components/UserSetting/UserSetting"
import {Profile} from "./components/Profile/Profile"
import {ArticlePage} from "./components/ArticlePage/ArticlePage";
import ArticleRedactor from "./components/ArticleRedactor/ArticleRedactor"

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route exact path='/Settings' component={UserSetting}/>
                <Route exact path='/ArticlePage/:id' component={ArticlePage}/>
                <Route exact path='/Profile' component={Profile}/>
                <Route exact path='/Redactor/' component={ArticleRedactor}/>
                <Route exact path='/Redactor/:articleId' component={ArticleRedactor}/>
            </Layout>
        );
    }
}
