import { TextField } from "@material-ui/core"
import { useHistory, useParams } from "react-router-dom"
import React, { useCallback, useEffect, useRef, useState } from "react"
import SlideModal from "./../SlideModal/SlideModal"
import "./ArticleRedactor.css"

const useFormField = (initialValue) => {
    const [value, setValue] = React.useState(initialValue)

    const onChange = React.useCallback((e) => {
        setValue(e.target.value)
    }, [])

    return {
        bind: {
            value,
            onChange
        },
        set: (line) => setValue(line),
        get: () => value
    }
}

function ArticleRedactor() {
    const userId = useRef()

    const articleId = useRef()

    const params = useParams()

    const history = useHistory()

    const [redactor, setReadactor] = useState()

    const countOfElements = useRef(0)

    const [image, setImage] = useState()
    const [article, setArticle] = useState()

    const [isSlideModalShow, setIsSlideModalShow] = useState(false)

    const [chooseType, setChooseType] = useState("")

    const [selValue, setSelValue] = useState()
    const [selElement, setSelElement] = useState()

    const [changedImage, setChangedImage] = useState()

    const articleTitleField = useFormField("")
    const articleDescriptionField = useFormField("")

    const inputText = useFormField()
    const changeText = useFormField()

    const showSlideModal = useCallback((type) => {
        setChooseType(type)
        setIsSlideModalShow(true)
    }, [])

    const selectElement = useCallback((event) => {
        setSelElement(event.target)
        // console.log(event.target.className)
        switch (event.target.className) {
            case "article-img": {
                setSelValue(event.target.src)
                setChangedImage(event.target.src)
                break
            }
            case "article-text": {
                setSelValue(event.target.textContent)
                changeText.set(event.target.textContent)
                break
            }
            default: {
                break
            }
        }
        showSlideModal(event.target.className)
    }, [changeText, showSlideModal])

    const changeTextHandler = useCallback(() => {
        selElement.textContent = changeText.get()
    }, [selElement, changeText])

    const imageChange = useCallback((event) => {
        event.preventDefault()
        try {
            let reader = new FileReader()
            let file = event.target.files[0]

            reader.onloadend = () => {
                setChangedImage(reader.result)
            }

            reader.readAsDataURL(file)
        } catch {
        }
    }, [])

    const imageChangeHandler = useCallback(() => {
        selElement.src = changedImage
    }, [selElement, changedImage])

    const deleteHandler = useCallback(() => {
        setSelElement(null)
        redactor.removeChild(selElement)
    }, [redactor, selElement])

    const createTextElement = useCallback(() => {
        let labelElement = document.createElement("label")
        let tempText = inputText.get().toString().replaceAll(" ", "&nbsp")
        tempText = tempText.replaceAll("\n", "<br>")
        labelElement.className = "article-text"
        labelElement.innerHTML = tempText
        labelElement.addEventListener("click", event => {
            selectElement(event)
        })
        redactor.append(labelElement)
        countOfElements.current++
    }, [inputText, redactor, selectElement])

    const createImgElement = useCallback(() => {
        if (image) {
            // const imageElement = (<img className="article-img" src={image} alt="article-img" onClick={event=>{selectElement(event)}}/>)
            let imageElement = document.createElement('img')
            imageElement.className = "article-img"
            imageElement.src = image
            imageElement.alt = "article-img"
            imageElement.addEventListener("click", event => {
                selectElement(event)
            })
            redactor.append(imageElement)
            countOfElements.current++
        }
    }, [image, redactor, selectElement])

    const imageSelect = useCallback((event) => {
        event.preventDefault()
        try {
            let reader = new FileReader()
            let file = event.target.files[0]

            // console.log(reader.result)

            reader.onloadend = () => {
                setImage(reader.result)
            }

            reader.readAsDataURL(file)
        } catch {
        }
    }, [])

    const handleAddArticle = useCallback(async () => {
        // console.log(countOfElements.current);
        // console.log(articleTitleField.get());
        // console.log(articleDescriptionField.get());
        // console.log(userId.current);
        if (articleTitleField.get() !== "" && articleDescriptionField.get() !== "" && countOfElements.current > 1 && userId.current) {
            let date = new Date();
            const Article = {
                UserId: userId.current,
                DateTime: date.toJSON(),
                Title: articleTitleField.get(),
                Body_Article: redactor.innerHTML,
                Description: articleDescriptionField.get(),
                Status: false
            }

            console.log(Article)

            try {
                let xhr = new XMLHttpRequest();
                xhr.open("post", "api/articles", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        history.push("/Profile")
                    }
                }
                xhr.send(JSON.stringify(Article));

            } catch (error) {
                console.log(error)
            }
        }
    }, [articleTitleField, articleDescriptionField, redactor, history])

    const getArticleById = useCallback(async (articleId) => {
        return new Promise(async function (resolve, reject) {
            try {
                let xhr = new XMLHttpRequest();
                xhr.open("get", "api/articles/GetArticleByArticleId/" + articleId, true)
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText))
                    }
                };
                xhr.send()
            } catch (error) {
                history.push("/Profile");
            }
        })
    }, [history])

    const handleUpdateArticle = useCallback(async () => {
        try {
            if (articleTitleField.get() !== "" && articleDescriptionField.get() !== "" && userId.current && redactor.innerHTML.length > 35) {

                const Article = {
                    ArticleId: article.articleId,
                    UserId: article.userId,
                    DateTime: new Date().toJSON(),
                    Title: articleTitleField.get(),
                    Body_Article: redactor.innerHTML,
                    Description: articleDescriptionField.get(),
                    Status: article.status,
                }

                let xhr = new XMLHttpRequest();
                xhr.open("put", "/api/articles/UpdateArticle/", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        history.push("/Profile");
                    }
                };
                xhr.send(JSON.stringify(Article));
            }

        } catch (error) {
            console.log(error)
        }
    }, [articleTitleField, articleDescriptionField, redactor, article, history])

    useEffect(() => {
        try {
            document.getElementById("root").removeChild(document.getElementById("navMenu"))
        } catch {
        }
    }, [])

    useEffect(() => {
        userId.current = JSON?.parse(JSON?.parse(localStorage?.getItem("User")))?.userId
    }, [])

    useEffect(() => {
        if (!redactor) setReadactor(document.getElementById("article-redactor-body"))
    }, [redactor, setReadactor])

    useEffect(() => {
        if (params.articleId && redactor) {
            getArticleById(params.articleId).then(data => {
                articleId.current = data._id
                userId.current = data.userId
                articleTitleField.set(data.title)
                articleDescriptionField.set(data.description)
                redactor.innerHTML = data.body_Article

                for (let element of redactor.children) {
                    element.addEventListener("click", event => {
                        selectElement(event)
                    })
                }
                setArticle(data)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, redactor, getArticleById])

    return (
        <div className="article-redactor">
            <div className="page-title">
                <h5>Article redactor</h5>
            </div>
            <div className="article-redactor-header">
                <span>
                    <div>Title</div>
                    <TextField multiline
                        type="text"
                        {...articleTitleField.bind} />
                </span>
                <span>
                    <div>Brief description</div>
                    <TextField multiline className="article-description"
                        type="text"
                        {...articleDescriptionField.bind} />
                </span>
            </div>
            <div id="article-redactor-body" className="article-redactor-body">
            </div>
            <div className="article-redactor-footer">
                {params.articleId ? (
                    <button onClick={handleUpdateArticle}>Update article</button>
                ) :
                    (
                        <button onClick={handleAddArticle}>Add article</button>
                    )
                }
            </div>
            <div className="article-redactor-buttons">
                <button onClick={() => {
                    showSlideModal("text")
                }}>Add text
                </button>
                <button onClick={() => {
                    showSlideModal("img")
                }}>Add image
                </button>
            </div>
            <SlideModal isActive={isSlideModalShow}
                setActive={setIsSlideModalShow}>
                <div className="article-modal">
                    {chooseType === "text" && (
                        <>
                            <TextField multiline className="article-modal-input"
                                {...inputText.bind} />
                            <div className="redactor-buttons">
                                <button onClick={() => {
                                    inputText.set("")
                                }}>Cancel
                                </button>
                                <button onClick={createTextElement}>Add
                                </button>
                            </div>
                        </>
                    )}
                    {chooseType === "img" && (
                        <>
                            {image && (<img className="article-img-preview" src={image} alt={"img"} />)}
                            <input className="fileInput"
                                type="file"
                                onChange={event => imageSelect(event)}
                                accept="image/*"
                            />
                            <div className="redactor-buttons">
                                <button onClick={() => {
                                    setImage(undefined)
                                }}>Cancel
                                </button>
                                <button onClick={createImgElement}>Add
                                </button>
                            </div>
                        </>
                    )}
                    {chooseType === "article-img" && (
                        <>
                            {selValue && (
                                <img className="article-img-preview" src={changedImage ?? selValue} alt={"img"} />)}
                            <input className="fileInput"
                                type="file"
                                onChange={event => imageChange(event)}
                                accept="image/*"
                            />
                            <div className="redactor-buttons">
                                <button disabled={!changedImage} onClick={() => {
                                    setChangedImage(undefined)
                                }}>Cancel
                                </button>
                                <button disabled={!selElement}
                                    onClick={imageChangeHandler}>Change
                                </button>
                                <button disabled={!selElement}
                                    onClick={deleteHandler}>Delete
                                </button>
                            </div>
                        </>
                    )}
                    {
                        chooseType === "article-text" && (
                            <>
                                <TextField multiline className={"article-modal-input"}
                                    value={selValue}
                                    {...changeText.bind} />
                                <div className="redactor-buttons">
                                    <button disabled={!selElement}>Cancel
                                    </button>
                                    <button disabled={!selElement}
                                        onClick={changeTextHandler}>Change
                                    </button>
                                    <button disabled={!selElement}
                                        onClick={deleteHandler}>Delete
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>
            </SlideModal>
        </div>
    )
}

export default ArticleRedactor