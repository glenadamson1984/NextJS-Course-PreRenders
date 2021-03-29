import React from "react";

const UserProfile = ({username}) => {
  return <h1>{username}</h1>;
};

export default UserProfile;


export const getServerSideProps = async (context) => {
    const { params, req, res } = context;

    return {
        props: {
            username: 'Glen'
        }
    }
}