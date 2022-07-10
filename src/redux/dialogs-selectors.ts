import { TAppState } from './redux-store';

export const sGetSelectedUsername = (state: TAppState) => {
    const selectedId = state.dialogsPage.selectedId
    const selectedDialog =   state.dialogsPage.dialogs.find((el => el.id === selectedId))
    return selectedDialog ? selectedDialog.userName : undefined 
}