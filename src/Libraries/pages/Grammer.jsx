import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Popover, List, ListItem, Typography } from '@mui/material';
import { InputBoxContainer, SuggestionPopUp } from '../../styles/pages/Index';

export const Grammer = () => {
  const [value, setValue] = useState('');
  const contentEditableRef = useRef(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null); //popover
  const [result, setResult] = useState(null); // filter result
  const [selWord, setSelWord] = useState('');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [errWord, setErrWord] = useState('');

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
    console.log(errWords);
    setResult(spellCheckData.filter((item) => item.correct === word));
    setSelWord(word);
  };

  // let timeoutId;
  const onChange = (e) => {
    let updatedText = e.target.textContent;
    // const updatedText = e.target.textContent.split('').reverse().join('');
    console.log(updatedText);
    // const lastWord = updatedText.substring(updatedText.lastIndexOf(" ")+1);
    // console.log(lastWord);
    setValue(updatedText);
    performSpellCheck(updatedText);
  };

  const handleKeyPress = (e) => {
    const key = e.key;
    let updatedText = e.target.textContent;
    if (key === ' ') {
      performSpellCheck(updatedText);
    }
    // setValue(updatedText);
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
            key: 'O04YZKLzyjYNRkFK',
          },
        }
      );
      const spellCheckResult = response.data;
      const spellCheckData = spellCheckResult?.response?.errors.map((match) => {
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
      // console.log('lastword', lastWord);

      const errorPara = errWords.some((errorWord) => text.includes(errorWord));
      const wordsArray = text.split(' ');
      const updatedpara = wordsArray.slice(0, -1).join(' ');
      console.log(wordsArray);
      console.log(updatedpara);


      // console.log(hasErrWord.includes(lastWord));

      // if (hasErrWord.includes(lastWord) || errorPara) {
      //   console.log('object');
      // }

      const trimmedArray = text.split(' ').map((element) => element.trim());
      const arrayAsString = trimmedArray.join(', ');
      console.log('LAST----', arrayAsString);
      const words = arrayAsString.split(',').map((word) => word.trim());
      if (words.length > 0) {
        words.pop();

        const updatedText = words.join(' ');
        console.log(updatedText);
        const lastWord = updatedText.substring(
          updatedText.lastIndexOf(' ') + 1
        );
        console.log('USCCESS===========', lastWord);
        console.log(errWords);

        console.log('dsds',errWords.includes(lastWord), 'ede', errWords.includes(updatedpara));
        if (errWords.includes(lastWord) || updatedpara.includes(errWords) ) {
          updatedChekedWords(errWords, text, spellCheckData, lastWord);
        }
      } else {
        console.log('No words found');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSuggestChange = (word) => {
    const updatedData = value.map((element) => {
      const nestedChild = element?.props?.children.props.children[0];
      if (selWord.includes(nestedChild)) {
        return word + ' ';
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

  // const updatedChekedWords = (errWords, text, spellCheckData) => {
  //   const enteredWords = text.split(' ');
  //   console.log(errWords);

  // const highlightedWords = enteredWords.map((word) => {
  //   console.log(word);
  //   if (errWords.includes(word)) {
  //     return (
  //       <>
  //         <ins
  //           style={{
  //             textDecoration: 'underline red solid 2px',
  //             cursor: 'pointer',
  //           }}
  //           onClick={(event) =>
  //             handlePopoverOpen(event, word, errWords, spellCheckData)
  //           }>
  //           {word}{' '}
  //         </ins>
  //       </>
  //     );
  //   } else {
  //     return `${word} `
  //   }
  // });
  //   console.log(highlightedWords);
  //   setValue(highlightedWords);
  // };

  const updatedChekedWords = (errWords, text, spellCheckData) => {
    const enteredWords = text.split(' ');
    const wordsArray = text.split(' ');
    const lasttext = wordsArray[wordsArray.length - 2];
    console.log(lasttext);
    // const highlightedWords = words.map((word) => {
    //   if (words.length > 0) {
    //     const updatedWords = [...words]; // Create a new array to store the updated words
    //     updatedWords.pop();
    //     const updatedText = updatedWords.join(' ');
    //     console.log(updatedText);
    //     const lastWord = updatedText.substring(updatedText.lastIndexOf(' ') + 1);
    //       console.log('USCCESS===========', lastWord);
    //       if(errWords.includes(lastWord)){
    //         return (
    //               <>
    //                 <ins
    //                   style={{
    //                     textDecoration: 'underline red solid 2px',
    //                     cursor: 'pointer',
    //                   }}
    //                   onClick={(event) =>
    //                     handlePopoverOpen(event, word, errWords, spellCheckData)
    //                   }>
    //                   {word}{' '}
    //                 </ins>
    //               </>
    //             );
    //       }else {
    //           return `${word} `;
    //         }
    //   }else{
    //     console.log('No words found');

    //   }
    //   // if (errWords.includes(word)) {
    //   //   return (
    //   //     <>
    //   //       <ins
    //   //         style={{
    //   //           textDecoration: 'underline red solid 2px',
    //   //           cursor: 'pointer',
    //   //         }}
    //   //         onClick={(event) =>
    //   //           handlePopoverOpen(event, word, errWords, spellCheckData)
    //   //         }>
    //   //         {word}{' '}
    //   //       </ins>
    //   //     </>
    //   //   );
    //   // } else {
    //   //   return `${word} `;
    //   // }
    // });
    const highlightedWords = enteredWords.map((word) => {
      console.log(word);

      // console.log("lastWord", lastWord);
      console.log(errWords);
      if (errWords.includes(lasttext) ) {
        console.log(errWords.includes(lasttext));
        return (
          <>
            <ins
              style={{
                textDecoration: 'underline red solid 2px',
                cursor: 'pointer',
              }}
              onClick={(event) =>
                handlePopoverOpen(event, word, errWords, spellCheckData)
              }>
              {word}{' '}
            </ins>
          </>
        );
      } else {
        return word + ' ';
      }
    });
    console.log(highlightedWords);
    setValue(highlightedWords);
    //* start
    // const trimmedArray = enteredWords.map((element) => element.trim());
    // const arrayAsString = trimmedArray.join(', ');
    // console.log('LAST----', arrayAsString);

    // const words = arrayAsString.split(',').map((word) => word.trim());

    // let highlightedWords = '';
    // if (words.length > 0) {
    //   words.pop();

    //   const updatedText = words.join(' ');
    //   console.log(updatedText);
    //   const lastWord = updatedText.substring(updatedText.lastIndexOf(' ') + 1);
    //   console.log('USCCESS===========', lastWord);
    //   console.log(errWords);

    //   if (errWords.includes(lastWord)) {
    //     console.log("object if");
    //     highlightedWords = `<ins style="text-decoration: underline red solid 2px; cursor: pointer;" onClick="handlePopoverOpen(event, '${lastWord}', ${errWords}, ${spellCheckData})">${lastWord} </ins>`;

    //   } else {
    //     console.log("object else");
    //     highlightedWords = `${lastWord} `;
    //   }
    // } else {
    //   console.log('No words found');
    // }
    // console.log(highlightedWords);
    //* end

    // setValue(highlightedWords);

    // const lastWord = text.substring(text.lastIndexOf(' ') + 1);
    // console.log( lastWord);

    // if(errWords.includes(lastWord)){
    //   console.log('object');
    // }

    //   const highlightedWords = enteredWords.map((word) => {
    //   console.log(errWords.includes(word));

    //   if (errWords.includes(word)) {
    //     return (
    //       <>
    //         <ins
    //           style={{
    //             textDecoration: 'underline red solid 2px',
    //             cursor: 'pointer',
    //           }}
    //           onClick={(event) =>
    //             handlePopoverOpen(event, word, errWords, spellCheckData)
    //           }>
    //           {word}{' '}
    //         </ins>
    //       </>
    //     );
    //   } else {
    //     return `${word} `;
    //   }
    // });
    // console.log(highlightedWords);
    // setValue(highlightedWords);
  };
  return (
    <>
      <InputBoxContainer>
        <Typography variant="h4">Spell Check</Typography>
        <SuggestionPopUp
          // onChange={onChange}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={contentEditableRef}
          // onKeyDown={handleKeyPress}
          spellCheck={false}
          onInput={onChange}
          suppressContentEditableWarning
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