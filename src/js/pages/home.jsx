import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../utils/api";

export default props => {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questions);

    useEffect(() => {
        api.then(api => {
            api.getEntries({ content_type: "question" }).then(entries => {
                dispatch({ type: "SET_QUESTIONS", payload: entries.items });
            });
        });
    }, []);

    console.log(questions);

    return (
        <section>
            <h1>Oh my quizz :</h1>
        </section>
    );
};
