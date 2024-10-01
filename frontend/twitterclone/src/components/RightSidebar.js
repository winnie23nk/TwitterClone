import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const RightSidebar = ({ otherUsers }) => {
  return (
    <div className="w-[20%]">
      <div className=" flex items-center p-2 bg-gray-100 rounded-full outline-none w-full">
        <CiSearch size="20" />
        <input
          type="text"
          className="bg-transparent outline-none px-2"
          placeholder="Search"
        />
      </div>
      <div className="p-4  bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-lg">Who to follow</h1>
        {otherUsers?.map((user) => {
          return (
            <div
              key={user?._id}
              className="flex justify-between items-center mb-3"
            >
              <div className="flex">
                <div>
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt5koToJHckRIyzqV9ezGxO9kIzBsFojilOQ&usqp=CAU"
                    size="40"
                    round={true}
                  />
                </div>
                <div className="ml-1">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm">{`@${user?.username}`}</p>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}>
                  <button className="text-sm px-2 ml-2 py-1  bg-black text-white rounded-full">
                    Profile
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RightSidebar;
