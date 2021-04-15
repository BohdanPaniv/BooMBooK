import React, {useEffect, useState} from "react";
import "./ArticleRedactor.css";
import SlideModal from "../SlideModal/SlideModal";
import gif from "./8231e4cb-2749-4383-85e4-1d78dbecb58d.gif";
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

    const [image, setImage] = useState();

    const inputText = useFormField();

    const [isSlideModalShow, setIsSlideModalShow] = useState(false);

    const [chooseType, setChooseType] = useState("");

    function showSlideModal(type) {
        setChooseType(type);
        // (document.getElementById("product-content").classList.add("overflow-hide"));
        // // console.log("click");
        setIsSlideModalShow(true);
    }

    useEffect(() => {
        if (!redactor) setReadactor(document.getElementById("article-dynamic-body"))
    }, [redactor, setReadactor])

    function createTextElement() {
        let div = document.createElement('label');
        console.log(inputText.get());
        let tempText = inputText.get().toString().replaceAll(" ", "&nbsp");
        tempText = tempText.replaceAll("\n", "<br>");
        div.className = "article-text";
        div.innerHTML = tempText;
        redactor.append(div);
    }

    function createImgElement() {
        let img = document.createElement('img');
        img.className = "article-img";
        img.src = image || gif;
        img.alt = "article-img";
        redactor.append(img);
    }

    function imageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        console.log(reader.result);

        reader.onloadend = () => {
          setImage(reader.result);
        }

        reader.readAsDataURL(file);
    }

    console.log(image);
    // console.log(redactor);

    return (
        <div id="article-redactor">
            <div className="article-buttons">
                <button onClick={() => {
                    showSlideModal("text")
                }}>Add text
                </button>
                <button onClick={() => {
                    showSlideModal("img")
                }}>Add image
                </button>
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
                               onChange={event => imageChange(event)}
                        />
                        <div className="redactor-buttons">
                            <button>Cancel
                            </button>
                            <button onClick={createImgElement}>Add
                            </button>
                        </div>
                        </>
                    )}
                    </div>
            </SlideModal>
        </div>
    );

}
