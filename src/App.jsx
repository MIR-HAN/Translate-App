import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLanguages, translateText } from './redux/actions/actions';
import Select from 'react-select';
import { setAnswer } from './redux/slices/translateSlace';


const App = () => {

  const { isLoading, error, languages } = useSelector((store) => store.languageReducer)
  const translateState = useSelector((store) => store.translateReducer)

  const [sourceLang, setSourceLang] = useState({
    label: 'English',
    value: 'en'
  });
  const [targetLang, setTargetLang] = useState({
    label: 'Dutch',
    value: 'nl'
  });
  const [text, setText] = useState("");


  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getLanguages())

  }, [])

  //format languages array
  //change code and name values to  label&value
  //avoid overrendering
  const formatted = useMemo(() => languages.map((i) => ({
    label: i.name,
    value: i.code
  })), [languages])

  // send translate response to state
  const handleTranslate = () => {

    dispatch(translateText({ sourceLang, targetLang, text }));

  }
  const handleSwap= ()=>{
    setSourceLang(targetLang)
    setTargetLang(sourceLang)

    // switch source language and target language
    setText(translateState.answer)
    // send answer to the store
    dispatch(setAnswer(text));
  }

  return (
    <div className='bg-zinc-900 h-screen text-white grid place-items-center'>
      <div className='w-[80vw] max-w-[1100px] flex flex-col justify-center' >
        <h1 className='text-center text-4xl font-semibold mb-7'>Translate <span className='text-yellow-400'>+</span></h1>
        {/** upside **/}
        <div className='flex gap-2 text-black'>

          <Select
            isLoading={isLoading}
            isDisabled={isLoading}
            value={sourceLang} onChange={(e) => setSourceLang(e)} className='flex-1' options={formatted} />
          <button
          onClick={handleSwap}
            className='rounded py-2 px-6 bg-zinc-700 
          transition hover:ring-2 hover:bg-zinc-800 text-white'>Switch</button>
          <Select
            isLoading={isLoading}
            isDisabled={isLoading}
            value={targetLang} onChange={(e) => setTargetLang(e)} className='flex-1' options={formatted} />
        </div>
        {/** text area **/}
        <div className='flex mt-5 gap-3 md:gap-[105px] max-md:flex-col'>
          <div className='flex-1'>
            <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)} className=' w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black'></textarea>
          </div>
          <div className='flex-1 relative'>
            <textarea
              value={translateState.answer}
              disabled className='w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-gray-300'></textarea>
          
           { translateState.isLoading && 
            <div className="loading-wave absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>}

          </div>
        </div>

        {/** button **/}
        <button onClick={handleTranslate}
          className='rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer
        bg-zinc-700 mt-3 hover:ring-2 hover:bg-zinc-900 transition'>Translate</button>
      </div>
    </div>
  )
}

export default App;