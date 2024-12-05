import { IContract, IContractComment, IContractItem } from "@/dto/contract";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  loading: boolean;
  contract: IContract | undefined;
  error: string | undefined;
}

const initialState: State = {
  loading: false,
  contract: undefined,
  error: undefined,
};

const slice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setContract: (state, action: PayloadAction<IContract>) => {
      state.contract = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateContentOfITem: (
      state,
      action: PayloadAction<{
        id: number;
        content: string;
      }>
    ) => {
      const { id, content } = action.payload;

      const item = state.contract?.items?.find((item) => item.id === id);
      if (item) item.content = content;
    },
    pushNewContractItem: (state, action: PayloadAction<IContractItem>) => {
      state.contract?.items?.push(action.payload);
    },
    removeContractItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.contract)
        state.contract.items = state.contract?.items?.filter(
          (item) => item.id !== id
        );
    },
    pushNewContractItemComment: (
      state,
      action: PayloadAction<{ itemId: number; comment: IContractComment }>
    ) => {
      const { itemId, comment } = action.payload;
      if (state.contract) {
        const item = state.contract.items.find((i) => i.id === itemId);
        if (item) {
          item.comments.push(comment);

          item.commentsCount++;
        }
      }
    },
  },
});

export const {
  setLoading,
  setContract,
  setError,
  updateContentOfITem,
  pushNewContractItem,
  removeContractItem,
  pushNewContractItemComment,
} = slice.actions;

const SingleContractReducer = slice.reducer;

export default SingleContractReducer;
