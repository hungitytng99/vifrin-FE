// import { useState } from 'react';
import Comment from "../../../../components/Comment/Comment";

function CommentsList(props) {
  const { listComments } = props;
  return listComments ? (
    listComments.map((item) => {
      return <Comment key={item.id} comment={item} />;
    })
  ) : (
    <div></div>
  );
}
export default CommentsList;
