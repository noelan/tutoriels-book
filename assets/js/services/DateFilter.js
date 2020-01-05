import moment from "moment";

// Formate la date
function formatDate(str) {
  return moment(str).format("DD/MM/YYYY");
}

export default {
  formatDate
};
