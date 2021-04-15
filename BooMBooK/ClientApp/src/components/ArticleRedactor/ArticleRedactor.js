import React, {useEffect, useState} from "react";
import "./ArticleRedactor.css";
import SlideModal from "../SlideModal/SlideModal";

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
        tempText = tempText.replaceAll("\n","<br>");
        div.className = "article-text";
        div.innerHTML = tempText;
        redactor.append(div);
    }

    // console.log(redactor);

    return (
        <div id="article-redactor">
            <button onClick={() => {
                showSlideModal("text")
            }}>Add text
            </button>
            <div id="article-dynamic-body">

            </div>
            <SlideModal isActive={isSlideModalShow}
                        setActive={setIsSlideModalShow}>
                <div className="article-modal">
                    {chooseType === "text" && (
                        <>
                            <textarea className="article-modal-input" {...inputText.bind}/>
                            <button>cancel</button>
                            <button onClick={createTextElement}>add
                            </button>
                        </>
                    )}
                </div>
            </SlideModal>
        </div>
    );

}
