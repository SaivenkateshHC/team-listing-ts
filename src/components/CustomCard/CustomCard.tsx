import './CustomCard.scss';
import { IUsers } from "../../utils/interfaces";

const CustomCard = ({ user }: { user: IUsers }) => {
  return (
    <div className="custom-card-component d-flex gap-3 px-3 py-3">
      <img src={user.img} alt={user.first_name} />
      <div>
        <h4>
          {user.first_name} {user.last_name}
        </h4>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default CustomCard;
