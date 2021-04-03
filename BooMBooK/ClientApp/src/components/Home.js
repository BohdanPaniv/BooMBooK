import React from "react";
import ArticleCardList from "./ArticleCard/ArticleCardList";
import {Card, CardColumns} from "reactstrap";


// const useFormField = (initialValue= '') => {
//     const [value, setValue] = React.useState(initialValue);
//     const onChange = React.useCallback((e) => setValue(e.target.value), []);
//     return { value, onChange };
// };

export function Home() {

    let array = [
        {
            id: 1,
            title : "Заголовок 1 Заголовок 1Заголовок 1 Заголовок 1Заголовок 1 Заголовок 1Заголовок 1 Заголовок 1Заголовок 1 Заголовок 1Заголовок 1 Заголовок 1Заголовок 1 Заголовок 1Заголовок 1 Заголовок 1Заголовок 1 Заголовок 1Заголовок 1 Заголовок 1",
            text: "Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1Текст 1"
        },
        {
            id: 2,
            title: "Заголовок 2",
            text: "Текст 2"
        },
        {
            id: 3,
            title: "Заголовок 3",
            text: "Текст 3"
        },
        {
            id: 4,
            title: "Заголовок 4",
            text: "Текст 4"
        },
        {
            id: 5,
            title: "Заголовок 4",
            text: "Текст 4"
        },
        {
            id: 6,
            title: "Заголовок 4",
            text: "Текст 4"
        },
        {
            id: 7,
            title: "Заголовок 4",
            text: "Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4Текст 4"
        },
        {
            id: 8,
            title: "Заголовок 4",
            text: "Текст 4"
        },
        ];

    return (
        <ArticleCardList ArticleList={array}/>
    );
}
