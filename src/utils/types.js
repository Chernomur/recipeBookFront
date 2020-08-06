import PropTypes from "prop-types";

export const TaskType = PropTypes.shape({
  _id: PropTypes.string,
  title: PropTypes.string,
  overview: PropTypes.string,
  difficulty: PropTypes.string,
  cookingTime: PropTypes.number
});
