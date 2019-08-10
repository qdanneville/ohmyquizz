import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentQuestion } from "../reducers/questions"

import api from "../utils/api";

export default props => {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.questions);
    const currentQuestions = useSelector(state => state.game.currentQuestions);
    const currentQuestionIsLoading = useSelector(state => state.game.isLoading);

    useEffect(() => {
        api.then(api => {
            api.getEntries({ content_type: "question" }).then(entries => {
                dispatch({ type: "SET_QUESTIONS", payload: entries.items });
            });
        });
    }, []);

    if (!questions.areLoaded) return <h1>Questions are loading...</h1>

    const handleClick = (id) => {
        dispatch(fetchCurrentQuestion(id));
    }

    return (
        <section className="px-10">
            <h1>Oh my quizz :</h1>
            <ul>
                {
                    questions.items.map(question =>
                        <li key={question.sys.id}>
                            <span onClick={() => handleClick(question.sys.id)} className="br-4 mt-2 cursor-pointer block bg-blue box-shadow-1 p-4 f2 uppercase text-dark font-bold sofia transition-1 hover:bg-green-light">{question.fields.text['en-US']}</span>
                        </li>
                    )
                }
            </ul>
        </section>
    );
};
