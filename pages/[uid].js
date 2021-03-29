import React from "react";

const UserIdPage = ({ id }) => {
  return <div>{id}</div>;
};

export default UserIdPage;

export const getServerSideProps = async (context) => {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
};
