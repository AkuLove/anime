import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characterInfo: {},
    description: [],
  } as { characterInfo: { [key: string]: string }; description: string[] },
  reducers: {
    getCharacterInfo(state, action: PayloadAction<string>) {
      state.characterInfo = {};
      state.description = [];
      const arrayWithInfo = action.payload.split('\n');

      arrayWithInfo.forEach((elem) => {
        const separator = ': ';
        const separatorIndex = elem.indexOf(separator);
        const property = elem.slice(0, separatorIndex);
        if (elem.includes(separator) && separatorIndex <= 25) {
          state.characterInfo[property] = elem.slice(
            separatorIndex + separator.length
          );
        }
        if (elem !== '' && (!elem.includes(separator) || separatorIndex > 25)) {
          state.description.push(elem);
        }
      });
    },
  },
});

export const { getCharacterInfo } = charactersSlice.actions;

export default charactersSlice.reducer;
