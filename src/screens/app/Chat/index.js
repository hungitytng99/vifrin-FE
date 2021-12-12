import React from "react";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
  MessageSeparator,
  InfoButton,
  TypingIndicator,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  MainContainer,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { LIST_CONVERSATION, LIST_MESSAGE } from "./config";
// import "./chat.sass";

const emilyIco =
  "https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-9/127144574_1294524894233393_5133689362435938880_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Vg-7PR98GzAAX_iHKwA&_nc_ht=scontent.fhan3-1.fna&oh=17c44901b5e27da980863086a05cb9f2&oe=61B6F624";

function ChatPage({ match, history }) {
  return (
    <div
      className="my-container"
      style={{
        position: "relative",
        height: "calc(100vh - 100px)",
        paddingTop: "10px",
      }}
    >
      <MainContainer responsive style={{ fontSize: "1.6rem" }}>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            {LIST_CONVERSATION.map((conversation) => {
              return (
                <Conversation
                  key={conversation.id}
                  name={conversation.lastSenderName}
                  lastSenderName={conversation.lastSenderName}
                  info={conversation.info}
                  active={conversation.active}
                >
                  <Avatar
                    src={conversation.senderAvatar}
                    name={conversation.name}
                    status="available"
                  />
                </Conversation>
              );
            })}
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={emilyIco} name="Emily" />
            <ConversationHeader.Content
              userName="Emily"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <InfoButton title="Show info" />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content="Hung is typing" />}
          >
            <MessageSeparator content="Saturday, 30 November 2019" />
            {LIST_MESSAGE.map((messageModal) => {
              return (
                <Message key={messageModal.id} model={messageModal}>
                  {messageModal.avatar && (
                    <Avatar src={messageModal.avatar} name={"Emily"} />
                  )}
                  {/* <Message.Footer sentTime={messageModal.sentTime} /> */}
                </Message>
              );
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default ChatPage;
