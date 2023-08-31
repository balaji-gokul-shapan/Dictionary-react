import React, { useState } from 'react';
import axios from 'axios';
import {
  IndexPageContainer,
  InputBoxContainer,
  StyledButton,
  StyledInputBox,
  SuggestionPopUp,
} from '../../styles/pages/Index';
import { Typography, Box, Modal, Popover } from '@mui/material';

export const Index = () => {
  const [text, setText] = useState(null);
  const [result, setResult] = useState(null);
  const [errorWords, setErrorWords] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [suggesstionText, setSuggesstionText] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCheckWords = async () => {
    const result = await checkWordSpells(text);
    const checkWords = result?.response.errors.map((match) => {
      return {
        message: match.description,
        offset: match.offset,
        length: match.length,
        word: match.better,
        type: match.type,
        correct: match.bad,
      };
    });
    // console.log(checkWords.map((error)=>error.correct));

    const words = [text.split(/\s+/)];
    const renderWords = [];

    words.map((word) => {
      const renderWord = word;
      renderWords.push(renderWord);
    });
    console.log(renderWords[0]);

    const checkErrorWords = checkWords.map((correct) => correct.word);
    console.log(checkErrorWords);

    const rectifyWord = checkWords.map((err) => err.correct);
    console.log(rectifyWord);

    const handleSuggestionBox = (word) => {
      console.log('first');
      {
        word;
      }
    };
    // const span = []
    // const replaceWords = renderWords[0].map((item) => {
    //   console.log(rectifyWord.includes(item), item);
    //   if (rectifyWord.includes(item)) {
    //     // <span>item</span>;
    //     span.push(item);
    //   } else {
    //     return item;
    //   }
    // });
    // console.log(span);
    // console.log(replaceWords);

    const suggestionPopup = (word) => {
      handleOpen();
      console.log(word);
      setSuggesstionText(word);
    };

    const spanArray = renderWords[0].map((word, index) => {
      if (rectifyWord.includes(word)) {
        return (
          <>
            <span
              style={{
                textDecoration: 'underline',
                textDecorationStyle: 'wavy',
                cursor: 'pointer',
                color: 'red',
              }}
              onClick={() => suggestionPopup(word)}>
              {word}
            </span>{' '}
          </>
        );
      } else {
        return <> {word} </>;
      }
    });

    console.log(spanArray);

    // const intersection = renderWords[0].filter((element) =>
    //   rectifyWord.includes(element)
    // );

    // const updatedRenderedWords = [renderWords].map((wordObj) => {
    //   if (intersection.some((word) => word.word === wordObj.word)) {
    //     return {
    //       ...wordObj,
    //       style: { color: "red" },
    //     };
    //   }
    //   return wordObj;
    // });

    // console.log(updatedRenderedWords[0][0]);

    setErrorWords(checkErrorWords);
    setIsSubmitted(true);
    setResult(result);
    setText(spanArray);
  };

  // console.log(checkWords);
  //   if(text === checkWords){
  //     console.log('true');
  //   }
  const checkWordSpells = async (text) => {
    try {
      const response = await axios.post(
        'https://api.textgears.com/grammar',
        {
          text: text,
          language: 'en-US',
        },
        {
          params: {
            key: 'HnP2OA43LuqQxWnt',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  //   {console.log(result?.response)}
  //   // if (result &  & result?.response) {
  //   //   console.log('first');
  //   //   return result?.response
  //   //     .map((match) => match.better)
  //   //     .filter((better) => better)
  //   //     .map((better, index) => (
  //   //       <ListItem key={index}>
  //   //         <ListItemText>
  //   //           <Typography
  //   //             style={{
  //   //               textDecoration: 'underline',
  //   //               cursor: 'pointer',
  //   //               color: 'red',
  //   //             }}
  //   //             onClick={() => {
  //   //               setText(text.replace(result.matches[index].bad, better));
  //   //             }}>
  //   //             {better}
  //   //           </Typography>
  //   //         </ListItemText>
  //   //         console.log('check')
  //   //       </ListItem>
  //   //     ));
  //   // }
  //   return null;
  // };

  // const SuggestionTexts = () => {
  //   console.log(result?.response.errors.map((match) => match.better));
  //   if (result && result?.response) {
  //     return (
  //       <>
  //         {result.response.errors
  //           .map((match) => match.better)
  //           .filter((better) => better)
  //           .map((better, index) => (
  //             <ListItem key={index}>
  //               <ListItemText>
  //                 <Typography
  //                   style={{
  //                     textDecoration: 'underline wavy',
  //                     cursor: 'pointer',
  //                     color: 'red',
  //                   }}
  //                   onClick={() => {
  //                     setText(
  //                       text.replace(result.matches[index].bad, better[0])
  //                     );
  //                   }}>
  //                   {better[0]}
  //                 </Typography>
  //               </ListItemText>
  //             </ListItem>
  //           ))}
  //       </>
  //     );
  //   }
  //   return null;
  // };

  // const SuggestionTexts = () => {
  //     console.log(result?.response.errors.map((match) => match.better));
  //     if (result && result?.response) {
  //       return (
  //         <>
  //           {result.response.errors
  //             .map((match) => match.better)
  //             .filter((better) => better)
  //             .map((better, index) => (
  //               <ListItem key={index}>
  //                 <ListItemText>
  //                   <Typography
  //                     style={{
  //                       textDecoration: 'underline wavy',
  //                       cursor: 'pointer',
  //                       color: 'red',
  //                     }}
  //                     onClick={() => {
  //                       setText(
  //                         text.replace(result.matches[index].bad, better[0])
  //                       );
  //                     }}>
  //                     {better[0]}
  //                   </Typography>
  //                 </ListItemText>
  //               </ListItem>
  //             ))}
  //         </>
  //       );
  //     }
  //     return null;
  //   };
  const SuggestionTexts = () => {
    const checkErrorWords = result?.response.errors
      .map((match) => match.better)
      .filter((better) => better)
      .map((better, index) => better);
    console.log(checkErrorWords);
    setErrorWords(checkErrorWords);
  };
  // console.log(result?.response?.errors);
  return (
    <>
      <IndexPageContainer>
        <Typography variant="h1" component="h1">
          NewsLetter
        </Typography>
        <InputBoxContainer>
          <StyledInputBox
            variant="filled"
            placeholder="User Name"
            label="Full Name"
            // autoComplete={true}
            spellCheck={true}
          />
          <StyledInputBox
            variant="filled"
            placeholder="username@outlook.com"
            label="Mail Address"
            type="email"
          />
          {/* <StyledInputBox
            variant="filled"
            placeholder="Enter your Quotes here..!"
            label="Message"
            type="textarea"
            inputProps={{ spellCheck: true }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            rows={5}
            className={isSubmitted ? "redTextarea" : ''}            // style={{
            //   textDecoration: 'underline',
            //   textDecorationColor: 'red',
            // }}
          /> */}
          <div
            contentEditable={true}
            spellCheck={false}
            suppressContentEditableWarning={true}
            onInput={(e) => {
              setText(e.target.textContent);
            }}
            style={{ backgroundColor: 'white' }}>
            {text}
          </div>
          <StyledButton type="submit" onClick={handleCheckWords}>
            Submit
          </StyledButton>
          {/* {SuggestionTexts()} */}
          {open && (
            <Modal
              disableEnforceFocus
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <SuggestionPopUp>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {suggesstionText}
                  {console.log('popup')}
                </Typography>
              </SuggestionPopUp>
            </Modal>
          )}
          {errorWords?.length > 0 && (
            <div>
              Error words:
              {errorWords.map((errorWord, index) => (
                <span
                  key={index}
                  style={{ color: 'red', textDecoration: 'underline wavy' }}>
                  {errorWord}
                  <br />
                </span>
              ))}
            </div>
          )}
        </InputBoxContainer>
      </IndexPageContainer>
    </>
  );
};
