import React from "react";

import TableCell from "@material-ui/core/TableCell";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import defaultAvatar from "public/userDefault.webp";

const UserItem = ({ email, fullName, id, role, avatar }) => {
  return (
    <>
      <TableCell component="th">{id}</TableCell>
      <TableCell component="th">{fullName}</TableCell>
      <TableCell component="th">{email}</TableCell>
      <TableCell component="th">
        {role}
        {avatar} i
      </TableCell>
      <TableCell component="th">
        <Avatar src={avatar ? avatar : defaultAvatar}></Avatar>
      </TableCell>
    </>
  );
};

UserItem.propTypes = {
  email: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default UserItem;
