import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Popover, List, ListItem, Typography } from '@mui/material';
import { InputBoxContainer, SuggestionPopUp } from '../../styles/pages/Index';

export const SpellCheck = () => {
  const [value, setValue] = useState('');
  const contentEditableRef = useRef(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null); //popover
  const [result, setResult] = useState(null); // filter result
  const [selWord, setSelWord] = useState('');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [errWord, setErrWord] = useState('');
  const [currentValue, setCurrentValue] = useState({});

  // useEffect(() => {
  //   moveCursorToEnd();
  // }, [value]);

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.focus();
      const selection = window.getSelection();
      selection.selectAllChildren(contentEditableRef.current);
      selection.collapseToEnd();
    }
  });



  const openPopover = Boolean(popoverAnchor);
  const handlePopoverClose = () => setPopoverAnchor(null);
  const handleMouseMove = (event) => {
    setCoords({ x: event.clientX, y: event.clientY });
  };

  const handleMouseEnter = () => setShowPopup(true);
  const handleMouseLeave = () => setShowPopup(false);

  const moveCursorToEnd = () => {
    const element = contentEditableRef.current;
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(element);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);

    element.focus();
  };

  const handlePopoverOpen = (event, word, errWords, spellCheckData) => {
    setPopoverAnchor(event.currentTarget);
    // console.log(errWords);

    setResult(spellCheckData.filter((item) => item.correct === word));
    setSelWord(word);
  };

  // let timeoutId;
  /* const onChange = (e) => {
    let updatedText = e.target.textContent;
    // const updatedText = e.target.textContent.split('').reverse().join('');
    console.log(updatedText);
    // const lastWord = updatedText.substring(updatedText.lastIndexOf(" ")+1);
    // console.log(lastWord);
    setValue(updatedText);
    setTimeout(() => {
      performSpellCheck(updatedText);
    }, 1000);
  }; */

  const handleKeyPress = (event) => {
    const key = event.key
    console.log('value',value)
    console.log(value.substring(0, value.length - 1));
    console.log(value+key)
    console.log(key)
        if ((key == 'Backspace' || key=='Delete') && value === ' ') {
          setValue(value.substring(0, value.length - 1));
            performSpellCheck(value);
          console.log(value.substring(0, value.length - 1))
          } else{
            setValue(value+key)
          }

    /* const key = event.key
    console.log();
    const element = document.getElementById('textarea');
    const htmlContent = element.innerText;
    const parser = new DOMParser();
const parsedDocument = parser.parseFromString(htmlContent, 'text/html');
const object = {
  parsedDocument: parsedDocument.body.innerText

};
console.log(object);
const updatedText = object.parsedDocument */




//     //const updatedText = e.target.textContent;

    // setValue(value+event?.key);
    // console.log(value+event?.key)
    // if (event?.key === ' ') {
    //   performSpellCheck(value+event?.key);
    // }
  };

  // const onChange = (e) => {
  //   if (contentEditableRef.current) {
  //     contentEditableRef.current.focus();
  //     const selection = window.getSelection();
  //     selection.selectAllChildren(contentEditableRef.current);
  //     selection.collapseToEnd();
  //   }

  //   let updatedText = e.target.textContent;
  //   console.log(updatedText);
  //   // performSpellCheck(updatedText);
  //   setValue(updatedText);

  // };

  const performSpellCheck = async (text) => {
    try {
      const response = await axios.post(
        'https://api.textgears.com/spelling',
        {
          text: text,
          language: 'en-US',
        },
        {
          params: {
            key: 'zXhHCZGrsnyVZ0O3',
          },
        }
      );
      const spellCheckResult = response.data;
      const spellCheckData = spellCheckResult?.response.errors.map((match) => {
        return {
          message: match.description,
          offset: match.offset,
          length: match.length,
          word: match.better,
          type: match.type,
          correct: match.bad,
        };
      });
      console.log(spellCheckData);

      const errWords = spellCheckData.map((error) => error.correct);

      setErrWord(errWords);

      // const hasErrWord = errWords.map((item) => item);
      // console.log('hasErr', hasErrWord);

      // const lastWord = text.substring(text.lastIndexOf(' ') + 1);
      // // console.log('lastword', lastWord);

      // const errorPara = errWords.some((errorWord) => text.includes(errorWord));
      // console.log(errorPara);

      // console.log(hasErrWord.includes(lastWord));
      updatedChekedWords(errWords, text, spellCheckData);

      // if (hasErrWord.includes(lastWord) || errorPara) {
      //   console.log('object');
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSuggestChange = (word) => {
    const updatedData = value.map((element) => {
      const nestedChild = element?.props?.children[0];

      if (selWord.includes(nestedChild)) {
        return `${word}\u00A0`;
      }
      return element;
      // if(selWord.includes(nestedChild)){
      //   const updatedWord = nestedChild.replace(selWord, word);
      //   return {...element, props:{ ...element.props,children : updatedWord} }
      // }
      // return element
    });
    console.log(updatedData);
    setValue(updatedData);
    setPopoverAnchor(null);
  };

  // useEffect(()=>{
  //   console.log('value',value)
  // },[value])

  const updatedChekedWords = (errWords, text, spellCheckData) => {
    const wordsArray = text.split(' ');
    const textSplit = text.match(/\b\w+\b/g);
    console.log(textSplit);
    console.log(errWords);

    const anyValuesMatch = textSplit.filter((value) =>
      errWords.includes(value)
    );

    /* console.log(anyValuesMatch); */

    const lastWord = wordsArray[wordsArray.length - 1];
    const updatedpara = wordsArray.slice(0, -1).join(' ');
    const wordsWithoutLast = wordsArray.slice(0, -1);

    const hasErrWord = errWords.map((item) => item);
    /* console.log('hasErr', hasErrWord);

    console.log(lastWord);

    console.log(errWords);
    console.log(errWords.includes(lastWord));
    console.log(errWords.some((element) => updatedpara.includes(element)));
    const lastPara = errWords.some((element) => updatedpara.includes(element));

    console.log(wordsArray);
    console.log('text', text.split(' '));
    console.log(updatedpara.includes(hasErrWord)); */

    // const highlightedWords = wordsArray.map((word, index) => {
    //   if (errWords.includes(word) ) {

    //     return (
    //       <span
    //         key={index}
    //         style={{
    //           textDecoration: "underline red solid 2px",
    //           cursor: "pointer"
    //         }}
    //       >
    //         {word}&nbsp;
    //       </span>
    //     );
    //   } else {
    //     return `${word}\u00A0`;
    //   }
    // });

    // const highlightedWords = wordsArray.map((word, index) => {
    //   if (index === wordsArray.length - 1) {
    //     console.log('check the word===>',index === wordsArray.length - 1)
    //     if (errWords.includes(lastWord.trim()) ) {
    //       return (
    //         <React.Fragment key={index}>
    //           <ins
    //             style={{
    //               textDecoration: 'underline red solid 2px',
    //               cursor: 'pointer',
    //             }}
    //             onClick={(event) =>
    //               handlePopoverOpen(event, word, errWords, spellCheckData)
    //             }>
    //             {word}&nbsp;
    //           </ins>
    //         </React.Fragment>
    //       );
    //     } else {
    //       return `${word}\u00A0`;
    //     }
    //   } else {
    //     return `${word}\u00A0`;
    //   }
    // });

    //&<-----check--->

    //  const highlightedWords = wordsArray.map((word, index) => {
    //     // const previousWord = index > 0 ? wordsArray[index - 1] : null;

    //     if (index === wordsArray.length - 1) {
    //       if (errWords.includes(lastWord.trim())) {
    //         return (
    //           <React.Fragment key={index}>
    //             <ins
    //               style={{
    //                 textDecoration: 'underline red solid 2px',
    //                 cursor: 'pointer',
    //               }}
    //               onClick={(event) =>
    //                 handlePopoverOpen(event, word, errWords, spellCheckData)
    //               }
    //             >
    //               {word}&nbsp;
    //             </ins>
    //           </React.Fragment>
    //         );
    //       } else {
    //         return `${word}\u00A0`;
    //       }
    //     } else if (anyValuesMatch) {
    //       return (
    //         <React.Fragment key={index}>
    //           <ins
    //             style={{
    //               textDecoration: 'underline red solid 2px',
    //               cursor: 'pointer',
    //             }}
    //             onClick={(event) =>
    //               handlePopoverOpen(event, word, errWords, spellCheckData)
    //             }
    //           >
    //             {word}&nbsp;
    //           </ins>
    //         </React.Fragment>
    //       );
    //     } else {
    //       return `${word}\u00A0`;
    //     }
    //   });

    //&<-----check--->
    const highlightedWords = textSplit.map((word, index) => {
      if (errWords.includes(word)) {
        return (
          <span
            key={index}
            style={{
              textDecoration: 'underline red solid 2px',
              cursor: 'pointer',
            }}
            onClick={(event) =>
              handlePopoverOpen(event, word, errWords, spellCheckData)
            }>
            {word}&nbsp;
          </span>
        );
      }
      // else
      // if (anyValuesMatch.includes(word)) {
      //   return (
      //     <span
      //       key={index}
      //       style={{
      //         textDecoration: 'underline red solid 2px',
      //         cursor: 'pointer',
      //       }}
      //       onClick={(event) =>
      //         handlePopoverOpen(event, word, errWords, spellCheckData)
      //       }>
      //       {word}&nbsp;
      //     </span>
      //   );
      // }
      else {
        return `${word}\u00A0`;
      }
    });
    console.log(highlightedWords);
    setValue(highlightedWords);
  };

  // const updatedChekedWords = (errWords, text, spellCheckData) => {
  //   const enteredWords = text.split(' ');
  //   console.log(errWords);

  //   const highlightedWords = enteredWords.map((word) => {
  //     console.log(word);
  //     if (errWords.includes(word)) {
  //       return (
  //         <>
  //           <ins
  //             style={{
  //               textDecoration: 'underline red solid 2px',
  //               cursor: 'pointer',
  //             }}
  //             onClick={(event) =>
  //               handlePopoverOpen(event, word, errWords, spellCheckData)
  //             }>
  //             {word}{' '}
  //           </ins>
  //         </>
  //       );
  //     } else {
  //       return `${word} `
  //     }
  //   });
  //   console.log(highlightedWords);
  //   setValue(highlightedWords);
  // };

  // const updatedChekedWords = (errWords, text, spellCheckData) => {
  //   const enteredWords = text.split(' ');
  //   console.log(errWords);

  //   const trimmedArray = enteredWords.map((element) => element.trim());
  //   const arrayAsString = trimmedArray.join(', ');
  //   console.log('LAST----', arrayAsString);

  //   const words = arrayAsString.split(',').map((word) => word.trim());

  //   let highlightedWords = '';
  //   if (words.length > 0) {
  //     words.pop();

  //     const updatedText = words.join(' ');
  //     console.log(updatedText);
  //     const lastWord = updatedText.substring(updatedText.lastIndexOf(' ') + 1);
  //     console.log('USCCESS===========', lastWord);
  //     console.log(errWords);

  //     if (errWords.includes(lastWord)) {
  //       highlightedWords = (
  //         <ins
  //           style={{
  //             textDecoration: 'underline red solid 2px',
  //             cursor: 'pointer',
  //           }}
  //           onClick={(event) =>
  //             handlePopoverOpen(event, lastWord, errWords, spellCheckData)
  //           }>
  //           {lastWord}{' '}
  //         </ins>
  //       );
  //     } else {
  //       highlightedWords = `${lastWord} `;
  //     }
  //   } else {
  //     console.log('No words found');
  //   }
  //   console.log(highlightedWords);
  //     setValue(highlightedWords);

  //   // const lastWord = text.substring(text.lastIndexOf(' ') + 1);
  //   // console.log( lastWord);

  //   // if(errWords.includes(lastWord)){
  //   //   console.log('object');
  //   // }

  //   //   const highlightedWords = enteredWords.map((word) => {
  //   //   console.log(errWords.includes(word));

  //   //   if (errWords.includes(word)) {
  //   //     return (
  //   //       <>
  //   //         <ins
  //   //           style={{
  //   //             textDecoration: 'underline red solid 2px',
  //   //             cursor: 'pointer',
  //   //           }}
  //   //           onClick={(event) =>
  //   //             handlePopoverOpen(event, word, errWords, spellCheckData)
  //   //           }>
  //   //           {word}{' '}
  //   //         </ins>
  //   //       </>
  //   //     );
  //   //   } else {
  //   //     return `${word} `;
  //   //   }
  //   // });
  //   // console.log(highlightedWords);
  //   // setValue(highlightedWords);
  // };
  return (
    <>
      <InputBoxContainer>
        <Typography variant="h4">Spell Check</Typography>
        <SuggestionPopUp
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={contentEditableRef}
          id='textarea'
          onKeyDown={handleKeyPress}
          spellCheck={false}
          // onInput={onChange}
          suppressContentEditableWarning={true}
          contentEditable>
          {value}
        </SuggestionPopUp>


        <Popover
          open={openPopover}
          anchorReference="anchorPosition"
          anchorPosition={{ top: coords.y, left: coords.x }}
          onClose={handlePopoverClose}>
          {result?.map((element) => (
            <List key={element?.word}>
              {element?.word?.map((word, index) => (
                <ListItem
                  key={index}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleSuggestChange(word)}>
                  {word}
                </ListItem>
              ))}
            </List>
          ))}
        </Popover>
      </InputBoxContainer>
    </>
  );
};
