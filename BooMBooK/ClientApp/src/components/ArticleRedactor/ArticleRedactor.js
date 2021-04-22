import React, {useEffect, useState} from "react";
import "./ArticleRedactor.css";
import SlideModal from "../SlideModal/SlideModal";
import {useParams} from "react-router-dom";

const useFormField = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = React.useCallback((e) => {
        setValue(e.target.value)
    }, []);

    return {
        bind: {
            value,
            onChange
        },
        set: (line) => setValue(line),
        get: () => value
    };
};

export function ArticleRedactor() {
    const [redactor, setReadactor] = useState();

    const params = useParams().id;
    // console.log(params);

    const [image, setImage] = useState();

    const inputText = useFormField();

    const changeText = useFormField();

    const [isSlideModalShow, setIsSlideModalShow] = useState(false);

    const [chooseType, setChooseType] = useState("");

    const [selValue, setSelValue] = useState();

    const [selElement, setSelElement] = useState();

    const [changedImage, setChangedImage] = useState();

    const articleTitleField = useFormField("");
    const articleDescriptionField = useFormField("");

    function showSlideModal(type) {
        setChooseType(type);
        // (document.getElementById("product-content").classList.add("overflow-hide"));
        // // console.log("click");
        setIsSlideModalShow(true);
    }

    useEffect(() => {
        if (!redactor) setReadactor(document.getElementById("article-dynamic-body"))
    }, [redactor, setReadactor])

    function selectElement(event) {
        setSelElement(event.target);
        console.log(event.target.className)
        switch (event.target.className) {
            case "article-img": {
                setSelValue(event.target.src);
                setChangedImage(event.target.src)
                break;
            }
            case "article-text": {
                setSelValue(event.target.textContent);
                changeText.set(event.target.textContent);
                break;
            }
            default: {
                break;
            }
        }

        showSlideModal(event.target.className);
        // console.log(selValue);
    }

    function changeTextHandler() {
        selElement.textContent = changeText.get();
    }

    function imageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        // console.log(reader.result);

        reader.onloadend = () => {
            setChangedImage(reader.result);
        }

        reader.readAsDataURL(file);
    }

    function imageChangeHandler() {
        selElement.src = changedImage;
    }

    function deleteHandler() {
        setSelElement(null);
        redactor.removeChild(selElement);
    }

    function createTextElement() {
        let labelElement = document.createElement("label");
        // console.log(inputText.get());
        let tempText = inputText.get().toString().replaceAll(" ", "&nbsp");
        tempText = tempText.replaceAll("\n", "<br>");
        labelElement.className = "article-text";
        labelElement.innerHTML = tempText;
        labelElement.addEventListener("click", event => {
            selectElement(event)
        });
        redactor.append(labelElement);
    }

    function createImgElement() {
        if (image) {
            let imageElement = document.createElement('img');
            imageElement.className = "article-img";
            imageElement.src = image;
            imageElement.alt = "article-img";
            imageElement.addEventListener("click", event => {
                selectElement(event)
            });

            redactor.append(imageElement);
        }
    }

    function imageSelect(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        // console.log(reader.result);

        reader.onloadend = () => {
            setImage(reader.result);
        }

        reader.readAsDataURL(file);
    }

    function articleSubmitHandler() {

        if (articleTitleField.get() !== ""
            && articleDescriptionField.get() !== ""
            && redactor.childElementCount > 0) {

            // console.log(redactor);

            let date = new Date();

            // this is the JavaScript date as a c# DateTime

            let xhr = new XMLHttpRequest();

            let article = JSON.stringify({
                UserId: params,
                DateTime: date.toJSON(),
                Body_Article: redactor.outerHTML,
                Status: false,
                Title: articleTitleField.get(),
                Description: articleDescriptionField.get()
            });

            xhr.open("post","api/articles", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(article);

            console.log(xhr);

        }
    }

    // console.log(image);
    // console.log(redactor);

    return (
        <div id="article-redactor">
            <div className="article-static-body">
                <span>
                    <label>Title</label>
                    <input type="text"
                           {...articleTitleField.bind}/>
                </span>
                <span>
                    <label>Brief description</label>
                    <textarea className={"article-description"}
                              type={"textbox"}
                              {...articleDescriptionField.bind}/>
                </span>
            </div>
            <div className="article-buttons">
                <button onClick={() => {
                    showSlideModal("text")
                }}>Add text
                </button>
                <button onClick={() => {
                    showSlideModal("img")
                }}>Add image
                </button>
                <button className="article-submit" onClick={articleSubmitHandler}>Add article</button>
            </div>
            <div id="article-dynamic-body">
            </div>
            <SlideModal isActive={isSlideModalShow}
                        setActive={setIsSlideModalShow}>
                <div className="article-modal">
                    {chooseType === "text" && (
                        <>
                            <textarea className="article-modal-input" {...inputText.bind}/>
                            <div className="redactor-buttons">
                                <button onClick={() => {
                                    inputText.set("");
                                }}>Cancel
                                </button>
                                <button onClick={createTextElement}>Add
                                </button>
                            </div>
                        </>
                    )}
                    {chooseType === "img" && (
                        <>
                            {image && (<img className="article-img-preview" src={image} alt={"img"}/>)}
                            <input className="fileInput"
                                   type="file"
                                   onChange={event => imageSelect(event)}
                            />
                            <div className="redactor-buttons">
                                <button>Cancel
                                </button>
                                <button onClick={createImgElement}>Add
                                </button>
                            </div>
                        </>
                    )}
                    {chooseType === "article-img" && (
                        <>
                            {image && (<img className="article-img-preview" src={changedImage} alt={"img"}/>)}
                            <input className="fileInput"
                                   type="file"
                                   onChange={event => imageChange(event)}
                            />
                            <div className="redactor-buttons">
                                <button disabled={!selElement}>Cancel
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
                                <textarea className={"article-modal-input"}
                                          value={selValue}
                                          {...changeText.bind}/>
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
    );

}
