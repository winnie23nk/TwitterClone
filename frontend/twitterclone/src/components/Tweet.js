import React from "react";
import Avatar from "react-avatar";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/constant";
import { getRefresh } from "../redux/tweetSlice";
import { timeSince } from "../utils/constant";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };
  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      console.log(res);

      if (res.data.success) {
        dispatch(getRefresh());
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex mt-2 ml-4">
          {/*avatar*/}
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt5koToJHckRIyzqV9ezGxO9kIzBsFojilOQ&usqp=CAU"
            size="40"
            round={true}
          />
          <div className="w-full">
            {/*name and post*/}
            <div className="flex items-center ml-2">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-1">{`@${
                tweet?.userDetails[0]?.username
              } .${timeSince(tweet?.createdAt)}`}</p>
            </div>
            <div>
              <p className="ml-2">{tweet?.description}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center ">
                <div className="p-2 hover:bg-blue-200 rounded-full cursor-pointer">
                  <FaRegCommentAlt size="20px" />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className="p-2 hover:bg-red-200 rounded-full cursor-pointer"
                >
                  <FaRegHeart size="24px" />
                </div>
                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center" size="24px">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <FaRegBookmark size="24px" />
                </div>
                <p>0</p>
              </div>
              {user?._id === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="flex items-center"
                  size="24px"
                >
                  <div className="p-2 hover:bg-red-400 rounded-full cursor-pointer">
                    <MdDeleteOutline size="30px" />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/*name and post*/}
        </div>
        {/*avatar*/}
      </div>
    </div>
  );
};

export default Tweet;
