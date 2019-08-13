import React, { useState, useEffect } from "react"
import { getEntries } from "../utils/contentful"

export default props => {
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [players, setPlayers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentAnswers, setCurrentAnswers] = useState([]);
    const [step, setStep] = useState(1);
    const [score, setScore] = useState(0);

    useEffect(() => {
        getEntries('player').then(players => {
            setPlayers(players.items);
        })

        getEntries('question').then(questions => {
            setQuestions(questions.items);
        })

        getEntries('superanswer').then(answers => {
            setAnswers(answers.items);
        })

    }, [])

    const handleClick = (player) => {
        setCurrentPlayer(player);
        startGame();
    }

    const startGame = () => {
        setCurrentQuestion(questions[step - 1]);
    }

    const launchGame = () => {
        //We're matching the answer question's id with all the answers
        setCurrentAnswers(answers.filter(answer => answer.fields.question['en-US'].sys.id === currentQuestion.sys.id));
    }

    const checkAnswer = (answerId) => {
        console.log('clicked answer id :', answerId);
        console.log('current question answer s id', currentQuestion.fields.correctAnswer['en-US'].sys.id);
        let newScore = score
        if (answerId === currentQuestion.fields.correctAnswer['en-US'].sys.id) setScore(10)
    }

    return (
        <section className="grid-container text-align-center">
            <i className="absolute t-5 r-5 p-4 bg-yellow br-20 uppercase sofia f1">Step -{step}</i>
            <i className="absolute t-5 l-5 p-4 bg-yellow br-20 uppercase sofia f1">Score -{score}</i>
            <h1 className="column-span-12 f1 text-red font-black uppercase">Welcome to oh my quizz !</h1>
            <div className="column-span-12">
                <h2>List of players</h2>
                <ul className="block text-align-left">
                    {
                        players.map(player =>
                            <li
                                onClick={() => handleClick(player)}
                                className="block p-2 br-10 cursor-pointer text-white hover:bg-orange transition-1 font-bold bg-red m-2 box-shadow-1"
                                key={player.sys.id}>{player.fields.name['en-US']}
                            </li>)
                    }
                </ul>
            </div>
            {currentPlayer &&
                <div className="column-span-12">
                    <h2>Current player :</h2>
                    <p>{currentPlayer.fields.name['en-US']}</p>
                </div>
            }
            <div className="column-span-12">
                <h2>List of questions</h2>
                <ul className="block text-align-left">
                    {
                        questions.map(question =>
                            <li
                                className="block p-2 br-10 cursor-pointer text-white hover:bg-orange transition-1 font-bold bg-red m-2 box-shadow-1"
                                key={question.sys.id}>{question.fields.text['en-US']}
                            </li>)
                    }
                </ul>
            </div>
            {currentQuestion &&
                <div className="column-span-12">
                    <h2>Current question :</h2>
                    <p className="block p-2 br-10 cursor-pointer text-white hover:bg-green transition-1 font-bold bg-blue m-2 box-shadow-1">{currentQuestion.fields.text['en-US']}</p>
                </div>
            }
            <div className="column-span-12">
                <button onClick={launchGame}>
                    Start Game
                </button>
            </div>
            <div className="column-span-12">
                <h2>Current answers</h2>
                <ul className="block text-align-left">
                    {
                        currentAnswers.map(answer =>
                            <li
                                onClick={() => checkAnswer(answer.sys.id)}
                                className="block p-2 br-10 cursor-pointer text-white hover:bg-orange transition-1 font-bold bg-red m-2 box-shadow-1"
                                key={answer.sys.id}>{answer.fields.text['en-US']}
                            </li>)
                    }
                </ul>
            </div>
        </section>
    )
}