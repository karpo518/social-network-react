import { TAppState } from './redux-store';

export const SGetMessages = (state: TAppState) => {
    return  state.chat.messages;
}