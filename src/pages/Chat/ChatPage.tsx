import { FC } from "react";
import { Chat } from "../../components/Chat/Chat";
import { useRequireAuth } from "../../utils/hooks/useRequireAuth";

export const ChatPage: FC = () => {
    useRequireAuth()
    return (
        <div>
            <h1>Chat</h1>
            <Chat />
        </div>
  );
};
