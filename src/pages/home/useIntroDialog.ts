import { useCallback, useEffect, useReducer } from "react";

interface IntroDialogState {
  dialogOpen: boolean;
  displayedText: string;
}

type IntroDialogAction =
  | {
      type: "setDisplayedText";
      displayedText: string;
    }
  | {
      type: "toggleDialog";
    };

const initialState: IntroDialogState = {
  dialogOpen: false,
  displayedText: "",
};

function introDialogReducer(
  state: IntroDialogState,
  action: IntroDialogAction,
): IntroDialogState {
  switch (action.type) {
    case "setDisplayedText":
      return {
        ...state,
        displayedText: action.displayedText,
      };
    case "toggleDialog": {
      const nextDialogOpen = !state.dialogOpen;

      return {
        dialogOpen: nextDialogOpen,
        displayedText: nextDialogOpen ? "" : state.displayedText,
      };
    }
  }
}

export interface UseIntroDialogReturn {
  dialogOpen: boolean;
  displayedText: string;
  toggleDialog: () => void;
  typingDone: boolean;
}

export function useIntroDialog(introText: string): UseIntroDialogReturn {
  const [state, dispatch] = useReducer(introDialogReducer, initialState);
  const typingDone = state.displayedText.length >= introText.length;

  const toggleDialog = useCallback((): void => {
    dispatch({ type: "toggleDialog" });
  }, []);

  useEffect(() => {
    if (!state.dialogOpen) return;

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      dispatch({
        displayedText: introText.slice(0, index),
        type: "setDisplayedText",
      });

      if (index >= introText.length) {
        window.clearInterval(interval);
      }
    }, 50);

    return () => window.clearInterval(interval);
  }, [introText, state.dialogOpen]);

  return {
    dialogOpen: state.dialogOpen,
    displayedText: state.displayedText,
    toggleDialog,
    typingDone,
  };
}
