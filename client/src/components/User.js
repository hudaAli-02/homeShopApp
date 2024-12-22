import { useSelector } from "react-redux";
import Location from "./Location";


const Customer = () => {

  const customer = useSelector((state) => state.customers.customer);
  const picURL = "http://localhost:3001/uploads/" + customer.profilePic;
  const email = useSelector((state) => state.customers.customer.email);
  const firstName = useSelector((state) => state.customers.customer.firstName);
  const lastName = useSelector((state) => state.customers.customer.lastName);

  return (
    <div className="userInfos">
      <img src={picURL} className="userImage" />
      <p>{firstName} {lastName}</p>
      <p>{email}
      <Location />
      </p>
    </div>
  );
};

export default Customer;
