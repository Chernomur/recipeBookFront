import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GetAllUsers } from "store/user/actions";
import { allUsers } from "api/userApi";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination";
import { TaskType } from "utils/types";
import UserItem from "./UserItem";

class UsersList extends React.Component {
  state = {
    order: "asc", // desc
    orderBy: "id",
    currentPage: 0,
    rowsCount: 5,
    totalItems: 0,
  };

  getReqUsers = async () => {
    try {
      const res = await allUsers({
        currentPage: this.state.currentPage,
        rowsCount: this.state.rowsCount,
        orderBy: this.state.orderBy,
        order: this.state.order,
      });

      this.props.GetAllUsers(res);

      this.setState({
        totalItems: res.totalItems,
        currentPage: res.currentPage,
      });
    } catch (e) {
      // console.log(e);
    }
  };

  async componentDidMount() {
    this.getReqUsers();
  }

  handleChangePage = (event, newPage) => {
    this.setState({ currentPage: newPage }, this.getReqUsers);
  };

  handleChangeRowsPerPage = async (event) => {
    this.setState({ rowsCount: +event.target.value }, this.getReqUsers);

    this.setState({
      currentPage: 0,
    });
  };

  createSortHandler = async (cell) => {
    if (this.state.orderBy === cell) {
      if (this.state.order === "asc") {
        this.setState({ order: "desc" }, this.getReqUsers);
      } else {
        this.setState({ order: "asc" }, this.getReqUsers);
      }
    } else {
      this.setState({ orderBy: cell, order: "asc" }, this.getReqUsers);
    }
  };

  render() {
    return (
      <StyledUsersList>
        <TableContainer>
          <Table className="all-table">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={
                      this.state.orderBy === headCell.id
                        ? this.state.order
                        : false
                    }
                  >
                    <TableSortLabel
                      active={this.state.orderBy === headCell.id}
                      direction={
                        this.state.orderBy === headCell.id
                          ? this.state.order
                          : "asc"
                      }
                      onClick={() => this.createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.users.map(({ email, fullName, id, role, avatar }) => (
                <TableRow key={id}>
                  <UserItem
                    key={id}
                    email={email}
                    fullName={fullName}
                    id={id}
                    role={role}
                    avatar={avatar}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={this.state.totalItems}
          rowsPerPage={this.state.rowsCount}
          page={this.state.currentPage}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </StyledUsersList>
    );
  }
}

const headCells = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "fullName",
    label: "Full name",
  },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" },
  {
    id: "avatar",
    label: "Avatar",
  },
];

const StyledUsersList = styled.ul`
  .all-table {
  }
`;

const connectFunction = connect(
  (state) => ({
    users: state.user.users,
  }),
  {
    GetAllUsers,
  }
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(TaskType).isRequired,
  GetAllUsers: PropTypes.func.isRequired,
};

export default connectFunction(UsersList);
