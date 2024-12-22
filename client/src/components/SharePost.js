import { Button , Col  ,Row , Container ,FromGroup , Input} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { savePost } from "../Features/PostSlice";


const SharePosts = () => {
const [postMsg, setpostMsg] = useState("");
const navigate = useNavigate();
const dispatch = useDispatch();
const email = useSelector((state) => state.customers.customer.email) 
const handlePost = async () => {
  if (!postMsg.trim()) {
    alert("Post message is required."); 
    return; 
  }

  const postData = {
    postMsg: postMsg,
    email: email,
  };

  dispatch(savePost(postData)); 
setpostMsg(""); 

};

  return (
    <Container>
      <Row>
        <Col>
        <Input
         id="share" 
         name="share" 
         placeholder="how do you feel about our service ?" 
         type="tetarea"
         value={postMsg}
         onChange={(e) => setpostMsg(e.target.value)}
         />
         <Button onClick={()=>handlePost()}>comment</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;