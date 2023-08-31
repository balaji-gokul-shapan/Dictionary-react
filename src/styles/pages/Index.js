import { Box, TextField, styled, Button, Tooltip } from '@mui/material';
import { Colors } from '../theme/Index';

export const IndexPageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  //   textAlign: 'center',
  width: 'auto',
  margin: 0,
  border: 'none',
  padding: '50px',
});

export const InputBoxContainer = styled(Box)({
  width: 'auto',
  height: '100vh',
  background: Colors.light,
  display: 'flex',
  margin: '20px',
  padding: '20px 50px',
  flexDirection: 'column',
  alignItems: 'left',
});

export const StyledInputBox = styled(TextField)({
  boxShadow: `5px  ${Colors.black}`,
  maxWidth: '600px',
  transition: 'all 0.8s ease',
  maxHeight:'auto',
  margin: '20px',
});

export const StyledButton = styled(Button)({
  boxShadow: `5px 10px  ${Colors.black}`,
  width: '100px',
  background: Colors.success,
  color: Colors.white,
  fontWeight: 'bolder',
  transition: 'all 0.8s ease',
  marginLeft:'250px',
  fontSize: '15px',
  '&:redTextarea': {
    color: "blue",
  },
  '&:hover': {
    background: Colors.dove_gray,
    color: Colors.black,
    boxShadow: `5px 10px  ${Colors.success}`,
  },
});

export const SuggestionPopUp = styled('div')({
  background: Colors.secondary,
  color: Colors.white,
  margin: '10px',
  height: 201,
});

export const TooltipBox = styled("div")({
  visibility: "hidden",
  color: "transparent",
  backgroundColor: "transparent",
  width: "150px",
  padding: "5px 5px",
  borderRadius: "4px",
  transition: "visibility 0.5s, color 0.5s, background-color 0.5s, width 0.5s, padding 0.5s ease-in-out",
});

export const StyledTooltip = styled(Tooltip)({
  cursor: 'pointer',
});
