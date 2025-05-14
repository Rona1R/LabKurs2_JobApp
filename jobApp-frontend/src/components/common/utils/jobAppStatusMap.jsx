export const statusMap = {
  Pending: {
    icon: (
      <i
        className="fa-regular fa-clock"
        style={{ color: "#F57C00", marginRight: 8 }}
      />
    ),
    color: "#F57C00",
  },
  InReview: {
    icon: (
      <i
        className="fa-solid fa-hourglass-half"
        style={{ color: "#1565c0", marginRight: 8 }}
      />
    ),
    color: "#1565c0",
  },
  Approved: {
    icon: (
      <i
        className="fa-solid fa-circle-check"
        style={{ color: "#3c2ca6", marginRight: 8 }}
      />
    ),
    color: "#3c2ca6",
  },
  Withdrawn: {
    icon: (
      <i
        className="fa-solid fa-arrow-rotate-left"
        style={{ color: "#757575", marginRight: 8 }}
      />
    ),
    color: "#757575",
  },
  Rejected: {
    icon: (
      <i
        className="fa-solid fa-circle-xmark"
        style={{ color: "#d32f2f", marginRight: 8 }}
      />
    ),
    color: "#d32f2f",
  },
  default: {
    icon: (
      <i
        className="fa-regular fa-question-circle"
        style={{ color: "#90A4AE", marginRight: 8 }}
      />
    ),
    color: "#90A4AE",
  },
};
